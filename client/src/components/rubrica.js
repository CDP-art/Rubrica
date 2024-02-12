import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import SearchBar from "./searchBar";

export default function Rubrica() {
    const [rubrica, setRubrica] = useState([]);
    const [filteredRubrica, setFilteredRubrica] = useState([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [telephone, setTelephone] = useState("");


    //* Rubrica dal server
    useEffect(() => {
        async function getRubrica() {
            try {
                const res = await axios.get("http://localhost:8000/rubrica");
                setRubrica(res.data);
                setFilteredRubrica(res.data);
            } catch (error) {
                console.error("Errore durante il recupero dei dati dalla rubrica:", error);
            }
        }
        getRubrica();
    }, []);


    // * Totale contatti
    const totContatti = rubrica.length;


    //* Barra di ricerca
    const handleSearch = (searchTerm /*Quello che viene scritto nella barra di ricerca*/) => {

        const filteredContacts = rubrica.filter((persona) => {
            //viene filtrato l'array rubrica (tutti i contatti contatti).
            //Per ogni indice dell'array, viene creato un nuovo array con un singolo oggetto.
            /*
                filteredContacts = [
                    {"id": 1, "name": "franco", "surname": "pippo", "telephone": "123"}
                ]
            */
            const { name, surname, telephone } = persona;
            //Ora si estrae le proprietà name, surname, telephone della singola "persona"
            return (
                name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                telephone.includes(searchTerm)
            );
        });

        // if (searchTerm === '') {
        //     setFilteredRubrica(rubrica); 
        // } else {
        //     setFilteredRubrica(filteredContacts);
        // }
        setFilteredRubrica(searchTerm === "" ? rubrica : filteredContacts);
    };


    // * Aggiungi Contatto
    async function handleAddContacts() {
        try {
            const res = await axios.post("http://localhost:8000/rubrica", {
                name, surname, telephone
            });
            alert("Contatto Aggiunto")
            console.log(res.data);
            setRubrica([...rubrica, res.data])
            setFilteredRubrica([...rubrica, res.data])
            setName("")
            setSurname("")
            setTelephone("")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1 style={{ marginBottom: "15px" }}>Rubrica</h1>
            <main>
                <SearchBar onSearch={handleSearch} />
                <div className='rubrica'>
                    <h5 style={{ textAlign: "center" }}>Totale Contatti: {totContatti}</h5>
                    {rubrica.length === 0 ?
                        (<p style={{ textAlign: "center" }}>Non hai nessun contatto in Rubrica</p>) :
                        (
                            <div className='contatti'>
                                <div className='nomi'>
                                    <h4>Contatti</h4>
                                    {filteredRubrica.map((persona, id) => (
                                        <p key={id}> {persona.name} {persona.surname}</p>
                                    ))}
                                </div>
                                <div className="numeri">
                                    <h4>N. di telefono</h4>
                                    {filteredRubrica.map((persona, id) => (
                                        <p key={id}>{persona.telephone}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    {filteredRubrica.length === 0 && <p style={{ width: "100%", textAlign: "center" }}
                    >Nessun contatto trovato</p>}
                </div>
            </main>
            <div className='aggiungiContatto'>
                <div className='datiContatto'>
                    <input
                        type='text'
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <input
                        type='text'
                        placeholder='Cognome'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)} />
                    <input
                        type='text'
                        placeholder='Numero di Telefono'
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)} />
                </div>
                <div className='aggiungi'>
                    <button type='button' onClick={handleAddContacts}>Aggiungi</button>
                </div>
            </div>
        </>
    );
}
