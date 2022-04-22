import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../globleState";
import EmptyBox from "../../headers/icon/empty-box.png";
import Payment from "../../headers/icon/payment.png";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import PaypalButton from "./PaypalButton";

const Cart = () => {
  const history = useHistory();
  const state = useContext(GlobalState);
  const [cart, setCart] = state.UserApi.cart;
  const [total, setTotal] = useState(0);
  const [token] = state.token;
  const [stripetoken, setStripetoken] = useState(null);
  // const [user] = state.UserApi.user

  const onToken = (token) => {
    setStripetoken(token);
  };

  const KEY =
    "pk_test_51KUSBZAnXPxAS4PrKIZHKouq3kUNydPdLrPEudX4zrmrtZstfRwn2jk3JnUgL6GR6PCpYiAuAfz6X0Tbr0AON7oo00RGjsU9p5";

  const addToCart = async (cart) => {
    await axios.patch(
      "http://localhost:5000/user/addcart",
      { cart },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  };

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [stripetoken, cart, total]);

  const inrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) item.quantity += 1;
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    // e.preventdefault();
    cart.forEach((item) => {
      if (item._id === id)
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product ? ")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;
    await axios.post(
      "http://localhost:5000/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );
    setCart([]);
    addToCart([]);
    alert('you have successFully placed order..')
  };

  if (cart.length === 0)
    return (
      <div className="emptyBox">
        <h2
          className="emptyText"
          style={{ textAlign: "center", fontSize: "5rem", color: "gray" }}
          draggable="false"
        >
          Cart Empty
        </h2>
        <img
          className="emptyImg"
          src={EmptyBox}
          alt="empty"
          draggable="false"
        />
      </div>
    );
  return (
    <>
      {cart.map((product) => (
        <>
          <div className="detail cart" key={product._id}>
            <img src={product.images.url} alt="img" className="img_container" />
            <div className="box-detail">
              <div className="row">
                <h2 className="titile-row">{product.title}</h2>
                <h6 style={{ fontSize: "10px", color: "GrayText" }}>
                  id :{product.product_id}
                </h6>
              </div>
              <span style={{ fontWeight: "500" }}>
                ₹ {product.price * product.quantity}
              </span>
              <p>{product.description}</p>
              <p>{product.content}</p>
              <p>Sold: {product.sold}</p>
              <div className="amount">
                <a onClick={() => decrement(product._id)}>-</a>
                <span>{product.quantity}</span>
                <a onClick={() => inrement(product._id)}>+</a>
              </div>

              <div
                className="delete"
                onClick={() => removeProduct(product._id)}
              >
                ×
              </div>
              <div className="btn-name">
                <Link to={`/detail/${product._id}`} className="cart">
                  view
                </Link>
              </div>
            </div>
          </div>
          <hr className="hr-amount" />
        </>
      ))}
      <div className="total">
        <h3 className="amount-text">Total Amount : ₹ {total} </h3>
        <div className="checkMe">
          <PaypalButton total={total} tranSuccess={tranSuccess} />
        </div>
      </div>
    </>
  );
};

export default Cart;
