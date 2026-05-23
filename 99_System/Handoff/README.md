# Handoff

`99_System/Handoff/` は Knowledge Nexus の短期作業文脈を置くための領域。

## Files

- `CURRENT_CONTEXT.md`: `handoff / 引き継ぎ` コマンドで生成される現在の短期作業文脈。
- `WORKFLOW_SCRATCH.md`: ワークフロー実行中のエージェント間共有メモ。ワークフロー開始時に Nexus が作成し、各フェーズのエージェントが前フェーズ出力を参照・自フェーズ出力を追記する。完了後は `Archive/` に移動する。
- `Archive/`: 完了済みの `WORKFLOW_SCRATCH` を `YYYY-MM-DD-[workflow]-scratch.md` 形式で保存する。

## WORKFLOW_SCRATCH フォーマット

```md
---
workflow: [ワークフロー名]
topic: [トピックまたは対象]
started: YYYY-MM-DD
status: in-progress
---

# WORKFLOW_SCRATCH: [ワークフロー名]

## Phase 1: [フェーズ名]
[Nexus または担当エージェントが記入]

## Phase 2: [フェーズ名]
[担当エージェントが記入]

...
```

## WORKFLOW_SCRATCH 運用ルール

- ワークフロー開始時に Nexus がファイルを作成し、全セクションのヘッダーを事前に設置する。
- 各 dispatch エージェントは **ブリーフィングを受け取る前に** `WORKFLOW_SCRATCH.md` を読み、前フェーズの出力を参照する。
- 自フェーズの出力は対応するセクションに追記してから、Nexus に「完了」を報告する。
- 並列 dispatch 時（例: Phase 1 + Phase 2 同時）は異なるセクションに書くため競合しない。
- ワークフロー完了後は @scribe が `Archive/YYYY-MM-DD-[workflow]-scratch.md` に移動する。
- 同時に実行できるワークフローは1つ。既存 `WORKFLOW_SCRATCH.md` がある場合は完了または中断を確認してから上書きする。

## Rules

- `CURRENT_CONTEXT.md` が存在する場合、次回 `run / load` 時に扱いを確認する。
- `run / load` 時の選択肢は `読み込む`, `読み込まずに残す`, `内容を確認してから決める`, `削除する`。
- `読み込む` を選んだ場合のみ、`CURRENT_CONTEXT.md` は現在セッションの前提に含まれる。
- `削除する` を選んだ場合は、`clear-handoff / 引き継ぎ破棄` と同じく `CURRENT_CONTEXT.md` のみを削除する。
- `CURRENT_CONTEXT.md` は一時バッファであり、長期保存用の Memory ではない。
- 新しい `handoff` 実行時は `CURRENT_CONTEXT.md` を上書きしてよい。
- 短期文脈が不要になった場合は `clear-handoff / 引き継ぎ破棄` で `CURRENT_CONTEXT.md` を削除する。
- 長期的に再利用すべき決定事項、ユーザー嗜好、未完了タスク、システム変更は `crystallize / 結晶化` で `99_System/Memory/` または Permanent note に保存する。
