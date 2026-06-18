var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var moment = require('moment');



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
/*const PORT = 3307;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
*/

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

router.post('/invite/request', (req, res) => {

    const sql = `
        INSERT INTO demande (
            id_demande,
            Description,
            Date_creation,
            Num_AFPA_invite,
            Nom_AFPA_invite,
            Prenom_AFPA_invite,
            realise,
            id_status,
            id_demandeur,
            id_technicien,
            id_validateur
        )
        VALUES (NULL, '`+ req.body.Description + `', '` + moment().format("YYYY-MM-DD") + `', '`+ req.body.Num_AFPA_invite + `', '`+ req.body.Nom_AFPA_invite + `', '`+ req.body.Prenom_AFPA_invite + `', '0', NULL, NULL, NULL, NULL)
    `;

    db.query(
        sql,
        (err, result) => {
            if (err) {
                console.error("Erreur SQL :", err);

                return res.status(500).json({
                    message: err.message,
                    code: err.code,
                    sqlMessage: err.sqlMessage
                });
            } else {
                return res.status(200).json({
                    message: 'Demande ajoutée',
                    code: 'OK'

                });
            }
        }
    )
});






// /* GET NbRequest page. */
router.get('/invite/request/:NbRequest', (req, res) => {
    const NbRequest = req.params.NbRequest;
    const sql = "SELECT * FROM demande WHERE id_demande = ?";
    db.query(sql, [NbRequest], (err, results) => {
        if (err) {
            console.error('Erreur lors de la requête :', err.message);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});












// /* GET register page. */
// router.post('/register', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });










router.get('/dashboard', (req, res) => {
    const sql = "SELECT *  FROM `demande` "

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
