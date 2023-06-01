import React, { useContext, useEffect, useRef, useState } from "react";
import { ApiContext } from "../contexts/ApiCallsContext";
import { Link } from "react-router-dom";
import "./Countries.css";

const Countries = () => {
  // data from the api context
  const { countries, getCountries, getLeagues } = useContext(ApiContext);

  //get the data when the page loads
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="countries-container">
      <h1>Escolha um país</h1>
      <div className="countries">
        {countries.map((country) => (
          <Link to="/leagues">
            <div
              key={country.code}
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
