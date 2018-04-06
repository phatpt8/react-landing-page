const Database = require('better-sqlite3');
const db = new Database('landing.db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.route('/login').post(({ body }, res) => {
  const { username, password } = body;
  const { count, userName, role } = db
    .prepare(
      'SELECT COUNT(*) as count, username as userName, role FROM admin WHERE username=? AND password=?'
    )
    .get(username, password);
  res.json({ count, username: userName, role });
});
router
  .route('/admins')
  .get((req, res) => {
    const data = db.prepare('SELECT rowid, username, password, role FROM admin').all();
    res.json({ data });
  })
  .post(({ body }, res) => {
    const { username, password, role } = body;
    const stmt = db.prepare('INSERT INTO admin VALUES (?, ?, ?)');
    const { lastInsertROWID } = stmt.run(username, password, role);
    res.json({ lastInsertROWID });
  })
  .put(({ body }, res) => {
    const { rowid, username, password, role } = body;
    const stmt = db.prepare('UPDATE admin SET username=?, password=?, role=? WHERE rowid=?');
    const { changes } = stmt.run(username, password, role, rowid);
    res.json({ changes });
  })
  .delete(({ body }, res) => {
    const { rowid } = body;
    const stmt = db.prepare('DELETE FROM admin WHERE rowid=?');
    const { changes } = stmt.run(rowid);
    res.json({ changes });
  });
router
  .route('/articles')
  .get((req, res) => {
    const data = db
      .prepare('SELECT rowid, title, content, authorId, videoUrl, imageUrl FROM article')
      .all();
    res.json({ data });
  })
  .post(({ body }, res) => {
    const { title, content, authorId, videoUrl, imageUrl } = body;
    const stmt = db.prepare('INSERT INTO article VALUES (?, ?, ?, ?, ?)');
    const { lastInsertROWID } = stmt.run(title, content, authorId, videoUrl, imageUrl);
    res.json({ lastInsertROWID });
  })
  .put(({ body }, res) => {
    const { rowid, title, content, authorId, videoUrl, imageUrl } = body;
    const stmt = db.prepare(
      'UPDATE article SET title=?, content=?, videoUrl=?, imageUrl=? WHERE rowid=? AND authorId=?'
    );
    const { changes } = stmt.run(title, content, videoUrl, imageUrl, rowid, authorId);
    res.json({ changes });
  })
  .delete(({ body }, res) => {
    const { rowid } = body;
    const stmt = db.prepare('DELETE FROM article WHERE rowid=?');
    const { changes } = stmt.run(rowid);
    res.json({ changes });
  });

app.use('/api', router);
app.listen(port, () => {
  db.exec('CREATE TABLE IF NOT EXISTS admin (username TEXT UNIQUE, password TEXT, role TEXT)');
  db.exec(
    'CREATE TABLE IF NOT EXISTS article (title TEXT, content TEXT, authorId TEXT, videoUrl TEXT, imageUrl TEXT)'
  );
  db.exec(`
    INSERT OR IGNORE INTO admin
    VALUES ('superadmin', '123456', 'super_moderator')
  `);
});
