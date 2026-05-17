import React, { useEffect, useState } from 'react';
import './Orders.css';
import { useStateValue } from './StateProvider';
import Order from './Order';
import axios from './axios';
import { Link } from 'react-router-dom';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      if (user) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('/orders', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setOrders(response.data.map(order => ({
            id: order.id,
            data: {
              basket: typeof order.basket === 'string' ? JSON.parse(order.basket) : order.basket,
              amount: order.amount,
              created: order.created
            }
          })));
        } catch (error) {
          console.error('Error fetching orders:', error);
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  return (
    <div className='orders'>
      <div className="orders_header">
        <h1>Your Orders</h1>
        {orders.length > 0 && (
          <span className="orders_count">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</span>
        )}
      </div>

      {loading ? (
        <div className="orders_loading">Loading your orders...</div>
      ) : !user ? (
        <div className="orders_signIn">
          <p>Please sign in to see your orders.</p>
          <Link to="/login" className="orders_signInBtn">Sign In</Link>
        </div>
      ) : orders.length === 0 ? (
        <div className="orders_empty">
          <h2>You haven't placed any orders yet.</h2>
          <p>When you place an order, it will appear here. You can track your packages, return items, and more.</p>
          <Link to="/" className="orders_shopBtn">Continue Shopping</Link>
        </div>
      ) : (
        <div className='orders_list'>
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;