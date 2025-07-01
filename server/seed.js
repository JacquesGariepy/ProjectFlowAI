const fs = require('fs');
const path = require('path');
// Utility script to seed the SQLite database with demo data
const db = require('./db');

function loadSeedData() {
  let ts = fs.readFileSync(path.join(__dirname, '../src/data/seedData.ts'), 'utf8');
  ts = ts.replace(/import[^;]+;\n/, '');
  ts = ts.replace(/ as const/g, '');
  ts = ts.replace(/export const /g, 'const ');
  const exportsObj = {};
  const moduleObj = { exports: exportsObj };
  const code = ts + '\nmodule.exports = { teams, users, projects, tasks, calendarEvents, notifications, blogPosts, blogComments };';
  const fn = new Function('module', 'exports', code);
  fn(moduleObj, exportsObj);
  return moduleObj.exports;
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
