import React, { useEffect, useState } from "react";

const Login = () => {
  const [key, setKey] = useState("");

  return (
    <div>
      <h1>Meu Time</h1>
      <div>
        <h2>login</h2>
        <input type="text" placeholder="Digite sua API Key" />
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
