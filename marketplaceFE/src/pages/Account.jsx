import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Account.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user account info
        const userRes = await fetch("/api/users/account", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await userRes.json();
        if (!userRes.ok) throw new Error(userData.error || "Failed to load user info");
        setUser(userData);

        // Fetch user's orders
        const ordersRes = await fetch("/api/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const ordersData = await ordersRes.json();
        if (!ordersRes.ok) throw new Error(ordersData.error || "Failed to load orders");
        setOrders(ordersData);

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  //Add order button
  const handleOrderButton = async () => {
    const date = new Date().toLocaleDateString();
    const note = "New order";

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date,
          note,
        }),
      });

      if(response.ok) {
        const newOrder = await response.json()
        setOrders((prevOrders) => [newOrder, ...prevOrders])
      } else {
        throw new Error('Failed to create order')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) return <div className="account-loading">Loading...</div>;
  if (error) return <div className="account-error">Error: {error}</div>;

  return (
    <div className="account-container">
      <h1 className="account-title">My Account</h1>

      {user && (
        <div className="account-user-info">
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      )}

      <h2 className="account-orders-title">My Orders</h2>

      <button className="account-order-button" onClick={handleOrderButton}>
        Place New Order
      </button>

      {orders.length > 0 ? (
        <div className="account-grid">
          {orders.map((order) => (
            <div key={order.id} className="account-card">
              <h3 className="account-order-header">Order #{order.id}</h3>
              <p className="account-order-date">
                Placed on {new Date(order.date).toLocaleDateString()}
              </p>
              {order.note && (
                <p className="account-item"><strong>Note:</strong> {order.note}</p>
              )}
        </div>
          ))}
        </div>
      ) : (
        <div className="account-empty">You have no orders yet.</div>
      )}

      <button className="account-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Account;