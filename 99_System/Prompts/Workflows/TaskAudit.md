# Workflow: TaskAudit

## Objective

`99_System/Memory/INDEX.md` の Open Tasks と各 Memory の未完了タスクを棚卸しし、実行可能な宿題リストを保つ。

## Scope

- `99_System/Memory/INDEX.md`
- `99_System/Memory/`
- 必要に応じて `99_System/Tests/`

## Procedure

1. `99_System/Memory/INDEX.md` の Open Tasks を読む。
2. `99_System/Memory/` 内の未完了タスクを収集する。
3. 重複、完了済み、古いタスク、具体性不足のタスクを分類する。
4. `INDEX.md` の Open Tasks 更新案を作る。
5. タスク破棄や優先度変更に判断が必要な場合はユーザー確認を取る。
6. 実行結果を報告する。

## Classification

- `active`: まだ有効で実行可能。
- `completed`: 完了済み。
- `duplicate`: 他のタスクと重複。
- `blocked`: 外部条件待ち。
- `stale`: 古くなっており、今も必要か不明。
- `too-vague`: 実行可能な粒度ではない。
- `needs-clarification`: 自動判断できず、ユーザー判断が必要。

## Output Format

```md
# Task Audit Report

## 検出結果

## 推奨アクション

## 実行した変更

## 保留事項
```

## Safety Rules

- Open Tasks から削除する場合は、完了済みまたは明確な重複に限る。
- 判断が必要な破棄や優先度変更はユーザー確認後に行う。
- 重要な未完了タスクは `INDEX.md` に集約し、古い Memory の未完了タスク全文を毎回読まなくて済む状態にする。
