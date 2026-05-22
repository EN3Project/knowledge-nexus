[WORKFLOW: ProcessClippings]
`Clippings/` 内のファイルを処理し、知識を抽出して適切な場所に保存、原本を `00_Inbox/Archive/` に移動する。

## 発動条件

- ユーザーが `process-clippings / クリッピング処理` を実行したとき
- weekly-maintenance で未処理 Clippings が通知された後

---

## フェーズ定義

### Phase 1: 棚卸し
- `index/Clippings/` 内のファイル一覧を取得する（Archive フォルダは除外）
- 件数をユーザーに提示し、処理に進む確認を取る

### Phase 2: 分類・抽出（ファイルごとに実施）

各ファイルを読み、以下の基準で分類する：

| 分類 | 判断基準 | 抽出先 |
|---|---|---|
| **Knowledge** | Web記事・技術解説など、再利用できる知識がある | `index/03_Resources/` |
| **Project Idea** | プロジェクト案・構想・アイデアメモ | `index/01_Projects/` |
| **Permanent** | 普遍的な知見・原則で長期保存に値する | `index/03_Resources/Permanent/` |
| **Discard** | 内容が薄い・重複・時事性のみ | 抽出ノートを作らずアーカイブのみ |

抽出ノートのフロントマターに必ず含める：
```yaml
---
note_type: resource        # または project, permanent
source_clipping: "Clippings/元ファイル名.md"
tags: [タグ1, タグ2]       # 下記タグ付けルールに従う
---
```

#### タグ付けルール

タグは `99_System/TagTaxonomy.md` のタクソノミーから選択する。

1. **タクソノミーを参照** し、コンテンツに合うタグを1〜4個選ぶ
2. **階層タグを優先**（`ai/llm` > `ai`）
3. **タクソノミーにないタグは使わない**（追加が必要なら `TagTaxonomy.md` を更新してから使う）

**判断早見表：**

| コンテンツの内容 | 付けるタグ例 |
|---|---|
| LLM・AI ツールの使い方 | `ai/llm`, `tools` |
| Claude Code・スキル・CLAUDE.md | `dev/claude-code`, `ai/agent` |
| MCP サーバー・プロトコル | `dev/mcp`, `ai/agent` |
| Obsidian プラグイン・設定 | `obsidian/plugin` |
| PKM・情報整理手法 | `knowledge/pkm` |
| Nexus 設計・運用 | `knowledge/nexus` |
| プロジェクト構想 | `project/draft` |
| 技術仕様・チートシート | `reference` |

### Phase 3: アーカイブ
- 処理済みのファイルを `index/00_Inbox/Archive/` に移動する
- 移動前にユーザー確認は不要（Phase 2 で抽出が完了していれば安全）

### Phase 4: 報告
以下の形式でサマリーを出力する：

```
## process-clippings 完了

| 分類 | 件数 |
|---|---|
| Knowledge → 03_Resources | N件 |
| Project Idea → 01_Projects | N件 |
| Permanent → 03_Resources/Permanent | N件 |
| Discard（抽出なし） | N件 |

アーカイブ済み: N件 → 00_Inbox/Archive/
```

---

## 安全ルール

- **抽出ノートが存在しない Discard 判定はユーザー確認後にアーカイブする**
- 元ファイルの削除は行わない（`00_Inbox/Archive/` への移動のみ）
- 抽出先ノートのタイトルは元記事のタイトルをベースにする
