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
