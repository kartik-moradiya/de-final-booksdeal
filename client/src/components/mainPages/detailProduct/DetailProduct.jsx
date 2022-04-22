import React, { useContext, useState, useEffect } from "react";
import ProductItem from "../util/productItem/ProductItem";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../globleState";
import { Link } from "react-router-dom";

const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;
  console.log(products);
  const [detailProducts, setDetailProducts] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const addCart = state.UserApi.addCart;


  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProducts(product);
          setImgUrl(product.images.url);
        }
      });
    }
  }, [params.id, products]);
  console.log(imgUrl);
  return (
    <>
      <div className="detail">
        <img src={imgUrl} alt="product " />
        <div className="box-detail">
          <div className="row">
            <h2>{detailProducts.title}</h2>
            <h6>{detailProducts.product_id}</h6>
          </div>
          <span style={{ fontWeight: "600" }}>₹ {detailProducts.price}</span>
          <p>{detailProducts.description}</p>
          <p>{detailProducts.content}</p>
          <p>
            <span style={{ fontWeight: "600" }}>sold :</span>{" "}
            {detailProducts.sold}
          </p>
          <Link to="/cart" className="cart" onClick={()=> addCart(detailProducts)}>
            Buy Now
          </Link>
        </div>
      </div>

      <div>
        <h2>Related Products</h2>
        <div className="products">
          {products.map((product) => {
            return (
              product.category === detailProducts.category && <ProductItem key={product._id} product={product}/>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
