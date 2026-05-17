import './App.css';
import Header from './Header'
import Home from './Home';
import Footer from './Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Checkout from './Checkout'
import Login from './Login'
import React, { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import axios from './axios';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders'
import ProductDetail from './ProductDetail';
import AddedToCart from './AddedToCart';
import Registry from './Registry';
import BabyRegistry from './BabyRegistry';
import SmartHomeLighting from './SmartHomeLighting';
import ShopByInterest from './ShopByInterest';
import CategoryPage from './CategoryPage';

const key = process.env.REACT_APP_STRIPE_KEY || 'pk_test_51PyVKVD85sh1xAUWrGylKITwMsmMxBu6dNxoo793mOzAbz6tDdcufZ2ZYB2yKTk4ENPSCGaLYvo64hcvVumuXWzl00LYnDgBEu';
const promise = loadStripe(key);

function App() {
  const [{ basket }, dispatch] = useStateValue();
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          dispatch({
            type: 'SET_USER',
            user: response.data.user
          });
        } catch (error) {
          console.error("Error fetching user:", error);
          localStorage.removeItem('token');
          dispatch({
            type: 'SET_USER',
            user: null
          });
        }
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    };

    fetchUser();
  }, [dispatch]);
  return (
    <Router>
      <div className="App">
        <Routes>

              <Route path='/checkout' element={
                <>
                  <Header />
                  <Checkout />
                  <Footer />
                </>
             } />
             <Route path='/login' element={
                <>
                  <Header />
                  <Login />
                  <Footer />
                </>
             }
             />
            <Route path='/payment' element={
              <Elements stripe={promise}>
                <>
                  <Header />
                  <Payment />
                  <Footer />
                </>
              </Elements>
             }
             />
             <Route path='/product/:id' element={
                <>
                  <Header />
                  <ProductDetail />
                  <Footer />
                </>
             }
             />
             <Route path='/added-to-cart' element={
                <>
                  <Header />
                  <AddedToCart />
                  <Footer />
                </>
             }
             />
             <Route path='/orders' element={
                <>
                  <Header />
                  <Orders />
                  <Footer />
                </>
             }
             />
             <Route path='/registry' element={
                <>
                  <Header />
                  <Registry />
                  <Footer />
                </>
             }
             />
             <Route path='/baby-reg' element={
                <>
                  <Header />
                  <BabyRegistry />
                  <Footer />
                </>
             }
             />
             <Route path='/smart-home-lighting' element={
                <>
                  <Header />
                  <SmartHomeLighting />
                  <Footer />
                </>
             }
             />
              <Route path='/shop-by-interest' element={
                 <>
                   <Header />
                   <ShopByInterest />
                   <Footer />
                 </>
              }
              />
              <Route path='/category/:slug' element={
                 <>
                   <Header />
                   <CategoryPage />
                   <Footer />
                 </>
              }
              />
        
            <Route path='/' element={
              <>
                <Header />
                <Home />
                <Footer />
                </>
              } 
             />
        </Routes>

    </div>
    </Router>
    
  );
}

export default App;
