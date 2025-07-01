const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/state', (req, res) => {
  db.get('SELECT data FROM state WHERE id = 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(JSON.parse(row.data));
  });
});

app.put('/api/state', (req, res) => {
  const data = JSON.stringify(req.body);
  db.run('UPDATE state SET data = ? WHERE id = 1', data, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
