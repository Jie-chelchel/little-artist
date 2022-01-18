import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function ProductDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;
  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setProductDetail(product);
        }
      });
    }
  }, [params, products]);
  console.log(productDetail);
  if (productDetail.length === 0) return null;

  return (
    <div className="detail">
      <img src={productDetail.images.url} alt="" />
      <div className="box_detail">
        <div className="row">
          <h2>{productDetail.title}</h2>
          <h6>{productDetail.product_id}</h6>
        </div>
        <span>$ {productDetail.price}</span>
        <p>{productDetail.description}</p>
        <p>{productDetail.content}</p>
        <p>Sold: {productDetail.sold}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
