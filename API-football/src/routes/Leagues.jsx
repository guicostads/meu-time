import React, { useContext } from "react";
import { ApiContext } from "../contexts/ApiCallsContext";
import { Link } from "react-router-dom";
import "./Leagues.css";

const Leagues = () => {
  const { leagues, getTeams, isLoading} = useContext(ApiContext);




  return (
    <div className="leagues-container">
     <h1>Escolha uma liga</h1>
     {isLoading ? <p className="loader"></p> : ''}
     <div className={isLoading ? 'hidden' : 'league'}>
        {leagues.map((league) => (
          <Link to="/teams" className={isLoading ? 'hidden' : ''}>
            <div
              key={league.league.id}
              onClick={() => getTeams(league.league.id)}
            >
              <img src={league.league.logo} alt="team logo" />
              <p>{league.league.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Leagues;
