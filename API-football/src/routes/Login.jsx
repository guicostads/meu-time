import React, { useContext, useState } from "react";
import "./Login.css";
import { APIKeyContext } from "../contexts/APIKeyContext";

const Login = () => {
  const { setAPIKey, validateAPIKey, isLoading, errorMsg, setErrorMsg } =
    useContext(APIKeyContext);

  return (
    <div className="login-container">
      <h1>Meu Time</h1>
      <div className="login">
        <h2>Login</h2>
        <input
          type="text"
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
            href="https://rapidapi.com/auth/sign-up?referral=/api-sports/api/api-football/"
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
