import React, { useContext, useState } from "react";
import "./Login.css";
import { APIKeyContext } from "../contexts/APIcontext";

const Login = () => {
  const { APIKey, setAPIKey, validateAPIKey, isLoading, errorMsg, setErrorMsg } =
    useContext(APIKeyContext);

  return (
    <div className="login-container">
      <h1>Meu Time</h1>
      <div className="login">
        <h2>Login</h2>
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
