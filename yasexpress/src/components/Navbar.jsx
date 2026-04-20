import React from "react";

// ================= NAVBAR =================
const Navbar = ({ goToPage, cart, searchTerm, setSearchTerm, handleSearch }) => (
  
  <div className="navbar">

    {/* LOGO */}
    <div className="nav-logo" onClick={() => goToPage("home")}>
      <img 
        src="https://res.cloudinary.com/dgmk0u6xc/image/upload/v1776270417/20260413-175424_zphykv.png"
        alt="YASEXPRESS"
      />
    </div>

    {/* SEARCH */}
    <div className="search-div">
      <input
        className="search"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>

    {/* NAV ICONS */}
    <div className="nav-icons">

      {/* HOME */}
      <div className="icon home-icon" onClick={() => goToPage("products")}>
        <img
          src="https://res.cloudinary.com/dgmk0u6xc/image/upload/q_auto/f_auto/v1776526633/home_vwukrb.png"
          alt="Home"
        />
      </div>

      {/* CART */}
      <div className="icon cart-icon" onClick={() => goToPage("cart")}>
        <img
          src="https://res.cloudinary.com/dgmk0u6xc/image/upload/q_auto/f_auto/v1776526620/cart_wnr35d.png"
          alt="Cart"
        />
        <span className="cart-count">
          {cart.reduce((acc, item) => acc + item.count, 0)}
        </span>
      </div>

      {/* ACCOUNT */}
      <div className="icon" onClick={() => goToPage("account")}>
        <img
          src="https://res.cloudinary.com/dgmk0u6xc/image/upload/q_auto/f_auto/v1776526644/1077114_mq7syi.png"
          alt="Account"
        />
      </div>

    </div>
  </div>
   
);

export default Navbar;