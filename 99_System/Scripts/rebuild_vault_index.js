#!/usr/bin/env node
/**
 * rebuild_vault_index.js
 * index/ 配下の Markdown ファイルをスキャンして 99_System/VaultIndex.md を再生成する。
 *
 * 使用方法:
 *   node 99_System/Scripts/rebuild_vault_index.js
 *
 * 環境変数:
 *   NEXUS_VAULT_PATH  — Vault ディレクトリのパス（デフォルト: ./index）
 *   NEXUS_INDEX_PATH  — 出力先 VaultIndex.md のパス（デフォルト: ./99_System/VaultIndex.md）
 */

import fs from "fs";
import path from "path";

const VAULT_PATH = process.env.NEXUS_VAULT_PATH || path.resolve("index");
const INDEX_PATH = process.env.NEXUS_INDEX_PATH || path.resolve("99_System", "VaultIndex.md");

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) fm[key.trim()] = rest.join(":").trim();
  }
  return fm;
}

function extractSummary(content, fm) {
  if (fm.summary) return fm.summary;
  const body = content.replace(/^---[\s\S]*?---\n?/, "");
  const firstPara = body
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .slice(0, 1)
    .join(" ");
  return firstPara.slice(0, 120) || "（サマリーなし）";
}

function extractTags(fm) {
  if (!fm.tags) return "";
  return fm.tags.replace(/[\[\]]/g, "").trim();
}

function walkDir(dir, base, entries = []) {
  if (!fs.existsSync(dir)) return entries;
  for (const item of fs.readdirSync(dir)) {
    if (item.startsWith(".")) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, base, entries);
    } else if (item.endsWith(".md")) {
      entries.push(path.relative(base, fullPath).replace(/\\/g, "/"));
    }
  }
  return entries;
}

const base = path.resolve(VAULT_PATH, "..");
const files = walkDir(VAULT_PATH, base);

let output = `# Vault Index\n\n`;
output += `*最終更新: ${new Date().toISOString().slice(0, 10)} — ${files.length} ノート*\n\n`;
output += `*自動生成ファイル。手動編集しないでください。*\n\n`;

for (const relPath of files.sort()) {
  const fullPath = path.resolve(base, relPath);
  const content = fs.readFileSync(fullPath, "utf-8");
  const fm = extractFrontmatter(content);
  const tags = extractTags(fm);
  const summary = extractSummary(content, fm);

  output += `### ${relPath}\n`;
  output += `- **Tags:** ${tags || "—"}\n`;
  output += `- **Summary:** ${summary}\n\n`;
}

const indexDir = path.dirname(INDEX_PATH);
if (!fs.existsSync(indexDir)) fs.mkdirSync(indexDir, { recursive: true });
fs.writeFileSync(INDEX_PATH, output, "utf-8");

console.log(`VaultIndex 再生成完了: ${files.length} ノート → ${INDEX_PATH}`);
