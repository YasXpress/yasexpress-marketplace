import axios from "axios";

const API = "http://localhost:5000/api";

const formatMoney = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

export default function CustomerDetails({
  customer,
  goBack,
  showToast,
  showConfirm,
  loadCustomers,
  setSelectedCustomer,
}) {
  // ================= DELETE CART =================
  const deleteCart = async (userId) => {
    showConfirm("Delete this cart?", async () => {
      try {
        await axios.delete(`${API}/cart/${userId}`);
        setSelectedCustomer(null);
        loadCustomers();
        showToast("Cart deleted");
      } catch {
        showToast("Delete failed", "error");
      }
    });
  };

  return (
    <div className="customer-detail">
      <button onClick={goBack}>← Back</button>

      <h2>Customer Details</h2>

      <h3>ID: {customer.userId}</h3>

      <p>
        <strong>Name:</strong> {customer.name || "No name"}
      </p>

      <p>
        <strong>Phone:</strong> {customer.phone || "No phone"}
      </p>

      <p>
        Total: ₦
        {formatMoney(
          customer.items.reduce(
            (acc, item) => acc + item.price * item.count,
            0
          )
        )}
      </p>

      <div className="grid">
        {customer.items.map((item, i) => (
          <div key={i} className="card">
            <img src={item.image} alt="" />
            <h3>{item.name}</h3>
            <p>Qty: {item.count}</p>
            <p>₦{formatMoney(item.price * item.count)}</p>
          </div>
        ))}
      </div>

      {customer.phone && (
        <a
          href={`https://wa.me/${customer.phone}`}
          target="_blank"
          rel="noreferrer"
        >
          <button className="whatapp-btn">WhatsApp</button>
        </a>
      )}

      <button onClick={() => deleteCart(customer.userId)}>
        Delete Cart
      </button>
    </div>
  );
}