import React from "react";

// ================= FOOTER =================
const Footer = ({ goToPage }) => {

  const phoneNumber = "2349162820838";

  const openWhatsApp = () => {
    const message = "Hello, I want to make an enquiry.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => goToPage("home")}
          >
            YASEXPRESS Store
          </h2>
          <p>Affordable products, fast delivery, trusted sellers.</p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <p onClick={() => goToPage("home")}>Home</p>
          <p onClick={() => goToPage("products")}>Products</p>
          <p onClick={() => goToPage("cart")}>Cart</p>
          <p onClick={() => goToPage("account")}>Account</p>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📍 Kaduna, Nigeria</p>
          <p onClick={openWhatsApp}>📞 09162820838</p>
          <p onClick={openWhatsApp}>✉️ Chat on WhatsApp</p>
        </div>

        {/* WHATSAPP ONLY */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="whatsapp-btn" onClick={openWhatsApp}>
            💬 Chat with us on WhatsApp
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} YASEXPRESS Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;