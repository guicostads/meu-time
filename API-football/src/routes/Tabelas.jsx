import React, { useContext, useEffect, useState } from "react";
import { APIKeyContext } from "../contexts/APIcontext";

const Tabelas = () => {
  const { APIKey } = useContext(APIKeyContext);
  const [countries, setCountries] = useState([{}]);

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

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      <h1>Escolha um país</h1>
      {countries.map((country) => (
        <div key={country.code}>
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
};
export default Tabelas;
