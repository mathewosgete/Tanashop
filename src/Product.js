import React from 'react';
import './Product.css';
import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating, reviews, isPrime }) {
  const [{ currency }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const addToBasket = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const item = { id, title, image, price, rating, quantity: 1 };
    dispatch({ type: 'ADD_TO_BASKET', item });
    navigate('/added-to-cart', { state: { product: item } });
  };

  const convertedPrice = price * (currency?.rate || 1.0);
  const priceWhole = Math.floor(convertedPrice);
  const priceFraction = (convertedPrice % 1).toFixed(2).substring(2);

  const ratingStars = (r) => {
    const full = Math.floor(r);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < full ? 'product_starFull' : 'product_starEmpty'}>★</span>
      );
    }
    return stars;
  };

  return (
    <div className='product'>
      <Link to={`/product/${id}`} className="product_imageLink">
        <div className='product_imageContainer'>
          <img className='product_image' src={image} alt={title} />
        </div>
      </Link>

      <div className='product_info'>
        <Link to={`/product/${id}`} className="product_titleLink">
          <h2 className='product_title'>{title}</h2>
        </Link>

        <div className="product_rating">
          <div className="product_stars">{ratingStars(rating)}</div>
          {reviews && (
            <span className="product_reviews">
              {reviews.toLocaleString()}
            </span>
          )}
        </div>

        <div className="product_priceRow">
          <div className="product_priceBlock">
            <span className="product_priceSymbol">{currency?.symbol || '$'}</span>
            <span className="product_priceWhole">{priceWhole}</span>
            <span className="product_priceFraction">{priceFraction}</span>
          </div>
        </div>

        {isPrime && (
          <div className="product_prime">
            <img
              src="https://m.media-amazon.com/images/G/01/prime/marketing/slashPrime/amazon-prime-delivery-checkmark._TTD_.png"
              alt="Prime"
              className="product_primeImg"
            />
            <span>FREE Prime Delivery</span>
          </div>
        )}
      </div>

      <button className="product_addBtn" onClick={addToBasket}>
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
