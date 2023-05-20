import { createContext, useState } from "react";

export const APIKeyContext = createContext();

export const APIKeyContextProvider = ({ children }) => {
  const [APIKey, setAPIKey] = useState("");

  return (
    <APIKeyContext.Provider value={{ APIKey, setAPIKey }}>
      {children}
    </APIKeyContext.Provider>
  );
};
