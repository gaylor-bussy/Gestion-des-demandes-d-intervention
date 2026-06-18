var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const app = express();
app.use(express.json());



const db = mysql.createPool({
    host: 'localhost',     // Adresse du serveur MySQL
    user: 'root',          // Nom d'utilisateur MySQL
    password: '',          // Mot de passe MySQL
    database: 'ticketing',    // Nom de la base de données
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Vérification de la connexion
db.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err.message);
    } else {
        console.log('✅ Connecté à MySQL');
        connection.release();
    }
});

// Route GET : récupérer tous les utilisateurs


// // Route POST : ajouter un utilisateur (avec requête préparée pour éviter l’injection SQL)
// app.post('/users', (req, res) => {
//     const { name, email } = req.body;

//     // Validation basique
//     if (!name || !email) {
//         return res.status(400).json({ error: 'Nom et email requis' });
//     }

//     const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
//     db.query(sql, [name, email], (err, result) => {
//         if (err) {
//             console.error('Erreur lors de l’insertion :', err.message);
//             return res.status(500).json({ error: 'Erreur serveur' });
//         }
//         res.status(201).json({ message: 'Utilisateur ajouté', id: result.insertId });
//     });
// });

// Lancement du serveur
const PORT = 3307;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});


app.get('/users', (req, res) => {
    const sql = 'SELECT* FROM user_';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la requête :', err.message);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});


// /* POST request page  . */// // requete sql a faire : create sql table demande id auto nb demande auto description (valeur input) , date de creation auto nb afpa (valeur input nom , prénom ,matricule)
// router.post('/invite/request', function(req, res, next) {

//   res.render('index', { title: 'Express' });
// });




// /* GET NbRequest page. */
// router.get('/invite/request/:NbRequest', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });





// /* GET NbRequest page. */
// router.get('/invite/:NbRequest', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });







// /* GET login page. */
// router.post('/login', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// /* GET register page. */
// router.post('/register', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });







// /* GET dashboard page. */
// router.get('/dashboard', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



// /* GET priority page. */
// router.update('/dashboard/priority/:id_demande', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



// /* GET réalisé page. */
// router.update('/dashboard/realise/:id_demande', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// /* GET prise en charge page. */
// router.update('/dashboard/requesttaken/:id_demande', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });










module.exports = router;
