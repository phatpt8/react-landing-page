const Database = require('better-sqlite3');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
router.route('/login').post(({ body }, res) => {
  const db = new Database('landing.db');
  const { username, password } = body;
  const { count } = db.prepare('SELECT COUNT(*) as count FROM admin WHERE username=? AND password=?').get(username, password);
  db.close();
  res.json({ count });
});
router.route('/admins')
  .get((req, res) => {
    const db = new Database('landing.db');
    const data = db.prepare('SELECT rowid, username, password, role FROM admin').all();
    db.close();
    res.json({ data });
  })
  .post(({ body }, res) => {
    const db = new Database('landing.db');
    const { username, password, role } = body;
    const stmt = db.prepare('INSERT INTO admin VALUES (?, ?, ?)');
    const { lastInsertROWID } = stmt.run(username, password, role);
    db.close();
    res.json({ lastInsertROWID });
  })
  .put(({ body }, res) => {
    const db = new Database('landing.db');
    const { rowid, username, password, role } = body;
    const stmt = db.prepare('UPDATE admin SET username=?, password=?, role=? WHERE rowid=?');
    const { changes } = stmt.run(username, password, role, rowid);
    db.close();
    res.json({ changes });
  })
  .delete(({ body }, res) => {
    const db = new Database('landing.db');
    const { rowid } = body;
    const stmt = db.prepare('DELETE FROM admin WHERE rowid=?');
    const { changes } = stmt.run(rowid);
    db.close();
    res.json({ changes });
  });
router.route('articles')
  .get((req, res) => {
    const db = new Database('landing.db');
    const data = db.prepare('SELECT rowid, title, content, authorId, videoUrl, imageUrl FROM article').all();
    db.close();
    res.json({ data });
  })
  .post(({ body }, res) => {
    const db = new Database('landing.db');
    const { title, content, authorId, videoUrl, imageUrl } = body;
    const stmt = db.prepare('INSERT INTO article VALUES (?, ?, ?, ?, ?)');
    const { lastInsertROWID } = stmt.run(title, content, authorId, videoUrl, imageUrl);
    db.close();
    res.json({ lastInsertROWID });
  })
  .put(({ body }, res) => {
    const db = new Database('landing.db');
    const { rowid, title, content, authorId, videoUrl, imageUrl } = body;
    const stmt = db.prepare('UPDATE article SET title=?, content=?, videoUrl=?, imageUrl=? WHERE rowid=? AND authorId=?');
    const { changes } = stmt.run(title, content, videoUrl, imageUrl, rowid, authorId);
    db.close();
    res.json({ changes });
  })
  .delete(({ body }, res) => {
    const db = new Database('landing.db');
    const { rowid } = body;
    const stmt = db.prepare('DELETE FROM article WHERE rowid=?');
    const { changes } = stmt.run(rowid);
    db.close();
    res.json({ changes });
  });

app.use('/api', router);
app.listen(port, () => {
  const db = new Database('landing.db');
  db.exec('CREATE TABLE IF NOT EXISTS admin (username TEXT, password TEXT, role TEXT)');
  db.exec('CREATE TABLE IF NOT EXISTS article (title TEXT, content TEXT, authorId TEXT, videoUrl TEXT, imageUrl TEXT)');
  db.close();
});
