import { useState, useEffect } from "react";
import axios from "axios";

function ProductsApi() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:8000/api/products");
    console.log(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products: [products, setProducts],
  };
}

export default ProductsApi;
