import React, { useContext, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { GlobalState } from "../../../globleState";
import Loder from "../util/Loder/Loder";

const Login = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies("refreshtoken");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const state = useContext(GlobalState)
  const [token , setToken] = state.token
  const [loading , setLoading] = useState(false)

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post("http://localhost:5000/user/login", {
        ...user,
      });
      // console.log(res);
      localStorage.setItem("firstLogin", res.data.accessToken);
      setToken(res.data.accessToken)
      // console.log(localStorage.getItem("firstLogin"));
      setCookie("refreshtoken", res.refreshtoken, {
        path: "/user/refresh_token",
      });
      setLoading(false)
      history.push("/");

      // if we use window then refresh page will fire
      // window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  if(loading) return <Loder/>
  return (
    <div className="log-page">
    <div className="login-page">
      <form>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          required
          value={user.email}
          onChange={onChangeInput}
          placeholder="e.g example123@xyz.com"
        />

        <input
          type="password"
          name="password"
          required
          value={user.password}
          onChange={onChangeInput}
          placeholder="password"
        />

        <div className="row">
          <a onClick={handleSubmit} type="submit" className="reg">
            Login
          </a>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
