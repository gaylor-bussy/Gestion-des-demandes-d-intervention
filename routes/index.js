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


// app.get('/users', (req, res) => {
//     const sql = 'SELECT* FROM user_';
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Erreur lors de la requête :', err.message);
//             return res.status(500).json({ error: 'Erreur serveur' });
//         }
//         res.json(results);
//     });
// });







// /* POST request page  . */// // requete sql a faire : create sql table demande id auto nb demande auto description (valeur input) , date de creation auto nb afpa (valeur input nom , prénom ,matricule)
// router.post('/invite/request', function(req, res, next) {

//   res.render('index', { title: 'Express' });
// });

 app.post('/invite/request', (req, res) => {
    const { nom_AFPA_invite,Prenom_AFPA_invite ,Num_AFPA_invite} = req.body;

  
    const sql = "INSERT INTO `demande`(`id_demande`, `Description`, `Date_creation`, `Num_AFPA_invite`, `Nom_AFPA_invite`, `Prenom_AFPA_invite`, `realise`, `id_status`, `id_demandeur`, `id_technicien`, `id_validateur`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]')";
    db.query(sql, [nom_AFPA_invite,Prenom_AFPA_invite ,Num_AFPA_invite], (err, result) => {
        if (err) {
            console.error('Erreur lors de l’insertion :', err.message);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(201).json({ message: 'Demande effectuer', id: result.insertId });
    });
});








// /* GET NbRequest page. */
app.get('/invite/request/:NbRequest', (req, res) => {
 const sql = "SELECT id_demande,Description,Date_creation,Nom,id_status  FROM `demande` INNER JOIN `user_` ON(demande.id_demandeur=user_.id_user) WHERE Nom_AFPA_invite OR Num_AFPA_invite OR Prenom_AFPA_invite"
  db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la requête :', err.message);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});







// /* GET login page. */
// router.post('/login', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



// /* GET register page. */
// router.post('/register', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });










app.get('/dashboard', (req, res) => {
    const sql = "SELECT *  FROM `demande` INNER JOIN `user_` ON(demande.id_demandeur=user_.id_user) WHERE id_validateur LIKE '1' OR id_technicien LIKE '1' "

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la requête :', err.message);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});







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
