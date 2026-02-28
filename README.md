# Connect_MSSQL_MCP

A lightweight **MCP server** for Microsoft SQL Server.

It provides safe database tools over stdio so LLM clients can query SQL Server with structured inputs.

## Features

- `query`: execute SQL (read-only by default)
- `get_table_structure`: inspect table columns and metadata
- `get_procedure_content`: fetch stored procedure definitions
- `get_view_definition`: fetch view definitions
- Runtime connection args per call (`ip`, `user`, `password`, optional `port`, `database`)
- Write protection by default (`--enable-write` required for INSERT/UPDATE/DELETE/etc.)

## Why this repo

Most SQL MCP examples assume fixed environment variables. This project supports **dynamic connection parameters per request**, making it easier to use across multiple databases.

## Quick Start

```bash
# 1) Install
npm install

# 2) Dev run (stdio)
npm run dev

# 3) Build + run
npm run build
npm start
```

## Example Tool Call

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

## Enable Write Operations (Optional)

By default, write SQL is blocked.

To enable writes, start with:

```bash
npm start -- --enable-write
```

> Use carefully. For production, prefer least-privilege DB accounts.

## Security Notes

- Never commit real credentials.
- `.env` is not used at runtime in this project.
- Use TLS in production (`encrypt: true`) and validate certificates.

## Development

```bash
npm run build
npm run dev
```

## Roadmap

- [ ] Add automated CI checks
- [ ] Add integration tests with SQL Server container
- [ ] Add structured error code mapping

## License

ISC
