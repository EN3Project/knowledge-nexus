# nexus-vault-mcp

**Make your second brain AI-native.**

Connect your Obsidian Vault to any LLM via the
[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) —
Claude, Gemini, Codex, or any MCP-compatible client.

Your notes. Your AI. Zero vendor lock-in.

---

## Features

- **LLM-agnostic** — works with Claude Code, Gemini CLI, Codex, and any MCP-compatible client
- **Local-first** — your Vault stays on your machine; no data sent to third-party APIs
- **Three core tools** — `vault_search`, `vault_read`, `vault_write`
- **Full system template** — agent roles, workflows, memory protocol included

## What's Included

```
nexus-vault-mcp/
├── nexus-vault.js          # MCP server
├── SYSTEM_MANIFEST.md      # Core rules for the Nexus orchestrator
├── CLAUDE.md               # Entry point for Claude Code
├── AGENTS.md               # Entry point for Codex
├── GEMINI.md               # Entry point for Gemini CLI
├── 99_System/
│   ├── Memory/             # Session memory & INDEX
│   ├── Handoff/            # Short-term context handoff
│   └── Prompts/
│       ├── Personas/       # Persona templates (customize here)
│       ├── Protocols/      # Command specifications
│       ├── Roles/Library/  # 6 agent role definitions
│       ├── Skills/         # Shared skill prompts
│       └── Workflows/      # StandardResearch, SynthesisDigest, etc.
├── index/
│   └── Clippings/          # Drop articles/clips here for processing
└── docs/                   # Landing page (GitHub Pages)
```

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set your Vault path

**macOS / Linux:**
```bash
export NEXUS_VAULT_PATH=/path/to/your/vault/index
export NEXUS_INDEX_PATH=/path/to/your/vault/99_System/VaultIndex.md
```

**Windows (PowerShell):**
```powershell
$env:NEXUS_VAULT_PATH = "C:\path\to\your\vault\index"
$env:NEXUS_INDEX_PATH = "C:\path\to\your\vault\99_System\VaultIndex.md"
```

> **Note:** If you're using this repo as your Vault root, point `NEXUS_VAULT_PATH` to the `index/` folder inside this repo.

### 3. Start the MCP server

```bash
npm start
# Endpoint: http://127.0.0.1:3100/mcp
```

> **Important:** Start the MCP server **before** typing `run` in your LLM. The startup sequence checks for a live server connection.

### 4. Initialize VaultIndex

`vault_search` depends on a `VaultIndex.md` file. On first use, generate it:

```bash
# Run this in your Vault root
node 99_System/Scripts/rebuild_vault_index.js
```

> Or ask the LLM to run `rebuild-index` after the first `run` command.

---

## Connect Your LLM

### Claude Code

Add to `~/.claude/mcp.json`:

```json
{
  "mcpServers": {
    "nexus-vault": {
      "type": "http",
      "url": "http://127.0.0.1:3100/mcp"
    }
  }
}
```

Then open the project folder in Claude Code. It will automatically load `CLAUDE.md`.

### Gemini CLI

Add to your Gemini CLI settings:

```json
{
  "mcpServers": {
    "nexus-vault": {
      "httpUrl": "http://127.0.0.1:3100/mcp"
    }
  }
}
```

Open the project and run `run` to initialize. Gemini CLI will load `GEMINI.md`.

### Codex

Add to your Codex MCP config:

```json
{
  "mcpServers": {
    "nexus-vault": {
      "url": "http://127.0.0.1:3100/mcp"
    }
  }
}
```

Codex will automatically load `AGENTS.md` on session start.

---

## MCP Tools

| Tool | Description |
|------|-------------|
| `vault_search(query)` | Search VaultIndex.md and return relevant note list |
| `vault_read(path)` | Read full content of a note (repo-relative path) |
| `vault_write(path, content)` | Create or overwrite a note |

### VaultIndex format

`vault_search` reads `VaultIndex.md` in the following format:

```markdown
### index/03_Resources/your-note.md
- **Tags:** tag1, tag2
- **Summary:** One-line description of the note
```

---

## Obsidian Setup

1. Open Obsidian → **Open folder as vault** → select the repo root (or `index/` subfolder)
2. Notes written by the LLM via `vault_write` will appear automatically in Obsidian
3. Folder structure is created on first write — no manual setup needed

---

## Customize Your Persona

Edit `SYSTEM_MANIFEST.md` §4 to point to your persona file, or create a new one in `99_System/Prompts/Personas/` following the `Persona_Guideline.md` template.

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXUS_VAULT_PATH` | `./index` | Path to your Vault directory |
| `NEXUS_INDEX_PATH` | `./99_System/VaultIndex.md` | Path to VaultIndex.md |
| `NEXUS_PORT` | `3100` | Port to listen on |

---

## Requirements

- Node.js v18+
- An Obsidian Vault (or any directory of Markdown files)
- A MCP-compatible LLM client (Claude Code, Gemini CLI, Codex, etc.)

## License

MIT
