import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../globleState";
import "./categories.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.CategoriesApi.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.CategoriesApi.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `http://localhost:5000/api/catagory/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
        setOnEdit(false)
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/catagory",
          { name: category },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        alert(res.data.msg);
      }

      setCategory("");
      setCallback(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const editCategory = (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/catagory/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <form>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <a onClick={createCategory} className="save-form">
          {onEdit ? 'update' : 'save'}
        </a>
      </form>

      <div className="col">
        {categories.map((category) => (
          <div className="row" key={category._id}>
            <p className="name-category">{category.name}</p>
            <div>
              <span
                onClick={() => editCategory(category._id, category.name)}
                className="save-form"
              >
                Edit
              </span>
              <span
                onClick={() => deleteCategory(category._id)}
                className="save-form"
              >
                Delete
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
