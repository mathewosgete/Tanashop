import React, { useEffect, useState } from 'react';
import './Payment.css';
import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from './axios';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const total = basket.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const totalItems = basket.reduce((sum, item) => sum + (item.quantity || 1), 0);

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios.post(`/payments/create?total=${Math.round(total * 100)}`);
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error('Payment intent error:', err);
      }
    };
    if (basket.length > 0) getClientSecret();
  }, [basket, total]);

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      const token = localStorage.getItem('token');
      await axios.post('/orders', {
        id: paymentIntent.id,
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSucceeded(true);
      setError(null);
      dispatch({ type: 'EMPTY_BASKET' });
      navigate('/orders', { replace: true });
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error(err);
    }

    setProcessing(false);
  };

  return (
    <div className='payment'>
      <div className="payment_container">
        <h1 className="payment_title">
          Checkout (<Link to="/checkout">{totalItems} item{totalItems !== 1 ? 's' : ''}</Link>)
        </h1>

        {/* 1 — Delivery */}
        <div className='payment_section'>
          <div className='payment_title_col'>
            <h3>1 Delivery address</h3>
          </div>
          <div className='payment_body'>
            <p className="payment_email">{user?.email || 'Guest'}</p>
            <p>123 University Road</p>
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>

        {/* 2 — Review items */}
        <div className='payment_section'>
          <div className='payment_title_col'>
            <h3>2 Review items and delivery</h3>
          </div>
          <div className='payment_body'>
            {basket.length === 0 ? (
              <p>Your cart is empty. <Link to="/">Continue shopping</Link></p>
            ) : (
              basket.map((item, i) => (
                <CheckoutProduct
                  key={item.id + i}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  quantity={item.quantity}
                  hideButton
                />
              ))
            )}
          </div>
        </div>

        {/* 3 — Payment */}
        <div className='payment_section'>
          <div className='payment_title_col'>
            <h3>3 Payment method</h3>
          </div>
          <div className='payment_body'>
            <div className="payment_card_hint">
              <p>Test card: <strong>4242 4242 4242 4242</strong> | Exp: any future date | CVV: any 3 digits</p>
            </div>
            <form onSubmit={handleSubmit} className="payment_form">
              <CardElement
                onChange={handleChange}
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#0f1111',
                      '::placeholder': { color: '#888' },
                    },
                  },
                }}
              />

              {error && <div className="payment_error">{error}</div>}

              <div className='payment_summary'>
                <p>
                  Order total: <strong>${total.toFixed(2)}</strong>
                </p>
                <button
                  type="submit"
                  disabled={processing || disabled || succeeded || basket.length === 0}
                  className="payment_submitBtn"
                >
                  {processing ? 'Processing…' : succeeded ? 'Order Placed!' : `Place your order ($${total.toFixed(2)})`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;