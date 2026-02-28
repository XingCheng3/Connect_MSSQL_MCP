#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import sql from 'mssql';
// --- 配置解析 ---
// 检查启动参数中是否包含 --enable-write
const args = process.argv.slice(2);
const ENABLE_WRITE = args.includes('--enable-write') || args.some(a => a.startsWith('--enable-write=true'));
const TIMEOUT_MS = 20000; // 20秒超时
console.error(`[Config] Write operations enabled: ${ENABLE_WRITE}`);
console.error(`[Config] Timeout set to: ${TIMEOUT_MS}ms`);
/**
 * 工具定义
 */
const getTools = () => {
    const baseTools = {
        query: {
            name: 'query',
            description: ENABLE_WRITE
                ? '执行SQL语句（支持增删改查）。'
                : '执行SQL查询语句（仅支持SELECT）。禁止增删改操作 若需增删改操作输出语句让用户自行执行。',
            inputSchema: {
                type: 'object',
                properties: {
                    query: { type: 'string', description: 'SQL语句' },
                    ip: { type: 'string', description: '数据库IP' },
                    port: { type: 'number', description: '端口(默认1433)' },
                    database: { type: 'string', description: '数据库名' },
                    user: { type: 'string', description: '用户名' },
                    password: { type: 'string', description: '密码' }
                },
                required: ['query', 'ip', 'user', 'password']
            }
        },
        get_table_structure: {
            name: 'get_table_structure',
            description: '查询表结构',
            inputSchema: {
                type: 'object',
                properties: {
                    tableName: { type: 'string', description: '表名' },
                    ip: { type: 'string', description: '数据库IP' },
                    port: { type: 'number', description: '端口(默认1433)' },
                    database: { type: 'string', description: '数据库名' },
                    user: { type: 'string', description: '用户名' },
                    password: { type: 'string', description: '密码' }
                },
                required: ['tableName', 'ip', 'user', 'password']
            }
        },
        get_procedure_content: {
            name: 'get_procedure_content',
            description: '查询存储过程内容',
            inputSchema: {
                type: 'object',
                properties: {
                    procedureNames: { type: 'array', items: { type: 'string' }, description: '存储过程名称列表' },
                    ip: { type: 'string', description: '数据库IP' },
                    port: { type: 'number', description: '端口(默认1433)' },
                    database: { type: 'string', description: '数据库名' },
                    user: { type: 'string', description: '用户名' },
                    password: { type: 'string', description: '密码' }
                },
                required: ['procedureNames', 'ip', 'user', 'password']
            }
        },
        get_view_definition: {
            name: 'get_view_definition',
            description: '查询视图定义',
            inputSchema: {
                type: 'object',
                properties: {
                    viewName: { type: 'string', description: '视图名称' },
                    ip: { type: 'string', description: '数据库IP' },
                    port: { type: 'number', description: '端口(默认1433)' },
                    database: { type: 'string', description: '数据库名' },
                    user: { type: 'string', description: '用户名' },
                    password: { type: 'string', description: '密码' }
                },
                required: ['viewName', 'ip', 'user', 'password']
            }
        }
    };
    return baseTools;
};
class MssqlServer {
    server;
    constructor() {
        this.server = new Server({
            name: 'mcp-mssql-server',
            version: '1.0.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupHandlers();
        this.setupErrorHandling();
    }
    setupHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: Object.values(getTools())
        }));
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            const connArgs = args;
            // 强制捕获所有异常，确保返回结果
            try {
                if (!args) {
                    return { content: [{ type: 'text', text: JSON.stringify({ error: 'Arguments are required' }) }] };
                }
                // 1. 安全检查 (针对 query 工具)
                if (name === 'query' && !ENABLE_WRITE) {
                    const sqlStr = (args.query || '').trim();
                    // 简单的关键字检查，防止明显的写入操作
                    const forbiddenPattern = /\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|GRANT|REVOKE)\b/i;
                    if (forbiddenPattern.test(sqlStr)) {
                        return {
                            content: [{
                                    type: 'text',
                                    text: JSON.stringify({
                                        error: 'Write operations are disabled',
                                        message: '当前配置禁止执行增删改操作，请手动执行此语句。',
                                        hint: '如需启用，请在 mcp_config.json 的 args 中添加 --enable-write 参数'
                                    }, null, 2)
                                }]
                        };
                    }
                }
                let sqlQuery = '';
                const sqlParams = {};
                // 2. 构建SQL
                switch (name) {
                    case 'query':
                        sqlQuery = args.query;
                        break;
                    case 'get_table_structure':
                        sqlQuery = `
              SELECT 
                COLUMN_NAME as '列名',
                ORDINAL_POSITION as '序号',
                DATA_TYPE as '数据类型',
                IS_NULLABLE as '允许空值',
                CHARACTER_MAXIMUM_LENGTH as '最大长度',
                COLUMN_DEFAULT as '默认值'
              FROM INFORMATION_SCHEMA.COLUMNS 
              WHERE TABLE_NAME = @tableName
              ORDER BY ORDINAL_POSITION`;
                        sqlParams.tableName = args.tableName;
                        break;
                    case 'get_procedure_content':
                        const names = args.procedureNames;
                        const paramNames = names.map((_, i) => `@p${i}`);
                        sqlQuery = `
              SELECT 
                OBJECT_SCHEMA_NAME(object_id) as '架构',
                name as '名称',
                OBJECT_DEFINITION(object_id) as '定义'
              FROM sys.procedures 
              WHERE name IN (${paramNames.join(',')})`;
                        names.forEach((n, i) => sqlParams[`p${i}`] = n);
                        break;
                    case 'get_view_definition':
                        sqlQuery = `
              SELECT TABLE_SCHEMA, TABLE_NAME, VIEW_DEFINITION 
              FROM INFORMATION_SCHEMA.VIEWS 
              WHERE TABLE_NAME = @viewName`;
                        sqlParams.viewName = args.viewName;
                        break;
                    default:
                        return { content: [{ type: 'text', text: JSON.stringify({ error: `Unknown tool: ${name}` }) }] };
                }
                // 3. 执行SQL (带超时保护)
                // 使用 Promise.race 实现硬超时，防止数据库驱动卡死
                const result = await Promise.race([
                    this.executeSql(connArgs, sqlQuery, sqlParams),
                    new Promise((_, reject) => setTimeout(() => reject(new Error(`Execution timed out after ${TIMEOUT_MS}ms`)), TIMEOUT_MS))
                ]);
                return {
                    content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
                };
            }
            catch (error) {
                console.error(`工具 ${name} 执行异常:`, error);
                // 即使发生严重错误，也返回 JSON 格式的错误信息，而不是抛出异常导致 Agent 卡死
                const errorMsg = error instanceof Error ? error.message : String(error);
                return {
                    content: [{
                            type: 'text',
                            text: JSON.stringify({
                                status: 'error',
                                message: errorMsg,
                                suggestion: '请检查网络连接、SQL语法或重试'
                            }, null, 2)
                        }],
                    isError: true
                };
            }
        });
    }
    async executeSql(connArgs, query, params) {
        const config = this.buildConfig(connArgs);
        const pool = new sql.ConnectionPool(config);
        try {
            await pool.connect();
            const request = pool.request();
            for (const [key, value] of Object.entries(params)) {
                request.input(key, value);
            }
            const result = await request.query(query);
            if (result.recordset) {
                return result.recordset;
            }
            return { rowsAffected: result.rowsAffected, message: 'Success' };
        }
        finally {
            if (pool.connected) {
                await pool.close();
            }
        }
    }
    buildConfig(args) {
        let server = args.ip;
        const options = {
            encrypt: false,
            trustServerCertificate: true
        };
        if (server.includes(',')) {
            const parts = server.split(',');
            server = parts[0];
            if (!args.port && parts[1])
                args.port = parseInt(parts[1]);
        }
        else if (server.includes('\\')) {
            const parts = server.split('\\');
            server = parts[0];
            options.instanceName = parts[1];
        }
        if (server === '.' || server === '(local)')
            server = '127.0.0.1';
        return {
            server,
            port: args.port || 1433,
            database: args.database || 'master',
            user: args.user,
            password: args.password,
            options,
            connectionTimeout: 10000,
            requestTimeout: TIMEOUT_MS, // 同步请求超时
            pool: {
                min: 0,
                max: 1,
                idleTimeoutMillis: 1000
            }
        };
    }
    setupErrorHandling() {
        this.server.onerror = (error) => console.error('[MCP Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('MSSQL MCP Server running on stdio');
    }
}
const server = new MssqlServer();
server.run().catch(console.error);
