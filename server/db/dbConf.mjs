import mysql from "mysql"

// *  Configurazione della connessione al db mySQL
const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "rubrica",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

// * Connessione al DATABASE

connection.connect((err) => {
    if (err) {
        console.log("Errore durante la connessione", err);
        return;
    }
    console.log("Connessione al db mySQL avvenuta con successo!");
})


export default connection;