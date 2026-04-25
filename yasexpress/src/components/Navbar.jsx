import React, { useState } from "react";

const Navbar = ({
  goToPage,
  cart,
  searchTerm,
  setSearchTerm,
  handleSearch,
  suggestions = []
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSelect = (value) => {
    setSearchTerm(value);
    setShowSuggestions(false);
    handleSearch(); // auto search when clicked
  };

  return (
    <div className="navbar">

      {/* LOGO */}
      <div className="nav-logo" onClick={() => goToPage("home")}>
        <img
          src="https://res.cloudinary.com/dgmk0u6xc/image/upload/v1776270417/20260413-175424_zphykv.png"
          alt="YASEXPRESS"
        />
      </div>

      {/* SEARCH */}
      <div className="search-div" style={{ position: "relative" }}>
        <div className="search-wrapper">
        <input
          className="search"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />

        

        {/* SUGGESTIONS */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-box">
            {suggestions.map((item, i) => (
              <div
                key={i}
                className="suggestion-item"
                onClick={() => handleSelect(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )} 

        </div>


        <button onClick={handleSearch}>Search</button>
      </div>

      {/* ICONS */}
      <div className="nav-icons">

        <div className="icon home-icon" onClick={() => goToPage("products")}>
          <img src="https://res.cloudinary.com/dgmk0u6xc/image/upload/q_auto/f_auto/v1776526633/home_vwukrb.png" />
        </div>

        <div className="icon cart-icon" onClick={() => goToPage("cart")}>
          <img src="https://res.cloudinary.com/dgmk0u6xc/image/upload/q_auto/f_auto/v1776526620/cart_wnr35d.png" />
          <span className="cart-count">
            {cart.reduce((acc, item) => acc + item.count, 0)}
          </span>
        </div>

      </div>
    </div>
  );
};

export default Navbar;