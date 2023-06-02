import React, { useContext } from "react";
import { ApiContext } from "../contexts/ApiCallsContext";
import { Link } from "react-router-dom";
import "./Teams.css";

const Teams = () => {
  const { getTeams, teams } = useContext(ApiContext);

  return (
    <div className="teams-container">
        <h1>Escolha um time</h1>
      <div className="team">
        {teams.map((team) => (
          <Link key={team.id}>
            <img src={team.logo} alt="team logo" />
            <p>{team.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teams;
