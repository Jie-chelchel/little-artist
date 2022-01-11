import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Navbar />

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
