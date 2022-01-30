import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import ProductItem from "../utils/productItem/ProductItem";

function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;
  return (
    <>
      <div className="products">
        {products.map((product) => {
          return <ProductItem product={product} key={product._id} />;
        })}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
