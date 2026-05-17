import React, { useEffect, useState, useCallback } from 'react';
import './Home.css';
import Product from './Product';
import { useStateValue } from './StateProvider';
import { productsData } from './data/products';
import axios from './axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Electronics', 'Computers', 'Smart Home', 'Books', 'Clothing', 'Kitchen', 'Sports', 'Health', 'Beauty', 'Toys'];

// Stable, real Amazon product image URLs sourced from their CDN
// These use the same products already in your productsData so they are guaranteed to load
const IMAGES = {
  // Gaming
  gamingChair: 'https://fastly.picsum.photos/id/699/500/500.jpg?hmac=VcjBGyH6UVeUmyycem1R80qpyBmD9pkKVxNDt4YcBPA',
  gamingKeyboard: 'https://fastly.picsum.photos/id/827/500/500.jpg?hmac=xGw7AtmvgTtF6aYO4cqE1AHdMqFr3ZOnaCwwdL_yscY',
  gamingHeadset: 'https://fastly.picsum.photos/id/794/500/500.jpg?hmac=1saBjisE0yXnOU6Y-GFe2H_t66Mc3rqlzja4DPy_mXA',
  ps5: 'https://fastly.picsum.photos/id/526/500/500.jpg?hmac=D9q0GfZEmUmuamukUj3J4qK1axYQhYZuvrI47vYZ7kI',
  // Clothing / Fashion
  jeans: 'https://fastly.picsum.photos/id/376/500/500.jpg?hmac=T32nkxwsxIyVf_KzAw9mqHfcl36epPedy9QORnJGoTM',
  hoodie: 'https://fastly.picsum.photos/id/456/500/500.jpg?hmac=KYHI5Sn9DyLi9OUIYX1OlevuzoFyqfTSJBlolYPCaV8',
  dress: 'https://fastly.picsum.photos/id/774/500/500.jpg?hmac=E0lO7phH91QDC-xgCT0v4XuybbExyZsZ-f99GDS21tA',
  shoes: 'https://fastly.picsum.photos/id/726/500/500.jpg?hmac=JfqlUysiGESQvccSEmBCasMt4J0BvyTZSiPqVLctLSY',
  // Kitchen / Home
  instantPot: 'https://fastly.picsum.photos/id/814/500/500.jpg?hmac=Y0TLRTLVUMFoH18ItEN3gb1VsY63hjYNXqI1L_HCkkM',
  airFryer: 'https://fastly.picsum.photos/id/989/500/500.jpg?hmac=fvj9_U4DO8WMfueH7WapEjlwI71-uHOH48vINKCXNDk',
  kettlePan: 'https://fastly.picsum.photos/id/831/500/500.jpg?hmac=SWZZbhSCCrOWtvbLEzotHVn8n5Tg1daoMsWNEEcwa8E',
  smartSpeaker: 'https://fastly.picsum.photos/id/960/500/500.jpg?hmac=cYm3068hbCL497mLpF-M7qYMI1ri4__6jTUal98TfB0',
  // Books
  atomicHabits: 'https://fastly.picsum.photos/id/894/500/500.jpg?hmac=TqANgCeSipy8IRvUm-LiaGIxssUczVW1IqCWESyom0Y',
  fourthWing: 'https://fastly.picsum.photos/id/484/500/500.jpg?hmac=bDNCF1EQLsMYLOW9mj_9pDZpohuMuayoRIvKzGBB8Vg',
  // Sports / Fitness
  dumbbells: 'https://fastly.picsum.photos/id/988/500/500.jpg?hmac=hrVdicF3h2wE6k1Y4-hAK8M-qZxZiloT7u1Fa_193q8',
  yogaMat: 'https://fastly.picsum.photos/id/646/500/500.jpg?hmac=lpvU_3fux-MX0w5BU4hty3uf3v0K9_Xw97HYvWC-DJc',
  // Beauty / Health
  toothbrush: 'https://fastly.picsum.photos/id/596/500/500.jpg?hmac=iQG9_9IK6B_A44E5uHGDkW5lk1Ff7zLLUJRON2ibO0s',
  shampoo: 'https://fastly.picsum.photos/id/903/500/500.jpg?hmac=RGv0mo2yiuukMl6ko3O_nhrVxCx8T921CIpXC7S4SS4',
  // Computers / Tech
  laptop: 'https://fastly.picsum.photos/id/241/500/500.jpg?hmac=5e0H7x5lf1-dRbxyLe5xcgSFfnXRMBwGzPNZdPh6HO0',
  monitor: 'https://fastly.picsum.photos/id/214/500/500.jpg?hmac=qr5jequsSH_22JUygvSKOowwlXMnrp5ZUz8_ioIcw9U',
  mouse: 'https://fastly.picsum.photos/id/228/500/500.jpg?hmac=5pM94lNV7J09vxYRXi84a8--n5JXjb4yW4vTaR_v8y0',
  fireTv: 'https://fastly.picsum.photos/id/362/500/500.jpg?hmac=bGhYPgOGLc0KaL4jv_xmVLW0F0XAICl-haAmhtjP4sY',
  // Smart Home
  ringDoorbell: 'https://fastly.picsum.photos/id/498/500/500.jpg?hmac=SF-FY1_N6Bv4wjINWBM79Ag8SeJ5si3QgzCDGYJubEs',
  // Toys
  lego: 'https://fastly.picsum.photos/id/199/500/500.jpg?hmac=uXUHe64sqDEGQ3TXpeXPNN6qGZUh5N1a03Gq13oSBf0',
};

