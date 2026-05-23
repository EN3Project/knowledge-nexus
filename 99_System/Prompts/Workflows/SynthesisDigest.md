[WORKFLOW: SynthesisDigest]
このワークフローは、Vault に蓄積されたノート群を横断的に合成し、パターン・矛盾・知識ギャップを抽出して人間向けの圧縮ダイジェストを生成する。

## 発動条件

**自動発動:**
- `weekly-maintenance` の実行時（毎週自動）

**手動発動:**
- ユーザーが `synthesize / 合成` を実行したとき
- ユーザーが `synthesize devil` を実行したとき（悪魔の代弁者モード ON）

**省略可能な条件:**
- 対象ノートが3件未満の場合は省略し、その旨を明示する

**モード:**
- 通常: 隣接領域マッピングを含む。devil モードはOFF
- `synthesize devil`: 悪魔の代弁者モードを追加実行。Permanent Notes の主張に意図的に反論し、前提崩しを行う。ノイズになりうるため、意図して使う時のみ起動する

---

## Dispatch Protocol

Phase 1 は Nexus がインコンテキストで実行する。Phase 2-5 は順次 dispatch する。
Phase 2（@librarian）完了後に Phase 3（@analyst）を dispatch する。シーケンシャル実行。

## フェーズ定義

1. **Phase 1: スコープ確定**（Nexus インコンテキスト）
   - 期間フィルタを確定する（デフォルト: 直近7日、または引数で指定）
   - 対象フォルダを確定する（デフォルト: `index/03_Resources/` + `index/01_Projects/`）
   - 対象ノート件数を VaultIndex.md から確認し、ユーザーに提示する

2. **Phase 2: 横断読み込み (@librarian)**
   - `VaultIndex.md` から対象ノートの一覧を取得する
   - 各ノートの全文を `vault_read` で読み込む
   - 対象件数・取得完了をログとして示す
   ```
   タスク: VaultIndex.md から [期間] の対象ノート一覧を取得し、全文を読み込んで返す
   対象フォルダ: [確定したフォルダ]
   出力: ノートパス・タイトル・全文のリスト
   ```

3. **Phase 3: パターン抽出 (@analyst)**
   - 複数ノートに共通して現れる概念・主張・原則を抽出する（ExtractLogic）
   - ノート間の矛盾・対立する主張を検出する
   - 「言及はあるが未調査」の知識ギャップを抽出し、次の StandardResearch 候補として列挙する
   - Nexus の既存設計思想との接合点があれば明示する
   - **隣接領域マッピング:** Permanent Notes の主要概念から「論理的に隣接するが未探索の領域」を列挙する
   ```
   タスク: 以下のノート群を横断的に分析し、パターン・矛盾・知識ギャップを抽出する
   対象ノート: [Phase 2 の出力]
   出力: 共通パターン / 矛盾 / 知識ギャップ / 隣接領域マッピング
   ```

4. **Phase 4: 品質検証 (@critic)**
   - 抽出パターンの根拠となるノートを明示する（FactCheck）
   - 根拠が薄い・単一ノートのみの主張には ⚠️ を付ける
   - 知識ギャップと「単なる記述漏れ」を区別する
   - **devil モード時のみ:** Permanent Notes の主要主張に意図的に反論する
   ```
   タスク: 以下の分析結果を検証する
   検証対象: [Phase 3 の出力]
   確認事項: 根拠明示・ハルシネーション・ギャップと記述漏れの区別
   devil モード: [ON/OFF]
   出力: PASS / 修正指示 + ⚠️ 付きの不確かな主張リスト
   ```

5. **Phase 5: ダイジェスト出力 (@scribe)**
   - `99_System/Templates/SynthesisDigest_Template.md` に従って整形する
   - 保存先: `index/99_System/Reports/YYYY-MM-DD-synthesis-digest.md`
   - frontmatter: `type: synthesis-digest`, `status: pending-review`
   - VaultIndex.md の更新は不要（Reports は索引対象外）
   ```
   タスク: 以下の内容を SynthesisDigest_Template に従って整形し保存する
   保存内容: [Phase 4 の検証済み出力]
   テンプレート: 99_System/Templates/SynthesisDigest_Template.md
   保存先: index/99_System/Reports/YYYY-MM-DD-synthesis-digest.md
   出力: 保存完了パスを報告する
   ```

---

各ステップの出力は、必ず最新の [MCP_Handover_Template] に従って次へ引き継ぐこと。
