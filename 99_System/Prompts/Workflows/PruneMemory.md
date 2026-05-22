# Workflow: PruneMemory

## Objective

`99_System/Memory/` と `99_System/Memory/INDEX.md` を整理し、起動時コンテキストを軽量かつ正確に保つ。

## Scope

- 対象: `99_System/Memory/`, `99_System/Memory/INDEX.md`, `99_System/Memory/Archive/`
- 原則として `INDEX.md` を更新対象にする。
- Memory 本体は履歴として保持し、削除や Archive 移動はユーザー確認後にのみ行う。

## Procedure

1. `99_System/Memory/INDEX.md` を読む。
2. `99_System/Memory/` 直下の Memory 一覧を取得する。
3. 必要な Memory を UTF-8 で読み、`INDEX.md` と照合する。
4. 問題を分類する。
5. `INDEX.md` の更新案を作る。
6. 削除、Archive 移動、Permanent note 変更が必要な場合は、実行前にユーザー確認を取る。
7. 実行結果を報告する。

## Classification

- `obsolete`: 現在は無効、または新しい Memory に置き換え済み。
- `duplicate`: 内容が別 Memory と重複している。
- `completed`: `Open Tasks` に残っているが完了済み。
- `conflict`: Memory 間、または Memory と `SYSTEM_MANIFEST.md` の間で矛盾している。
- `missing-from-index`: 有効な Memory だが `INDEX.md` に載っていない。
- `broken-reference`: `INDEX.md` や Memory 内の参照先が存在しない。
- `needs-clarification`: 自動判断できず、ユーザー判断が必要。

## Output Format

```md
# Prune Memory Report

## 検出結果

## 推奨アクション

## 実行した変更

## 保留事項
```

## Safety Rules

- `99_System/Memory/Archive/` への移動は確認制。
- Memory の完全削除は確認制。通常は Archive 移動を優先する。
- Permanent note の変更は確認制。
- 古い Memory に含まれる履歴的事実は、現在無効でも勝手に改変しない。
