import React, { useContext } from "react";
import { ApiContext } from "../contexts/ApiCallsContext";
import { Link } from "react-router-dom";
import "./Teams.css";

const Teams = () => {
  const { apiData, isLoading, getSelectedTeamData } = useContext(ApiContext);

  if (isLoading) {
    return (
      <div className="teams-container">
        <h1>Escolha um time</h1>
        <p className="loader"></p>
      </div>
    );
  }

  return (
    <div className="teams-container">
      <h1>Escolha um time</h1>
      <div className="team">
        {apiData.teams.map((team) => (
          <Link
            to="/teamData"
            key={team.id}
            className=""
            onClick={() => getSelectedTeamData(team.name, team.logo)}
          >
            <img src={team.logo} alt="team logo" />
            <p>{team.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teams;
