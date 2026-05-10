import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import API from "../api/api"; 

 

//"http://localhost:5000/api"

const Checkout = ({ cart = [], user, clearCart }) => {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);
  const [error, setError] = useState("");

  // ================= TOTAL =================
  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      return (
        sum +
        (Number(item.price) || 0) *
          (Number(item.count) || 0)
      );
    }, 0);
  }, [cart]);

  // ================= FETCH PAYMENT HISTORY =================
  const fetchPaymentHistory = useCallback(async () => {
    if (!user?.email) return;

    try {
      const { data } = await axios.get(
        `${API}/orders/customer/${user.email}`
      );

      const orders = Array.isArray(data) ? data : [];
      setPaymentHistory(orders);

      const paidOrders = orders
        .filter(
          (order) =>
            order.paymentStatus?.toLowerCase() === "paid"
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

      if (paidOrders.length > 0) {
        setLatestOrder(paidOrders[0]);
      }
    } catch (err) {
      console.error(
        "Failed to fetch payment history:",
        err
      );
    }
  }, [user]);

  // ================= INITIAL LOAD =================
  useEffect(() => {
    fetchPaymentHistory();
  }, [fetchPaymentHistory]);

  // ================= PAY NOW =================
  const payNow = async () => {
    if (!cart.length) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        email:
          user?.email ||
          `guest${Date.now()}@gmail.com`,
        amount: total,
        cart,
        customerName:
          user?.name || "Guest Customer",
        customerPhone:
          user?.phone || "",
      };

      const { data } = await axios.post(
        `${API}/payments/initialize`,
        payload
      );

      if (
        data?.success &&
        data?.authorization_url
      ) {
        window.location.href =
          data.authorization_url;
      } else {
        setError(
          "Unable to initialize payment."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to start payment."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY PAYMENT =================
  const verifyPayment = useCallback(
    async (reference) => {
      try {
        setVerifying(true);
        setError("");

        const { data } = await axios.get(
          `${API}/payments/verify/${reference}`
        );

        if (data?.success) {
          setLatestOrder(data.order);

          if (clearCart) {
            clearCart();
          }

          await fetchPaymentHistory();

          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Payment verification failed."
        );
      } finally {
        setVerifying(false);
      }
    },
    [clearCart, fetchPaymentHistory]
  );

  // ================= CHECK PAYSTACK RETURN =================
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const reference =
      params.get("reference");

    if (reference) {
      verifyPayment(reference);
    }
  }, [verifyPayment]);

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* ================= HEADER ================= */}
        <div className="checkout-header">
          <h1>Secure Checkout</h1>
          <p>
            Complete your purchase safely
            using Paystack.
          </p>
        </div>

        {/* ================= CUSTOMER INFO ================= */}
        <div className="checkout-card customer-card">
          <h2>Customer Details</h2>

          {user ? (
            <>
              <p>
                <span>Name:</span>
                <strong>{user.name}</strong>
              </p>

              <p>
                <span>Email:</span>
                <strong>{user.email}</strong>
              </p>
            </>
          ) : (
            <p>Checking out as Guest.</p>
          )}
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="checkout-card summary-card">
          <h2>Order Summary</h2>

          <div className="summary-row total-row">
            <span>Total Amount</span>
            <strong>
              ₦{total.toLocaleString()}
            </strong>
          </div>

          <button
            className="pay-button"
            onClick={payNow}
            disabled={
              loading ||
              verifying ||
              !cart.length
            }
          >
            {loading
              ? "Redirecting..."
              : verifying
              ? "Verifying Payment..."
              : "Pay with Paystack"}
          </button>

          {error && (
            <div className="checkout-error">
              {error}
            </div>
          )}
        </div>

        {/* ================= SUCCESS ALERT ================= */}
        {latestOrder && (
          <div className="checkout-success">
            <h3>
              Payment Successful 🎉
            </h3>
            <p>
              Reference:{" "}
              <strong>
                {
                  latestOrder.paymentReference
                }
              </strong>
            </p>
          </div>
        )}

        {/* ================= PAYMENT HISTORY ================= */}
        <section className="payment-history">
          <div className="section-header">
            <h2>Payment History</h2>
            <span>
              {paymentHistory.length} Order
              {paymentHistory.length !== 1
                ? "s"
                : ""}
            </span>
          </div>

          {paymentHistory.length === 0 ? (
            <div className="empty-history">
              <p>
                No payment history found.
              </p>
            </div>
          ) : (
            <div className="history-list">
              {paymentHistory.map(
                (order) => (
                  <div
                    key={order._id}
                    className="history-card"
                  >
                    <div className="history-top">
                      <div>
                        <h3>
                          Order #
                          {order._id.slice(-6)}
                        </h3>
                        <p>
                          {new Date(
                            order.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>

                      <span
                        className={`status-badge ${order.paymentStatus?.toLowerCase()}`}
                      >
                        {
                          order.paymentStatus
                        }
                      </span>
                    </div>

                    <div className="history-meta">
                      <p>
                        <strong>
                          Reference:
                        </strong>{" "}
                        {
                          order.paymentReference
                        }
                      </p>

                      <p>
                        <strong>
                          Total:
                        </strong>{" "}
                        ₦
                        {Number(
                          order.totalAmount || 0
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div className="order-items-grid">
                      {order.items?.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="order-item"
                          >
                            <img
                              src={
                                item.image
                              }
                              alt={
                                item.name
                              }
                            />

                            <h4>
                              {item.name}
                            </h4>

                            <p>
                              Qty:{" "}
                              {
                                item.count
                              }
                            </p>

                            <p>
                              ₦
                              {Number(
                                item.price
                              ).toLocaleString()}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Checkout;