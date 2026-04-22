export default function Products({
  products,
  search,
  setSearch,
  handleEdit,
  formatMoney,
  handleDelete, // ✅ MUST BE HERE 
}) {
  return (
    <div>
      <h2>Products</h2>

      <input
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <img src={p.images[0]} alt={p.name} />
            <h3>{p.name}</h3>
            <p>₦{formatMoney(p.price)}</p>

            <div className="action-buttons">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  cursor: "pointer"
                }} 
                onClick={() => handleDelete(p._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}