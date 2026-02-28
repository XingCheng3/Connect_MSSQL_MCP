# Release Notes — v1.1.0

发布日期：2026-02-28

## 中文

### 🚀 新增与优化

- 完成仓库结构清理，移除无用 `.env` 相关文件
- 增加多客户端 MCP 配置示例（VS Code / Cursor / Claude Desktop / Cline / Codex / Gemini）
- 新增 npm 标准配置模板（`examples/mcp/npm.standard.json`）
- `README.md` 重构：快速开始、双路线配置（本地路径 / npx）、安全建议、发布节奏
- 新增 `CONTRIBUTING.md`
- 新增 `docs/PUBLISH.md`（npm 发布指引）
- 新增 CI 工作流（push/PR 自动 build）
- npm 分发准备完成（`bin`、`files`、`prepack`）

### 🔐 安全与规范

- 默认只读策略保持不变（需 `--enable-write` 才允许写操作）
- 仓库结构更精简，减少误配置风险

### 🧭 升级说明

如果你是老版本使用者：

1. 拉取最新代码
2. 重新执行：`npm install && npm run build`
3. MCP 配置推荐改为（发布后）：`npx -y connect-mssql-mcp@latest`

---

## English

### 🚀 Highlights

- Repository cleanup completed, unused `.env` files removed
- Added multi-client MCP config examples (VS Code / Cursor / Claude Desktop / Cline / Codex / Gemini)
- Added npm standard config template (`examples/mcp/npm.standard.json`)
- Reworked `README.md`: quick start, dual setup path (local / npx), security notes, release rhythm
- Added `CONTRIBUTING.md`
- Added `docs/PUBLISH.md` for npm publishing workflow
- Added CI workflow (build on push/PR)
- npm distribution prep completed (`bin`, `files`, `prepack`)

### 🔐 Security & Safety

- Read-only by default remains unchanged (`--enable-write` required for write SQL)
- Leaner repository structure with less misconfiguration risk

### 🧭 Upgrade Notes

For existing users:

1. Pull the latest code
2. Re-run: `npm install && npm run build`
3. Prefer npx config after publish: `npx -y connect-mssql-mcp@latest`
