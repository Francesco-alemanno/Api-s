import { db } from "./initDb.js";
import pgPromise from "pg-promise";

// registrazione
export const registrazione = async (req, res) => {
  const { nome, cognome, email, password } = req.body;
  try {
    await db.none(
      `INSERT INTO users (nome, cognome, email, password) VALUES ($1,$2,$3,$4)`,
      [nome, cognome, email, password]
    );
    res.status(200).json({ message: "registrazione effettuata con successo!" });
  } catch (error) {
    res.status(500).json({ message: "errore durante la registrazione" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userEmail = await db.oneOrNone(
      "SELECT * FROM users WHERE email=$1 AND password=$2",
      [email, password] 
    );
    if (!userEmail) {
      res.status(400).json({ message: "credenziali errate, riprova" });
    } else {
      res.status(200).json({ message: "login avvenuto con successo" });
    }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
