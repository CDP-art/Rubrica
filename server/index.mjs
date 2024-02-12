import express from 'express'
import bodyParser from 'body-parser'
import cors from "cors"
import connection from "./db/dbConf.mjs"
const app = express()
const port = 8000
app.use(cors())
app.use(bodyParser.json())


//* FILE SYSTEM
// import {
//     getRubrica,
//     getContatto,
//     getNomeContatto,
//     addContatto
// } from "./routes/rubricaRoutes.mjs"

// app.get("/rubrica", getRubrica)
// app.get("/rubrica/numero/:numeroTelefono", getContatto)
// app.get("/rubrica/nome/:nome", getNomeContatto);
// app.post("/rubrica", addContatto)

//* DB MYSQL

import {
    getRubrica,
    addContattoRoute
} from './routes/rubricaSqlRoutes.mjs'

app.get('/rubrica', getRubrica);
app.post("/rubrica/:id", addContattoRoute);

app.get('/', (req, res) => {
    res.send(`
    <h1>Accedi alla mia RUBRICA</h1>
    `)
})

app.listen(port, () => {
    console.log(`DAJE! Ti sei collegato: http://localhost:${port}/`)
})