import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Headers from "./components/headers/Header";
import MainPages from "./components/mainpages/pages";

function App() {
  return (
    <DataProvider>
      <Router>
        <Headers />
        <MainPages />
      </Router>
    </DataProvider>
  );
}

export default App;
