import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Headers from "./components/headers/Header";
import MainPages from "./components/mainpages/pages";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Headers />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
