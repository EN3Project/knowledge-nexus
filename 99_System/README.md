# 🧠 Knowledge Nexus: Multi-Agent System for Obsidian

## 1. 概要
本システムは、Obsidianを「AIエージェントチームの拠点」に変貌させるためのフレームワークです。
複数の専門エージェント（司書、調査員、分析官など）が連携し、あなたの知識管理と知的生産を自律的にサポートします。

## 2. ディレクトリ構造
パッケージ化の際は、以下の構造を維持してください。

- `99_System/`
  - `Prompts/`
    - `Personas/`: Knowledge Nexus の人格設定
    - `Protocols/`: コマンド仕様などの運用プロトコル
    - `Roles/`: エージェントの人格・基本指示（Librarian, Analyst等）
    - `Skills/`: 具体的な技能モジュール（Summarize, FactCheck等）
    - `Formats/`: 出力形式の定義（ObsidianNote等）
    - `Workflows/`: 複数のエージェントを連携させるレシピ（StandardResearch等）
  - `Templates/`: MCP（コンテキスト管理）用の引き継ぎテンプレート
  - `Memory/`: セッション要約、決定事項、ユーザー嗜好、未完了タスクの正本
    - `INDEX.md`: `run / load` 時に最初に読む軽量な記憶索引
    - `Archive/`: 現在は不要だが履歴として残す Memory の退避先
  - `Handoff/`: 次回作業へ渡す短期作業文脈
  - `Tests/`: LLM横断の受け入れ試験仕様と実行ログ
  - `README.md`: 本ドキュメント（システム仕様書）

## 3. 基本原則（ポータビリティ維持のために）
将来的なパッケージ配布を容易にするため、以下のルールを遵守します。

1. **相対パスの徹底:** プロンプト内やスクリプト内でのパス指定は、常にVaultのルートからの相対パス（例: `99_System/Prompts/...`）を使用する。
2. **モジュール化の維持:** 役割、技能、形式を分離し、パズルのように組み合わせて呼び出せる状態を保つ。
3. **環境変数の分離:** APIキーやOS固有の設定は、プロンプト本体には記述せず、`.env`や外部設定ファイル（Gemini CLIの設定等）で管理する。
4. **メタデータの付与:** 各プロンプトファイルには、その目的とバージョンをフロントマターに記載する。
5. **Memory Hygiene:** 重要な決定・構造変更・試験結果・次回への宿題が発生した場合、作業終了前に `99_System/Memory/` へ残すべき内容を確認する。更新しない場合も、なぜ不要かを短く判断する。
6. **Manifestの軽量維持:** `SYSTEM_MANIFEST.md` には中核規約だけを置く。コマンド詳細は `99_System/Prompts/Protocols/CommandProtocol.md`、詳細手順は `99_System/Prompts/Workflows/` に分離する。

## 4. 日常運用サイクル

Knowledge Nexus は、次の周期で運用する。

| タイミング | 使うコマンド | 目的 |
| --- | --- | --- |
| セッション開始時 | `run` / `load` | Persona、`Memory/INDEX.md`、必要な短期文脈を復元する |
| 会話が長くなった時 | `condense` / `圧縮` | 別LLMや次応答へ貼れる短い文脈要約を出す |
| 次回も同じ作業を続ける時 | `handoff` / `引き継ぎ` | `Handoff/CURRENT_CONTEXT.md` に短期作業文脈を保存する |
| 短期文脈が不要な時 | `clear-handoff` / `引き継ぎ破棄` | `Handoff/CURRENT_CONTEXT.md` だけを削除する |
| 重要な決定や嗜好が生じた時 | `crystallize` / `結晶化` | 長期的に再利用すべき情報を Memory または Permanent note に保存する |
| 蓄積知識を横断合成したい時 / 週次自動 | `synthesize` / `合成` | 蓄積ノートを横断してパターン・矛盾・知識ギャップを抽出し圧縮ダイジェストを生成する |
| 数セッションごと、または Memory が増えた時 | `prune-memory` / `記憶整理` | `Memory/INDEX.md` を整理し、古い記憶や矛盾を点検する |
| システム構造を変更した後 | `review-system` / `システム点検` | Manifest、README、Protocol、Workflow、INDEX の整合性を点検する |
| Memory に一般化できる知見が増えた時 | `promote-memory` / `記憶昇格` | Memory から Permanent note 化すべき知識を提案する |
| 未完了タスクが増えた時 | `task-audit` / `宿題棚卸し` | Open Tasks を完了・重複・保留・有効に分類する |

### 判断基準

- 画面に出すだけなら `condense`。
- 次回の作業再開に使うなら `handoff`。
- 長期的なユーザー嗜好や決定事項なら `crystallize`。
- 蓄積ノートを横断合成してエッセンスを得たいなら `synthesize`。
- 古い記憶、重複、矛盾、完了済みタスクが気になったら `prune-memory`。
- Manifest や README などの整合性が気になったら `review-system`。
- Memory から再利用可能な知識を育てたいなら `promote-memory`。
- 宿題が増えて見通しが悪くなったら `task-audit`。
- 不要な短期文脈が残っているなら `clear-handoff`。

### 終了時の提案

Knowledge Nexus は、作業終了時に必要なメンテナンスだけを理由付きで短く提案する。

これは独立コマンドではなく、標準動作として扱う。毎回すべてを提案せず、今回の作業内容から必要なものだけを示す。

## 5. マニフェスト肥大化防止

`SYSTEM_MANIFEST.md` は Knowledge Nexus の憲法として扱い、詳細を詰め込みすぎない。

- コマンドの詳細仕様: `99_System/Prompts/Protocols/CommandProtocol.md`
- 調査や整理の詳細手順: `99_System/Prompts/Workflows/`
- 現在有効な記憶の要約: `99_System/Memory/INDEX.md`
- セッション単位の履歴: `99_System/Memory/YYYY-MM-DD-*.md`
- 短期作業文脈: `99_System/Handoff/CURRENT_CONTEXT.md`

新しいルールを追加する場合は、まず既存の分離先に置けるかを確認する。`SYSTEM_MANIFEST.md` に追記するのは、起動時に必ず必要な中核規約だけに限る。

## 6. ワークフローの実行方法

`99_System/Prompts/Workflows/StandardResearch.md` を参照し、Nexus（指揮官）に以下の手順で指示を出します。

1. **Retrieval:** 既存知識の確認（Librarian）
2. **Investigation:** 外部調査（Investigator）
3. **Analysis:** 論理分析・構造化（Analyst）
4. **Review:** 査読・検証（Critic）
5. **Output:** 整形・保存（Scribe）

---
**Maintainer:** Knowledge Nexus (Orchestrator Agent)
**Version:** 1.2
**Last Updated:** 2026-05-25
