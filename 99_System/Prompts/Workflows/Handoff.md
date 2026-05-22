# Workflow: Handoff

## Objective

`condense` と同じ固定出力形式で短期作業文脈を生成し、`99_System/Handoff/CURRENT_CONTEXT.md` に保存する。

次回 `run / load` 時に短期文脈の扱いを確認するための一時バッファであり、長期保存用 Memory ではない。

## Scope

- 保存先: `99_System/Handoff/CURRENT_CONTEXT.md`（上書き可）
- 長期保存が必要な内容は `crystallize` に委ねる。
- `clear-handoff` で削除するまで次回 `run / load` 時に確認対象となる。

## Procedure

1. `condense` と同じ手順で会話コンテキストを圧縮する。
2. 固定出力形式（`# Condensed Context` 見出し、8セクション）で内容を生成する。
3. `99_System/Handoff/CURRENT_CONTEXT.md` に書き出す（既存ファイルは上書き）。
4. 保存完了をユーザーに通知する。

## Output Format

`Condense.md` の Output Format と同一。

```md
# Condensed Context

## 目的

## 現在状態

## 決定事項

## 有効な制約

## 未解決事項

## 次アクション

## 参照

## 持ち越さない情報
```

## Related Commands

- `condense` — 同じ形式でファイル保存せずに出力のみ行う
- `clear-handoff` — `CURRENT_CONTEXT.md` を削除して次回確認対象から外す
- `crystallize` — 長期保存が必要な内容を Memory に書き出す

## Rules

- `CURRENT_CONTEXT.md` は一時バッファ。Memory や Permanent note を兼ねない。
- 次回 `run / load` で読み込まれるかはユーザーが判断する。自動読み込みしない。
- セクション順・見出し名は `condense` と統一し、LLM 横断で同一形式を保つ。
