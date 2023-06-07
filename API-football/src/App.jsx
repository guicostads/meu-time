import { Outlet } from "react-router-dom";
import { APIKeyContextProvider } from "./contexts/APIKeyContext";
import { ApiContext, ApiProvider } from "./contexts/ApiCallsContext";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <APIKeyContextProvider>
          <ApiProvider>
            <Outlet />
          </ApiProvider>
        </APIKeyContextProvider>
      </div>
    </>
  );
}

export default App;
