import express, { json } from "express";
import cors from "cors";
import { registrazione } from "./controllers.js";

const app = express();
const PORT = 5001;
// middleware
app.use(json());
app.use(cors());

// registrazione
app.post('/registrazione', registrazione)

// listen
app.listen(PORT, ()=>{
    console.log(`Server in ascolto su http://localhost:5001`)
});
