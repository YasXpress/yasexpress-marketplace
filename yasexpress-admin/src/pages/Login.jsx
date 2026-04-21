import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Login({ setAdmin, showToast }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ================= LOGIN =================
  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      return showToast("Enter email and password", "error");
    }

    try {
      const res = await axios.post(`${API}/users/login`, loginData);

      // 🔥 CHECK ROLE FROM DATABASE
      if (res.data.role !== "admin") {
        return showToast("Access denied: Not an admin", "error");
      }

      setAdmin(res.data);
      localStorage.setItem("yasexpressAdmin", JSON.stringify(res.data));
    } catch (err) {
      showToast("Login failed", "error");
    }
  };

  return (
    <div className="login">
  <div className="login-box">

     <img 
        src="https://res.cloudinary.com/dgmk0u6xc/image/upload/v1776270417/20260413-175424_zphykv.png" 
        alt="logo" 
      />

    <h2>Admin Panel</h2>

    <input
      type="email"
      placeholder="Email"
      value={loginData.email}
      onChange={(e) =>
        setLoginData({ ...loginData, email: e.target.value })
      }
    />

    <input
      type="password"
      placeholder="Password"
      value={loginData.password}
      onChange={(e) =>
        setLoginData({ ...loginData, password: e.target.value })
      }
    />

    <button onClick={handleLogin}>Login</button>

  </div>
</div>
  );
}