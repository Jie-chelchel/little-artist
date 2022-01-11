import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";
import Backdrop from "./components/Backdrop";
import SideDrawer from "./components/SideDrawer";
import { useState } from "react";

function App() {
  const [sideToggle, setSideToggle] = useState(false);
  return (
    <Router>
      <Navbar
        click={() => {
          setSideToggle(true);
        }}
      />
      <Backdrop
        show={sideToggle}
        click={() => {
          setSideToggle(false);
        }}
      />
      <SideDrawer
        show={sideToggle}
        click={() => {
          setSideToggle(false);
        }}
      />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products/:id" element={<ProductPage />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route />
          <Route />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
