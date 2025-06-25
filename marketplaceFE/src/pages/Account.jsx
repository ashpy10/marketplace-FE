import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/pages/Account.css';

const Account = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        fetchAccount();
    }, [token, navigate]);
    
        async function fetchAccount() {
        try {
            const userResponse = await fetch("/api/users/account", {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });

            const userResult = await userResponse.json()
            if (userResponse.ok) setUser(userResult); 
            
            const orderResponse = await fetch("/orders", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
            });

            const orderResult = await orderResponse.json()
            if (orderResponse.ok) setOrders(orderResult)
        } catch(error) {
            console.error("User order fetch error: ", error)
        } finally {
            setLoading(false);
        }
    };

    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    } 

    if (loading) return <div className="account-loading">Loading...</div>


return (
    <div className="account-container">
        <h1 className="account-title">My Account</h1>

        {user && (
            <div className="account-user-info">
            <p><strong>Email:</strong> {user.email}</p>
            </div>
        )}

        <h2 className="account-orders-title">My Orders</h2> 

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

            <button className="account-logout-btn" onClick={handleLogout}>Logout</button>
        </div>
     )
}

export default Account

