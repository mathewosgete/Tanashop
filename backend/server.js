require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');

const app = express();

// CORS — allow production frontend origin in production, everything in dev
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : '*',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint for service monitoring and uptime checks
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/products', require('./routes/products'));

// Full product catalog seed
const seedProducts = async () => {
  const Product = require('./models/Product');
  const count = await Product.count();
  if (count === 0) {
    const productsData = [
      { id: '12321341', title: 'Gaming Chair with Footrest, Massage Office Chair, Ergonomic Computer Chair with Lumbar Support', price: 189.99, rating: 4, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Electronics', isPrime: true },
      { id: '12321234', title: '60% Wired Gaming Keyboard, RGB Backlit Mini Compact 61 Key Keyboard, Waterproof Ultra-Compact for PC/Mac Gamer', price: 16.99, rating: 5, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Electronics', isPrime: true },
      { id: '12321763', title: 'Corsair HS65 SURROUND Wired Gaming Headset, 7.1 Surround Sound, Carbon', price: 43.86, rating: 5, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Electronics', isPrime: false },
      { id: '12321734', title: 'PlayStation 5 Digital Edition (Slim) – Renewed Premium', price: 399.99, rating: 4, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Electronics', isPrime: true },
      { id: '12321653', title: 'IdeaPad 1 Laptop, 15.6" FHD Display, AMD Ryzen 5 5500U, 8GB RAM, 512GB SSD, Windows 11 Home, Cloud Grey', price: 299.00, rating: 5, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Computers', isPrime: true },
      { id: '12321986', title: 'LG 49" UltraGear DQHD Curved Gaming Monitor, 240Hz, 1ms, VESA DisplayHDR 1000, G-Sync Compatible', price: 799.99, rating: 5, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Electronics', isPrime: true },
      { id: 'B09B93ZDG4', title: 'Echo Dot (5th Gen, 2022 release) | Smart speaker with bigger vibrant sound, motion detection, and Alexa', price: 29.99, rating: 5, image: 'https://images.unsplash.com/photo-1512446733611-9099a758e5ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Smart Home', isPrime: true },
      { id: 'B0BX9VN7SC', title: 'Fire TV Stick 4K Max streaming device, supports Wi-Fi 6E, Ambient Experience, and free & live TV', price: 59.99, rating: 5, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Electronics', isPrime: true },
      { id: 'B07XJ8C8F5', title: 'Ring Video Doorbell Wired – Convenient, essential features in a compact design, pair with Ring Chime', price: 44.99, rating: 4, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Smart Home', isPrime: true },
      { id: 'B08QVPSM79', title: "Levi's Men's 511 Slim Fit Jeans, Dark Stonewash, 32W x 32L", price: 48.20, rating: 4, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Clothing', isPrime: true },
      { id: 'B07DV3CC88', title: "Champion Men's Powerblend Fleece Pullover Hoodie, Oxford Gray, Large", price: 40.00, rating: 5, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Clothing', isPrime: true },
      { id: 'B0BTXGRL9T', title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones', price: 11.98, rating: 5, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Books', isPrime: true },
      { id: 'B09W9FJ3NG', title: 'Fourth Wing (The Empyrean Book 1)', price: 14.99, rating: 5, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Books', isPrime: true },
      { id: 'B08NWLDK32', title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, 6 Quart', price: 79.99, rating: 5, image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Kitchen', isPrime: true },
      { id: 'B075CYMYKB', title: 'COSORI Air Fryer 5.8Qt, 1700-Watt Electric Air Fryer Oven with 11 Presets', price: 69.99, rating: 5, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Kitchen', isPrime: true },
      { id: 'B09QD4YJXM', title: 'Bowflex SelectTech 552 Adjustable Dumbbells (Pair), 5-52.5 lbs', price: 379.00, rating: 5, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Sports', isPrime: true },
      { id: 'B087D5P91L', title: 'Manduka PRO Yoga Mat – Premium 6mm Thick Mat, High Performance Grip', price: 120.00, rating: 4, image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Sports', isPrime: false },
      { id: 'B07FMFYQ39', title: 'Philips Sonicare ProtectiveClean 4100 Plaque Control, Electric Toothbrush with Pressure Sensor', price: 49.95, rating: 5, image: 'https://images.unsplash.com/photo-1559762033-60770a1bfca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Health', isPrime: true },
      { id: 'B005QO4SFO', title: "L'Oreal Paris Elvive Total Repair 5 Repairing Shampoo for Damaged Hair, 28 fl oz", price: 8.49, rating: 4, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Beauty', isPrime: true },
      { id: 'B09JFXNC7T', title: 'LEGO Icons Flower Bouquet 10280 Artificial Flowers Set, Decorative Home Accessories', price: 49.99, rating: 5, image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500', category: 'Toys', isPrime: true },
    ];
    await Product.bulkCreate(productsData);
    console.log(`Database seeded with ${productsData.length} products`);
  }
};

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Database connected & synced');
    await seedProducts();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });
