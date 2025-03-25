import { useState, useEffect } from "react";
import useSWR from "swr";

export default function Pokemon() {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [searchPokemon1, setSearchPokemon1] = useState("");
  const [searchPokemon2, setSearchPokemon2] = useState("");
  
  const fetcher = (url) => fetch(url).then((response) => response.json());
  
  const { data: data1, isLoading: isLoading1, error: error1 } = useSWR(
    searchPokemon1 ? `https://pokeapi.co/api/v2/pokemon/${searchPokemon1}` : null,
    fetcher
  );
  
  const { data: data2, isLoading: isLoading2, error: error2 } = useSWR(
    searchPokemon2 ? `https://pokeapi.co/api/v2/pokemon/${searchPokemon2}` : null,
    fetcher
  );

  const [hp1, setHp1] = useState(null);
  const [hp2, setHp2] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [isBattling, setIsBattling] = useState(false);  // per evitare che il combattimento parta più volte

  useEffect(() => {
    if (data1 && data2) {
      setHp1(data1.stats.find((stat) => stat.stat.name === "hp").base_stat);
      setHp2(data2.stats.find((stat) => stat.stat.name === "hp").base_stat);
    }
  }, [data1, data2]);

  const handleSearch1 = (e) => {
    e.preventDefault();
    setSearchPokemon1(pokemon1.toLowerCase());
  };

  const handleSearch2 = (e) => {
    e.preventDefault();
    setSearchPokemon2(pokemon2.toLowerCase());
  };

  const handleBattle = () => {
    if (hp1 && hp2 && !isBattling) {
      setBattleLog([]); // Resetta il log della battaglia
      setIsBattling(true); // Inizia il combattimento

      const combattimento = setInterval(() => {
        if (hp1 <= 0 || hp2 <= 0) {
          clearInterval(combattimento);
          setBattleLog((prevLog) => [
            ...prevLog,
            hp1 <= 0 ? `${data2.name} wins!` : `${data1.name} wins!`,
          ]);
          setIsBattling(false); // Ferma il combattimento
         
          return;
        }

        if (hp1 > hp2) {
          setHp1((prevHp1) => {
            const newHp = prevHp1 - 20;
            setBattleLog((prevLog) => [
              ...prevLog,
              `${data2.name} attacca ${data1.name}`,
            ]);
            return newHp;
          });
        } else if (hp2 > hp1) {
          setHp2((prevHp2) => {
            const newHp = prevHp2 - 20;
            setBattleLog((prevLog) => [
              ...prevLog,
              `${data1.name} attacca ${data2.name}`,
            ]);
            return newHp;
          });
        } else if(hp1<=0 || hp2 <=0){
          clearInterval(combattimento)
        }

        else {
          // In caso di pareggio tra HP, entrambe le parti attaccano
          setHp1((prevHp1) => prevHp1 - 10);
          setHp2((prevHp2) => prevHp2 - 10);
          setBattleLog((prevLog) => [
            ...prevLog,
            "Both Pokémon attack simultaneously!",
          ]);
          
        }
       
      }, 1000);
    }
  };

  return (
    <div>
      <h1>Pokemon Battle</h1>
      <form onSubmit={handleSearch1}>
        <input
          type="text"
          placeholder="Search Pokemon 1"
          value={pokemon1}
          onChange={(e) => setPokemon1(e.target.value)}
        />
        <button>Search Pokemon 1</button>
      </form>
      <form onSubmit={handleSearch2}>
        <input
          type="text"
          placeholder="Search Pokemon 2"
          value={pokemon2}
          onChange={(e) => setPokemon2(e.target.value)}
        />
        <button>Search Pokemon 2</button>
      </form>

      {isLoading1 && <p>Loading Pokemon 1...</p>}
      {isLoading2 && <p>Loading Pokemon 2...</p>}
      {error1 && <p>Error loading Pokemon 1.</p>}
      {error2 && <p>Error loading Pokemon 2.</p>}

      {/* Verifica se i dati sono disponibili prima di renderizzare */}
      {data1 && !error1 ? (
        <div className="pokemon-card">
          <h2>{data1.name.toUpperCase()}</h2>
          <img src={data1.sprites.front_default} alt={data1.name} />
          <p><strong>Type:</strong> {data1.types.map((t) => t.type.name).join(", ")}</p>
          <p><strong>Height:</strong> {data1.height}</p>
          <p><strong>Weight:</strong> {data1.weight}</p>
        </div>
      ) : null}

      {data2 && !error2 ? (
        <div className="pokemon-card">
          <h2>{data2.name.toUpperCase()}</h2>
          <img src={data2.sprites.front_default} alt={data2.name} />
          <p><strong>Type:</strong> {data2.types.map((t) => t.type.name).join(", ")}</p>
          <p><strong>Height:</strong> {data2.height}</p>
          <p><strong>Weight:</strong> {data2.weight}</p>
        </div>
      ) : null}

      {/* Verifica se entrambe le informazioni sono caricate prima di visualizzare il bottone */}
      {data1 && data2 && !isBattling && (
        <button onClick={handleBattle}>Start Battle!</button>
      )}

      <div className="battle-log">
        <h3>Battle Log</h3>
        {battleLog.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>

      {hp1 <= 0 && <p>{data2 ? `${data2.name} wins!` : "Opponent wins!"}</p>}
      {hp2 <= 0 && <p>{data1 ? `${data1.name} wins!` : "Opponent wins!"}</p>}
    </div>
  );
}
