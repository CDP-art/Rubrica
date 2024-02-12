import connection from './dbConf.mjs';


//* CONTATTI
async function getContatti() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM contatti', (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//* AGGIUNGI CONTATTO
async function addContattoDB(nome, cognome, telefono, indirizzo) {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO contatti (nome, cognome, telefono, indirizzo) VALUES(?,?,?,?)",
            [nome, cognome, telefono, indirizzo],
            (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
            })
    })
}

export {
    getContatti,
    addContattoDB
};