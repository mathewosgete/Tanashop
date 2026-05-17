import React from 'react';
import './SmartHomeLighting.css';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

function SmartHomeLighting() {
    const products = [
        {
            id: 'shl-1',
            title: 'Kasa Smart Light Switch HS200, Single Pole, Needs Neutral Wire, 2.4GHz Wi-Fi Light Switch Works with Google Home',
            price: 11.37,
            rating: 4.5,
            reviews: 11300,
            image: 'https://m.media-amazon.com/images/I/71TP8UfXpFL._AC_SL1500_.jpg',
            isBestSeller: true,
            boughtCount: '3K+ bought in past month'
        },
        {
            id: 'shl-2',
            title: 'Philips Hue Bridge, Unlock the Full Potential of Hue Bridge System, Multi-Room and Out-of-Home Control',
            price: 43.86,
            rating: 4.5,
            reviews: 11300,
            image: 'https://m.media-amazon.com/images/I/51pM5W0D+OL._AC_SL1000_.jpg',
            boughtCount: '1K+ bought in past month'
        },
        {
            id: 'shl-3',
            title: 'PHILIPS Hue Smart Dimmer Switch Remote, White, 1 Pack, Turns Hue Lights On, Off, Dims or Brightens',
            price: 26.99,
            rating: 4.5,
            reviews: 3900,
            image: 'https://m.media-amazon.com/images/I/51S4C0K-8FL._AC_SL1000_.jpg',
            boughtCount: '2K+ bought in past month'
        },
        {
            id: 'shl-4',
            title: 'SYLVANIA Wifi LED Smart Light Bulb, 60W Equivalent Full Color and Tunable White A19, Dimmable, Compatible with Alexa',
            price: 10.99,
            rating: 4.5,
            reviews: 21800,
            image: 'https://m.media-amazon.com/images/I/61iXf362-EL._AC_SL1500_.jpg',
            boughtCount: '3K+ bought in past month'
        },
        {
            id: 'shl-5',
            title: 'Feit Electric OM60/RGBW/CA/AG/3 60 Watt Equivalent WiFi Color Changing and Tunable White, Dimmable, No Hub Required',
            price: 10.27,
            rating: 4.5,
            reviews: 7900,
            image: 'https://m.media-amazon.com/images/I/61dmOa7U-fL._AC_SL1500_.jpg',
            boughtCount: '2K+ bought in past month'
        },
        {
            id: 'shl-6',
            title: 'WiZ Connected 40W B12 Smart Candle-shape, E12 base, Full Color, Dimmable, 1-Pack, Indoor, Connect to Wi-Fi',
            price: 14.01,
            rating: 4.5,
            reviews: 562,
            image: 'https://m.media-amazon.com/images/I/61Dbe5-f1GL._AC_SL1500_.jpg',
            boughtCount: '1K+ bought in past month'
        },
        {
            id: 'shl-7',
            title: 'Philips Hue Play Gradient 65" Smart TV Light Strip, Flowing Color-Changing LED Strip Lights, Multicolor TV Backlight',
            price: 140.13,
            rating: 4.5,
            reviews: 2200,
            image: 'https://m.media-amazon.com/images/I/71Y9tVv6wTL._AC_SL1500_.jpg',
            boughtCount: '500+ bought in past month'
        },
        {
            id: 'shl-8',
            title: 'Sengled WiFi Color Changing Light Bulb, Alexa Smart Light Bulbs that Compatible with Alexa & Google Assistant, A19 RGB',
            price: 36.99,
            rating: 4.0,
            reviews: 36000,
            image: 'https://m.media-amazon.com/images/I/71LhB1Z2+mL._AC_SL1500_.jpg',
            boughtCount: '3K+ bought in past month'
        }
    ];

    const renderRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<StarIcon key={i} className="shl_star" />);
            } else if (i - 0.5 <= rating) {
                stars.push(<StarHalfIcon key={i} className="shl_star" />);
            } else {
                stars.push(<StarOutlineIcon key={i} className="shl_star" />);
            }
        }
        return stars;
    };

    return (
        <div className="shl">
            <div className="shl_container">
                <div className="shl_left">
                    <div className="shl_filterSection">
                        <h4>Department</h4>
                        <span className="shl_activeCategory">Smart Home: Lighting</span>
                        <ul>
                            <li>Beauty & Personal Care</li>
                            <li>Home & Kitchen</li>
                            <li>Industrial & Scientific</li>
                            <li>Patio, Lawn & Garden</li>
                            <li>Sports & Outdoors</li>
                            <li>Tools & Home Improvement</li>
                        </ul>
                    </div>

                    <div className="shl_filterSection">
                        <h4>Eligible for Free Shipping</h4>
                        <div className="shl_checkbox">
                            <input type="checkbox" id="freeShipping" />
                            <label htmlFor="freeShipping">Free Shipping by Tanashop</label>
                        </div>
                        <p className="shl_filterSub">Get FREE Shipping on eligible orders shipped by Tanashop</p>
                    </div>

                    <div className="shl_filterSection">
                        <h4>Customer Reviews</h4>
                        {[4, 3, 2, 1].map(stars => (
                            <div key={stars} className="shl_ratingFilter">
                                {renderRating(stars)}
                                <span>& Up</span>
                            </div>
                        ))}
                    </div>

                    <div className="shl_filterSection">
                        <h4>Deals & Discounts</h4>
                        <ul>
                            <li>All Discounts</li>
                            <li>Today's Deals</li>
                        </ul>
                    </div>
                </div>

                <div className="shl_right">
                    <div className="shl_header">
                        <h1>Smart Lighting | Smart Home</h1>
                        <p>Welcome to the Smart Lighting store, where you can shop for smart lights and switches to create the best ambience, save energy and appear home when you're not.</p>
                        <div className="shl_resultsInfo">
                            1-8 of 183 results for <span>Smart Home: Lighting</span>
                        </div>
                    </div>

                    <div className="shl_productGrid">
                        {products.map(product => (
                            <div key={product.id} className="shl_productCard">
                                <div className="shl_productImageContainer">
                                    {product.isBestSeller && <div className="shl_bestSellerBadge">Best Seller</div>}
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className="shl_productInfo">
                                    <h2 className="shl_productTitle">{product.title}</h2>
                                    <div className="shl_productRating">
                                        {renderRating(product.rating)}
                                        <span className="shl_reviewCount">{(product.reviews || 0).toLocaleString()}</span>
                                    </div>
                                    {product.boughtCount && <div className="shl_boughtCount">{product.boughtCount}</div>}
                                    <div className="shl_price">
                                        <span className="shl_priceSymbol">$</span>
                                        <span className="shl_priceWhole">{Math.floor(product.price)}</span>
                                        <span className="shl_priceFraction">{(product.price % 1).toFixed(2).split('.')[1]}</span>
                                    </div>
                                    <div className="shl_delivery">
                                        FREE delivery <b>Tue, Oct 24</b> on $35 of items shipped by Tanashop
                                    </div>
                                    <div className="shl_primeInfo">
                                        <img src="https://m.media-amazon.com/images/G/01/prime/marketing/slash/prime-logo-slash._CB485932546_.png" alt="Prime" className="shl_primeLogo" />
                                        <span>Or fastest delivery <b>Mon, Oct 23</b></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="shl_seeAll">
                        <button>See all results</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SmartHomeLighting;
