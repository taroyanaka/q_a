// https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave

// in vscode's workspace settings.json
// {
// "emeraldwalk.runonsave": {
//     "commands": [
//         {
//             "match": "/Users/yanakataro/Desktop/js2/q_a/CRUD_endpoint_sql_for_index.js",
//             "cmd": "cp /Users/yanakataro/Desktop/js2/q_a/CRUD_endpoint_sql_for_index.js /Users/yanakataro/Desktop/npm_package/CRUD_endpoint_sql_for_index.js"
//         }
//     ]
// }
// }

// on CLI
// nodemon /Users/yanakataro/Desktop/npm_package/CRUD_endpoint_sql_for_index.js






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

// CREATE TABLE i_t_n (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   user_id INTEGER NOT NULL,
//   content TEXT NOT NULL,
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


const port = 8000;
// expressをlocalhostで起動する
// app.listen(port, 'localhost', () => {
app.listen(port, "0.0.0.0", () => {
// app.listen(port, '127.0.0.1', () => {
    console.log(`App listening at http://localhost:${port}`);
});


// expressのサンプル
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });











// 'better-sqlite3'のnowのサンプル
// const sqlite = require('better-sqlite3');
// const db = new sqlite('q_a.sqlite3');
// const rows = db.prepare('INSERT INTO users (name, password, created_at, updated_at) VALUES (?, ?, datetime("now"), datetime("now"))').run('name', 'password');

// insert_q_aのcontentを挿入するapp.getエンドポイント。nameはidを指定して取得する。created_atとupdated_atは自動で挿入される。insertに成功したら、successというデータを返し、insertに失敗したら、errorというデータを返す。
app.get('/insert_q_a', (req, res) => {
    const now = new Date().toISOString();
    const rows = db.prepare('INSERT INTO q_a (user_id, content, created_at, updated_at) VALUES (?, ?, ?, ?)').run(req.query.user_id, req.query.content, now, now);
    if (rows.changes === 1) {
        res.send({status: 'success'});
    } else {
        res.send({status: 'error'});
    }
});
// delete_q_aという、レコードのidを指定して削除するapp.getエンドポイント。deleteに成功したら、successというデータを返し、deleteに失敗したら、errorというデータを返す。
app.get('/delete_q_a', (req, res) => {
    const rows = db.prepare('DELETE FROM q_a WHERE id = ?').run(req.query.id);
    if (rows.changes === 1) {
        res.send({status: 'success'});
    } else {
        res.send({status: 'error'});
    }
});


// 特定のuserのnameを指定してそのi_t_nを結合してクエリのエンドポイント。i_t_nのid content created_at name updated_atを表示する
app.get('/users_i_t_n/:id', (req, res) => {
    const rows = db.prepare('SELECT i_t_n.id, i_t_n.content, i_t_n.created_at, users.name, i_t_n.updated_at FROM users INNER JOIN i_t_n ON users.id = i_t_n.user_id WHERE users.id = ?').all(req.params.id);
    res.send(rows);
    }
);

// 'better-sqlite3'のnowのサンプル
// const sqlite = require('better-sqlite3');
// const db = new sqlite('q_a.sqlite3');
// const rows = db.prepare('INSERT INTO users (name, password, created_at, updated_at) VALUES (?, ?, datetime("now"), datetime("now"))').run('name', 'password');

// insert_i_t_nのcontentを挿入するapp.getエンドポイント。nameはidを指定して取得する。created_atとupdated_atは自動で挿入される。insertに成功したら、successというデータを返し、insertに失敗したら、errorというデータを返す。
app.get('/insert_i_t_n', (req, res) => {
    const now = new Date().toISOString();
    const rows = db.prepare('INSERT INTO i_t_n (user_id, content, created_at, updated_at) VALUES (?, ?, ?, ?)').run(req.query.user_id, req.query.content, now, now);
    if (rows.changes === 1) {
        res.send({status: 'success'});
    } else {
        res.send({status: 'error'});
    }
});
// delete_i_t_nという、レコードのidを指定して削除するapp.getエンドポイント。deleteに成功したら、successというデータを返し、deleteに失敗したら、errorというデータを返す。
app.get('/delete_i_t_n', (req, res) => {
    const rows = db.prepare('DELETE FROM i_t_n WHERE id = ?').run(req.query.id);
    if (rows.changes === 1) {
        res.send({status: 'success'});
    } else {
        res.send({status: 'error'});
    }
});

// delete_i_t_nのクエリの例をURL形式で。
// http://localhost:8000/delete_i_t_n?id=1


// userのテーブルのnameとpasswordを指定してidを取得して、そのidを使ってq_aのテーブルのuser_idを指定して、そのq_aのid content created_at updated_atを取得するクエリのエンドポイント。SQLクエリは適宜改行する
app.get('/users_q_a', (req, res) => {
    const rows = db.prepare('SELECT q_a.id, q_a.content, q_a.created_at, q_a.updated_at FROM users INNER JOIN q_a ON users.id = q_a.user_id WHERE users.name = ? AND users.password = ?').all(req.query.name, req.query.password);
    res.send(rows);
    }
);



// SELECT name, sql FROM sqlite_master WHERE type='table';でテーブルの中身を確認する。dumpというendpoint。
app.get('/dump', (req, res) => {
    const rows = db.prepare('SELECT name, sql FROM sqlite_master WHERE type="table"').all();
    res.send(rows);
    }
);




// app.post('/users_i_t_n')のクエリの例をURL形式で。
// http://localhost:8000/users_i_t_n?user_id=1&content=content
