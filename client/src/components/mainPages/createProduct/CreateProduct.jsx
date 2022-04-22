import React, { useContext, useEffect, useState } from "react";
import "./createProduct.css";
import { GlobalState } from "../../../globleState";
// import Loder from "../util/Loder/Loder";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  content: "",
  category: "",
  _id:''
};

const CreateProduct = () => {
  const history = useHistory();
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories, setCategories] = state.CategoriesApi.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.UserApi.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsApi.callback  
  const params = useParams();
   const [products, setProducts] = state.productsApi.products
   const [onEdit, setOnEdit] = useState(false);
        
  useEffect(()=>{
      if(params.id){
        setOnEdit(true)
          products.forEach(product => {
            if(product._id === params.id){
              setProduct(product)
              setImages(product.images)
            }
          });
      }else{
        setOnEdit(false)
        setProduct(initialState);
        setImages(false)
      }
  }, [params.id , products])

  
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      // 5mb
      if (file.size > 1024 * 1024 * 5) return alert("size is to large");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setLoading(false);
      setImages(res.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      if (!images) return alert("No Image Upload");

      if(onEdit){
        await axios.put(`http://localhost:5000/api/products/${product._id}`, {...product, images}, {
            headers: {Authorization: token}
        })
    }else{
        await axios.post('http://localhost:5000/api/products', {...product, images}, {
            headers: {Authorization: token}
        })
    }
      alert(`Product successfully store`)
      setCallback(!callback)
      setImages(false)
      setProduct(initialState)
      history.push('/')
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <div className="create_product">
      <div className="upload">
        <input
          type="file"
          name="file"
          className="file_up"
          onChange={handleUpload}
        />
        {loading ? (
          <div className="file_img_loder">
            <div className="loader-img"></div>
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form>
        <div className="row">
          <label htmlFor="product_id">Product Id</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            disabled={onEdit}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            rows="7"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <span onClick={handleSubmit} className="save-form">
        {onEdit? "Update" : "Create"}
        </span>
      </form>
    </div>
  );
};

export default CreateProduct;
