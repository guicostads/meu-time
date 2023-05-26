import React, { useContext, useEffect, useState } from "react";
import { APIKeyContext } from "../contexts/APIcontext";
import "./Tabelas.css";

const Tabelas = () => {
  const { APIKey } = useContext(APIKeyContext);
  const [countries, setCountries] = useState([]);
  const [leagues, SetLeagues] = useState([]);

  const getCountries = async () => {
    try {
      const response = await fetch(
        "https://api-football-v1.p.rapidapi.com/v3/countries",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": APIKey,
          },
        }
      );
      const data = await response.json();
      console.log(data.response);
      setCountries(data.response);
    } catch (err) {
      console.log(err);
    }
  };

  const getLeagues = async (countryName) => {
    try {
      const response = await fetch(
        `https://api-football-v1.p.rapidapi.com/v3/leagues?country=${countryName}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": APIKey,
          },
        }
      );
      const data = await response.json();
      console.log(data.response);
      SetLeagues(data.response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      <h1>Escolha um país</h1>
      <div className="countries">
        {countries.map((country) => (
          <div key={country.id} onClick={() => getLeagues(country.name)}>
            <p>{country.name}</p>
          </div>
        ))}
      </div>
      <div className="leagues">
        {leagues.map((league) => (
          <div key={league.id}>
            <p>{league.league.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tabelas;
