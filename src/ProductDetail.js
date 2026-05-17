import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { productsData } from './data/products';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [{ currency }, dispatch] = useStateValue();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = productsData.find(p => p.id === id);
    setProduct(found || null);
  }, [id]);

  if (!product) {
    return (
      <div className="productDetail_notFound">
        <h2>Product not found</h2>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  const addToCart = () => {
    for (let i = 0; i < qty; i++) {
      dispatch({
        type: 'ADD_TO_BASKET',
        item: { id: product.id, title: product.title, image: product.image, price: product.price, rating: product.rating, quantity: 1 }
      });
    }
    navigate('/added-to-cart', { state: { product } });
  };

  const buyNow = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: { id: product.id, title: product.title, image: product.image, price: product.price, rating: product.rating, quantity: 1 }
    });
    navigate('/payment');
  };

  const convertedPrice = product.price * (currency?.rate || 1.0);
  const priceWhole = Math.floor(convertedPrice);
  const priceFraction = (convertedPrice % 1).toFixed(2).substring(2);

  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="productDetail">
      {/* Breadcrumb */}
      <div className="productDetail_breadcrumb">
        <Link to="/">Home</Link>
        <span> › </span>
        <span>{product.category}</span>
        <span> › </span>
        <span className="productDetail_breadcrumbCurrent">{product.title.substring(0, 40)}...</span>
      </div>

      <div className="productDetail_container">

        {/* LEFT — Image gallery */}
        <div className="productDetail_left">
          <div className="productDetail_thumbnails">
            {[product.image, product.image, product.image].map((img, i) => (
              <img key={i} src={img} alt={`view ${i+1}`} className="productDetail_thumb" />
            ))}
          </div>
          <div className="productDetail_mainImg">
            <img src={product.image} alt={product.title} />
          </div>
        </div>

        {/* MIDDLE — Product info */}
        <div className="productDetail_middle">
          <h1 className="productDetail_title">{product.title}</h1>

          <div className="productDetail_meta">
            <span className="productDetail_brand">Visit the <strong>Tanashop Store</strong></span>
          </div>

          <div className="productDetail_ratingRow">
            <div className="productDetail_stars">
              {Array(5).fill(0).map((_, i) => (
                <span key={i} style={{ color: i < product.rating ? '#FFA41C' : '#DDD', fontSize: '18px' }}>★</span>
              ))}
            </div>
            <a href="#reviews" className="productDetail_reviewLink">
              {(product.reviews || 0).toLocaleString()} ratings
            </a>
            <span className="productDetail_boughtRecently">1K+ bought in past month</span>
          </div>

          <hr className="productDetail_divider" />

          <div className="productDetail_priceBlock">
            <span className="productDetail_label">Price: </span>
            <span className="productDetail_priceSymbol">{currency?.symbol || '$'}</span>
            <span className="productDetail_priceWhole">{priceWhole}</span>
            <span className="productDetail_priceFraction">{priceFraction}</span>
          </div>

          {product.isPrime && (
            <div className="productDetail_primeRow">
              <img
                src="https://m.media-amazon.com/images/G/01/prime/marketing/slashPrime/amazon-prime-delivery-checkmark._TTD_.png"
                alt="Prime"
                className="productDetail_primeImg"
              />
              <span className="productDetail_primeText">FREE Delivery <strong>Tomorrow</strong> for Prime Members</span>
            </div>
          )}

          <hr className="productDetail_divider" />

          <div className="productDetail_about">
            <h3>About this item</h3>
            <ul>
              <li>Premium quality product verified by authentic sellers.</li>
              <li>Includes standard 1-year warranty and dedicated customer support.</li>
              <li>Durable materials designed for everyday use and longevity.</li>
              <li>Compatible with all standard accessories and configurations.</li>
              <li>Free returns within 30 days of purchase.</li>
            </ul>
          </div>
        </div>

        {/* RIGHT — Buy box */}
        <div className="productDetail_right">
          <div className="productDetail_buyBox">
            <div className="productDetail_buyPrice">
              <span className="productDetail_priceSymbol">{currency?.symbol || '$'}</span>
              <span className="productDetail_priceWhole">{priceWhole}</span>
              <span className="productDetail_priceFraction">{priceFraction}</span>
            </div>

            {product.isPrime ? (
              <div className="productDetail_delivery">
                <img
                  src="https://m.media-amazon.com/images/G/01/prime/marketing/slashPrime/amazon-prime-delivery-checkmark._TTD_.png"
                  alt="Prime"
                  className="productDetail_primeImgSmall"
                />
                <span><strong>FREE delivery</strong> Tomorrow</span>
              </div>
            ) : (
              <div className="productDetail_delivery">
                <span>Delivery: <strong>2–3 Business Days</strong></span>
              </div>
            )}

            <div className="productDetail_location">
              <span>📍 Deliver to <strong>Ethiopia</strong></span>
            </div>

            <div className="productDetail_stock inStock">In Stock</div>

            <div className="productDetail_qtyRow">
              <label>Qty:</label>
              <select value={qty} onChange={e => setQty(Number(e.target.value))}>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <button className="productDetail_button addToCartBtn" onClick={addToCart}>
              Add to Cart
            </button>
            <button className="productDetail_button buyNowBtn" onClick={buyNow}>
              Buy Now
            </button>

            <div className="productDetail_secureRow">
              🔒 Secure transaction
            </div>

            <div className="productDetail_soldBy">
              <div><span className="productDetail_soldByLabel">Ships from</span> <span>Tanashop</span></div>
              <div><span className="productDetail_soldByLabel">Sold by</span> <span>Tanashop</span></div>
              <div><span className="productDetail_soldByLabel">Returns</span> <span className="productDetail_returns">Eligible for Return, Refund or Replacement</span></div>
            </div>

            <div className="productDetail_giftOption">
              <input type="checkbox" id="giftOption" />
              <label htmlFor="giftOption"> Add a gift receipt for easy returns</label>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div id="reviews" className="productDetail_reviewsSection">
        <hr className="productDetail_divider" />
        <div className="productDetail_reviewsContainer">
          <div className="productDetail_reviewsLeft">
            <h3>Customer Reviews</h3>
            <div className="productDetail_avgRating">
              <div className="productDetail_starsLarge">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} style={{ color: i < product.rating ? '#FFA41C' : '#DDD' }}>★</span>
                ))}
              </div>
              <span>{product.rating} out of 5</span>
            </div>
            <p className="productDetail_globalRatings">{product.reviews?.toLocaleString()} global ratings</p>
            
            {/* Rating Bars */}
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="productDetail_ratingBar">
                <span>{stars} star</span>
                <div className="barContainer"><div className="barFill" style={{ width: `${stars === 5 ? 75 : stars === 4 ? 15 : 5}%` }}></div></div>
                <span>{stars === 5 ? '75%' : stars === 4 ? '15%' : '5%'}</span>
              </div>
            ))}
          </div>
          
          <div className="productDetail_reviewsRight">
            <h3>Top reviews from the United States</h3>
            <div className="productDetail_review">
              <div className="review_user">
                <img src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png" alt="User" />
                <span>Mathewos Gete</span>
              </div>
              <div className="review_header">
                <div className="review_stars">★★★★★</div>
                <strong>Verified Purchase</strong>
              </div>
              <p className="review_text">Exactly what I was looking for! The quality is outstanding and it arrived much faster than expected. Highly recommended for anyone in the market for this category.</p>
            </div>
            <div className="productDetail_review">
              <div className="review_user">
                <img src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png" alt="User" />
                <span>Jane Doe</span>
              </div>
              <div className="review_header">
                <div className="review_stars">★★★★☆</div>
                <strong>Verified Purchase</strong>
              </div>
              <p className="review_text">Great product but the packaging was a bit damaged. Luckily the item inside was perfectly fine. Works as advertised!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
