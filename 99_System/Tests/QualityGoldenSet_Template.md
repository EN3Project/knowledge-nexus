---
type: test-template
status: template
version: "1.0"
---

# Quality Golden Set — テンプレート

Knowledge Nexus の**検索品質・合成品質・ワークフロー応答品質**を継続的に測定するための評価セット。

> 「『体感で精度が上がった』を『効果』と詐称しない」  
> — 評価基盤先行の設計原則より

このファイルはテンプレートです。A カテゴリの5問はどの Nexus でもそのまま使えます。  
B / C / D カテゴリはあなたの Vault に合わせて記入してください。

---

## 1. 評価軸

各クエリは下記 3 軸で採点する。

| 軸 | 内容 | 採点 |
|---|---|---|
| **faithfulness** | 回答が Vault 内のソースに忠実か（捏造・歪曲がないか） | 0 / 1 / 2（捏造あり / 一部不正確 / 完全に忠実） |
| **context precision** | 引いてくる関連ノートが過不足ないか（雑音・抜けがないか） | 0 / 1 / 2 |
| **answer relevance** | 質問に対して直接的に答えているか（脱線・冗長がないか） | 0 / 1 / 2 |

満点 6 / 問。合格ライン 80%（例: 30問なら 144/180）を推奨基準とする。

---

## 2. カテゴリ構成

| カテゴリ | 対象 | サンプル数 |
|---|---|---|
| A. システム運用 | run/load・condense・crystallize 等のコマンド動作 | 5問（プリセット済み） |
| B. プロジェクト状態 | あなたの Open Tasks・進行中プロジェクト | 3問（記入欄） |
| C. ユーザープロファイル | 仕事スタイル・ビジネス方針・志向 | 3問（記入欄） |
| D. 知識領域 | あなたの Vault に蓄積された知識の参照 | 3問（記入欄） |
| E. メタ運用 | Memory 構造・ワークフロー・Vault 設計 | 1問（プリセット済み） |

---

## 3. ゴールデンセット

### A. システム運用（プリセット — どの Nexus でも使える）

#### A-01

- **Q:** `run / load` 起動時に確認すべき5つのチェック項目は？
- **Expected:** `INDEX.md` 読み込み / `CURRENT_CONTEXT.md` 存在確認（Handoff）/ 週次レポートの日付と未読確認 / `index/Clippings/` 未処理件数 / Vault MCP サーバー（`:3100`）起動確認
- **Expected Source:** `99_System/Prompts/Protocols/CommandProtocol.md`（run / load 起動シーケンス）
- **採点:** -- / -- / --

#### A-02

- **Q:** `condense` の固定出力形式の見出しと11セクションの順序は？
- **Expected:** `# Condensed Context` 見出し / ①目的 ②現在状態 ③決定事項 ④有効な制約 ⑤未解決事項 ⑥次アクション ⑦参照 ⑧audit_trail ⑨decision_rationale ⑩open_questions ⑪持ち越さない情報
- **Expected Source:** `99_System/Prompts/Protocols/CommandProtocol.md`（condense セクション）
- **採点:** -- / -- / --

#### A-03

- **Q:** `handoff` と `condense` の目的・出力先の違いは？
- **Expected:** `condense` = 会話の表示用要約（ファイル保存なし、別 LLM への引き継ぎ用）/ `handoff` = `condense` と同じ固定形式で `99_System/Handoff/CURRENT_CONTEXT.md` に保存する一時バッファ。次回 `run / load` 時に扱いを確認される。
- **Expected Source:** `99_System/Prompts/Protocols/CommandProtocol.md`（handoff / condense セクション）
- **採点:** -- / -- / --

#### A-04

- **Q:** `prune-memory` が検出する7つの分類カテゴリをすべて列挙せよ。
- **Expected:** `obsolete` / `duplicate` / `completed` / `conflict` / `missing-from-index` / `broken-reference` / `needs-clarification`
- **Expected Source:** `99_System/Prompts/Protocols/CommandProtocol.md`（prune-memory セクション）
- **採点:** -- / -- / --

#### A-05

- **Q:** `run / load` 時に weekly-maintenance の実行を提案するトリガー条件は？
- **Expected:** 最新の `*-weekly-maintenance.md` が**7日以上前**、または `index/99_System/Reports/` に**存在しない**場合。（`status: pending-review` レポートの通知は別動作）
- **Expected Source:** `99_System/Prompts/Protocols/CommandProtocol.md`（run / load 起動シーケンス Step 3）
- **採点:** -- / -- / --

---

### B. プロジェクト状態（あなたの Vault に合わせて記入）

#### B-01

