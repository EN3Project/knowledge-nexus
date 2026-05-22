# Command Protocol

Knowledge Nexus のコマンド仕様。`SYSTEM_MANIFEST.md` は起動時の最小規約に留め、詳細な運用はこのファイルを参照する。

## run / load

`99_System/Memory/INDEX.md` が存在する場合は最初に読み込み、現在有効な決定事項、ユーザーの好み、未完了タスク、必要時参照すべき Memory を復元する。

`INDEX.md` が存在しない場合のみ、`99_System/Memory/` 内の最新セッションサマリーをフォールバックとして読み込む。

人格設定は `99_System/Prompts/Personas/` 内の設定ファイルから復元する（`SYSTEM_MANIFEST.md` §4 を参照）。

`99_System/Handoff/CURRENT_CONTEXT.md` が存在する場合は自動で読み込まず、短期作業文脈の扱いをユーザーに確認する。

### 短期文脈確認

選択肢:

- `読み込む`: `CURRENT_CONTEXT.md` を現在セッションの前提に含める。
- `読み込まずに残す`: `CURRENT_CONTEXT.md` を変更せず、現在セッションの前提には含めない。
- `内容を確認してから決める`: `CURRENT_CONTEXT.md` の内容を表示し、その後あらためて `読み込む`, `読み込まずに残す`, `削除する` の判断を求める。
- `削除する`: `clear-handoff` と同じく `CURRENT_CONTEXT.md` のみを削除する。`99_System/Memory/` や Permanent note は変更しない。

## crystallize / 結晶化

現在の会話・作業内容から、次回以降に再利用すべき知識、決定事項、ユーザー嗜好、未完了タスク、システム変更、作成・更新したノートを抽出し、`99_System/Memory/` または適切な Permanent note に保存する。

詳細手順は `99_System/Prompts/Workflows/Crystallize.md` を参照する。

## condense / 圧縮

現在の長い会話を、このまま次の応答や別LLMへ引き継げる短い「会話コンテキスト要約」に圧縮する。

原則としてファイル保存は行わず、長期保存が必要な内容は `crystallize` に回す。

詳細手順は `99_System/Prompts/Workflows/Condense.md` を参照する。

### 固定出力形式

`# Condensed Context` を見出しとし、以下の順序で出力する。

1. `目的`
2. `現在状態`
3. `決定事項`
4. `有効な制約`
5. `未解決事項`
6. `次アクション`
7. `参照`
8. `持ち越さない情報`

後続のエージェントが即座に作業を再開できる粒度に絞り、検討過程、冗談、却下済み候補、検索結果全文などは `持ち越さない情報` に要約して明示的に除外する。

## handoff / 引き継ぎ

`condense` と同じ固定出力形式で短期作業文脈を生成し、`99_System/Handoff/CURRENT_CONTEXT.md` に保存する。

このファイルは次回 `run / load` 時に扱いを確認される一時バッファであり、長期保存用の Memory ではない。

既存の `CURRENT_CONTEXT.md` は上書きしてよい。

詳細手順は `99_System/Prompts/Workflows/Handoff.md` を参照する。

## clear-handoff / 引き継ぎ破棄

`99_System/Handoff/CURRENT_CONTEXT.md` を削除し、次回 `run / load` で短期作業文脈が読み込まれない状態に戻す。

長期記憶である `99_System/Memory/` や Permanent note は変更してはならない。

## prune-memory / 記憶整理

`99_System/Memory/` と `99_System/Memory/INDEX.md` を点検し、現在有効な記憶と古い記憶を整理する。

重複、矛盾、完了済みタスク、古いユーザー嗜好、`INDEX.md` 未掲載の Memory、参照切れを検出し、修正案を提示する。

詳細手順は `99_System/Prompts/Workflows/PruneMemory.md` を参照する。

### 分類

- `obsolete`
- `duplicate`
- `completed`
- `conflict`
- `missing-from-index`
- `broken-reference`
- `needs-clarification`

### 安全ルール

- 原則として `99_System/Memory/INDEX.md` を最新状態に再構成する。
- 詳細 Memory 本体は履歴として保持する。
- Memory の削除、`99_System/Memory/Archive/` への移動、Permanent note の変更は、必ずユーザー確認後に実行する。
- 実行時は `検出結果`, `推奨アクション`, `実行した変更`, `保留事項` を Obsidian 互換 Markdown で報告する。

## review-system / システム点検

Knowledge Nexus の中核ファイル群の整合性を点検する。

対象は `SYSTEM_MANIFEST.md`, `99_System/Prompts/Protocols/CommandProtocol.md`, `99_System/Prompts/Workflows/`, `99_System/Memory/INDEX.md`。

Manifest の肥大化、コマンド一覧の不一致、Workflow 不足、参照切れ、古いドキュメントを検出する。

詳細手順は `99_System/Prompts/Workflows/ReviewSystem.md` を参照する。

削除、Archive 移動、Permanent note 変更は必ずユーザー確認後に実行する。

## promote-memory / 記憶昇格

`99_System/Memory/` に蓄積されたセッション記憶から、Permanent note に昇格すべき長期知識を抽出・提案する。

