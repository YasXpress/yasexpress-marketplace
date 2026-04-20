import React from "react";

// ================= CHECKOUT =================
const Checkout = ({ cart, user }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className="checkout">
      <h2>Checkout (Bank Transfer)</h2>

      {user ? (
        <p>
          Purchasing as: {user.name} ({user.phone})
        </p>
      ) : (
        <p>Purchasing as Guest</p>
      )}

      <p>Total: ₦{Number(total).toLocaleString()}</p>

      {/* BANK TRANSFER */}
      <div className="bank-box">
        <p>Bank: OPAY</p>
        <p>Account: YAHAYA ABDULLAHI</p>
        <p>Number: 09162820838</p>
      </div>

      {/* CARD PAYMENT (DISABLED / DISCLAIMER) */}
      <div className="card-box">
        <h4>Card Payment</h4>
        <p style={{ color: "red" }}>
          ⚠ Card payment is currently unavailable. Please use Bank Transfer.
        </p>
      </div>

      <button
        onClick={() => {
          const phoneNumber = "2349162820838";

          const message = `
Hello, I have made payment.

Name: ${user?.name || "Guest"}
Phone: ${user?.phone || "N/A"}

Order:
${cart.map((item) => `${item.name} x${item.count}`).join("\n")}

Total: ₦${Number(
            cart.reduce((acc, item) => acc + item.price * item.count, 0)
          ).toLocaleString()}
`;

          const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            message
          )}`;
          window.open(url, "_blank");
        }}
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default Checkout;