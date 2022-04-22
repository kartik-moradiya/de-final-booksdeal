import { useState, useEffect } from "react";
import axios from "axios";
// require('dotenv').config()

const ProductsApi = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  // console.log(url);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/products?limit=${page * 8}&${category}&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setResult(res.data.result)
    };
    getProducts();
  }, [callback, page, category, sort, search , result]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
};

export default ProductsApi;


