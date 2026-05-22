# 99_System — Nexus システムファイル

このフォルダには Knowledge Nexus の動作に必要なシステムファイルが格納されています。
ユーザーの知識ノートは `index/` に保存されます。

## フォルダ構成

```
99_System/
├── Memory/          # セッション記憶・長期記憶インデックス
│   ├── INDEX.md     # run/load 時に読み込む軽量索引
│   └── Archive/     # 古い記憶のアーカイブ
├── Handoff/         # 短期作業文脈の引き継ぎバッファ
├── Scripts/         # 自動化スクリプト
│   └── rebuild_vault_index.js
├── Templates/       # ノート・レポートのテンプレート
├── Tests/           # システム整合性テスト（任意）
├── Prompts/
│   ├── Formats/     # ノートフォーマット定義
│   ├── Personas/    # 人格テンプレート
│   ├── Protocols/   # コマンド仕様
│   ├── Roles/       # エージェントロール定義
│   ├── Skills/      # 共有スキルプロンプト
│   └── Workflows/   # ワークフロー手順
├── TagTaxonomy.md   # タグ一覧（カスタマイズ推奨）
└── VaultIndex.md    # 全ノートの検索インデックス（自動生成）
```

## 日常運用サイクル

| タイミング | コマンド | 内容 |
|---|---|---|
| セッション開始 | `run` | 記憶・人格を復元、未処理チェック |
| 記事・クリップ追加時 | `process-clippings` | Clippings → Vault に知識抽出 |
| 調査タスク | `standardresearch` | 5フェーズ調査 |
| 蓄積ノートを合成したいとき | `synthesize` | 横断合成・洞察抽出 |
| 週次 | `weekly-maintenance` | まとめてメンテナンス |
| 重要決定後 | `crystallize` | 長期記憶化 |
| 作業引き継ぎ | `handoff` | 短期文脈を保存 |
| インデックス更新 | `rebuild-index` | VaultIndex.md を再生成 |
