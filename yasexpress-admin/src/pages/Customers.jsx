export default function Customers({
  customers,
  activeCustomers,
  search,
  setSearch,
  setSelectedCustomer,
  loadCustomers,
}) {
  return (
    <div>
      <h2>Customers</h2>

      <input
        placeholder="Search by userId || phoneNumber"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {activeCustomers
        .filter((c) => {
        const query = search.toLowerCase().trim();

        return (
            c.userId?.toLowerCase().includes(query) ||
            c.phone?.toLowerCase().includes(query)
        );
        })
        .map((c) => (
          <div
            key={c.userId}
            className="customer-card"
            onClick={() => setSelectedCustomer(c)}
            style={{ cursor: "pointer" }}
          >
            <h3>ID: {c.userId}</h3>

            <p>
              <strong>Name:</strong> {c.name || "No name"}
            </p>

            <p>
              <strong>Phone:</strong> {c.phone || "No phone"}
            </p>

            <p>{c.items.length} items</p>
          </div>
        ))}
    </div>
  );
}