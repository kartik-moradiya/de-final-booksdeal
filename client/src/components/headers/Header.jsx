import React, { useContext, useState } from "react";
import { GlobalState } from "../../globleState";
import Menu from "./icon/menu.png";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.png";
import Logo from "./icon/logo.png";
import admin from "./icon/admin.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.UserApi.isLogged;
  const [isAdmin, setIsAdmin] = state.UserApi.isAdmin;
  const [cart , setCart] = state.UserApi.cart

  const logoutUser = async () => {
    await axios.get("http://localhost:5000/user/logout");

    localStorage.removeItem("firstLogin");
    history.push("/");
    setIsLogged(false);
    setIsAdmin(false)
    setCart([])
  };
  // console.log(state);

  const [menu , setMenu] = useState(false)

  const styleMenu = {
    left: menu ? 0 : "-100%"
}

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="menu" width="30"  />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">
            {isAdmin ? (
              <img src={admin} alt="ADMIN" width="100" />
            ) : (
              <img src={Logo} alt="logo" width="100" />
            )}
          </Link>
        </h1>
      </div>

      <div className="left-header">
        <ul style={styleMenu}>
          <li>
            <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link to="/create_product">Create Product</Link>
              </li>
              <li>
                <Link to="/category">Categories</Link>
              </li>
            </>
          )}
          {isLogged ? (
            <>
              <li>
                <Link to="/history">History</Link>
              </li>

              <li>
                <Link to="/" onClick={logoutUser}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">LOGIN ✥ REGISTER</Link>
            </li>
          )}

          <li onClick={() => setMenu(!menu)}>
            <img src={Close} alt="close" className="menu" />
          </li>
        </ul>

        {isAdmin ? (
          ""
        ) : (
          <div className="cart-icon">
            <span>{cart.length}</span>
            <Link to="/cart">
              <img src={Cart} alt="cart" width="50" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
