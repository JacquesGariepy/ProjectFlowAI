const fs = require('fs');
const path = require('path');
// Utility script to seed the SQLite database with demo data
const db = require('./db');

function loadSeedData() {
  let ts = fs.readFileSync(path.join(__dirname, '../src/data/seedData.ts'), 'utf8');
  
  // Remove all import statements
  ts = ts.replace(/import[^;]+;[\n\r]*/g, '');
  
  // Remove type annotations and interfaces
  ts = ts.replace(/:\s*[A-Z][a-zA-Z<>\[\],\s]*(?=[\s=;,)])/g, '');
  ts = ts.replace(/interface\s+\w+\s*{[^}]*}/g, '');
  ts = ts.replace(/type\s+\w+\s*=[^;]+;/g, '');
  
  // Remove 'as const' annotations
  ts = ts.replace(/\s+as\s+const/g, '');
  
  // Convert export const to const
  ts = ts.replace(/export\s+const\s+/g, 'const ');
  
  const exportsObj = {};
  const moduleObj = { exports: exportsObj };
  const code = ts + '\nmodule.exports = { teams, users, projects, tasks, calendarEvents, notifications, blogPosts, blogComments };';
  
  try {
    const fn = new Function('module', 'exports', code);
    fn(moduleObj, exportsObj);
    return moduleObj.exports;
  } catch (error) {
    console.error('Error loading seed data:', error);
    console.error('Generated code preview:', code.substring(0, 500));
    throw error;
  }
}

const data = loadSeedData();

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS state (id INTEGER PRIMARY KEY, data TEXT)');
  const stmt = db.prepare('INSERT OR REPLACE INTO state (id, data) VALUES (1, ?)');
  stmt.run(JSON.stringify(data));
  stmt.finalize();
});

db.close();
console.log('Database seeded');
