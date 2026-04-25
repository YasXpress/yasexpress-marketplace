import React from "react";

// ================= PRODUCT SKELETON =================
const ProductSkeleton = () => {
  return (
    <div className="grid">
      {Array.from({ length: 32 }).map((_, i) => (
        <div className="card skeleton-card" key={i}>
          <div className="skeleton-image"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
          <div className="skeleton-button"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;