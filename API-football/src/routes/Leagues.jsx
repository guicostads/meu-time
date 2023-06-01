import React, { useContext } from "react";
import { ApiContext } from "../contexts/ApiCallsContext";
import './Leagues.css'


const Leagues = () => {
  const { leagues, getTeams} = useContext(ApiContext);
  
  return (
    <div className="leagues-container">
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

export default Leagues;