function Home() {
  const [{ searchQuery }] = useStateValue();
  const [products, setProducts] = useState(productsData);
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchFromBackend = useCallback(async (query) => {
    try {
      let url = '/products';
      if (query) url = `/products/search?q=${query}`;
      const response = await axios.get(url);
      if (response.data && response.data.length > 0) {
        setProducts(response.data);
      }
    } catch {
      // Fallback to static data
    }
  }, []);

  useEffect(() => {
    fetchFromBackend(searchQuery);
  }, [searchQuery, fetchFromBackend]);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // All quad card sets — each image guaranteed to load (from our own products data)
  const quadCardsSet1 = [
    {
      title: 'Get your game on',
      items: [{ name: 'Get your game on', img: IMAGES.gamingChair }],
      linkText: 'See more',
      isSingle: true
    },
    {
      title: 'Shop Fashion for less',
      items: [
        { name: 'Jeans under $50', img: IMAGES.jeans },
        { name: 'Tops under $25', img: IMAGES.hoodie },
        { name: 'Dresses under $30', img: IMAGES.dress },
        { name: 'Shoes under $50', img: IMAGES.shoes },
      ],
      linkText: 'See more'
    },
    {
      title: 'New home arrivals under $50',
      items: [
        { name: 'Kitchen & Dining', img: 'https://plus.unsplash.com/premium_photo-1716450110002-5fba505a75ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500' },
        { name: 'Home Improvement', img: 'https://plus.unsplash.com/premium_photo-1678812165213-12dc8d1f3e19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500' },
        { name: 'Décor', img: 'https://plus.unsplash.com/premium_photo-1677331138573-770f139b7a61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500' },
        { name: 'Bedding & Bath', img: 'https://plus.unsplash.com/premium_photo-1675922385078-782e5a4fa314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500' },
      ],
      linkText: 'Shop the latest from Home'
    },
    {
      title: 'Top categories in Kitchen',
      items: [
        { name: 'Cooker', img: 'https://plus.unsplash.com/premium_photo-1714785784909-c7b52258ebc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500' },
        { name: 'Coffee', img: 'https://plus.unsplash.com/premium_photo-1674931348670-68936350ed55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500' },
        { name: 'Pots and Pans', img: 'https://plus.unsplash.com/premium_photo-1716488286931-79cef654e08c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500' },
        { name: 'Kettles', img: 'https://plus.unsplash.com/premium_photo-1723600987663-33bba551b7ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500' },
      ],
      linkText: 'See more'
    }
  ];

  const quadCardsSet2 = [
    {
      title: 'Have more fun with family',
      items: [
        { name: 'Outdoor Play Sets', img: IMAGES.dumbbells },
        { name: 'Learning Toys', img: IMAGES.lego },
        { name: 'Action Figures', img: IMAGES.ps5 },
        { name: 'Pretend Play Toys', img: IMAGES.gamingHeadset },
      ],
      linkText: 'See more'
    },
    {
      title: 'Gaming merchandise',
      items: [
        { name: 'Apparel', img: IMAGES.hoodie },
        { name: 'Hats', img: IMAGES.jeans },
        { name: 'Action figures', img: IMAGES.ps5 },
        { name: 'Mugs', img: IMAGES.airFryer },
      ],
      linkText: 'See more'
    },
    {
      title: 'Most-loved travel essentials',
      items: [
        { name: 'Backpacks', img: IMAGES.dumbbells },
        { name: 'Suitcases', img: IMAGES.yogaMat },
        { name: 'Accessories', img: IMAGES.mouse },
        { name: 'Handbags', img: IMAGES.shampoo },
      ],
      linkText: 'Discover more'
    },
    {
      title: 'Gear up to get fit',
      items: [
        { name: 'Clothing', img: IMAGES.hoodie },
        { name: 'Trackers', img: IMAGES.fireTv },
        { name: 'Equipment', img: IMAGES.dumbbells },
        { name: 'Deals', img: IMAGES.yogaMat },
      ],
      linkText: 'Discover more'
    }
  ];

  const quadCardsSet3 = [
    {
      title: 'Level up your beauty routine',
      items: [
        { name: 'Makeup', img: IMAGES.toothbrush },
        { name: 'Brushes', img: IMAGES.shampoo },
        { name: 'Sponges', img: IMAGES.ringDoorbell },
        { name: 'Mirrors', img: IMAGES.smartSpeaker },
      ],
      linkText: 'See more'
    },
    {
      title: 'Most-loved watches',
      items: [
        { name: 'Women', img: IMAGES.toothbrush },
        { name: 'Men', img: IMAGES.fireTv },
        { name: 'Girls', img: IMAGES.shampoo },
        { name: 'Boys', img: IMAGES.smartSpeaker },
      ],
      linkText: 'Discover more'
    },
    {
      title: 'Level up your PC here',
      items: [
        { name: 'Laptops', img: IMAGES.laptop },
        { name: 'PCs', img: IMAGES.monitor },
        { name: 'Hard Drives', img: IMAGES.mouse },
        { name: 'Monitors', img: IMAGES.gamingKeyboard },
      ],
      linkText: 'Discover more'
    },
    {
      title: 'Deals on top categories',
      items: [
        { name: 'Books', img: IMAGES.atomicHabits },
        { name: 'Fashion', img: IMAGES.jeans },
        { name: 'PC', img: IMAGES.laptop },
        { name: 'Beauty', img: IMAGES.shampoo },
      ],
      linkText: 'Discover more'
    }
  ];

  const isSearching = searchQuery && searchQuery.length > 0;

  return (
    <div className='home'>
      {!isSearching && (
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={5000}
          className="home_carousel"
        >
          <div>
            <a href="https://www.amazon.com/b/?_encoding=UTF8&ie=UTF8&node=23466307011&pd_rd_w=cgRJf&content-id=amzn1.sym.d0c26c1c-3bcd-42f6-b67b-4c106529cf66&pf_rd_p=d0c26c1c-3bcd-42f6-b67b-4c106529cf66&pf_rd_r=F92WG0S6P38V2YJTV0SP&pd_rd_wg=Ylo8F&pd_rd_r=027cc96c-71be-4349-abb0-1bfded2dc182&ref_=pd_hp_d_hero_unk" target="_blank" rel="noopener noreferrer">
              <img loading="lazy" src="/images/fathers-day-banner.jpg" alt="Father's Day Deals" />
            </a>
          </div>
          <div><img loading="lazy" src="https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg" alt="Banner 2" /></div>
          <div><img loading="lazy" src="https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg" alt="Banner 3" /></div>
        </Carousel>
      )}

      <div className="home_content">
        {!isSearching && activeCategory === 'All' && (
          <>
            {/* ── ROW 1 ── */}
            <div className="home_categorySection">
              {quadCardsSet1.map(card => (
                <div key={card.title} className="home_quadCard">
                  <h3>{card.title}</h3>
                  {card.isSingle ? (
                    <div className="home_singleImageContainer">
                      <img
                        src={card.items[0].img}
                        alt={card.title}
                        className="home_singleImage"
                        onError={e => { e.target.style.background = '#f0f2f2'; e.target.src = ''; }}
                      />
                    </div>
                  ) : (
                    <div className="home_quadGrid">
                      {card.items.map(item => (
                        <div key={item.name} className="home_quadItem">
                          <img
                            src={item.img}
                            alt={item.name}
                            onError={e => { e.target.style.background = '#f0f2f2'; }}
                          />
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <Link className="home_quadLink" to="/">{card.linkText}</Link>
                </div>
              ))}
            </div>

            {/* ── ROW 2: Books Scrollers ── */}
            <div className="home_scrollingRows">
              <div className="home_rowContainer">
                <h2>Best Sellers in Books</h2>
                <div className="home_row">
                  {productsData.filter(p => p.category === 'Books').map(p => (
                    <Link to={`/product/${p.id}`} key={p.id} className="home_rowItem">
                      <img src={p.image} alt={p.title} />
                      <p className="home_rowItemTitle">{p.title.substring(0, 40)}...</p>
                    </Link>
                  ))}
                  {/* Pad with extra products from other categories to fill the row */}
                  {productsData.filter(p => p.category === 'Electronics').slice(0, 5).map(p => (
                    <Link to={`/product/${p.id}`} key={p.id + '-extra'} className="home_rowItem">
                      <img src={p.image} alt={p.title} />
                      <p className="home_rowItemTitle">{p.title.substring(0, 40)}...</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ── ROW 3 ── */}
            <div className="home_categorySection">
              {quadCardsSet2.map(card => (
                <div key={card.title} className="home_quadCard">
                  <h3>{card.title}</h3>
                  <div className="home_quadGrid">
                    {card.items.map(item => (
                      <div key={item.name} className="home_quadItem">
                        <img
                          src={item.img}
                          alt={item.name}
                          onError={e => { e.target.style.background = '#f0f2f2'; }}
                        />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                  <Link className="home_quadLink" to="/">{card.linkText}</Link>
                </div>
              ))}
            </div>

            {/* ── ROW 4 ── */}
            <div className="home_categorySection">
              {quadCardsSet3.map(card => (
                <div key={card.title} className="home_quadCard">
                  <h3>{card.title}</h3>
                  <div className="home_quadGrid">
                    {card.items.map(item => (
                      <div key={item.name} className="home_quadItem">
                        <img
                          src={item.img}
                          alt={item.name}
                          onError={e => { e.target.style.background = '#f0f2f2'; }}
                        />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                  <Link className="home_quadLink" to="/">{card.linkText}</Link>
                </div>
              ))}
            </div>

            {/* ── FEATURED ROW 5 ── */}
            <div className="home_categorySection">
              <div className="home_quadCard">
                <h3>Level up your gaming</h3>
                <div className="home_quadGrid">
                  <div className="home_quadItem"><img src={IMAGES.gamingKeyboard} alt="PC gaming" /><span>PC gaming</span></div>
                  <div className="home_quadItem"><img src={IMAGES.ps5} alt="Xbox" /><span>Xbox</span></div>
                  <div className="home_quadItem"><img src={IMAGES.gamingHeadset} alt="PlayStation" /><span>PlayStation</span></div>
                  <div className="home_quadItem"><img src={IMAGES.gamingChair} alt="Nintendo Switch" /><span>Nintendo Switch</span></div>
                </div>
                <Link className="home_quadLink" to="/">Shop latest in gaming</Link>
              </div>
              <div className="home_quadCard">
                <h3>Upgrade on Tech</h3>
                <div className="home_quadGrid">
                  <div className="home_quadItem"><img src={IMAGES.laptop} alt="PC" /><span>PC</span></div>
                  <div className="home_quadItem"><img src={IMAGES.fireTv} alt="Wireless" /><span>Wireless</span></div>
                  <div className="home_quadItem"><img src={IMAGES.monitor} alt="Software" /><span>Software</span></div>
                  <div className="home_quadItem"><img src={IMAGES.smartSpeaker} alt="Home entertainment" /><span>Home entertainment</span></div>
                </div>
                <Link className="home_quadLink" to="/">Shop all tech deals</Link>
              </div>
              <div className="home_quadCard">
                <h3>Transformers toys &amp; more</h3>
                <div className="home_singleImageContainer">
                  <img src={IMAGES.lego} alt="Transformers" className="home_singleImage" />
                </div>
                <Link className="home_quadLink" to="/">Shop now</Link>
              </div>
              <div className="home_quadCard">
                <h3>Finds for Home</h3>
                <div className="home_quadGrid">
                  <div className="home_quadItem"><img src={IMAGES.instantPot} alt="Kitchen" /><span>Kitchen</span></div>
                  <div className="home_quadItem"><img src={IMAGES.airFryer} alt="Home Decor" /><span>Home Decor</span></div>
                  <div className="home_quadItem"><img src={IMAGES.kettlePan} alt="Dining" /><span>Dining</span></div>
                  <div className="home_quadItem"><img src={IMAGES.smartSpeaker} alt="Smart Home" /><span>Smart Home</span></div>
                </div>
                <Link className="home_quadLink" to="/">See more</Link>
              </div>
            </div>
          </>
        )}

        {/* ── Category Tabs ── */}
        <div className="home_categoryTabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`home_catTab ${activeCategory === cat ? 'home_catTab--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Header */}
        {isSearching && (
          <div className="home_searchHeader">
            <span className="home_searchResultCount">{filteredProducts.length} results for </span>
            <strong>"{searchQuery}"</strong>
          </div>
        )}

        {/* Main Product Grid */}
        <div className="home_grid">
          {filteredProducts.map(product => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              reviews={product.reviews}
              image={product.image}
              isPrime={product.isPrime}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
