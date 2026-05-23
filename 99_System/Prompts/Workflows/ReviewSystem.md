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
- `index/02_Areas/自己紹介.md`（自己コンテキストの陳腐化・Memory との境界乖離を検出）
- `index/02_Areas/meta_me.md`（観測プロファイルの陳腐化・未解明項目の放置・観測ログの停滞を検出）
- `index/02_Areas/job_status.md`（面談フェーズ終了後の放置・過去日付の面談予定を検出）

## Dispatch Protocol

- **Step 1-3（スキャン・検出）**: @curator に dispatch する。ファイル読み込み・照合・問題検出を委任する。
- **Step 4（提示）**: Nexus がユーザーに修正案を提示する。
- **Step 5（確認）**: Nexus がユーザー確認を取る。
- **Step 6（実行）**: @scribe に dispatch して承認済みの変更を実行する。

## Procedure

1-3. @curator に dispatch してスキャン・照合・問題検出を実行する。
   ```
   タスク: Knowledge Nexus の中核ファイル群を点検し、問題を分類して報告する
   対象スコープ: [Scope セクションのファイル一覧]
   出力: 検出された問題を Classification に従って分類したリスト
   ```
4. Nexus が @curator の報告をもとに修正案を整理してユーザーに提示する。
5. 破壊的変更、Archive 移動、Permanent note 変更が必要な場合はユーザー確認を取る。
6. 承認後、@scribe に dispatch して変更を実行する。
   ```
   タスク: 以下の承認済み変更を実行する
   変更内容: [確認済みの修正リスト]
   出力: 実行した変更と保留事項を報告する
   ```

## Classification

- `command-mismatch`: Manifest, CommandProtocol, README, INDEX のコマンド一覧が一致しない。
- `workflow-missing`: コマンドに対応する Workflow が必要だが存在しない。
- `broken-reference`: 参照先が存在しない。
- `manifest-bloat`: Manifest に詳細仕様が戻りすぎている。
- `stale-documentation`: README や INDEX が現行仕様とずれている。
- `test-gap`: 受け入れ試験や運用テストが不足している。
- `needs-clarification`: 自動判断できず、ユーザー判断が必要。
- `self-context-stale`: 自己紹介.md の内容が Memory や実態と乖離している。
- `meta-me-stale`: 以下のいずれかに該当する場合に検出する。
  - 観測ログ履歴の最終更新が 30 日以上前
  - 「未解明・要継続観測」の項目が 60 日以上放置（観測ログに進展なし）
  - 観測ログ履歴が 20 行を超えている（古いエントリを折り畳み候補として提示）
- `job-status-stale`: 以下のいずれかに該当する場合に検出する。
  - 面談活動フェーズが完了しているのに job_status.md が更新されていない
  - ターゲット企業の面談日が過去日付のまま残っている

## 02_Areas 刈り込みアクション（ユーザー確認後に実行）

`meta-me-stale` 検出時：
- 解決済みの「未解明・要継続観測」項目 → 本文から削除し、観測ログに解決日を記録
- 観測ログが 20 行超 → 古いエントリを `## 過去の観測（アーカイブ）` セクションに折り畳む
- 陳腐化したセクション → 内容を更新するか削除する

`job-status-stale` 検出時：
- 過去日付の面談予定 → 結果を記録するか行を削除する
- フェーズ完了後 → frontmatter の tags を `[career, archived]` に変更し、ファイルは残す

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
