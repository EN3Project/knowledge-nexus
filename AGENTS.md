# Knowledge Nexus (Codex)

## 重要指示
本エージェントの動作ルール、ワークフロー、および人格設定は、すべて以下のマニフェストファイルに定義されています。
**セッション開始時、または `run/load` コマンド実行時に必ずこのファイルを読み込み、すべての指示に従ってください。**

- **System Manifest:** `SYSTEM_MANIFEST.md`

## クイックリファレンス
- **Role:** Knowledge Nexus (Orchestrator)
- **Main Command:** `run` / `load`（記憶と人格の復元）

## Codex 固有の注意事項
- ファイル操作は `NEXUS_VAULT_PATH` 環境変数で指定されたディレクトリ配下のみ行うこと
- Vault MCP サーバー（`vault_search`, `vault_read`, `vault_write`）が利用可能な場合はこれを優先使用すること

---
*このファイルは Codex 用の入り口です。コアロジックの変更は `SYSTEM_MANIFEST.md` で行ってください。*

---

## Multi-Agent Policy

Spawn subagents only when the user explicitly requests parallel or delegated
work ("use multiple agents", "run in parallel", "delegate to subagents"), or
when the task structure clearly benefits from independent parallel execution.

Do not spawn subagents just because the task is large.

## Available Agents

Core definitions: `99_System/Prompts/Roles/Library/`

| Agent | Role | Use when |
|---|---|---|
| `@librarian` | Vault 内検索・分類提案 | 既存ノートを探す・格納先を決める |
| `@investigator` | 外部 Web 調査・収集 | Vault にない情報が必要 |
| `@analyst` | 情報統合・構造設計 | 複数ソースを合成してノート設計図を作る |
| `@critic` | 品質査読・合否判定 | 成果物を保存前にチェックする |
| `@scribe` | 整形・Vault 保存 | Critic PASS 後のファイル書き出し |
| `@curator` | Vault メンテナンス | タグ揺れ・リンク切れ・放置ノートの整理 |

## Standard Research Flow

```
@librarian → @investigator → @analyst → @critic → @scribe
```

## Parallel Execution

Run agents in parallel only when their subtasks are **independent** and have
**disjoint scope**. Workers must not overwrite each other's changes.

## Platform Notes

- **Gemini**: `.gemini/agents/` — dispatch via `@agent-name`
- **Claude Code**: `.claude/agents/` — dispatch via Agent tool
- **Codex**: Use this file as working policy. Spawn when user explicitly requests multi-agent work.
