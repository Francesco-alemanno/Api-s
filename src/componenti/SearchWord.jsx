import { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";

export default function SearchWord() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const [word, setWord] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { data, isLoading } = useSWR(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`,
    fetcher,
    {
      onSuccess: (response) => {
        if (response.title === "No Definitions Found") {
          setErrorMessage(response.message);
        } else {
          setErrorMessage(null);
        }
      },
      onError: () => setErrorMessage(""),
    }
  );
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchWord(word);
  };
  console.log(searchWord);
  console.log(data);
  return (
    <>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search a word!"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />

          <button type="submit">Search!</button>
        </form>
      </div>
      {isLoading && <p style={{ color: "green" }}>Caricamento in corso...</p>}

      {errorMessage && <p style={{ color: "red" }}> {errorMessage}</p>}
      <div>
        {Array.isArray(data)
          ? data.map((x, index) => (
              <div key={index}>
                <p> Word:{x.word}</p>
                <p> Phonetics:{x.phonetic}</p>
                <ul>
                  Definitions:
                  <li>{x.meanings[0].definitions[0].definition}</li>
                </ul>

                <p>SourceUrls: {x.sourceUrls}</p>
              </div>
            ))
          : null}
      </div>
      <Link to={'/'}>Home</Link>
    </>
  );
}
