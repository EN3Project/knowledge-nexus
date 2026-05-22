---
test_id: "agent-compatibility-v1"
status: "active"
targets:
  - Codex
  - Claude
  - Gemini
related:
  - "[[SYSTEM_MANIFEST]]"
  - "[[99_System/Prompts/Workflows/StandardResearch]]"
  - "[[99_System/Prompts/Personas/Default]]"
---
# Agent Compatibility Checklist

## Path-Only Runner
このファイルは、LLMにパスだけ渡して受け入れ試験を実行させるための自己実行チェックリストである。

LLMに渡す入力は、原則として次の1行だけでよい。

```text
99_System/Tests/Agent_Compatibility_Checklist.md を読んで、自分を対象に受け入れ試験を実行して。
```

このファイルを受け取ったLLMは、以下を順番に実行すること。

1. 作業ルートを確認し、可能なら `SYSTEM_MANIFEST.md` を UTF-8 で読む。
2. `SYSTEM_MANIFEST.md` の `run/load` 規約に従って、最新 Memory と Persona を読む。
3. このチェックリストの T-01 から T-06 を自分自身に対して実行する。
4. 各テストについて、観測結果・減点理由・点数を記録する。
5. ファイル編集が可能な環境では、結果を `99_System/Tests/Agent_Compatibility_Results.md` に追記し、個別ログを `99_System/Tests/{{AGENT}}_Run_{{YYYY-MM-DD}}.md` として作成する。
6. ファイル編集ができない環境では、同じ内容を Markdown で出力し、ユーザーが `99_System/Tests/Agent_Compatibility_Results.md` に転記できる形にする。
7. 最後に Memory 更新要否を判定し、必要なら `99_System/Templates/Session_Memory_Template.md` 準拠の更新案を出す。

禁止事項:
- 既存の Memory を無断で破壊・上書きしない。
- 絶対パスを正本として記録しない。
- 人格再現だけで合格扱いにしない。
- 外部Webやファイル編集が使えない場合に、使えたかのように装わない。

## 目的
Codex / Claude / Gemini のいずれでも、Knowledge Nexus を同じ運用品質で起動・実行・記録できるかを検証する。

この試験は「人格を呼べるか」ではなく、以下を確認する。

- `SYSTEM_MANIFEST.md` を根拠に動作できるか
- `run` / `load` で記憶と人格を復元できるか
- Obsidian 互換 Markdown と相対パスを守れるか
- `StandardResearch` を手順として実行できるか
- 人格が実務品質を阻害しないか
- 不確実性・根拠・未検証点を明示できるか

## 試験前提
- 作業ルートはリポジトリルートとする。
- Markdown 読み込み時は UTF-8 を前提とする。
- 外部Web調査が使えない環境では、その制約を明示すれば減点しない。
- 各LLMには同じ入力を与え、出力差分を `99_System/Tests/Agent_Compatibility_Results.md` に記録する。

## 合格基準
総合点 80 点以上を合格とする。ただし、以下の Critical 項目を1つでも失敗した場合は不合格。

| ID | 項目 | 種別 | 配点 |
|---|---|---:|---:|
| C-01 | `SYSTEM_MANIFEST.md` を読み、明示的に参照する | Critical | 10 |
| C-02 | 最新 Memory を読み、前回状態を復元する | Critical | 10 |
| C-03 | 人格より上位指示・実務品質を優先する | Critical | 10 |
| C-04 | ファイルパスをプロジェクトルート相対で扱う | Critical | 10 |
| C-05 | 重要な決定・構造変更・試験結果の後に Memory 更新要否を判定する | Critical | 10 |
| S-01 | Obsidian 互換 Markdown で出力する | Standard | 10 |
| S-02 | `StandardResearch` の5フェーズを認識する | Standard | 10 |
| S-03 | 根拠・不確実性・未検証点を分離する | Standard | 10 |
| S-04 | Mermaid 図を必要に応じて使える | Standard | 10 |
| S-05 | 必要時に Memory 更新案をテンプレート準拠で出せる | Standard | 10 |
| S-06 | 口調が過剰演技にならず、実務を邪魔しない | Standard | 10 |

## 試験ケース

### T-01: 起動復元
入力:

```text
run
```

期待:
- `SYSTEM_MANIFEST.md` を読む。
- `99_System/Memory/` の最新ファイルを読む。
- 設定された Persona ファイルを読む（`99_System/Prompts/Personas/` 内）。
- 復元した Role / Persona / Workflow / Memory を簡潔に報告する。

評価対象:
- C-01, C-02, C-03, C-04, S-01, S-06

### T-02: 標準調査ワークフロー
入力:

```text
StandardResearchで「LLM横断エージェント運用のリスク」を整理して。
外部Webが使えない場合は、使えないことを明示して、Vault内情報と一般知識で仮説を作って。
```

期待:
- Retrieval / Investigation / Analysis / Review / Output を明示する。
- 外部Web可否を明示する。
- リスク、対策、未検証点を分ける。
- 必要なら Mermaid で運用構造を図解する。

評価対象:
- C-03, C-04, S-01, S-02, S-03, S-04, S-06

### T-03: 相対パス運用
入力:

```text
この調査結果を保存するなら、どの相対パスに置くべき？
候補を3つ出して、最も妥当なものを選んで。
```

期待:
- 絶対パスではなく、相対パスを提示する。
- `99_System/` と通常ノート領域の責務を区別する。
- 保存先の選定理由を説明する。

評価対象:
- C-04, S-01, S-03

### T-04: 批判的レビュー
入力:

```text
さっきの出力をcriticとして査読して。
ハルシネーション、論理の飛躍、運用上の弱点だけを先に列挙して。
```

期待:
- 良い点よりも問題点を先に出す。
- 断定と推測を区別する。
- 修正案を具体化する。

評価対象:
- C-03, S-03, S-06

### T-05: Memory 更新案
入力:

```text
この試験セッションをMemoryに残すなら、Session_Memory_Templateに沿って更新案を作って。
```

期待:
- `99_System/Templates/Session_Memory_Template.md` に沿う。
- 決定事項、ユーザー嗜好、未完了タスクを分ける。
- 既存 Memory を勝手に破壊しない。

評価対象:
- C-02, C-04, C-05, S-01, S-05

### T-06: 終了時 Memory Hygiene
入力:

```text
今日の作業を終える前に、Memoryに残すべきことがあるか確認して。
```

期待:
- 重要な決定、ユーザー嗜好、未完了タスク、構造変更、試験結果を確認する。
- 更新が必要な場合は、`99_System/Templates/Session_Memory_Template.md` 準拠の更新案を出す。
- 更新不要の場合は、その理由を短く説明する。
- 既存 Memory を無断で破壊・上書きしない。

評価対象:
- C-05, S-01, S-05, S-06

## 採点ルール
- 10点: 期待を満たし、運用上そのまま使える。
- 7点: 概ね満たすが、軽微な補正が必要。
- 4点: 一部満たすが、運用には人間の補助が必要。
- 0点: 満たしていない、または危険な挙動がある。

Critical 項目は 7 点未満を失敗扱いとする。

## 判定メモ
人格再現度は補助指標に留める。主評価は、再現性・根拠管理・ファイル運用・ワークフロー遵守で行う。
