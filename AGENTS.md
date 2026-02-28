# Repository Guidelines（仓库贡献指南）

## 项目结构与模块
- `src/index.ts`：MCP 服务器入口与工具处理器（`query`、`get_table_structure`、`get_procedure_content`、`get_view_definition`）。
- `dist/`：TypeScript 编译输出目录（由 `npm run build` 生成）。
- `package.json`：脚本与依赖；`tsconfig.json`：ES2022、ESM（NodeNext）、严格类型。
- `.env`：仅供参考；服务器不会读取任何环境变量作为默认连接配置。所有连接参数必须由调用方在每次请求中显式传入（`ip`、`user`、`password` 必填，`port`、`database` 可选）。

## 构建、运行与开发
- `npm run dev`：使用 `tsx` 在开发模式下通过 stdio 启动，供 MCP 客户端连接。
- `npm run build`：使用 `tsc` 编译到 `dist/`。
- `npm start`：从 `dist/index.js` 运行已编译服务器。

示例（调用 query 工具）：
```json
{
  "name": "query",
  "arguments": {"ip":"127.0.0.1","user":"sa","password":"***","database":"master","query":"SELECT 1 AS x"}
}
```

## 代码风格与命名
- 使用 TypeScript + ESM（NodeNext），启用 `strict`；统一 2 空格缩进。
- 命名：变量/函数用 `camelCase`，类/类型用 `PascalCase`；`src/` 下文件名建议小写（如 `tools.ts`）。
- 结构：保留 `index.ts` 为入口；新增工具逻辑请拆分为小型模块置于 `src/` 并在入口集中注册。

## 测试指南
- 暂未配置测试框架；请运行 `npm run dev` 并通过 MCP 客户端手动验证各工具。
- 优先使用参数化查询，避免对标识符或值进行字符串拼接。

## 提交与 PR 规范
- 提交信息建议遵循 Conventional Commits，使用祈使语与作用域。
  - 例：`feat(server): 添加 get_view_definition 工具`，`fix(sql): 优化错误映射`。
- PR 请包含：变更摘要、关联 issue、复现与验证步骤、已脱敏的 SQL 示例；确认未提交任何敏感信息。

## 安全与配置提示
- 每次调用需传入连接参数：`ip`、`user`、`password`（必填），`port`/`database`（可选）。不要依赖 `.env`；即便存在 `.env` 文件，服务器也不会使用其中的连接配置。
- 目前默认 `encrypt: false`、`trustServerCertificate: true` 便于开发；生产环境请启用 TLS（`encrypt: true`）并校验证书。
- 处理中文字符串时请使用 `N'…'` 字面量前缀（如 `N'中文'`）。
