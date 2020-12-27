import React, { useState, useEffect } from "react";
import { read, listRelated } from "./apiCore";
import Layout from "./Layout";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        //fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container"
    >
      <div className="row mb-3">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProduct={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
          {relatedProduct.map((p, i) => (
            <Card key={i} product={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
