# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project follows Semantic Versioning.

## [1.1.0] - 2026-02-28

### Added
- Multi-client MCP setup templates under `examples/mcp/`
- npm standard MCP config template: `examples/mcp/npm.standard.json`
- CI workflow: `.github/workflows/ci.yml`
- Publish docs: `docs/PUBLISH.md`
- Release notes: `docs/RELEASE_NOTES_v1.1.0.md`
- Growth assets: `docs/HOMEPAGE_COPY.md`, `docs/INSTALL_SNIPPETS.md`

### Changed
- Reworked README for onboarding and discoverability
- Prepared package for npm distribution (`bin`, `files`, `prepack`, Node engine)
- Updated package metadata and keywords

### Removed
- Removed unused `.env` and `.env.example`

### Security
- Read-only by default remains enforced unless `--enable-write` is passed

## [1.0.1] - 2026-02-28

### Changed
- Repository cleanup and baseline docs improvement
