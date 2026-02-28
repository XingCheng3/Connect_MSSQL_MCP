# Connect_MSSQL_MCP

[![GitHub stars](https://img.shields.io/github/stars/XingCheng3/Connect_MSSQL_MCP?style=social)](https://github.com/XingCheng3/Connect_MSSQL_MCP/stargazers)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](./LICENSE)
[![MCP](https://img.shields.io/badge/Protocol-MCP-7A3EFF)](https://modelcontextprotocol.io)

一个面向 **Microsoft SQL Server** 的轻量 MCP Server。  
A lightweight MCP server for **Microsoft SQL Server**.

> ✅ 核心特点：**每次请求动态传入数据库连接参数**，适合多库场景。  
> ✅ Core feature: **dynamic per-request DB connection arguments**.

---

## ✨ Features

- `query`: 执行 SQL（默认只读）
- `get_table_structure`: 查看表结构
- `get_procedure_content`: 查看存储过程定义
- `get_view_definition`: 查看视图定义
- 支持每次请求传入连接参数：`ip` / `port` / `database` / `user` / `password`
- 默认写保护（需 `--enable-write` 才允许 DML/DDL）

## 🚀 Quick Start

```bash
# 1) install
npm install

# 2) development run
npm run dev

# 3) build + run
npm run build
npm start
```

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

## 🔐 Security Notes

- 不要提交真实数据库账号密码。
- `.env` 文件仅作本地参考，本项目运行时不依赖它。
- 生产环境建议启用 TLS（`encrypt: true`）并使用最小权限数据库账号。

## 🧰 Scripts

```bash
npm run dev      # tsx src/index.ts
npm run build    # tsc
npm start        # node dist/index.js
```

## 🗺️ Roadmap

- [ ] 增加自动化测试（集成 SQL Server 容器）
- [ ] 增加 CI（build/test）
- [ ] 增加错误码与错误分类
- [ ] 增加更多 schema introspection 工具

## 🤝 Contributing

欢迎提 issue / PR。提交前请确保：

- 能本地 `npm run build` 通过
- 新增功能有最小可复现示例
- 避免提交敏感信息

## 📄 License

ISC
