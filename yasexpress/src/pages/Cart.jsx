import React from "react";

// ================= CART =================
const Cart = ({ products, cart, setCart, setPage, saveCart }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  const handleAdd = (index) => {
    const newCart = [...cart];
    newCart[index].count += 1;
    setCart(newCart);
    saveCart(newCart);
  };

  const handleSub = (index) => {
    const newCart = [...cart];

    if (newCart[index].count === 1) {
      newCart.splice(index, 1);
    } else {
      newCart[index].count -= 1;
    }

    setCart(newCart);
    saveCart(newCart);
  }; 


   


  const getFullProduct = (id) => {
    return products.find((p) => p._id === id);
  };


  return (
    <div className="cart">
      {cart.length === 0 && (
        <div className="empty-cart-box">
          <img
            src="https://res.cloudinary.com/dgmk0u6xc/image/upload/q_auto/f_auto/v1776533037/2038854_joiyb8.png"
            alt="Empty Cart"
            className="empty-cart-img"
          />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven’t added anything yet.</p>
        
          <button
            onClick={() => {
              setPage("products");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Start Shopping
          </button>
          {/* PAYMENT HISTORY LINK */}
  <span
    onClick={() => {
      setPage("checkout"); // change this later if you create history page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    style={{
      marginLeft: "12px",
      cursor: "pointer",
      color: "#ff6600",
      fontWeight: "600",
      textDecoration: "underline",
    }}
  >
     Payment History
  </span>
        </div>
      )}
       
      {cart.map((item, i) => (
        <div className="cart-item" key={i}>
          <img
            src={item.image}
            alt={item.name}
            className="cart-item-img"
            style={{ cursor: "pointer" }}
            onClick={() => {
              const fullProduct = getFullProduct(item._id);

              if (!fullProduct) return;

              window.scrollTo({ top: 0, behavior: "smooth" });

              setPage({
                name: "details",
                data: fullProduct,  
              });
            }}
          />
          
          <div className="cart-item-info">
            <h3>{item.name}</h3>
          </div>

          <div className="cart-controls">
            <button onClick={() => handleSub(i)}>-</button>
            <span className="cart-qty">{item.count}</span>
            <button onClick={() => handleAdd(i)}>+</button>
          </div>

          <div className="cart-subtotal">
            Subtotal: ₦{Number(item.price * item.count).toLocaleString()}
          </div>
        </div>
      ))}
       
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ₦{Number(total).toLocaleString()}</h3>

          <button
            onClick={() => {
              setPage("checkout");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Proceed to Checkout
          </button>
          {/* PAYMENT HISTORY LINK */}
  <span
    onClick={() => {
      setPage("checkout"); // change this later if you create history page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    style={{
      marginLeft: "12px",
      cursor: "pointer",
      color: "#ff6600",
      fontWeight: "600",
      textDecoration: "underline",
    }}
  >
     Payment History
  </span>
        </div>
      )}
    </div>
  );
};

export default Cart;