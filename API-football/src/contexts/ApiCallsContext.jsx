// apiContext.js

import React, { createContext, useContext, useState } from "react";
import { APIKeyContext } from "./APIKeyContext";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const { APIKey } = useContext(APIKeyContext);
  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);

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
      data.response.splice(164, 1);
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
      setLeagues(data.response);
    } catch (err) {
      console.log(err);
    }
  };

  const getTeams = async (leagueId) => {
    try {
      const response = await fetch(
        `https://v3.football.api-sports.io/teams?league=${leagueId}&season=2023`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": APIKey,
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const contextValue = {
    countries,
    leagues,
    getCountries,
    getLeagues,
    getTeams,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};
