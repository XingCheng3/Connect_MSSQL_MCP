# Publish Guide (npm)

## 1) Login

```bash
npm login
```

## 2) Check package name availability

```bash
npm view connect-mssql-mcp version
```

If not found, the name is usually available.

## 3) Dry run package content

```bash
npm pack --dry-run
```

## 4) Publish

```bash
npm publish --access public
```

## 5) Verify

```bash
npx connect-mssql-mcp@latest --help
```

## 6) Create GitHub Release

Tag example: `v1.1.0`

Release notes should include:
- New tools / behavior changes
- Security notes
- Migration notes
