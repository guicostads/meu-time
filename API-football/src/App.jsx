import { Outlet } from "react-router-dom";
import { APIKeyContextProvider } from "./contexts/APIcontext";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <APIKeyContextProvider>
          <Outlet />
        </APIKeyContextProvider>
      </div>
    </>
  );
}

export default App;
