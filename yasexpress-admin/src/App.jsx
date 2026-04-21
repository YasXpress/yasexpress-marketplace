 import { useState, useEffect } from "react";
import "./App.css";

// HOOKS
import useToast from "./hooks/useToast";
import useConfirm from "./hooks/useConfirm";

// PAGES
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Customers from "./pages/Customers";
import CustomerDetails from "./pages/CustomerDetails";

// COMPONENTS
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";
import ConfirmModal from "./components/ConfirmModal";

// SERVICES
import api from "./services/api";

export default function App() {
  // ================= STATE =================
  const [admin, setAdmin] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    images: [],
    description: "",
  });

  // ================= HOOKS =================
  const { toast, showToast } = useToast();
  const { confirmBox, showConfirm, closeConfirm } = useConfirm();

  // ================= FORMAT MONEY =================
  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  // ================= LOAD ADMIN =================
  useEffect(() => {
    const saved = localStorage.getItem("yasexpressAdmin");
    if (saved) setAdmin(JSON.parse(saved));
  }, []);

  // ================= LOAD PRODUCTS =================
  const loadProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch {
      showToast("Error loading products", "error");
    }
  };

  // ================= LOAD CUSTOMERS =================
  const loadCustomers = async () => {
    try {
      const res = await api.get("/api/customers");
      setCustomers(res.data || []);
    } catch {
      showToast("Error loading customers", "error");
    }
  };

  useEffect(() => {
    if (admin) loadProducts();
  }, [admin]);

  // ================= LOGIN =================
  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      return showToast("Enter email and password", "error");
    }

    try {
      const res = await api.post("/api/users/login", loginData);

      if (res.data.role !== "admin") {
        return showToast("Access denied: Not an admin", "error");
      }

      setAdmin(res.data);
      localStorage.setItem("yasexpressAdmin", JSON.stringify(res.data));
    } catch {
      showToast("Login failed", "error");
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("yasexpressAdmin");
    setAdmin(null);
  };

  // ================= IMAGE UPLOAD =================
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    let base64Images = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        base64Images.push(reader.result);

        if (base64Images.length === files.length) {
          setForm((prev) => ({
            ...prev,
            images: base64Images,
          }));
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // ================= ADD PRODUCT =================
  const handleAdd = async () => {
  if (!form.name || !form.price || form.images.length === 0) {
    return showToast("Fill all fields", "error");
  }

  try {
    setLoading(true);

    if (editProduct) {
      // ================= EDIT MODE =================
      await api.put(`/api/products/${editProduct._id}`, form);
      showToast("Product updated successfully");
      setEditProduct(null);

    } else {
      // ================= ADD MODE =================
      await api.post("/api/products", form);
      showToast("Product added successfully");
    }

    setForm({
      name: "",
      price: "",
      category: "",
      images: [],
      description: "",
    });

    setEditProduct(null);

    await loadProducts();
    setPage("products");

  } catch {
    showToast("Error saving product", "error");
  } finally {
    setLoading(false);
  }
};



// ================= EDIT PRODUCT =================
  const handleEdit = (product) => {
  setEditProduct(product);

  setForm({
    name: product.name,
    price: product.price,
    category: product.category,
    images: product.images,
    description: product.description,
  });

  setPage("add");
};




  // ================= DELETE CART =================
  const deleteCart = async (userId) => {
    showConfirm("Delete this cart?", async () => {
      try {
        await api.delete(`/api/cart/${userId}`);
        setSelectedCustomer(null);
        loadCustomers();
        showToast("Cart deleted");
      } catch {
        showToast("Delete failed", "error");
      }
    });
  };

  // ================= STATS =================
  const activeCustomers = customers.filter(
    (c) => Array.isArray(c.items) && c.items.length > 0
  );

  const totalCustomers = customers.length;
  const totalOrders = activeCustomers.length;

  // ================= NOT LOGGED IN =================
  if (!admin) {
    return (
      <>
        <Login
          setAdmin={setAdmin}
          showToast={showToast}
          loginData={loginData}
          setLoginData={setLoginData}
          handleLogin={handleLogin}
        />

        <Toast toast={toast} />
      </>
    );
  }

  // ================= APP =================
  return (
    <div className="app">

      {/* SIDEBAR */}
      <Sidebar
        setPage={setPage}
        logout={logout}
        setSelectedCustomer={setSelectedCustomer}
        loadCustomers={loadCustomers}   // 🔥 THIS MUST EXIST
      />

      {/* MAIN */}
      <div className="main">

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <Dashboard
            products={products}
            totalOrders={totalOrders}
            totalCustomers={totalCustomers}
          />
        )}

        {/* PRODUCTS */}
        {page === "products" && (
          <Products
            products={products}
            loadProducts={loadProducts}
            showToast={showToast}
            showConfirm={showConfirm}
            handleEdit={handleEdit}
          />
        )}

        {/* ADD */}
        {page === "add" && (
          <AddProduct
            form={form}
            setForm={setForm}
            handleImage={handleImage}
            handleAdd={handleAdd}
            loading={loading}
            editProduct={editProduct}   // 🔥 ADD THIS
          />
        )}

        {/* CUSTOMERS */}
        {page === "customers" && !selectedCustomer && (
          <Customers
            customers={customers}
            activeCustomers={activeCustomers}
            search={search}
            setSearch={setSearch}
            setSelectedCustomer={setSelectedCustomer}
            loadCustomers={loadCustomers}
          />
        )}

        {/* CUSTOMER DETAILS */}
        {selectedCustomer && (
          <CustomerDetails
            customer={selectedCustomer}
            goBack={() => setSelectedCustomer(null)}
            showToast={showToast}
            showConfirm={showConfirm}
            loadCustomers={loadCustomers}
            setSelectedCustomer={setSelectedCustomer}
            formatMoney={formatMoney}
          />
        )}

      </div>

      {/* GLOBAL UI */}
      <Toast toast={toast} />

      <ConfirmModal
        confirmBox={confirmBox}
        closeConfirm={closeConfirm}
      />

    </div>
  );
}