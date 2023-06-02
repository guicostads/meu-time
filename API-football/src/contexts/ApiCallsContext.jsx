// apiContext.js

import React, { createContext, useContext, useState } from "react";
import { APIKeyContext } from "./APIKeyContext";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const { APIKey } = useContext(APIKeyContext);
  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);

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
      // taking the 'null' country off
      data.response.splice(164, 1);
      setCountries(data.response);
    } catch (err) {
      console.log(err);
    }
  };

  const getLeagues = async (countryName) => {
    try {
      // need to fix this
      localStorage.removeItem("leagues"); // Clear the previous leagues data
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
      localStorage.setItem("leagues", JSON.stringify(data.response));
    } catch (err) {
      console.log(err);
    }
  };

  const getTeams = async (leagueId) => {
    try {
      const response = await fetch(
        `https://api-football-v1.p.rapidapi.com/teams/league/${leagueId}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": APIKey,
          },
        }
      );
      const data = await response.json();
      console.log(data.api.teams);
      setTeams(data.api.teams);
    } catch (err) {
      console.log(err);
    }
  };

  const contextValue = {
    countries,
    leagues,
    teams,
    setLeagues,
    getCountries,
    getLeagues,
    getTeams,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};
