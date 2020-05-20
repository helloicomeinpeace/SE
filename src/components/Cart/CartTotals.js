import React from "react";
import { Link } from "react-router-dom";
export default function CartTotals(props) {
  const {cartSubTotal,clearCart, checkoutCart } = props.value;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
          <button
            style={{marginRight:'1%'}}
            className="btn btn-outline-success text-uppercase mb-3 px-5"
            type="button"
            onClick={() => {checkoutCart(props.address,props.cnumber)}}
          >
            checkout
          </button>  
          <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={() => {clearCart()}}
              >
                clear cart
              </button>
              
            </Link>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>$ {cartSubTotal}</strong>
            </h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
