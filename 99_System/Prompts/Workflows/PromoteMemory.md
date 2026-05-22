# Workflow: PromoteMemory

## Objective

`99_System/Memory/` に蓄積された一時的・セッション的な知見から、Permanent note に昇格すべき長期知識を提案する。

## Scope

- `99_System/Memory/`
- `99_System/Memory/INDEX.md`
- `index/03_Resources/Permanent/`
- 必要に応じて `index/01_Projects/`

## Procedure

1. `99_System/Memory/INDEX.md` を読む。
2. 関連する Memory を UTF-8 で読む。
3. 単なる履歴、ユーザー嗜好、運用ルール、一般化可能な知見を分離する。
4. Permanent note に昇格すべき候補を抽出する。
5. 既存 Permanent note と重複しないか確認する。
6. 昇格案を提示する。
7. 新規作成または既存 note 更新は、ユーザー確認後に実行する。

## Promotion Criteria

- 複数セッションで再利用される概念である。
- ユーザー固有の一時的判断ではなく、一般化できる知識である。
- Workflow、設計原則、運用モデル、評価観点として再利用できる。
- Memory に置いたままだと起動時文脈を圧迫する。

## Classification

- `promote`: Permanent note 化を推奨。
- `merge`: 既存 Permanent note への統合を推奨。
- `keep-memory`: Memory のままでよい。
- `user-preference`: Permanent note ではなく `INDEX.md` の User Preferences に残すべき。
- `system-rule`: Protocol / Workflow / README に反映すべき。
- `needs-clarification`: 自動判断できず、ユーザー判断が必要。

## Output Format

```md
# Promote Memory Report

## 昇格候補

## 推奨アクション

## 実行した変更

## 保留事項
```

## Safety Rules

- Permanent note の作成・更新は確認制。
- Memory 本体は履歴として保持する。
- 一時的な会話文脈や冗談は昇格しない。
