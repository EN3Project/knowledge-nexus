[WORKFLOW: StandardResearch]
このワークフローは、あるトピックについて深い洞察を得るための一連のステップを定義します。

## 発動条件（いつ使うか）

**自動発動:**
- ユーザーが「調べて」「リサーチ」「〜について教えて」「〜を調査して」などの調査系指示を出した場合

**必須:**
- 新しいトピックの調査（Vault に既存知識がない）
- Permanent Note 候補となる知識の収集
- 外部情報が必要な分析・比較

**省略可能な条件:**
- Vault 内の既存ノートで十分に答えられる場合（Phase 2 以降を省略し、その旨を明示）
- ユーザーが明示的に「軽くでいい」「さっと調べて」と言った場合（Phase 4・5 を省略可、全フェーズをインコンテキストで処理）

---

## Dispatch Protocol

各フェーズは原則としてサブエージェントに dispatch する。コストが上がる代わりに、各エージェントが専用のコンテキストで集中して動くため精度が上がる。

**軽量リクエスト時（「軽くでいい」「さっと調べて」）はインコンテキストで処理し、dispatch しない。**

### WORKFLOW_SCRATCH

ワークフロー開始時に Nexus が `99_System/Handoff/WORKFLOW_SCRATCH.md` を作成し、全フェーズのセクションヘッダーを設置する。各エージェントは前フェーズの出力をこのファイルから直接読む。自フェーズの出力は対応セクションに追記してから Nexus に完了を報告する。完了後は @scribe が `99_System/Handoff/Archive/YYYY-MM-DD-StandardResearch-scratch.md` に移動する。

### 並列 dispatch

Phase 1（@librarian）と Phase 2（@investigator）は**独立して並列 dispatch できる**。
Vault 検索と Web 検索に依存関係はない。Phase 3 以降はシーケンシャルに実行する。

---

## フェーズ定義

1. **Phase 1: Retrieval (@librarian)**
   - `vault_search` または VaultIndex.md を使い、Vault 内の関連知識を確認する。
   - 既存ノートで答えられる場合はここで完結し、Phase 2 以降をスキップする。
   - **Briefing テンプレート:**
     ```
     トピック: [調査テーマ]
     タスク: 関連する既存ノートを検索し、カバレッジとギャップを報告する
     出力形式: 関連ノートのパス・要約一覧 + 不足している情報の箇条書き
     完了後: WORKFLOW_SCRATCH.md の ## Phase 1 セクションに出力を追記すること
     ```

2. **Phase 2: Investigation (@investigator)**
   - Phase 1 で不足している情報を外部 Web から収集する。
   - 複数ソースを参照し、ソース URL を必ず記録する（最低3件）。
   - **Briefing テンプレート:**
     ```
     トピック: [調査テーマ]
     前提: WORKFLOW_SCRATCH.md を読み、## Phase 1 の Vault カバレッジとギャップを参照すること
     タスク: Phase 1 のギャップを外部 Web で補完する
     出力形式: キー・ファインディングス / 詳細データ / 参照ソース URL 全件
     完了後: WORKFLOW_SCRATCH.md の ## Phase 2 セクションに出力を追記すること
     ```

3. **Phase 3: Analysis (@analyst)**
   - 既存知識（Phase 1）と外部情報（Phase 2）を統合し、構造化する。
   - 核となる概念・原則・対立軸を抽出する（ExtractLogic）。
   - Nexus の既存設計思想との接合点を明示する。
   - **Briefing テンプレート:**
     ```
     トピック: [調査テーマ]
     前提: WORKFLOW_SCRATCH.md を読み、## Phase 1 と ## Phase 2 の出力を参照すること
     タスク: 既存知識と外部情報を統合・構造化し、ノート設計図を作る
     出力形式: セクション構成案 / 核心的洞察 / Mermaid 図解候補 / 不足点
     完了後: WORKFLOW_SCRATCH.md の ## Phase 3 セクションに出力を追記すること
     ```

4. **Phase 4: Review (@critic)**
   - 分析結果のハルシネーション・論理の飛躍・出典の信頼性を検証する（FactCheck）。
   - 不確かな主張には ⚠️ を付けて注記する。
   - **Briefing テンプレート:**
     ```
     前提: WORKFLOW_SCRATCH.md を読み、## Phase 3 の分析ドラフトを査読対象とすること
     確認事項: 論理整合性・ハルシネーション・ソース信頼性・依頼意図への適合
     出力形式: PASS / CONDITIONAL PASS / FAIL + 修正指示（該当時）
     完了後: WORKFLOW_SCRATCH.md の ## Phase 4 セクションに判定結果を追記すること
     ```

5. **Phase 5: Output (@scribe)**
   - Obsidian 互換 Markdown で整形し、`index/03_Resources/` 配下に保存する。
   - Permanent Note 相当の重要度なら `index/03_Resources/Permanent/` に配置する。
   - フロントマターに `note_type`, `tags`, `source` を記載する。
   - **必須: ノート末尾に `## 裏付け資料` セクションを設け、Phase 2 で収集したソース URL をすべて記載すること。** カテゴリ別に整理するとなお良い。裏付けなしの知見は ⚠️ を付けて明示する。
   - **Briefing テンプレート:**
     ```
     前提: WORKFLOW_SCRATCH.md を読み、## Phase 3 の構成案と ## Phase 4 の修正指示を参照すること
     保存先: index/03_Resources/ または index/03_Resources/Permanent/
     必須項目: Frontmatter（note_type, tags, source, updated）+ ## 裏付け資料
     完了後: ① ノート保存 ② VaultIndex.md 更新 ③ WORKFLOW_SCRATCH.md を 99_System/Handoff/Archive/YYYY-MM-DD-StandardResearch-scratch.md に移動 ④ 保存完了パスを報告
     ```
