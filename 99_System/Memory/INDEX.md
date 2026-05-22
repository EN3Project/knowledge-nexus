# Memory Index

`run / load` 時に最初に読む軽量索引。詳細な履歴は必要になった場合のみ個別 Memory を開く。

## Always Load

- Knowledge Nexus は**知識図書館**であり**情報圧縮装置**でもある。受付（Orchestrator）が入口を管理し、内側のエージェントが資料を処理・収蔵する。`@investigator` は図書館にない知識を外部から持ち帰る。人間の前に届くのは整理・圧縮されたエッセンスのみ。
- Knowledge Nexus は `SYSTEM_MANIFEST.md` を単一の中核マニフェストとして扱う。
- `crystallize / 結晶化` は長期記憶化、`condense / 圧縮` は短期引き継ぎ用の表示要約。
- `handoff / 引き継ぎ` は `condense` と同じ形式で `99_System/Handoff/CURRENT_CONTEXT.md` に短期作業文脈を保存する。
- `clear-handoff` は `99_System/Handoff/CURRENT_CONTEXT.md` のみを削除し、Memory や Permanent note は変更しない。
- `prune-memory / 記憶整理` は Memory と `INDEX.md` を点検し、古い記憶・重複・矛盾・完了済みタスク・参照切れを整理する。
- `review-system / システム点検` は Manifest・README・Protocol・Workflow・INDEX の整合性を点検する。
- `promote-memory / 記憶昇格` は Memory から Permanent note に昇格すべき長期知識を提案する。
- `task-audit / 宿題棚卸し` は Open Tasks を棚卸しし、実行可能な宿題リストを保つ。
- `CURRENT_CONTEXT.md` が存在する場合、`run / load` は自動読み込みせず、`読み込む` / `読み込まずに残す` / `内容を確認してから決める` / `削除する` を提示する。

## User Preferences

> **ここにユーザーの好みや運用ルールを記録していく。**
> 例: 調査タスクでは StandardResearch を必ず使う / 日本語で回答する など

## Open Tasks

> **未完了タスクをここに記録する。**
