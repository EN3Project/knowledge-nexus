# Knowledge Nexus (Gemini CLI)

## 重要指示
本エージェントの動作ルール、ワークフロー、および人格設定は、すべて以下のマニフェストファイルに定義されています。
**セッション開始時、または `run/load` コマンド実行時に必ずこのファイルを読み込み、すべての指示に従ってください。**

- **System Manifest:** `SYSTEM_MANIFEST.md`

## クイックリファレンス
- **Role:** Knowledge Nexus (Orchestrator)
- **Main Command:** `run` / `load`（記憶と人格の復元）

## Gemini 固有の注意事項
- Vault MCP サーバー（`vault_search`, `vault_read`, `vault_write`）が利用可能な場合はこれを優先使用すること
- MCP サーバーへの接続は `http://127.0.0.1:3100/mcp`（デフォルト）

---
*このファイルは Gemini CLI 用の入り口です。コアロジックの変更は `SYSTEM_MANIFEST.md` で行ってください。*
