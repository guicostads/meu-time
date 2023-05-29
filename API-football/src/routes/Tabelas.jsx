import React, { useContext, useEffect, useState } from "react";
import { APIKeyContext } from "../contexts/APIKeyContext";
import { ApiContext } from "../contexts/ApiCallsContext";
import "./Tabelas.css";


const Tabelas = () => {
  const { APIKey } = useContext(APIKeyContext);
  const { countries,
    leagues,
    getCountries,
    getLeagues,
    getTeams} = useContext(ApiContext)




  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="tabelas">
      <h1>Escolha um país</h1>
      <div className="countries">
        {countries.map((country) => (
          <div key={country.id} onClick={() => getLeagues(country.name)}>
            <img src={country.flag} alt="country flag" />
            <p>{country.name}</p>
          </div>
        ))}
      </div>
      {leagues.length !== 0 ? <h1>Leagues</h1> : ""}
      <div className="leagues">
        {leagues.map((league) => (
          <div
            key={league.league.id}
            onClick={() => getTeams(league.league.id)}
          >
            <img src={league.league.logo} alt="team logo" />
            <p>{league.league.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tabelas;
