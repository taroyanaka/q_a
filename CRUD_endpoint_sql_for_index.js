// CRUD_endpoint_sql_for_index.js
// node.js, express.js and better-sqlite3.js validator.js cors.js


// npm install express better-sqlite3 validator cors
// touch ./q_a.sqlite3
// sqlite3 ./q_a.sqlite3 < ./sql_init_for_index.sql
// node ./CRUD_endpoint_sql_for_index.js


// CREATE TABLE users (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   name TEXT NOT NULL,
//   password TEXT NOT NULL,
//   created_at DATETIME NOT NULL,
//   updated_at DATETIME NOT NULL
// );

// CREATE TABLE q_a (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   user_id INTEGER NOT NULL,
//   created_at DATETIME NOT NULL,
//   updated_at DATETIME NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );

// CREATE TABLE f_i_b (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   user_id INTEGER NOT NULL,
//   created_at DATETIME NOT NULL,
//   updated_at DATETIME NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );



const express = require('express');


// better-sqlite3のサンプル
const sqlite = require('better-sqlite3');
const db = new sqlite('q_a.sqlite3');

const app = express();

// corsで全てのアクセスを許可する
const cors = require('cors');
app.use(cors());

const port = 3001;

// expressを127.0.0.1で起動する
// app.listen(port, '127.0.0.1', () => {
//   console.log(`App listening at http://127.0.0.1:${port}`);
// });
// expressをlocalhostで起動する
app.listen(port, 'localhost', () => {
    console.log(`App listening at http://localhost:${port}`);
});


// expressのサンプル
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// 特定のuserのnameを指定してそのq_aを結合してクエリのエンドポイント。content created_at name updated_atを表示する
app.get('/users_q_a/:id', (req, res) => {
    const rows = db.prepare('SELECT q_a.content, q_a.created_at, users.name, q_a.updated_at FROM users INNER JOIN q_a ON users.id = q_a.user_id WHERE users.id = ?').all(req.params.id);
    res.send(rows);
    }
);

// 特定のuserのnameを指定してそのf_i_bを結合してクエリのエンドポイント。content created_at name updated_atを表示する
app.get('/users_f_i_b/:id', (req, res) => {
    const rows = db.prepare('SELECT f_i_b.content, f_i_b.created_at, users.name, f_i_b.updated_at FROM users INNER JOIN f_i_b ON users.id = f_i_b.user_id WHERE users.id = ?').all(req.params.id);
    res.send(rows);
    }
);
