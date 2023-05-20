import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { APIKeyContext } from "../contexts/APIcontext";

const Login = () => {
  const navigate = useNavigate();
  const { APIKey, setAPIKey } = useContext(APIKeyContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateAPIKey = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api-football-v1.p.rapidapi.com/v3/timezone",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": APIKey,
          },
        }
      );
      const data = await response.json();
      console.log(data);

      // Check if the response has errors
      if (data.errors.length === 0) {
        navigate("/tabelas");
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMsg("API Key inválida.");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Meu Time</h1>
      <div className="login">
        <h2>login</h2>
        <input
          type="text"
          value={APIKey}
          placeholder="Insira aqui sua sua API Key"
          onChange={(e) => setAPIKey(e.target.value)}
          onClick={() => setErrorMsg("")}
        />
        <button onClick={validateAPIKey}>
          {isLoading ? <p className="loader"></p> : <span>Acessar</span>}
        </button>
        <span>{errorMsg}</span>
        <p>
          Não possui a API key? Crie sua conta{" "}
          <a
            href="https://www.api-football.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
          >
            nesse link para obter.
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
