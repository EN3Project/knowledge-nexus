# Workflow: Crystallize

## Objective

現在の会話・作業内容から、次回以降に再利用すべき知識・決定事項・ユーザー嗜好・未完了タスク・システム変更を抽出し、Vault の長期記憶として保存する。

Claude の `/compact`（AI 内部の会話圧縮）とは異なり、Vault への外部記憶化を目的とする。

## Scope

- 保存先: `99_System/Memory/YYYY-MM-DD-<Slug>-Memory.md`
- 必要に応じて `index/03_Resources/Permanent/` への Permanent note 作成も提案する。
- `99_System/Memory/INDEX.md` を必ず更新する。
- **自己コンテキスト（オプション）:** ユーザー自身の背景・スキル・志向・価値観・目標・制約に変化や新たな発見があれば、`index/02_Areas/自己紹介.md` への更新も提案する。
- **観測プロファイル（オプション）:** セッションでユーザーの行動パターン・思考の癖・判断軸・二面性に新たな観測があれば、`index/02_Areas/meta_me.md` の該当箇所を更新し、観測ログ履歴テーブルに1行追記する。

**混在防止の基準:**
- Memory 行き → 「Nexus にこう動いてほしい」という運用上の嗜好・設計変更
- 自己紹介.md 行き → 「自分はこういう人間だ」という人格・スキル・経験・目標（Stock Portrait）
- meta_me.md 行き → 「Nexus が観測した」行動パターン・思考傾向・未解明項目（Observer Profile）

## Dispatch Protocol

- **Step 1（走査）**: Nexus がインコンテキストで実行する。会話の解釈は Nexus の仕事。
- **Step 2（照合）**: @librarian に dispatch する。VaultIndex.md と INDEX.md を読み、重複・矛盾を検出させる。
- **Step 3（提示）**: Nexus がユーザーに提示・確認する。
- **Step 4（保存）**: @scribe に dispatch する。Memory ファイルの作成と INDEX.md 更新を委任する。

## Procedure

1. 会話全体を走査し、以下を抽出する。（Nexus インコンテキスト）
   - 今後の意思決定に影響する決定事項
   - ユーザーの嗜好・制約
   - 未完了タスク（Active / Conditional / External）
   - システム構成の変更
   - 一般化できる知見（Permanent note 候補）
   - ユーザー自身の変化（スキル・経験・志向・目標）→ `index/02_Areas/自己紹介.md` 更新候補
   - 行動パターン・思考の癖・判断軸・二面性の新発見または更新 → `index/02_Areas/meta_me.md` 更新候補
2. @librarian に dispatch し、既存 Memory と重複・矛盾がないか照合する。
   ```
   タスク: 以下の保存候補が既存 Memory と重複・矛盾しないか INDEX.md と VaultIndex.md を照合する
   保存候補: [抽出内容のサマリー]
   出力: 重複・矛盾があれば該当 Memory パスと内容を報告。なければ「問題なし」
   ```
3. 保存内容と保存先の案をユーザーに提示し、確認を取る。（Nexus）
4. 承認後、@scribe に dispatch して Memory ファイルを作成・INDEX.md を更新する。
   ```
   タスク: 以下の内容を Memory ファイルとして保存し、INDEX.md に追記する
   保存パス: 99_System/Memory/YYYY-MM-DD-<Slug>-Memory.md
   保存内容: [承認済みの Memory 本文]
   INDEX.md 追記: [Reference Memory の1行エントリ]
   出力: 保存完了パスを報告する
   ```
5. Permanent note が必要な場合は別途提案する。（`promote-memory` フローに委ねてもよい）

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
