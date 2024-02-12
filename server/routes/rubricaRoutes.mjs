import fs from "fs";

const DB_RUBRICA_PATH = "./db/rubrica.json"

//*     Rubrica

export async function getRubrica(req, res) {
    try {
        const data = fs.readFileSync(DB_RUBRICA_PATH);
        const contatti = JSON.parse(data);
        res.status(200).json(contatti);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
}


//*     Contatto per numero telefonico

export async function getContatto(req, res) {

    const { numeroTelefono } = req.params

    try {
        const data = fs.readFileSync(DB_RUBRICA_PATH);
        const contatti = JSON.parse(data);
        console.table(contatti);
        const numeroContatto = contatti.find(el => el.telephone === numeroTelefono);
        if (numeroContatto) {
            res
                .status(200)
                .json(numeroContatto)
        } else {
            res
                .status(404)
                .json({ error: "Numero di telefono non trovato" })
        }
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

//*     Contatto per nome

export async function getNomeContatto(req, res) {
    const { nome } = req.params;

    try {
        const data = fs.readFileSync(DB_RUBRICA_PATH);
        const contatti = JSON.parse(data);
        console.table(contatti);

        const nomeLowerCase = nome.toLowerCase();

        const nomeContatto = contatti.find(el => el.name.toLowerCase() === nomeLowerCase);

        if (nomeContatto) {
            res.status(200).json(nomeContatto);
        } else {
            res.status(404).json({ error: "Nome non trovato" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Errore nella ricerca del nome contatto");
    }
}

//*     Aggiungere contatto

let contatti = [];

export async function addContatto(req, res) {
    const { name, surname, telephone } = req.body;
    try {
        const data = fs.readFileSync(DB_RUBRICA_PATH);
        contatti = JSON.parse(data)

        const nuovoContatto = {
            id: contatti.length > 0 ? Math.max(...contatti.map(c => c.id)) + 1 : 1,  // Calcola il nuovo ID
            name,
            surname,
            telephone
        };

        contatti.push(nuovoContatto);

        fs.writeFileSync(DB_RUBRICA_PATH, JSON.stringify(contatti));
        res
            .status(201)
            .send("Contatto aggiunto");
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ success: false, error: err.message });
    }
}