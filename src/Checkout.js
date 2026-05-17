import React from 'react';
import './Checkout.css';
import { Link } from 'react-router-dom';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';

function Checkout() {
  const [{ basket }] = useStateValue();

  const totalItems = basket.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className='checkout'>
      <div className='checkout_left'>
        <div className="checkout_header">
          <h1 className="checkout_mainTitle">Shopping Cart</h1>
          <span className="checkout_deselect">Deselect all items</span>
        </div>

        <div className="checkout_labelRow">
          <span>Price</span>
        </div>

        {basket.length === 0 ? (
          <div className="checkout_empty">
            <h2>Your Tanashop Cart is empty.</h2>
            <p>
              Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics, and more.
            </p>
            <Link to="/" className="checkout_shopBtn">Continue shopping</Link>
          </div>
        ) : (
          <>
            {basket.map((item, i) => (
              <CheckoutProduct
                key={item.id + i}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                quantity={item.quantity}
              />
            ))}
            <div className="checkout_total">
              Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):
              <strong> ${basket.reduce((a, item) => a + item.price * (item.quantity || 1), 0).toFixed(2)}</strong>
            </div>
          </>
        )}
      </div>

      <div className='checkout_right'>
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
