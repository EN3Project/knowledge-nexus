# Workflow: PruneMemory

## Objective

`99_System/Memory/` と `99_System/Memory/INDEX.md` を整理し、起動時コンテキストを軽量かつ正確に保つ。

## Scope

- 対象: `99_System/Memory/`, `99_System/Memory/INDEX.md`, `99_System/Memory/Archive/`
- 原則として `INDEX.md` を更新対象にする。
- Memory 本体は履歴として保持し、削除や Archive 移動はユーザー確認後にのみ行う。

## Dispatch Protocol

- **Step 1-4（スキャン・分類）**: @curator に dispatch する。Memory の読み込み・照合・問題分類を委任する。
- **Step 5（更新案）**: Nexus が @curator の報告をもとに INDEX.md 更新案を整理・提示する。
- **Step 6（確認）**: Nexus がユーザー確認を取る。
- **Step 7（実行）**: @scribe に dispatch して承認済みの変更を実行する。

## Procedure

1-4. @curator に dispatch してスキャン・照合・分類を実行する。
   ```
   タスク: 99_System/Memory/ の全 Memory ファイルを点検し、問題を分類して報告する
   照合対象: INDEX.md + Memory/ 直下の全ファイル
   出力: Classification に従った問題リスト（ファイルパスと理由を明示）
   ```
5. Nexus が @curator の報告をもとに `INDEX.md` 更新案を整理してユーザーに提示する。
6. 削除、Archive 移動、Permanent note 変更が必要な場合は、実行前にユーザー確認を取る。
7. 承認後、@scribe に dispatch して変更を実行する。
   ```
   タスク: 以下の承認済み変更を実行する
   変更内容: [確認済みの変更リスト]
   出力: 実行した変更と保留事項を報告する
   ```

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
