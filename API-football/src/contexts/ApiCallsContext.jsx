import React, { createContext, useContext, useEffect, useState } from "react";
import { APIKeyContext } from "./APIKeyContext";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const { APIKey } = useContext(APIKeyContext);
  const [apiData, setApiData] = useState({
    countries: [],
    leagues: [],
    teams: [],
  });
  const [isTeamData, setIsTeamData] = useState({
    name: "",
    logo: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getSelectedTeamData = (name, logo) => {
    setIsTeamData({
      ...isTeamData,
      name: name,
      logo: logo,
    });
    console.log(isTeamData);
  };

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
      setApiData((prevApiData) => ({
        ...prevApiData,
        countries: filteredCountries,
      }));
    }
  };

  const getLeagues = async (country) => {
    const url = `https://api-football-v1.p.rapidapi.com/v3/leagues?country=${country}`;
    const data = await fetchApiData(url);
    if (data) {
      setApiData((prevApiData) => ({
        ...prevApiData,
        leagues: data.response,
      }));
      sessionStorage.setItem("leagues", JSON.stringify(data.response));
    }
  };

  const getTeams = async (leagueId) => {
    const url = `https://api-football-v1.p.rapidapi.com/teams/league/${leagueId}`;
    const data = await fetchApiData(url);
    if (data) {
      setApiData((prevApiData) => ({
        ...prevApiData,
        teams: data.api.teams,
      }));
      sessionStorage.setItem("teams", JSON.stringify(data.api.teams));
    }
  };

  useEffect(() => {
    const storedLeagues = sessionStorage.getItem("leagues");
    if (storedLeagues && storedLeagues !== "undefined") {
      setApiData((prevApiData) => ({
        ...prevApiData,
        leagues: JSON.parse(storedLeagues),
      }));
    }

    const storedTeams = sessionStorage.getItem("teams");
    if (storedTeams && storedTeams !== "undefined") {
      setApiData((prevApiData) => ({
        ...prevApiData,
        teams: JSON.parse(storedTeams),
      }));
    }
  }, []);

  useEffect(() => {
    console.log(apiData.countries);
  }, [apiData.countries]);

  useEffect(() => {
    console.log(apiData.leagues);
  }, [apiData.leagues]);

  const contextValue = {
    apiData,
    setApiData,
    getCountries,
    getLeagues,
    getTeams,
    isLoading,
    getSelectedTeamData,
    isTeamData,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};
