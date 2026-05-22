# nexus-vault-mcp

**あなたのセカンドブレインを、AI ネイティブに。**

Obsidian Vault を [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) 経由で任意の LLM と接続するシステムです。
Claude、Gemini、Codex など、MCP に対応したクライアントであればどれでも動作します。

あなたのノート。あなたの AI。ベンダーロックインなし。

---

## 特徴

- **LLM 非依存** — Claude Code / Gemini CLI / Codex など主要クライアントに対応
- **ローカルファースト** — Vault はすべて手元のマシンに保存。外部 API にデータを送信しない
- **3つのコアツール** — `vault_search`・`vault_read`・`vault_write`
- **フルシステムテンプレート** — エージェント定義・ワークフロー・メモリプロトコル付属

## コンセプト

Knowledge Nexus は**知識図書館**であり**情報圧縮装置**です。

```
[生情報 / Clippings]
        ↓
[AI エージェント組織が処理・収蔵]
        ↓
[圧縮されたエッセンスをあなたに届ける]
```

情報の海を泳ぐのは AI の仕事。あなたは岸でエッセンスだけ受け取る。

---

## 同梱内容

```
nexus-vault-mcp/
├── nexus-vault.js          # MCP サーバー本体
├── SYSTEM_MANIFEST.md      # Nexus オーケストレーターのコアルール
├── CLAUDE.md               # Claude Code 用エントリーポイント
├── AGENTS.md               # Codex 用エントリーポイント
├── GEMINI.md               # Gemini CLI 用エントリーポイント
├── 99_System/
│   ├── Memory/             # セッション記憶・長期記憶インデックス
│   ├── Handoff/            # 短期作業文脈の引き継ぎバッファ
│   └── Prompts/
│       ├── Personas/       # 人格テンプレート（カスタマイズ推奨）
│       ├── Protocols/      # コマンド仕様
│       ├── Roles/Library/  # 6体のエージェントロール定義
│       ├── Skills/         # 共有スキルプロンプト
│       └── Workflows/      # StandardResearch・SynthesisDigest など
├── index/
│   ├── Clippings/          # 記事・メモの投入口
│   ├── 00_Inbox/Archive/   # 処理済み Clippings の保管庫
│   ├── 01_Projects/        # プロジェクトノート
│   ├── 02_Areas/           # 管理領域
│   └── 03_Resources/       # 知識ノート（Permanent 含む）
└── docs/                   # ランディングページ（GitHub Pages）
```

---

## セットアップ

### 1. 依存パッケージをインストール

```bash
npm install
```

### 2. Vault のパスを設定

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

> このリポジトリ自体を Vault として使う場合は `index/` フォルダを指定してください。

### 3. MCP サーバーを起動（LLM より先に起動してください）

```bash
npm start
# エンドポイント: http://127.0.0.1:3100/mcp
```

### 4. VaultIndex を初期化

`vault_search` は `VaultIndex.md` を参照します。初回は以下で生成してください。

```bash
node 99_System/Scripts/rebuild_vault_index.js
```

または LLM に `run` と入力後、`rebuild-index` を実行するよう指示してください。

---

## LLM との接続方法

### Claude Code

`~/.claude/mcp.json` に追加：

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

プロジェクトを Claude Code で開くと `CLAUDE.md` が自動的に読み込まれます。

### Gemini CLI

Gemini CLI の設定ファイルに追加：

```json
{
  "mcpServers": {
    "nexus-vault": {
      "httpUrl": "http://127.0.0.1:3100/mcp"
    }
  }
}
```

プロジェクトを開いて `run` と入力すると `GEMINI.md` が読み込まれます。

### Codex

Codex の MCP 設定に追加：

```json
{
  "mcpServers": {
    "nexus-vault": {
      "url": "http://127.0.0.1:3100/mcp"
    }
  }
}
```

セッション開始時に `AGENTS.md` が自動で読み込まれます。

---

## MCP ツール

| ツール | 説明 |
|--------|------|
| `vault_search(query)` | VaultIndex.md を検索して関連ノートの一覧を返す |
| `vault_read(path)` | 指定パスのノートを全文取得（リポジトリルートからの相対パス） |
| `vault_write(path, content)` | ノートを新規作成または上書き保存 |

### VaultIndex のフォーマット

`vault_search` は以下の形式で記述された `VaultIndex.md` を読みます：

```markdown
### index/03_Resources/your-note.md
- **Tags:** タグ1, タグ2
- **Summary:** ノートの1行説明
```

---

## Obsidian との連携

1. Obsidian を開く → **フォルダをVaultとして開く** → このリポジトリのルート（または `index/` フォルダ）を選択
2. LLM が `vault_write` で書き込んだノートは Obsidian に自動で反映されます
3. フォルダ構造は初回書き込み時に自動生成されます

---

## 人格のカスタマイズ

`99_System/Prompts/Personas/` にペルソナファイルを作成し、`SYSTEM_MANIFEST.md` §4 で参照先を変更することで、Nexus に固有の人格を付与できます。作成ガイドは `Persona_Guideline.md` を参照してください。

---

## 主要コマンド

| コマンド | 説明 |
|----------|------|
| `run` / `load` | Nexus を起動。記憶と人格を復元する |
| `standardresearch` | 5フェーズ調査ワークフローを実行 |
| `synthesize` | Vault を横断合成。洞察・知識ギャップを抽出 |
| `weekly-maintenance` | 週次メンテナンスをまとめて実行 |
| `crystallize` | 重要な決定・知識を長期記憶として保存 |
| `rebuild-index` | VaultIndex.md を再生成 |

---

## 環境変数

| 変数 | デフォルト | 説明 |
|------|-----------|------|
| `NEXUS_VAULT_PATH` | `./index` | Vault ディレクトリのパス |
| `NEXUS_INDEX_PATH` | `./99_System/VaultIndex.md` | VaultIndex.md のパス |
| `NEXUS_PORT` | `3100` | MCP サーバーのポート番号 |

---

## 動作要件

- Node.js v18 以上
- Obsidian Vault（または Markdown ファイルのディレクトリ）
- MCP 対応の LLM クライアント（Claude Code / Gemini CLI / Codex など）

## ライセンス

MIT
