import pgPromise from "pg-promise";
export const db = new pgPromise()(
  "postgresql://postgres:Fingerskate1@localhost:5432/apis"
);

// inizializzazione server e tabelle
const initDb = async () => {
  try {
    await db.none(`
            CREATE TABLE  IF NOT EXISTS users(
            nome TEXT,
            cognome TEXT,
            password TEXT,
            email TEXT UNIQUE
            
            )
    
            `);
    console.log("tabella creata o gia creata in precedenza");
  } catch (error) {
    console.error(err.message);
  }
};

initDb();
