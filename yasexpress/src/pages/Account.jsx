import React, { useState } from "react";
import axios from "axios";
// API
import API from "../api/api";
// ================= ACCOUNT =================
const Account = ({ user, setUser, setPage, showToast }) => {

   console.log(API)
  const formatPhoneForWhatsApp = (phone) => {
    if (!phone) return "";

    let cleaned = phone.replace(/\D/g, "");

    if (cleaned.startsWith("0")) {
      cleaned = "234" + cleaned.slice(1);
    } else if (cleaned.startsWith("234")) {
      // already correct
    } else if (cleaned.length === 10) {
      cleaned = "234" + cleaned;
    } else {
      return "";
    }

    if (cleaned.length !== 13) return "";

    return cleaned;
  };

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (
      !form.email ||
      !form.password ||
      (!isLogin && (!form.name || !form.phone))
    ) {
      return showToast("Fill all fields", "error");
    }

    try {
      if (isLogin) {
        const res = await axios.post(`${API}/api/users/login`, {
          email: form.email,
          password: form.password,
        });

        setUser(res.data);
        localStorage.setItem("yasexpressUser", JSON.stringify(res.data));
        showToast("Login successful");
        setPage("home");
      } else {
        const formattedPhone = formatPhoneForWhatsApp(form.phone);

        if (!formattedPhone) {
          return showToast("Enter a valid phone number", "error");
        }

        const res = await axios.post(`${API}/api/users/register`, {
          ...form,
          phone: formattedPhone,
        });

        setUser(res.data);
        localStorage.setItem("yasexpressUser", JSON.stringify(res.data));
        showToast("Account created successfully");
        setPage("home");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        err.message;

      showToast(message, "error");
    }
  };

  if (user) {
    return (
      <div className="account-box">
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <button
          onClick={() => {
            setUser(null);
            localStorage.removeItem("yasexpressUser");
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="account-box">
      <h2>{isLogin ? "Login" : "Create Account"}</h2>

      {!isLogin && (
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />
      )}

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      {!isLogin && (
        <input
          name="phone"
          placeholder="e.g 08012345678"
          onChange={handleChange}
        />
      )}

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        {isLogin ? "Login" : "Create Account"}
      </button>

      <p
        onClick={() => setIsLogin(!isLogin)}
        style={{ cursor: "pointer" }}
      >
        {isLogin ? "No account? Create one" : "Already have account? Login"}
      </p>
    </div>
  );
};

export default Account;