const fs = require('fs');
const path = require('path');

const MEMORY_DIR = process.argv[2] || './memory';
const OUTPUT_FILE = process.argv[3] || 'TIL.md';

// Enhanced pattern matchers with categories
const patterns = {
  '## 🔧 Tech Patterns': [
    { regex: /fixed.*error/i, category: 'bugfix' },
    { regex: /resolved.*issue/i, category: 'bugfix' },
    { regex: /successfully.*implemented/i, category: 'feature' },
    { regex: /configured.*(model|server|api)/i, category: 'config' },
    { regex: /build.*pass/i, category: 'build' },
    { regex: /migration.*complete/i, category: 'migration' },
    { regex: /updated.*dependency/i, category: 'deps' },
    { regex: /refactor/i, category: 'refactor' },
    { regex: /created.*repo/i, category: 'project' },
    { regex: /script.*(working|works)/i, category: 'automation' }
  ],
  '## ❌ Mistakes & Lessons': [
    { regex: /rate limit/i, category: 'api' },
    { regex: /failed.*(with|due to)/i, category: 'failure' },
    { regex: /error.*encountered/i, category: 'error' },
    { regex: /unable to.*identify/i, category: 'debugging' },
    { regex: /not found/i, category: 'missing' },
    { regex: /invalid.*config/i, category: 'config' },
    { regex: /didn't work|doesn't work/i, category: 'failure' },
    { regex: /revert/i, category: 'rollback' }
  ],
  '## 📝 Decisions': [
    { regex: /decided to/i, category: 'choice' },
    { regex: /use.*instead of/i, category: 'alternative' },
    { regex: /approach/i, category: 'strategy' },
    { regex: /chose/i, category: 'choice' },
    { regex: /will (use|implement|create)/i, category: 'plan' }
  ],
  '## ✨ Wins': [
    { regex: /working|works|success/i, category: 'success' },
    { regex: /completed|done|finished/i, category: 'achievement' },
    { regex: /merged|approved/i, category: 'pr' },
    { regex: /test.*pass/i, category: 'testing' }
  ]
};

function extractTIL(content) {
  const results = {};
  for (const section of Object.keys(patterns)) {
    results[section] = [];
  }

  const lines = content.split('\n');
  
  for (const line of lines) {
    // Skip headers and empty lines
    if (!line.trim() || line.startsWith('#')) continue;
    
    for (const [section, matchers] of Object.entries(patterns)) {
      for (const { regex, category } of matchers) {
        if (regex.test(line)) {
          // Clean up the line
          let clean = line
            .replace(/^[-*]\s*/, '')
            .replace(/^\s+/, '')
            .replace(/\s+/g, ' ')
            .trim();
          
          // Skip duplicates and very short lines
          if (clean.length < 20) continue;
          if (results[section].find(item => item.text === clean)) continue;
          
          results[section].push({ text: clean, category, source: '' });
          break;
        }
      }
    }
  }

  return results;
}

function generateReport(allResults, filesProcessed) {
  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  let report = `# Today I Learned — ${today}\n\n`;
  report += `> Auto-generated from ${filesProcessed.length} memory files\n`;
  report += `> Period: ${weekAgo} to ${today}\n\n`;
  
  // Stats
  const totalItems = Object.values(allResults).reduce((sum, arr) => sum + arr.length, 0);
  report += `## 📊 Stats\n\n`;
  report += `- Total learnings: ${totalItems}\n`;
  for (const [section, items] of Object.entries(allResults)) {
    if (items.length > 0) {
      const emoji = section.split(' ')[1];
      report += `- ${emoji} ${items.length}\n`;
    }
  }
  report += '\n---\n\n';
  
  let hasContent = false;
  
  for (const [section, items] of Object.entries(allResults)) {
    if (items.length > 0) {
      report += `${section}\n\n`;
      items.forEach(item => {
        report += `- ${item.text}\n`;
      });
      report += '\n';
      hasContent = true;
    }
  }
  
  if (!hasContent) {
    report += '*No new learnings this period*\n\n';
  }
  
  // Footer with file sources
  report += `---\n\n`;
  report += `**Sources:** ${filesProcessed.join(', ')}\n`;
  report += `**Generated:** ${new Date().toISOString()}\n`;
  
  return report;
}

// Main
console.log('🔍 Scanning memory files...\n');

let files = [];
try {
  files = fs.readdirSync(MEMORY_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();
} catch (e) {
  console.error(`Error reading ${MEMORY_DIR}:`, e.message);
  process.exit(1);
}

const allResults = {};
for (const section of Object.keys(patterns)) {
  allResults[section] = [];
}

const filesProcessed = [];

for (const file of files) {
  const filepath = path.join(MEMORY_DIR, file);
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    const fileResults = extractTIL(content);
    
    for (const section of Object.keys(allResults)) {
      // Add source info
      const itemsWithSource = fileResults[section].map(item => ({
        ...item,
        source: file.replace('.md', '')
      }));
      allResults[section].push(...itemsWithSource);
    }
    
    filesProcessed.push(file);
    console.log(`  ✓ ${file}`);
  } catch (e) {
    console.error(`  ✗ ${file}: ${e.message}`);
  }
}

// Deduplicate within each section
for (const section of Object.keys(allResults)) {
  const seen = new Set();
  allResults[section] = allResults[section].filter(item => {
    if (seen.has(item.text)) return false;
    seen.add(item.text);
    return true;
  });
}

const report = generateReport(allResults, filesProcessed);
fs.writeFileSync(OUTPUT_FILE, report);

console.log(`\n✅ TIL report written to ${OUTPUT_FILE}`);

const totals = Object.values(allResults).reduce((sum, arr) => sum + arr.length, 0);
console.log(`   Total learnings extracted: ${totals}`);
for (const [section, items] of Object.entries(allResults)) {
  if (items.length > 0) {
    const emoji = section.split(' ')[1];
    console.log(`   ${emoji} ${items.length}`);
  }
}
