const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Configuração do SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erro ao conectar ao SQLite:', err.message);
    } else {
        console.log('Conectado ao banco SQLite.');
    }
});

// Criar a tabela, se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        idade INTEGER NOT NULL,
        interesse TEXT,
        categoria TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Rota para exibir o formulário HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Rota para processar o formulário e salvar no banco
app.post('/create-user', (req, res) => {
    const { nome, idade, interesse } = req.body;

    // Determinar a categoria com base na idade
    let categoria = '';
    if (idade < 18) {
        categoria = 'jovem';
    } else if (idade >= 18 && idade <= 35) {
        categoria = 'adulto';
    } else {
        categoria = 'idoso';
    }

    // Inserir os dados no banco SQLite
    const query = `
        INSERT INTO users (nome, idade, interesse, categoria) 
        VALUES (?, ?, ?, ?)
    `;
    db.run(query, [nome, idade, interesse, categoria], function (err) {
        if (err) {
            console.error('Erro ao inserir dados no SQLite:', err.message);
            res.status(500).send('Erro ao salvar dados do usuário.');
            return;
        }

        // Exibir página personalizada após salvar
        res.render('user', { 
            nome, 
            categoria, 
            interesse,
            id: this.lastID // Último ID inserido
        });
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000...');
});
