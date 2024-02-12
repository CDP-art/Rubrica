import React from "react";
import { useState } from "react";
import "../App.css";

export default function SearchBar({ onSearch }) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value); // Chiamata alla funzione di ricerca passata come prop
    };


    return (<>
        <div
            className="searchbar"
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "15px",
            }}
        >
            <input
                type="text"
                placeholder="Nome, cognome o numero del contatto"
                value={searchTerm}
                onChange={handleChange}
                style={{
                    height: "50px",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "50px",
                    border: "1px solid",
                    fontSize: "20px"
                }}

            ></input>
        </div>
    </>)
}