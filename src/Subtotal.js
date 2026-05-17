import React from 'react';
import './Subtotal.css';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
  const [{ basket, currency }] = useStateValue();
  const navigate = useNavigate();

  const total = basket.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const totalItems = basket.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const hasPrime = basket.some(item => item.isPrime !== false);

  const convertedTotal = total * (currency?.rate || 1.0);

  return (
    <div className='subtotal'>
      {hasPrime && (
        <div className="subtotal_freeDelivery">
          Your order qualifies for <strong>FREE Delivery</strong>.
          <span className="subtotal_selectNote"> Choose this option at checkout.</span>
        </div>
      )}

      <div className="subtotal_price">
        Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):
        <strong className="subtotal_amount"> {currency?.symbol || '$'}{convertedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
      </div>

      <div className="subtotal_giftOption">
        <input type="checkbox" id="giftWrap" />
        <label htmlFor="giftWrap"> This order contains a gift</label>
      </div>

      <button
        className="subtotal_checkoutBtn"
        disabled={basket.length === 0}
        onClick={() => navigate('/payment')}
      >
        Proceed to Checkout ({totalItems} {totalItems === 1 ? 'item' : 'items'})
      </button>
    </div>
  );
}

export default Subtotal;
