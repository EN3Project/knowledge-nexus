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
- ユーザーが明示的に「軽くでいい」「さっと調べて」と言った場合（Phase 4・5 を省略可）

---

## フェーズ定義

1. **Phase 1: Retrieval (@librarian)**
   - `vault_search` または VaultIndex.md を使い、Vault 内の関連知識を確認する。
   - 既存ノートで答えられる場合はここで完結し、Phase 2 以降をスキップする。

2. **Phase 2: Investigation (@investigator)**
   - Phase 1 で不足している情報を外部 Web から収集する。
   - 複数ソースを参照し、ソース URL を必ず記録する（最低3件）。

3. **Phase 3: Analysis (@analyst)**
   - 既存知識（Phase 1）と外部情報（Phase 2）を統合し、構造化する。
   - 核となる概念・原則・対立軸を抽出する（ExtractLogic）。
   - Nexus の既存設計思想との接合点を明示する。

4. **Phase 4: Review (@critic)**
   - 分析結果のハルシネーション・論理の飛躍・出典の信頼性を検証する（FactCheck）。
   - 不確かな主張には ⚠️ を付けて注記する。

5. **Phase 5: Output (@scribe)**
   - Obsidian 互換 Markdown で整形し、`index/03_Resources/` 配下に保存する。
   - Permanent Note 相当の重要度なら `index/03_Resources/Permanent/` に配置する。
   - フロントマターに `note_type`, `tags`, `source` を記載する。
   - **必須: ノート末尾に `## 裏付け資料` セクションを設け、Phase 2 で収集したソース URL をすべて記載すること。** カテゴリ別に整理するとなお良い。裏付けなしの知見は ⚠️ を付けて明示する。

---

各ステップの出力は、必ず最新の [MCP_Handover_Template] に従って次へ引き継いでください。
