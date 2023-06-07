import React, { useContext, useEffect } from "react";
import { ApiContext } from "../contexts/ApiCallsContext";
import { Link } from "react-router-dom";
import "./Countries.css";

const Countries = () => {
  // data from the api context
  const { countries, getCountries, getLeagues, isLoading } =
    useContext(ApiContext);

  //get the data when the page loads
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="countries-container">
      <h1>Escolha um país</h1>
      {isLoading ? <p className="loader"></p> : ''}
      <div className={isLoading ? 'hidden' : 'country'}>
        {countries.map((country) => (
          <Link to="/leagues" key={country.name} className={isLoading ? 'hidden' : ''}>
            <div
              onClick={() => {
                getLeagues(country.name);
              }}
            >
              <img src={country.flag} alt="country flag" />
              <p>{country.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Countries;
