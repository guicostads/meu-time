import React, { createContext, useContext, useEffect, useState } from "react";
import { APIKeyContext } from "./APIKeyContext";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const { APIKey } = useContext(APIKeyContext);
  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApiData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key": APIKey,
        },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getCountries = async () => {
    const data = await fetchApiData(
      "https://api-football-v1.p.rapidapi.com/v3/countries"
    );
    if (data) {
      const filteredCountries = data.response.filter(
        (country) => country.name !== "World"
      );
      setCountries(filteredCountries);
    }
  };

  const getLeagues = async (country) => {
    const url = `https://api-football-v1.p.rapidapi.com/v3/leagues?country=${country}`;
    const data = await fetchApiData(url);
    if (data) {
      setLeagues(data.response);
      sessionStorage.setItem("leagues", JSON.stringify(data.response));
    }
  };

  const getTeams = async (leagueId) => {
    const url = `https://api-football-v1.p.rapidapi.com/teams/league/${leagueId}`;
    const data = await fetchApiData(url);
    if (data) {
      setTeams(data.api.teams);
      sessionStorage.setItem("teams", JSON.stringify(data.api.teams));
    }
  };

  useEffect(() => {
    const storedLeagues = sessionStorage.getItem("leagues");
    if (storedLeagues && storedLeagues !== "undefined") {
      setLeagues(JSON.parse(storedLeagues));
    }

    const storedTeams = sessionStorage.getItem("teams");
    if (storedTeams && storedTeams !== "undefined") {
      setTeams(JSON.parse(storedTeams));
    }
  }, []);

  useEffect(() => {
    console.log(countries);
  }, [countries]);

  useEffect(() => {
    console.log(leagues);
  }, [leagues]);

  const contextValue = {
    countries,
    leagues,
    teams,
    setLeagues,
    getCountries,
    getLeagues,
    getTeams,
    isLoading
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};
