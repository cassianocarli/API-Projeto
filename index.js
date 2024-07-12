const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sensor_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});


app.post('/dados', (req, res) => {
  const { distancia } = req.body;
  const query = 'INSERT INTO leituras (distancia) VALUES (?)';
  db.query(query, [distancia], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('Dados inseridos com sucesso');
  });
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
