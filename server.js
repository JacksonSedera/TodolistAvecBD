const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});


app.post('/taches', (req, res) => {
    const { nom, prenom, date, heure, produit } = req.body;
    const sql = 'INSERT INTO taches (nom, prenom, date, heure, produit) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nom, prenom, date, heure, produit], (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de la tâche :', err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(201);
    });
});


app.get('/taches', (req, res) => {
    const sql = 'SELECT * FROM taches';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des tâches :', err);
            res.sendStatus(500);
            return;
        }
        res.json(results);
    });
});


app.put('/taches/:id', (req, res) => {
    const { nom, prenom, date, heure, produit } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE taches SET nom = ?, prenom = ?, date = ?, heure = ?, produit = ? WHERE id = ?';
    db.query(sql, [nom, prenom, date, heure, produit, id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de la tâche :', err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});


app.delete('/taches/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM taches WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de la tâche :', err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});