import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../globleState";

const ButtonRender = ({ product, deleteProduct }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.UserApi.isAdmin;
  const addCart = state.UserApi.addCart;

  return (
    <>
      {isAdmin ? (
        <>
          <div className="row_btn">
            <Link
              id="btn_buy"
              to="#!"
              onClick={() =>
                deleteProduct(product._id, product.images.public_id)
              }
            >
              Delete
            </Link>
            <Link id="btn_view" to={`/edit_product/${product._id}`}>
              Edit
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="row_btn">
            <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
              Buy
            </Link>
            <Link id="btn_view" to={`/detail/${product._id}`}>
              View
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default ButtonRender;
