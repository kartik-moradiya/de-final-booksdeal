import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loder from "../util/Loder/Loder";

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading , setLoading] = useState(false)

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const resisterSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post("http://localhost:5000/user/register", {
        ...user,
      });
      // console.log(user);
      localStorage.setItem("firstLogin", res.data.accessToken);
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
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          required
          value={user.name}
          onChange={onChangeInput}
          placeholder="Your Name"
        />
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
          <span onClick={resisterSubmit} class="reg">
            Register
          </span>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
