import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom';

function CheckoutProduct({ id, image, title, price, rating, quantity, hideButton }) {
  const [, dispatch] = useStateValue();

  const removeOne = () => dispatch({ type: 'REMOVE_FROM_BASKET', id });
  const addOne = () => dispatch({ type: 'ADD_TO_BASKET', item: { id, title, image, price, rating, quantity: 1 } });
  const deleteAll = () => {
    for (let i = 0; i < (quantity || 1); i++) {
      dispatch({ type: 'REMOVE_FROM_BASKET', id });
    }
  };

  const priceWhole = Math.floor(price);
  const priceFraction = (price % 1).toFixed(2).substring(2);

  return (
    <div className='checkoutProduct'>
      <Link to={`/product/${id}`}>
        <img className='checkoutProduct_image' src={image} alt={title} />
      </Link>

      <div className='checkoutProduct_info'>
        <Link to={`/product/${id}`} className="checkoutProduct_titleLink">
          <p className='checkoutProduct_title'>{title}</p>
        </Link>

        <div className="checkoutProduct_price">
          <span className="checkoutProduct_priceSymbol">$</span>
          <span className="checkoutProduct_priceWhole">{priceWhole}</span>
          <span className="checkoutProduct_priceFraction">{priceFraction}</span>
        </div>

        <div className='checkoutProduct_rating'>
          {Array(rating || 0).fill(0).map((_, i) => (
            <span key={i} style={{ color: '#FFA41C' }}>★</span>
          ))}
        </div>

        {!hideButton && (
          <div className='checkoutProduct_controls'>
            <div className="checkoutProduct_qty">
              <button onClick={removeOne} disabled={(quantity || 1) <= 1} title="Decrease">−</button>
              <span className="checkoutProduct_qtyNum">{quantity || 1}</span>
              <button onClick={addOne} title="Increase">+</button>
            </div>
            <span className="checkoutProduct_divider">|</span>
            <button className='checkoutProduct_delete' onClick={deleteAll}>Delete</button>
            <span className="checkoutProduct_divider">|</span>
            <button className='checkoutProduct_save'>Save for later</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
