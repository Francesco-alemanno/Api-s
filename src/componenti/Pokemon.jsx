import { useState } from "react";
import useSWR from "swr";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState("");
  const [searchPokemon, setSearchPokemon] = useState("");
  const fetcher = (url) => fetch(url).then((response) => response.json());
  const { data, isLoading, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${searchPokemon}`,
    fetcher
  );
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPokemon(pokemon);
  };
  console.log(data);
  {
    isLoading && <p>Caricamento in corso...</p>;
  }
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search your pokemon!"
          value={pokemon}
          onChange={(e) => setPokemon(e.target.value)}
        />
        <button>Search!</button>
      </form>
      {data && !error && (
        <div className="pokemon-card">
          <h2>{data.name.toUpperCase()}</h2>
          <img src={data.sprites.front_default} alt={data.name} />
          <p><strong>Type:</strong> {data.types.map((t) => t.type.name).join(", ")}</p>
          <p><strong>Height:</strong> {data.height}</p>
          <p><strong>Weight:</strong> {data.weight}</p>
        </div>
      )}
    </div>
  );
}
