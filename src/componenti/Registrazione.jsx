import { useState } from "react";
import "../css/Registrazione.css"; // Import del CSS
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Registrazione() {
  const [data, setData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });
  const [messaggio, setMessaggio] = useState("");
const navTo=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/registrazione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setMessaggio("Errore durante la registrazione.");
        return;
      }

      setMessaggio("Registrazione avvenuta con successo!");
      navTo('/login')
    } catch (error) {
      setMessaggio("Errore di connessione al server.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="registrazione-container">
      <h2>Registrati</h2>
      <form onSubmit={handleSubmit} className="registrazione-form">
        <input
          type="text"
          name="nome"
          required
          value={data.nome}
          onChange={handleChange}
          placeholder="Nome"
        />
        <input
          type="text"
          name="cognome"
          required
          value={data.cognome}
          onChange={handleChange}
          placeholder="Cognome"
        />
        <input
          type="email"
          name="email"
          required
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          required
          value={data.password}
          pattern="^(?=.*[0-9])(?=.*[\W_]).{6,}$"
          onChange={handleChange}
          placeholder="Password"
        />
        <p className="password-info">
          La password deve contenere almeno 6 caratteri, un carattere speciale e un numero.
        </p>
        <button type="submit">Registrati</button>
        <p style={{color:'black'}} >Hai già un account? <Link style={{color:'blue'}} to={'login'}>Login!</Link></p>
      </form>
      {messaggio && <p className={`messaggio ${messaggio.includes("Errore") ? "errore" : "successo"}`}>{messaggio}</p>}
    </div>
  );
}
