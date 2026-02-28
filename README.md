# Connect_MSSQL_MCP

[![GitHub stars](https://img.shields.io/github/stars/XingCheng3/Connect_MSSQL_MCP?style=social)](https://github.com/XingCheng3/Connect_MSSQL_MCP/stargazers)
[![CI](https://github.com/XingCheng3/Connect_MSSQL_MCP/actions/workflows/ci.yml/badge.svg)](https://github.com/XingCheng3/Connect_MSSQL_MCP/actions/workflows/ci.yml)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](./LICENSE)
[![MCP](https://img.shields.io/badge/Protocol-MCP-7A3EFF)](https://modelcontextprotocol.io)

一个面向 **Microsoft SQL Server** 的 MCP Server（stdio）。

> 核心特点：**每次请求动态传入连接参数**（`ip/user/password/...`），默认只读更安全。

---

## ✨ Features

- `query`：执行 SQL（默认只读）
- `get_table_structure`：查看表结构
- `get_procedure_content`：读取存储过程定义
- `get_view_definition`：读取视图定义
- 每次请求动态传入连接参数（适合多库/多环境）
- 启动时加 `--enable-write` 才允许写操作

## 🚀 Quick Start (local)

```bash
git clone https://github.com/XingCheng3/Connect_MSSQL_MCP.git
cd Connect_MSSQL_MCP
npm install
npm run build
npm start
```

## 📦 npm-ready command (after publish)

```bash
npx connect-mssql-mcp@latest
```

> 当前仓库已完成 npm 发布准备（bin / files / prepack）。

## 🔌 Standard MCP Config

### Option A: local build path

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

### Option B: npm package (recommended after publish)

```json
{
  "mcpServers": {
    "connect-mssql": {
      "command": "npx",
      "args": ["-y", "connect-mssql-mcp@latest"]
    }
  }
}
```

## 🧩 Multi-client import examples

已提供配置模板：`examples/mcp/`

- VS Code: `examples/mcp/vscode.mcp.json`
- Cursor: `examples/mcp/cursor.json`
- Claude Desktop: `examples/mcp/claude_desktop.json`
- Cline: `examples/mcp/cline_mcp_settings.json`
- Codex CLI: `examples/mcp/codex.config.toml`
- Gemini CLI: `examples/mcp/gemini.settings.json`

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

## 📚 Docs

- 变更日志：`CHANGELOG.md`
- 发布说明（v1.1.0）：`docs/RELEASE_NOTES_v1.1.0.md`
- 多平台安装片段：`docs/INSTALL_SNIPPETS.md`
- 仓库主页文案包：`docs/HOMEPAGE_COPY.md`
- npm 发布流程：`docs/PUBLISH.md`

## 🤝 Contributing

欢迎 issue / PR，提交前请确保 `npm run build` 通过。

## 📄 License

ISC
