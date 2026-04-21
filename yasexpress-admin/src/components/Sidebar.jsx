export default function Sidebar({
  setPage,
  logout,
  setSelectedCustomer,
  loadCustomers,
}) {
  return (
    <div className="sidebar">
      <div className="brand">
        <img 
          src="https://res.cloudinary.com/dgmk0u6xc/image/upload/v1776270417/20260413-175424_zphykv.png" 
          alt="logo" 
        />
        <h2>YASEXPRESS</h2>
      </div>
       
      <button
        onClick={() => {
          setPage("dashboard");
          setSelectedCustomer(null);
        }}
      >
        Dashboard
      </button>

      <button
        onClick={() => {
          setPage("products");
          setSelectedCustomer(null);
        }}
      >
        Products
      </button>

      <button
        onClick={() => {
          setPage("add");
          setSelectedCustomer(null);
        }}
      >
        AddProducts
      </button>

      <button
        onClick={() => {
          setPage("customers");
          loadCustomers();
        }}
      >
        Customers
      </button>

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}