import React from "react";
import axios from "axios";
import "../App.css";

export default function AddContact(
    {
        nome,
        cognome,
        telefono,
        setNome,
        setCognome,
        setTelefono,
        rubrica,
        setRubrica,
        filteredRubrica,
        setFilteredRubrica
    }
) {


    // * Aggiungi Contatto
    async function handleAddContacts() {
        try {
            const res = await axios.post("http://localhost:8000/rubrica", {
                nome, cognome, telefono
            });
            alert("Contatto Aggiunto")
            console.log(res.data);
            setRubrica([...rubrica, res.data])
            setFilteredRubrica([...filteredRubrica, res.data])
            setNome("")
            setCognome("")
            setTelefono("")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <div className='aggiungiContatto'>
                <div className='datiContatto'>
                    <input
                        type='text'
                        placeholder='Nome'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)} />
                    <input
                        type='text'
                        placeholder='Cognome'
                        value={cognome}
                        onChange={(e) => setCognome(e.target.value)} />
                    <input
                        type='text'
                        placeholder='Numero di Telefono'
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)} />
                </div>
                <div className='aggiungi'>
                    <button type='button' onClick={handleAddContacts}>Aggiungi</button>
                </div>
            </div>
        </React.Fragment>
    )
}