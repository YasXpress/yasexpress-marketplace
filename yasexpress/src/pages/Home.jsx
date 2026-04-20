import React from "react";
import ProductSkeleton from "../components/ProductSkeleton";

// ================= HOME =================
const Home = ({ products, setPage, loading, error }) => (
  <div>
     
    {(loading || error) && <ProductSkeleton />}

    {(loading || error) && (
      <p style={{ textAlign: "center", marginTop: "10px", color: "#888" }}>
        ⚠️ Poor connection… retrying
      </p>
    )}

    {!loading && !error && products.length === 0 && (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        ❌ No products found
      </p>
    )}

    {!loading && !error && products.length > 0 && (
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <img
              src={p.images?.[0] || p.image}
              alt={p.name}
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.scrollTo(0, 0);
                setPage({ name: "details", data: p })}
            }
            />
            <h3>{p.name}</h3>
            <p>₦{Number(p.price).toLocaleString()}</p>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                setPage({ name: "details", data: p })}
            }
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Home;