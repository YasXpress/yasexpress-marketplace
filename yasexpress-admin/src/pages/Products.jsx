import axios from "axios";

const API = "http://localhost:5000/api";

const formatMoney = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

export default function Products({
  products,
  loadProducts,
  showToast,
  showConfirm,
    handleEdit,

}) {
  // ================= DELETE PRODUCT =================
  const handleDelete = async (id) => {
    showConfirm("Delete this product?", async () => {
      try {
        await axios.delete(`${API}/products/${id}`);
        loadProducts();
        showToast("Product deleted");
      } catch {
        showToast("Delete failed", "error");
      }
    });
  };

  return (
    <div>
      <h2>Products</h2>

      <div className="grid">
        {products.map((p) => (
            <div className="card" key={p._id}>
                <img src={p.images[0]} />
                <h3>{p.name}</h3>
                <p>₦{formatMoney(p.price)}</p>

                <div className="action-buttons">
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}