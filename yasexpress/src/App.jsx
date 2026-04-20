import React, { useState, useEffect } from "react";
import axios from "axios";

// API
import API from "./api/api";

// COMPONENTS
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductSkeleton from "./components/ProductSkeleton";

// PAGES
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";

import "./styles/User.css";

// ================= MAIN APP =================
export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast(null);

    setTimeout(() => {
      setToast({ message, type });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    }, 100);
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await axios.get(`${API}/products`);

        setProducts(res.data);
        setFilteredProducts(shuffleArray(res.data));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ================= OFFLINE CHECK =================
  useEffect(() => {
    if (!navigator.onLine) {
      setError(true);
      setLoading(false);
    }
  }, []);

  // ================= LOAD USER CART =================
  useEffect(() => {
    if (!user) return;

    axios.get(`${API}/cart/${user._id}`).then((res) => {
      if (res.data) setCart(res.data.items);
    });
  }, [user]);

  // ================= SAVE CART =================
  const saveCart = async (updatedCart) => {
    if (!user) return;

    await axios.post(`${API}/cart`, {
      userId: user._id,
      items: updatedCart,
    });
  };

  // ================= LOAD USER FROM LOCALSTORAGE =================
  useEffect(() => {
    const savedUser = localStorage.getItem("yasexpressUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // ================= ADD TO CART =================
  const addToCart = (product) => {
    if (!user) {
      showToast("Please login or create account first", "error");
      setPage("account");
      return;
    }

    const index = cart.findIndex((item) => item._id === product._id);

    let updatedCart;

    if (index >= 0) {
      updatedCart = [...cart];
      updatedCart[index].count += 1;
    } else {
      updatedCart = [
        ...cart,
        { ...product, image: product.images?.[0], count: 1 },
      ];
    }

    setCart(updatedCart);
    saveCart(updatedCart);
  };

  // ================= SEARCH =================
  const handleSearch = () => {
    const filtered = products.filter((p) => {
      const term = searchTerm.toLowerCase();

      return (
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    });

    setFilteredProducts(shuffleArray(filtered));

    if (searchTerm.trim() !== "") {
      setPage("products");
    }
  };

  useEffect(() => {
    const filtered = products.filter((p) => {
      const term = searchTerm.toLowerCase();

      return (
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    });

    setFilteredProducts(shuffleArray(filtered));

    if (searchTerm.trim() !== "") {
      setPage("products");
    }
  }, [searchTerm, products]);

  // ================= PAGE NAVIGATION =================
  const goToPage = (page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= RENDER PAGE =================
  const renderPage = () => {
    if (page === "home")
      return (
        <Home
          products={filteredProducts}
          setPage={setPage}
          loading={loading}
          error={error}
        />
      );

    if (page === "products")
      return (
        <Home
          products={filteredProducts}
          setPage={setPage}
          loading={loading}
          error={error}
        />
      );

    if (page === "cart")
      return (
        <Cart
          cart={cart}
          setCart={setCart}
          setPage={setPage}
          saveCart={saveCart}
        />
      );

    if (page === "checkout") return <Checkout cart={cart} user={user} />;

    if (page === "account")
      return (
        <Account
          user={user}
          setUser={setUser}
          setPage={setPage}
          showToast={showToast}
        />
      );

    if (typeof page === "object")
      return (
        <ProductDetails
          product={page.data}
          addToCart={addToCart}
          setPage={setPage}
          products={products}
        />
      );
  };

  return (
    <div>
      <Navbar
        cart={cart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        goToPage={goToPage}
      />

      {renderPage()}

      <Footer goToPage={goToPage} />

      {toast && (
        <div className={`toast ${toast.type}`}>
          <div className="toast-content">
            <span className="icon">
              {toast.type === "success" && "✔"}
              {toast.type === "error" && "✖"}
              {toast.type === "warning" && "⚠"}
            </span>
            <span>{toast.message}</span>
          </div>
          <div className="toast-bar"></div>
        </div>
      )}
    </div>
  );
}