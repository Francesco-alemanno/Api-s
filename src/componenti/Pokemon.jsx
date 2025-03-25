import { useState, useEffect, useRef } from "react";
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
  const [isBattling, setIsBattling] = useState(false);
  
  const intervalRef = useRef(null);  // Per mantenere il riferimento all'intervallo

  const handleSearch1 = (e) => {
    e.preventDefault();
    setSearchPokemon1(pokemon1.toLowerCase());
  };

  const handleSearch2 = (e) => {
    e.preventDefault();
    setSearchPokemon2(pokemon2.toLowerCase());
  };

  useEffect(() => {
    if (data1) {
      const hp = data1.stats.find(stat => stat.stat.name === "hp").base_stat;
      setHp1(hp);
    }
    if (data2) {
      const hp = data2.stats.find(stat => stat.stat.name === "hp").base_stat;
      setHp2(hp);
    }
  }, [data1, data2]);

  const handleBattle = () => {
    if (isBattling) return;
  
    setIsBattling(true);
    setBattleLog("Che il combattimento abbia inizio!");
  
    intervalRef.current = setInterval(() => {
      setHp1((prevHp1) => {
        setHp2((prevHp2) => {
          // Controlla gli HP attuali
          if (prevHp1 <= 0 || prevHp2 <= 0) {
            clearInterval(intervalRef.current);
            setIsBattling(false);
            setBattleLog(
              prevHp1 <= 0 
                ? `${data2.name} vince contro ${data1.name}!` 
                : `${data1.name} vince contro ${data2.name}!`
            );
            return prevHp2;
          }
  
          // Scegli chi attacca
          const attackingPokemon = Math.random() < 0.5 ? "pokemon1" : "pokemon2";
          
          if (attackingPokemon === "pokemon1") {
            setBattleLog(`${data1.name} attacca contro ${data2.name}!`);
            return prevHp2 - 5;
          } else {
            setBattleLog(`${data2.name} attacca contro ${data1.name}!`);
            // Modifica hp1 invece di hp2
            setHp1(prev => prev - 5);
            return prevHp2;
          }
        });
        return prevHp1;
      });
    }, 2000);
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
      {battleLog && <p>{battleLog}</p>}
      {hp1 <= 0 && <p>{data2 ? `${data2.name} wins!` : "Opponent wins!"}</p>}
      {hp2 <= 0 && <p>{data1 ? `${data1.name} wins!` : "Opponent wins!"}</p>}
      {isLoading1 && <p>Loading Pokemon 1...</p>}
      {isLoading2 && <p>Loading Pokemon 2...</p>}
      {error1 && <p>Error loading Pokemon 1.</p>}
      {error2 && <p>Error loading Pokemon 2.</p>}

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
    

      
    </div>
  );
}
