import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css"; // 👈 Importiamo il file CSS
import { Link } from "react-router-dom";
export default function Login() {
  const navTo = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [messaggio, setMessaggio] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setMessaggio("❌ Credenziali errate");
      } else {
        response.json()
        setMessaggio("✅ Login avvenuto con successo!");
        setTimeout(() => navTo("/home"), 1000);
        localStorage.setItem('loggato', 'logged')
      }
    } catch (error) {
      setMessaggio("Errore: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
      <h2>Login</h2>

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
          
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Login</button>
        <p >Non hai ancora un account? </p> 
        
        <p><Link to={'/'} style={{color:'blue', fontSize:'12px'}}>Creane uno!</Link></p>
        {messaggio && <p>{messaggio}</p>}
      </form>
    </div>
  );
}
