import React, { useContext } from "react";
import { ApiContext } from "../contexts/ApiCallsContext";
import "./TeamData.css";

const TeamData = () => {
  const { isTeamData } = useContext(ApiContext);

  return (
    <div className="teamData-container">
      <img src={isTeamData.logo} alt="" />
      <p>{isTeamData.name}</p>
      
    </div>
  );
};

export default TeamData;
