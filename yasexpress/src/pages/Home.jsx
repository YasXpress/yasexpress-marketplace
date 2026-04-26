import React from "react";
import ProductSkeleton from "../components/ProductSkeleton";

// ================= HOME =================
const Home = ({
  products,
  setPage,
  loading,
  error,
  currentPage,
  setCurrentPage,
  totalPages,
  maxButtons
}) => {

  // ================= SLIDING PAGINATION =================
  const getPagination = () => {
  const pages = [];

  const groupIndex = Math.floor((currentPage - 1) / maxButtons);

  const start = groupIndex * maxButtons + 1;
  let end = start + maxButtons - 1;

  if (end > totalPages) end = totalPages;

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

  return (
    <div>

      {/* ================= LOADING / ERROR ================= */}
      {(loading || error) && <ProductSkeleton />}

      {(loading || error) && (
        <p style={{ textAlign: "center", marginTop: "10px", color: "#888" }}>
          ⚠️ Poor connection… retrying
        </p>
      )}

      {/* ================= NO PRODUCTS ================= */}
      {!loading && !error && products.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          ❌ No products found
        </p>
      )}

      {/* ================= PRODUCTS ================= */}
      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid">
            {products.map((p) => (
              <div className="card" key={p._id}>
                <img
                  src={p.images?.[0] || p.image}
                  alt={p.name}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setPage({ name: "details", data: p });
                  }}
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

          {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                if (currentPage > 1) {
                  window.scrollTo(0, 0);
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              Prev
            </button>

            {getPagination().map((num) => (
              <button
                key={`page-${num}`}
                className={currentPage === num ? "active-page" : ""}
                onClick={() => {
                  window.scrollTo(0, 0);
                  setCurrentPage(num);
                }}
              >
                {num}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => {
                if (currentPage < totalPages) {
                  window.scrollTo(0, 0);
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              Next
            </button>
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default Home;