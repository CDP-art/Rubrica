import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import SearchBar from "./searchBar";
import AddContact from './newContact';

export default function Rubrica() {
    const [rubrica, setRubrica] = useState([]);
    const [filteredRubrica, setFilteredRubrica] = useState([]);
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [telefono, setTelefono] = useState("");


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
            //viene filtrato l'array rubrica (tutti i contatti).
            //Per ogni indice dell'array, viene creato un nuovo array con un singolo oggetto.
            /*
                filteredContacts = [
                    {"id": 1, "name": "franco", "surname": "pippo", "telephone": "123"}
                ]
            */
            const { nome, cognome, telefono } = persona;
            //Ora si estrae le proprietà name, surname, telephone della singola "persona"
            return (
                nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                telefono.includes(searchTerm)
            );
        });

        // if (searchTerm === '') {
        //     setFilteredRubrica(rubrica); 
        // } else {
        //     setFilteredRubrica(filteredContacts);
        // }
        setFilteredRubrica(searchTerm === "" ? rubrica : filteredContacts);
    };

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
                                {/* <div className='nomi'>
                                    <h4>Contatti</h4>
                                    {filteredRubrica.map((persona, id) => (
                                        <p key={id}> {persona.nome} {persona.cognome}</p>
                                    ))}
                                </div>
                                <div className="numeri">
                                    <h4>N. di telefono</h4>
                                    {filteredRubrica.map((persona, id) => (
                                        <p key={id}>{persona.telefono}</p>
                                    ))}
                                </div> */}

                                <div className='nome'>
                                    <h4>Nome</h4>
                                    {rubrica.map((contatto, id) => (
                                        <p key={id}>{contatto.nome}</p>
                                    ))}
                                </div>
                                <div className='cognome'>
                                    <h4>Cognome</h4>
                                    {rubrica.map((contatto, id) => (
                                        <p key={id}>{contatto.cognome}</p>
                                    ))}
                                </div>
                                <div className='numeroTelefono'>
                                    <h4>N. di Telefono</h4>
                                    {rubrica.map((contatto, id) => (
                                        <p key={id}>{contatto.telefono}</p>
                                    ))}
                                </div>
                                <div className='indirizzo'>
                                    <h4>Indirizzo</h4>
                                    {rubrica.map((contatto, id) => (
                                        <p key={id}>{contatto.indirizzo}</p>
                                    ))}
                                </div>
                            </div>

                        )}
                    {filteredRubrica.length === 0 && <p style={{ width: "100%", textAlign: "center" }}
                    >Nessun contatto trovato</p>}
                </div>
            </main>
            <AddContact
                nome={nome}
                cognome={cognome}
                telefono={telefono}
                setNome={setNome}
                setCognome={setCognome}
                setTelefono={setTelefono}
                rubrica={rubrica}
                setRubrica={setRubrica}
                filteredRubrica={filteredRubrica}
                setFilteredRubrica={setFilteredRubrica} />
        </>
    );
}
