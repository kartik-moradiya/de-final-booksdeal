import React, { useContext } from "react";
import { GlobalState } from "../../../globleState";

const Filters = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsApi.products;
  const [category, setCategory] = state.productsApi.category;
  const [sort, setSort] = state.productsApi.sort;
  const [search, setSearch] = state.productsApi.search;
  const [categories] = state.CategoriesApi.categories;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  return (
    <div className="cont-filter-menu">
      <div className="filter-menu-main">
        <div className="filter-left">
          <span>Filter : </span>
          <select name="category" value={category} onChange={handleCategory}>
            <option value="">All Products</option>
            {categories.map((category) => (
              <option value={"category=" + category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <input
          className="filter-middle"
          type="text"
          value={search}
          placeholder="Enter your Search..!"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

        <div className="filter-right sort">
          <span>Sort By : </span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Newest</option>
            <option value="sort=oldest">Oldest</option>
            <option value="sort=-sold">Best sales</option>
            <option value="sort=-price">Price: Hight-Low</option>
            <option value="sort=price">Price: Low-Hight</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
