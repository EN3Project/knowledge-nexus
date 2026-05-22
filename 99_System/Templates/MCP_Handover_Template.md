---
context_type: "task_handover"
source: "{{SOURCE_AGENT}}"
target: "{{TARGET_AGENT}}"
task_id: "{{TASK_ID}}"
state: "processing"
confidence_level: "{{0-100%}}"
uncertain_points:
  - "{{不確実な点や懸念事項}}"
sources:
  - "{{根拠となったソースやURL}}"
---
# Task Handover Context (Ver 1.1)
## 📋 背景・目的
{{PURPOSE}}

## 🔍 現在の状況・収集済みデータ
{{DATA}}

## 🎯 次のステップへの期待 (for {{TARGET_AGENT}})
{{EXPECTATIONS}}

## 🔗 関連リソース
- [[{{RELATED_NOTE}}]]
