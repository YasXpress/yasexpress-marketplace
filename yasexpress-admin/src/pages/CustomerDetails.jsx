 
export default function CustomerDetails({
  customer,
  goBack,
  showToast,
  showConfirm,
  loadCustomers,
  setSelectedCustomer,
  formatMoney,
  deleteCart
}) {
   
  return (
    <div className="customer-detail">
      <button onClick={goBack}>← Back</button>

      <h2>Customer Details</h2>

      <h3>ID: {customer.userId}</h3>

      <p>
        <strong>Name:</strong> {customer.name || "No name"}
      </p>

      <p>
        <strong>Phone:</strong>{" "}
        {customer.phone ? (
          <a href={`tel:${customer.phone}`} className="phone-link">
            {customer.phone}
          </a>
        ) : (
          "No phone"
        )}
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