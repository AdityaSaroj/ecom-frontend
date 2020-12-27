import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import Checkout from "./Checkout";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => (
    <div>
      <h2>Your cart has {items.length} items</h2>
      <hr />
      {items.map((p, i) => (
        <Card
          product={p}
          key={i}
          showAddToCart={false}
          cartUpdate={true}
          showRemove={true}
          setRun={setRun}
          run={run}
        />
      ))}
    </div>
  );

  const noItemsMessage = () => (
    <div>
      <h2>Your cart is empty!</h2>
      <Link to="/shop">Continue Shopping</Link>
    </div>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart"
      className="container"
    >
      <div className="row">
        <div className="col-6">
          {items.length ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2>Your Cart Summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