単なる履歴、ユーザー嗜好、システムルール、一般化可能な知見を分離し、昇格・統合・保留を分類する。

詳細手順は `99_System/Prompts/Workflows/PromoteMemory.md` を参照する。

Permanent note の作成・更新は必ずユーザー確認後に実行する。

## task-audit / 宿題棚卸し

`99_System/Memory/INDEX.md` の Open Tasks と各 Memory の未完了タスクを棚卸しし、実行可能な宿題リストを保つ。

完了済み、重複、外部条件待ち、古いタスク、具体性不足のタスクを分類し、`INDEX.md` の更新案を提示する。

詳細手順は `99_System/Prompts/Workflows/TaskAudit.md` を参照する。

判断が必要な破棄や優先度変更は必ずユーザー確認後に実行する。

## mark-reviewed / 既読

`index/99_System/Reports/` 内で `status: pending-review` のレポートを既読にする。

1. `index/99_System/Reports/` の `*-weekly-maintenance.md` を検索する。
2. `status: pending-review` のファイルを列挙し、対象をユーザーに提示する。
3. 確認後、該当ファイルの frontmatter を `status: reviewed` に書き換える。

## synthesize / 合成

Vault に蓄積されたノート群を横断的に合成し、パターン・矛盾・知識ギャップを抽出して圧縮ダイジェストを生成する。

### 引数（省略可）

- 期間: `synthesize 7d`（直近7日）、`synthesize 30d`（直近30日）、引数なしでデフォルト7日
- 対象: `synthesize resources`（03_Resources のみ）、`synthesize all`（全フォルダ）
- モード: `synthesize devil`（悪魔の代弁者モード ON。Permanent Notes の主要主張に意図的に反論し前提崩しを行う。デフォルト OFF）

### 出力

- 保存先: `index/99_System/Reports/YYYY-MM-DD-synthesis-digest.md`
- 形式: `99_System/Templates/SynthesisDigest_Template.md` に従う

詳細手順は `99_System/Prompts/Workflows/SynthesisDigest.md` を参照する。

## weekly-maintenance / 週次メンテナンス

Vault の週次整理をまとめて実行する。個別コマンドを手動で回すかわりに、これ一つで一括処理できる。

### 実行内容（順番に実行）

1. **task-audit** — Open Tasks の棚卸し
2. **review-system** — システムファイルの整合性点検
3. **prune-memory** — Memory の重複・陳腐化を整理
4. **synthesize** — Vault 横断合成（デフォルト: 直近7日）
5. **rebuild-index** — VaultIndex.md を再生成

各ステップで検出した変更案はまとめてユーザーに提示し、確認後に実行する。

### 出力

- 保存先: `index/99_System/Reports/YYYY-MM-DD-weekly-maintenance.md`
- frontmatter: `type: weekly-maintenance`, `status: pending-review`

### 発動タイミング

- 手動: ユーザーが `weekly-maintenance` を実行したとき
- 自動提案: `run / load` 時に最新レポートが7日以上前 or 存在しない場合

## rebuild-index / インデックス再生成

`index/` 配下の全 Markdown ファイルをスキャンして `99_System/VaultIndex.md` を再生成する。

```bash
node 99_System/Scripts/rebuild_vault_index.js
```

### 発動タイミング

- 手動: ユーザーが `rebuild-index` を実行したとき
- 自動: `weekly-maintenance` の最終ステップ

### 注意

- VaultIndex.md は自動生成ファイルのため手動編集しないこと
- `index/99_System/Reports/` 配下は索引対象外

## process-clippings / クリッピング処理

`index/Clippings/` 内の未処理ファイルを一件ずつ読み、知識を抽出して適切なノートに保存したあと、原本を `index/00_Inbox/Archive/` に移動する。

抽出先の振り分け基準:

- 再利用できる知識・技術解説 → `index/03_Resources/`
- プロジェクト案・構想 → `index/01_Projects/`
- 普遍的な知見・原則 → `index/03_Resources/Permanent/`
- 内容が薄い・重複 → 抽出ノートなしでアーカイブのみ（ユーザー確認後）

詳細手順は `99_System/Prompts/Workflows/ProcessClippings.md` を参照する。

## Memory Hygiene

重要な決定、ユーザー嗜好、未完了タスク、システム構成変更が発生した場合は、応答終了前に Memory 更新の要否を判定する。

Memory を追加・更新した場合は、`99_System/Memory/INDEX.md` も更新し、`run / load` 時に大量の Memory を読まずに済む状態を保つ。

## 終了時の推奨メンテナンス

作業終了時、必要に応じて次のコマンド候補を理由付きで短く提案する。

- 重要な決定・システム変更が出た場合: `crystallize`
- 次回も同じ作業を続ける場合: `handoff`
- 会話が長くなり別LLMへ渡す必要がある場合: `condense`
- 短期文脈が古い、または別作業に移る場合: `clear-handoff`
- Memory に矛盾・重複・古い情報が増えた場合: `prune-memory`
- システムファイルを更新した場合: `review-system`
- Clippings に未処理ファイルが溜まっている場合: `process-clippings`

毎回すべてを提案してはならない。必要なものだけを、理由とともに最小限で提示する。
