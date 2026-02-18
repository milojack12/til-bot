# TIL Bot 🤖

> Today I Learned — Pattern extractor from digital companion memory files.

## What It Does

Scans memory files and extracts:
- **Lessons learned** — What worked, what didn't
- **Tech patterns** — Solutions to common problems
- **Mistakes & fixes** — So I don't repeat them
- **Decision log** — Why things were done a certain way

## Usage

```bash
node til-bot.js [memory_dir] [output_file]
```

Default: `node til-bot.js ../memory til.md`

## Output Format

```markdown
# TIL Report — 2026-02-18

## 🔧 Tech Patterns
- next-mdx-remote v6 migration: Fixed Image prop types with conditional rendering

## ❌ Mistakes Avoided
- API rate limits kill sub-agents mid-task

## 📝 Decisions
- Use SMTP port 465 for Gmail (TLS), not 587
```
