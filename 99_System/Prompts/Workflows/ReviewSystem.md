# Workflow: ReviewSystem

## Objective

Knowledge Nexus の中核ファイル群の整合性を点検し、長期運用で破綻しない状態を保つ。

## Scope

- `SYSTEM_MANIFEST.md`
- `99_System/README.md`
- `99_System/Prompts/Protocols/CommandProtocol.md`
- `99_System/Prompts/Workflows/`
- `99_System/Memory/INDEX.md`
- `99_System/Handoff/README.md`
- `99_System/Tests/`

## Procedure

1. 中核ファイルを UTF-8 で読む。
2. コマンド一覧、Workflow 一覧、Memory Index、README の運用説明を照合する。
3. 矛盾、重複、参照切れ、肥大化、未文書化ルールを検出する。
4. 修正案を提示する。
5. 破壊的変更、Archive 移動、Permanent note 変更が必要な場合はユーザー確認を取る。
6. 実行結果を報告する。

## Classification

- `command-mismatch`: Manifest, CommandProtocol, README, INDEX のコマンド一覧が一致しない。
- `workflow-missing`: コマンドに対応する Workflow が必要だが存在しない。
- `broken-reference`: 参照先が存在しない。
- `manifest-bloat`: Manifest に詳細仕様が戻りすぎている。
- `stale-documentation`: README や INDEX が現行仕様とずれている。
- `test-gap`: 受け入れ試験や運用テストが不足している。
- `needs-clarification`: 自動判断できず、ユーザー判断が必要。

## Output Format

```md
# System Review Report

## 検出結果

## 推奨アクション

## 実行した変更

## 保留事項
```

## Safety Rules

- `SYSTEM_MANIFEST.md` は中核規約に留め、詳細仕様は可能な限り Protocol / Workflow / README に分離する。
- 削除、Archive 移動、Permanent note 変更は確認制。
- 仕様の正本が複数に分裂している場合は、正本を明示して他方は参照に寄せる。
