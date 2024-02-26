import connection from './dbConf.mjs';


//* CONTATTI
async function getContatti() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM contatti', (error, results) => {
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

//* ELIMINA CONTATTO

async function deleteContatto(id) {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM contatti WHERE id = ?", [id],
            (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
            })
    })
};

//* MODIFICA CONTATTO

async function updateContatto(nome, cognome, telefono, indirizzo, id) {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE contatti SET nome = ?, cognome = ?, telefono = ?, indirizzo = ? WHERE id = ?",
            [nome, cognome, telefono, indirizzo, id],
            (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
            })
    })
};

export {
    getContatti,
    addContattoDB,
    deleteContatto,
    updateContatto
};