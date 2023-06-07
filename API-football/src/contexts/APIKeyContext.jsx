import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const APIKeyContext = createContext();

export const APIKeyContextProvider = ({ children }) => {
  const storedAPIKey = sessionStorage.getItem("APIKey") || "";
  const [APIKey, setAPIKey] = useState(storedAPIKey);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

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

      if (data.errors.length === 0) {
        sessionStorage.setItem("APIKey", APIKey);
        navigate("/countries");
      }
    } catch (err) {
      setErrorMsg("API Key inválida.");
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    APIKey,
    setAPIKey,
    validateAPIKey,
    isLoading,
    errorMsg,
  };

  return (
    <APIKeyContext.Provider value={contextValue}>
      {children}
    </APIKeyContext.Provider>
  );
};
