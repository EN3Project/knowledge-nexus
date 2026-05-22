# Handoff

`99_System/Handoff/` は Knowledge Nexus の短期作業文脈を置くための領域。

## Files

- `CURRENT_CONTEXT.md`: `handoff / 引き継ぎ` コマンドで生成される現在の短期作業文脈。

## Rules

- `CURRENT_CONTEXT.md` が存在する場合、次回 `run / load` 時に扱いを確認する。
- `run / load` 時の選択肢は `読み込む`, `読み込まずに残す`, `内容を確認してから決める`, `削除する`。
- `読み込む` を選んだ場合のみ、`CURRENT_CONTEXT.md` は現在セッションの前提に含まれる。
- `削除する` を選んだ場合は、`clear-handoff / 引き継ぎ破棄` と同じく `CURRENT_CONTEXT.md` のみを削除する。
- `CURRENT_CONTEXT.md` は一時バッファであり、長期保存用の Memory ではない。
- 新しい `handoff` 実行時は `CURRENT_CONTEXT.md` を上書きしてよい。
- 短期文脈が不要になった場合は `clear-handoff / 引き継ぎ破棄` で `CURRENT_CONTEXT.md` を削除する。
- 長期的に再利用すべき決定事項、ユーザー嗜好、未完了タスク、システム変更は `crystallize / 結晶化` で `99_System/Memory/` または Permanent note に保存する。