- **Q:** <!-- あなたの現在の最重要プロジェクト名と状態は？ -->
- **Expected:** <!-- 記入 -->
- **Expected Source:** <!-- 例: `99_System/Memory/INDEX.md`（Open Tasks セクション） -->
- **採点:** -- / -- / --

#### B-02

- **Q:** <!-- 現在進行中の外部公開物（ブログ・OSS・ドキュメント等）のタイトルと公開状況は？ -->
- **Expected:** <!-- 記入 -->
- **Expected Source:** <!-- 記入 -->
- **採点:** -- / -- / --

#### B-03

- **Q:** <!-- 直近で完了した意思決定・設計変更とその根拠は？ -->
- **Expected:** <!-- 記入 -->
- **Expected Source:** <!-- 記入 -->
- **採点:** -- / -- / --

---

### C. ユーザープロファイル（あなたの Vault に合わせて記入）

#### C-01

- **Q:** <!-- あなたの仕事スタイルや業務方針（例：どんな作業を委譲し、自分は何に集中するか）は？ -->
- **Expected:** <!-- 記入 -->
- **Expected Source:** <!-- 例: `index/02_Areas/自己紹介.md` -->
- **採点:** -- / -- / --

#### C-02

- **Q:** <!-- あなたが Nexus を導入した動機・解決したかった課題は？ -->
- **Expected:** <!-- 記入 -->
- **Expected Source:** <!-- 記入 -->
- **採点:** -- / -- / --

#### C-03

- **Q:** <!-- Vault に保存する調査ノートに必須とされているセクションと、その理由は？ -->
- **Expected:** <!-- 記入 -->
- **Expected Source:** <!-- 記入 -->
- **採点:** -- / -- / --

---

### D. 知識領域（あなたの Vault に合わせて記入）

> Vault の `index/03_Resources/` に蓄積された知識ノートから問題を作成してください。

#### D-01

- **Q:** <!-- 記入 -->
- **Expected:** <!-- 記入 -->
- **Expected Source:** <!-- 記入 -->
- **採点:** -- / -- / --

#### D-02

- **Q:** <!-- 記入 -->
- **Expected:** <!-- 記入 -->
- **Expected Source:** <!-- 記入 -->
- **採点:** -- / -- / --

#### D-03

- **Q:** <!-- 記入 -->
- **Expected:** <!-- 記入 -->
- **Expected Source:** <!-- 記入 -->
- **採点:** -- / -- / --

---

### E. メタ運用（プリセット）

#### E-01

- **Q:** `WORKFLOW_SCRATCH` の役割と、ワークフロー完了後の移動先は？
- **Expected:** ワークフロー開始時に Nexus が `99_System/Handoff/WORKFLOW_SCRATCH.md` を作成。各エージェントは前フェーズ出力をここから読み自フェーズ出力を追記する。@scribe 完了後に `99_System/Handoff/Archive/` へ移動する。
- **Expected Source:** `99_System/Prompts/Workflows/StandardResearch.md`（WORKFLOW_SCRATCH セクション）
- **採点:** -- / -- / --

---

## 4. 運用ルール

### 評価の実行

1. `@librarian` → `@analyst` のチェーンに各クエリを投入する
2. 回答を3軸で採点し、結果を `99_System/Tests/QualityGoldenSet_Results_YYYY-MM-DD.md` に記録する
3. 採点結果はこのファイルには書かない（定義と結果を分離する）

### 失敗閾値

| 条件 | 対応 |
|---|---|
| 同じ問の faithfulness が**2回連続 1 以下** | 該当領域の Memory / Resource 更新を検討 |
| カテゴリ平均が **75% を割る** | そのカテゴリのワークフロー改善を検討 |

### 問題の追加手順

1. 質問は**単独で完結**する（誰が見ても同じ意味になる）こと
2. Expected は **VaultIndex で到達可能なノートを1個以上**指定すること
3. このファイルのフォーマットを踏襲すること

---

## 5. 成長ロードマップ

| フェーズ | 目標 | 規模 |
|---|---|---|
| v0.1（このテンプレート） | システム共通問題5問 + Vault 固有プレースホルダー | 6〜14問 |
| v0.5 | 各カテゴリ6問の標準セット・baseline 計測 | 30問 |
| v1.0 | RAGAS / DeepEval 統合・自動評価対応 | 33〜50問 |
| v2.0 | LLM 横断評価（Claude / Gemini / Codex で同一セットを走査） | 50問 |

---

## 参考

- [RAGAS](https://docs.ragas.io/) — 評価フレームワーク
- [DeepEval](https://docs.confident-ai.com/) — 評価フレームワーク
- `99_System/Tests/Agent_Compatibility_Checklist.md` — LLM 横断互換性試験（別軸のテスト事例）
