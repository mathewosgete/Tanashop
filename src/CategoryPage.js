import React from 'react';
import './CategoryPage.css';
import { useParams } from 'react-router-dom';
import { categoryData } from './categoryData';
import { useStateValue } from './StateProvider';
import axios from './axios';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

function CategoryPage() {
    const { slug } = useParams();
    const [{ currency }] = useStateValue();
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const category = categoryData[slug];

    React.useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            try {
                // Map local slug to backend category names
                const categoryMap = {
                    'electronics': 'Electronics',
                    'computers': 'Computers',
                    'arts': 'Arts & Crafts',
                    'smart-home': 'Smart Home'
                };
                const backendCategory = categoryMap[slug] || 'Electronics';
                const response = await axios.get(`/products/search?q=${backendCategory}`);
                const backendProducts = response.data;

                // Fallback image pool from categoryData for this slug
                const localImages = (category?.products || []).map(p => p.image).filter(Boolean);

                // Enrich backend products: if image is missing or empty, use a local fallback
                const enriched = backendProducts.map((p, idx) => ({
                    ...p,
                    image: (p.image && p.image.trim() !== '')
                        ? p.image
                        : (localImages[idx % localImages.length] || `https://picsum.photos/seed/${p.id}/500/500`)
                }));

                setProducts(enriched.length > 0 ? enriched : category?.products || []);
            } catch (err) {
                console.error('Fetch error:', err);
                // Fallback to local categoryData products if backend fails
                setProducts(category?.products || []);
            }
            setLoading(false);
        };
        fetchCategoryProducts();
    }, [slug, category]);

    if (!category) {
        return (
            <div className="cat_notFound">
                <h2>Category Not Found</h2>
                <p>Sorry, we couldn't find the category you were looking for.</p>
            </div>
        );
    }

    const renderRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<StarIcon key={i} className="cat_star" />);
            } else if (i - 0.5 <= rating) {
                stars.push(<StarHalfIcon key={i} className="cat_star" />);
            } else {
                stars.push(<StarOutlineIcon key={i} className="cat_star" />);
            }
        }
        return stars;
    };

    return (
        <div className="cat">
            <div className="cat_container">
                <div className="cat_left">
                    <div className="cat_filterSection">
                        <h4>Department</h4>
                        <span className="cat_activeCategory">{category.title}</span>
                        <ul>
                            <li>Best Sellers</li>
                            <li>New Releases</li>
                            <li>Deals & Sales</li>
                            <li>Customer Service</li>
                        </ul>
                    </div>

                    <div className="cat_filterSection">
                        <h4>Customer Reviews</h4>
                        {[4, 3, 2, 1].map(stars => (
                            <div key={stars} className="cat_ratingFilter">
                                {renderRating(stars)}
                                <span>& Up</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cat_right">
                    <div className="cat_header">
                        <h1>{category.title}</h1>
                        <p>{category.subtitle}</p>
                        <div className="cat_resultsInfo">
                            1-{products.length} of 100+ results for <span>{category.title}</span>
                        </div>
                    </div>

                    <div className="cat_productGrid">
                        {products.map(product => (
                            <div key={product.id} className="cat_productCard">
                                <div className="cat_productImageContainer">
                                    {product.isBestSeller && <div className="cat_bestSellerBadge">Best Seller</div>}
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://picsum.photos/seed/${product.id || product.title}/500/500`;
                                        }}
                                    />
                                </div>
                                <div className="cat_productInfo">
                                    <h2 className="cat_productTitle">{product.title}</h2>
                                    <div className="cat_productRating">
                                        {renderRating(product.rating)}
                                        <span className="cat_reviewCount">{(product.reviews || 0).toLocaleString()}</span>
                                    </div>
                                    {product.boughtCount && <div className="cat_boughtCount">{product.boughtCount}</div>}
                                    {(() => {
                                        const convertedPrice = product.price * (currency?.rate || 1.0);
                                        const whole = Math.floor(convertedPrice);
                                        const frac = (convertedPrice % 1).toFixed(2).split('.')[1];
                                        return (
                                            <div className="cat_price">
                                                <span className="cat_priceSymbol">{currency?.symbol || '$'}</span>
                                                <span className="cat_priceWhole">{whole}</span>
                                                <span className="cat_priceFraction">{frac}</span>
                                            </div>
                                        );
                                    })()}
                                    <div className="cat_delivery">
                                        FREE delivery <b>Tomorrow</b>
                                    </div>
                                    <div className="cat_primeInfo">
                                        <img src="https://m.media-amazon.com/images/G/01/prime/marketing/slash/prime-logo-slash._CB485932546_.png" alt="Prime" className="cat_primeLogo" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;
