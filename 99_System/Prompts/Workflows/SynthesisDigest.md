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

## フェーズ定義

1. **Phase 1: スコープ確定**
   - 期間フィルタを確定する（デフォルト: 直近7日、または引数で指定）
   - 対象フォルダを確定する（デフォルト: `index/03_Resources/` + `index/01_Projects/`）
   - 対象ノート件数を VaultIndex.md から確認し、ユーザーに提示する

2. **Phase 2: 横断読み込み (@librarian)**
   - `VaultIndex.md` から対象ノートの一覧を取得する
   - 各ノートの全文を `vault_read` で読み込む
   - 対象件数・取得完了をログとして示す

3. **Phase 3: パターン抽出 (@analyst)**
   - 複数ノートに共通して現れる概念・主張・原則を抽出する（ExtractLogic）
   - ノート間の矛盾・対立する主張を検出する
   - 「言及はあるが未調査」の知識ギャップを抽出し、次の StandardResearch 候補として列挙する
   - Nexus の既存設計思想との接合点があれば明示する
   - **隣接領域マッピング:** Permanent Notes の主要概念から「論理的に隣接するが未探索の領域」を列挙する。既存知識の境界線を炙り出すことが目的。探索候補として提示するだけで、調査はしない

4. **Phase 4: 品質検証 (@critic)**
   - 抽出パターンの根拠となるノートを明示する（FactCheck）
   - 根拠が薄い・単一ノートのみの主張には ⚠️ を付ける
   - 知識ギャップと「単なる記述漏れ」を区別する
   - **devil モード時のみ:** Permanent Notes の主要主張に意図的に反論する。「この前提が崩れる条件は何か」「反証となりうる事例は何か」を列挙する。通常実行では省略

5. **Phase 5: ダイジェスト出力 (@scribe)**
   - `99_System/Templates/SynthesisDigest_Template.md` に従って整形する
   - 保存先: `index/99_System/Reports/YYYY-MM-DD-synthesis-digest.md`
   - frontmatter: `type: synthesis-digest`, `status: pending-review`
   - VaultIndex.md の更新は不要（Reports は索引対象外）
   - **必須: 各洞察・パターンの根拠となるノートへの `[[wikilink]]` を明示すること。** 根拠ノートが存在しない主張には ⚠️ を付ける。

---

各ステップの出力は、必ず最新の [MCP_Handover_Template] に従って次へ引き継ぐこと。
