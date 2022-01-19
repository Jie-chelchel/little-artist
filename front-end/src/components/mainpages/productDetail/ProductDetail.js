import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
function ProductDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;
  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    console.log("dd");
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setProductDetail(product);
        }
      });
    }
  }, [params.id, products]);
  if (productDetail.length === 0) return null;

  return (
    <>
      <div className="detail">
        <img src={productDetail.images.url} alt="" />
        <div className="detail_box">
          <div className="row">
            <h2>{productDetail.title}</h2>
            <h6>#id: {productDetail.product_id}</h6>
          </div>
          <span>$ {productDetail.price}</span>
          <p>{productDetail.description}</p>
          <p>{productDetail.content}</p>
          <p>Sold: {productDetail.sold}</p>
          <Link to="/cart" className="cart">
            Buy Now
          </Link>
        </div>
      </div>
      <div className="related_box">
        <h2>Related Products</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === productDetail.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
