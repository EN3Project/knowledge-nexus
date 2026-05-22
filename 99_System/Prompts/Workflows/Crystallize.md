# Workflow: Crystallize

## Objective

現在の会話・作業内容から、次回以降に再利用すべき知識・決定事項・ユーザー嗜好・未完了タスク・システム変更を抽出し、Vault の長期記憶として保存する。

Claude の `/compact`（AI 内部の会話圧縮）とは異なり、Vault への外部記憶化を目的とする。

## Scope

- 保存先: `99_System/Memory/YYYY-MM-DD-<Slug>-Memory.md`
- 必要に応じて `index/03_Resources/Permanent/` への Permanent note 作成も提案する。
- `99_System/Memory/INDEX.md` を必ず更新する。

## Procedure

1. 会話全体を走査し、以下を抽出する。
   - 今後の意思決定に影響する決定事項
   - ユーザーの嗜好・制約
   - 未完了タスク（Active / Conditional / External）
   - システム構成の変更
   - 一般化できる知見（Permanent note 候補）
2. 既存 Memory と重複・矛盾がないか `INDEX.md` を照合する。
3. 保存内容と保存先の案をユーザーに提示し、確認を取る。
4. 承認後、Memory ファイルを作成し、`INDEX.md` を更新する。
5. Permanent note が必要な場合は別途提案する（`promote-memory` フローに委ねてもよい）。

## Memory File Format

```md
---
date: YYYY-MM-DD
type: session-memory
status: active
---

# YYYY-MM-DD <タイトル>

## <セクション>

（自由形式。決定事項・変更・学習・Open Tasks などを見出しで整理する）
```

## Rules

- Memory の削除・上書きは行わない。新規ファイルを追加する。
- Permanent note の作成・変更はユーザー確認後にのみ実行する。
- `INDEX.md` への追記は保存と同時に行う。後回しにしない。
- 記録すべきでない一過性の情報（検索結果全文、却下案等）は除外する。
