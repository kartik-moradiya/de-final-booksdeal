import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../globleState";
import ProductItem from "../util/productItem/ProductItem";
import Loder from "../util/Loder/Loder";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";

const Products = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsApi.products;
  const [isAdmin] = state.UserApi.isAdmin;
  const [callback, setCallback] = state.productsApi.callback;
  const [loading, setLoading] = useState(false);
  const [token] = state.token;
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`http://localhost:5000/api/products`);
      setProducts(res.data.products);
    };
    getProducts();
  }, []);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "http://localhost:5000/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };
  if (loading)
    return (
      <div>
        <Loder />
      </div>
    );
  return (
    <>
       <Filters />
      {isAdmin && (
        <div className="delete-all">
          <span>select All</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <a className="delete-button" onClick={deleteAll}>Delete All</a>
        </div>
      )}
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>
      <LoadMore />
      {products.length === 0 && <Loder />}
    </>
  );
};

export default Products;
