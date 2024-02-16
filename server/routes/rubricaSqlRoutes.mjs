import {
    getContatti,
    addContattoDB,
    deleteContatto
} from "../db/dbManager.mjs";



//* CONTATTI

async function getRubrica(req, res) {
    try {
        const contatti = await getContatti();
        res.status(200).json(contatti);
    } catch (error) {
        console.error('Errore durante il recupero dei contatti:', error);
        res.status(500).send('Errore durante il recupero dei contatti');
    }
}

//* AGGIUNGI CONTATTO

async function addContattoRoute(req, res) {
    try {
        const { nome, cognome, telefono, indirizzo } = req.body;
        await addContattoDB(nome, cognome, telefono, indirizzo);
        res
            .status(200)
            .send("Contatto aggiunto con successo!")
    } catch (err) {
        console.error("Errore durante l'aggiunta del contatto", err)
        res
            .status(500)
            .send(err)
    }
};

//* ELIMINA CONTATTO

async function deleteContattoRoute(req, res) {

    const contactID = req.params.id

    try {
        await deleteContatto(contactID);
        res
            .status(200)
            .send("Contatto eliminato con successo")

    } catch (err) {
        console.error("Errore durante l'eliminazione del contatto", err);
        res
            .status(500)
            .send("Errore durante l'eliminazione del contatto")
    }
};



export {
    getRubrica,
    addContattoRoute,
    deleteContattoRoute
};
