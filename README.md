# Connect_MSSQL_MCP

[![GitHub stars](https://img.shields.io/github/stars/XingCheng3/Connect_MSSQL_MCP?style=social)](https://github.com/XingCheng3/Connect_MSSQL_MCP/stargazers)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](./LICENSE)
[![MCP](https://img.shields.io/badge/Protocol-MCP-7A3EFF)](https://modelcontextprotocol.io)

一个面向 **Microsoft SQL Server** 的 MCP Server（stdio）。  
A lightweight MCP server for **Microsoft SQL Server**.

> 核心特点：**每次请求动态传入连接参数**（`ip/user/password/...`），默认只读更安全。

---

## ✨ Features

- `query`：执行 SQL（默认只读）
- `get_table_structure`：查看表结构
- `get_procedure_content`：读取存储过程定义
- `get_view_definition`：读取视图定义
- 每次请求动态传入连接参数（适合多库/多环境）
- 启动时加 `--enable-write` 才允许写操作

## 🚀 Quick Start

```bash
git clone https://github.com/XingCheng3/Connect_MSSQL_MCP.git
cd Connect_MSSQL_MCP
npm install
npm run build
npm start
```

## 🔌 MCP 标准配置（通用）

> 把下面路径替换成你机器上的绝对路径。

```json
{
  "mcpServers": {
    "connect-mssql": {
      "command": "node",
      "args": ["/ABS/PATH/Connect_MSSQL_MCP/dist/index.js"]
    }
  }
}
```

## 🧩 多平台导入示例（参考 Playwright MCP 风格）

仓库内已提供可直接复制的模板：`examples/mcp/`

- VS Code: `examples/mcp/vscode.mcp.json`
- Cursor: `examples/mcp/cursor.json`
- Claude Desktop: `examples/mcp/claude_desktop.json`
- Cline: `examples/mcp/cline_mcp_settings.json`
- Codex CLI: `examples/mcp/codex.config.toml`
- Gemini CLI: `examples/mcp/gemini.settings.json`

你只需要把模板里的 `/ABS/PATH/.../dist/index.js` 改成自己本机路径。

## 🧪 Example Tool Call

```json
{
  "name": "query",
  "arguments": {
    "ip": "127.0.0.1",
    "port": 1433,
    "database": "master",
    "user": "sa",
    "password": "***",
    "query": "SELECT @@VERSION AS version"
  }
}
```

## 🔐 Security

- 不提交任何真实数据库账号密码
- 生产环境建议启用 TLS（`encrypt: true`）
- 建议使用最小权限数据库账号

## 🧰 Scripts

```bash
npm run dev      # tsx src/index.ts
npm run build    # tsc
npm start        # node dist/index.js
```

## 📅 Release Rhythm（拉 star 的节奏）

- 每周：至少 1 次小更新（文档 / 示例 / 修复）
- 每月：1 次版本发布（v0.x.y）+ Release Notes
- 每季度：1 次能力升级（新工具/性能优化）

## 🤝 Contributing

欢迎 issue / PR，提交前请确保 `npm run build` 通过。

## 📄 License

ISC
