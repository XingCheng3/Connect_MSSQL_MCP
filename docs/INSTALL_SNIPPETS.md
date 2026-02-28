# MCP Install Snippets (Copy-ready)

> Package mode (recommended after npm publish): `npx -y connect-mssql-mcp@latest`

## 1) Universal JSON

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

## 2) VS Code

`settings.json` or MCP config:

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

## 3) Cursor

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

## 4) Claude Desktop

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

## 5) Cline (`cline_mcp_settings.json`)

```json
{
  "mcpServers": {
    "connect-mssql": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "connect-mssql-mcp@latest"],
      "disabled": false
    }
  }
}
```

## 6) Codex (`~/.codex/config.toml`)

```toml
[mcp_servers.connect_mssql]
command = "npx"
args = ["-y", "connect-mssql-mcp@latest"]
```

## 7) Gemini CLI (`settings.json`)

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
