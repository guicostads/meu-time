import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [APIKey, setAPIKey] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const validateAPIKey = async () => {
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
        setIsLoading(true);
        setTimeout(() => {
          navigate("/tabelas");
        }, 1000); // Redirect after 1 second
      }
    } catch (err) {
      setErrorMsg("API Key inválida.");
    }
  };

  return (
    <div className="login-container">
      <h1>Meu Time</h1>
      <div className="login">
        <h2>login</h2>
        <input
          type="text"
          placeholder="Digite sua API Key"
          onChange={(e) => setAPIKey(e.target.value)}
          onClick={() => setErrorMsg("")}
        />
        <button onClick={validateAPIKey}>Acessar</button>
        <span>{errorMsg}</span>
        <p>
          Não possui a chave de acesso? crie sua conta{" "}
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
