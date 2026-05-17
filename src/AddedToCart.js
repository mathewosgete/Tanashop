import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useStateValue } from './StateProvider';
import './AddedToCart.css';
import { productsData } from './data/products';

function AddedToCart() {
  const location = useLocation();
  const navigate = useNavigate();
  const [{ basket }] = useStateValue();
  const product = location.state?.product;

  // Get 3 recommended products from the same category
  const recommendations = product
    ? productsData.filter(p => p.category === (product.category || 'Electronics') && p.id !== product.id).slice(0, 3)
    : productsData.slice(0, 3);

  if (!product) {
    navigate('/');
    return null;
  }

  const cartTotal = basket.reduce((a, item) => a + item.price * (item.quantity || 1), 0);
  const totalItems = basket.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="addedToCart">
      <div className="addedToCart_container">
        {/* Left */}
        <div className="addedToCart_left">
          <div className="addedToCart_success">
            <CheckCircleIcon className="successIcon" />
            <h2>Added to Cart</h2>
          </div>

          <div className="addedToCart_productInfo">
            <img src={product.image} alt={product.title} />
            <div className="addedToCart_details">
              <span className="addedToCart_title">{product.title}</span>
              <span className="addedToCart_price">${product.price?.toFixed(2)}</span>
              {product.isPrime !== false && (
                <span className="addedToCart_prime">
                  <img
                    src="https://m.media-amazon.com/images/G/01/prime/marketing/slashPrime/amazon-prime-delivery-checkmark._TTD_.png"
                    alt="Prime"
                  />
                  FREE Prime Delivery
                </span>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="addedToCart_recommendations">
            <h3>Customers who bought this also bought</h3>
            <div className="addedToCart_recGrid">
              {recommendations.map(rec => (
                <Link to={`/product/${rec.id}`} key={rec.id} className="addedToCart_recCard">
                  <img src={rec.image} alt={rec.title} />
                  <p>${rec.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="addedToCart_right">
          <div className="addedToCart_subtotal">
            <div className="subtotalText">
              Cart subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):
            </div>
            <div className="subtotalPrice">${cartTotal.toFixed(2)}</div>
          </div>

          <div className="addedToCart_actions">
            <button className="checkoutBtn" onClick={() => navigate('/payment')}>
              Proceed to checkout ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </button>
            <button className="cartBtn" onClick={() => navigate('/checkout')}>
              Go to Cart
            </button>
            <Link to="/" className="addedToCart_continueShopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddedToCart;