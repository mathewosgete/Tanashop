import React from 'react';
import './Footer.css';
import LanguageIcon from '@mui/icons-material/Language';
import { useStateValue } from './StateProvider';
import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const [{ user }] = useStateValue();
  const location = useLocation();
  const isRegistryPage = location.pathname === '/registry';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer">
      {!user && !isRegistryPage && (
        <div className="footer_preFooter">
          <div className="footer_preFooterInner">
            <div className="footer_preFooterTitle">See personalized recommendations</div>
            <Link to="/login" className="footer_preFooterBtn">Sign in</Link>
            <div className="footer_preFooterNew">
              New customer? <Link to="/login">Start here.</Link>
            </div>
          </div>
        </div>
      )}

      <div className="footer_backToTop" onClick={scrollToTop}>
        Back to top
      </div>

      <div className="footer_container">
        <div className="footer_column">
          <h3>Get to Know Us</h3>
          <p>About Tanashop</p>
        </div>

        <div className="footer_column">
          <h3>Make Money with Us</h3>
          <p>Sell products on Tanashop</p>
        </div>

        <div className="footer_column">
          <h3>Tanashop Payment Products</h3>
          <p>Tanashop Business Card</p>
          <p>Shop with Points</p>
          <p>Reload Your Balance</p>
          <p>Tanashop Currency Converter</p>
        </div>
      </div>

      <div className="footer_middle">
        <div className="footer_middleInner">
          <span className="footer_logoText">
            Tana<span className="footer_logoTextShop">shop</span>
          </span>
          <div className="footer_settings">
              <span className="footer_settingItem"><LanguageIcon fontSize="small" className="footer_settingIcon"/> English</span>
              <span className="footer_settingItem">$ USD - U.S. Dollar</span>
              <span className="footer_settingItem"><img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="US" className="footer_settingFlag"/>United States</span>
          </div>
        </div>
      </div>

      <div className="footer_bottom">
        <div className="footer_bottomLinks">
          <span>Conditions of Use</span>
          <span>Privacy Notice</span>
          <span>Your Ads Privacy Choices</span>
        </div>
        <div className="footer_copyright">
          © 2026, Tanashop.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
}

export default Footer;
