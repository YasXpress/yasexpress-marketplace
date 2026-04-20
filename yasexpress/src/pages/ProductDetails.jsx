import React, { useState } from "react";

// ================= PRODUCT DETAILS =================
const ProductDetails = ({ product, addToCart, setPage, products }) => {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]);

  const similar = [...products]
    .filter((p) => p.category === product.category && p._id !== product._id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <div>
      <div className="product-details">
        <img src={selectedImage} alt={product.name} />

        <div className="images-container">
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                cursor: "pointer",
                border:
                  selectedImage === img
                    ? "2px solid orange"
                    : "1px solid #ccc",
              }}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3 style={{ marginBottom: "10px" }}>
            ₦{Number(product.price).toLocaleString()}
          </h3>

          <button className="add-cart" onClick={() => addToCart(product)}>
            Add to Cart
          </button>

          <button
            onClick={() => {
              setPage("checkout");
              addToCart(product);
            }}
          >
            Buy Now
          </button>
        </div>
      </div>

      {similar.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h3>Similar Products</h3>

          <div className="grid">
            {similar.map((p) => (
              <div className="card" key={p._id}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ cursor: "pointer" }}
                  onClick={() => setPage({ name: "details", data: p })}
                />

                <h3>{p.name}</h3>
                <p>₦{Number(p.price).toLocaleString()}</p>

                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setPage({ name: "details", data: p });
                  }}
                >
                  View Product
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;