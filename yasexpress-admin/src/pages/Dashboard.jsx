export default function Dashboard({ products, totalOrders, totalCustomers }) {
  return (
    <div>
      <h2>Dashboard</h2>

      <div className="stats">
        <div className="stat-box">
          <h3>{products.length}</h3>
          <p>Products</p>
        </div>

        <div className="stat-box">
          <h3>{totalOrders}</h3>
          <p>Orders</p>
        </div>

        <div className="stat-box">
          <h3>{totalCustomers}</h3>
          <p>Users</p>
        </div>
      </div>
    </div>
  );
}