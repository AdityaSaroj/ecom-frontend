import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, removeItem, updateItem } from "./cartHelpers";

const Card = ({
  product,
  showViewProduct = true,
  showAddToCart = true,
  cartUpdate = false,
  showRemove = false,
  setRun = (f) => f,
  run = undefined,
  //changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProduct) => {
    return (
      showViewProduct && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartButton = (showAddToCart) => {
    return (
      showAddToCart && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveButton = (showRemove) => {
    return (
      showRemove && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove
        </button>
      )
    );
  };

  const showStock = (quantity) =>
    quantity ? (
      <span className="badge badge-primary badge-pill mt-2 mb-1">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-pill mt-2 mb-1">
        Out of Stock
      </span>
    );

  const handleChange = (productId) => (event) => {
    setRun(!run); //run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="products" />
        <p className="lead mt-2">{product.description.substring(0, 50)}</p>
        <p className="black-10 mb-0">${product.price}</p>
        <p className="black-9 mb-0">
          {product.category && product.category.name}
        </p>
        <p className="black-8 mb-1">
          Added {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProduct)}
        {showRemoveButton(showRemove)}
        {showAddToCartButton(showAddToCart)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
