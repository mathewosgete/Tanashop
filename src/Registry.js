import React from 'react';
import { Link } from 'react-router-dom';
import './Registry.css';
import PublicIcon from '@mui/icons-material/Public';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function Registry() {
  return (
    <div className="registry">
      <div className="registry_nav">
        <div className="registry_navLogo">registry & gifting</div>
        <div className="registry_navLinks">
          <span>Find a registry or gift list</span>
          <span>Create a registry or gift list</span>
          <span>Help</span>
        </div>
      </div>

      <div className="registry_content">
        
        {/* Hero Section */}
        <div className="registry_hero">
          <div className="registry_heroMainCard">
            <h2>Inspiration for life's biggest moments</h2>
            <p>For weddings, babies, birthdays, or any life event, registries and gift lists ensure the perfect item.</p>
            <button className="registry_findBtn">Find a registry</button>
            <button className="registry_createBtn">Create</button>
          </div>

          <Link to="/baby-reg" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="registry_heroCard">
              <img src="https://m.media-amazon.com/images/G/01/img18/home/GL/AdobeStock_237143437_crop.jpeg" alt="Baby" />
              <div className="registry_heroCardText">
                <h3>Baby Registry</h3>
                <p>Get help preparing for your new arrival.</p>
              </div>
            </div>
          </Link>

          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="registry_heroCard">
              <img src="https://m.media-amazon.com/images/G/01/DiscoTec/2024/HomeLifestyle/AWR/Images/SUM24_AWR_Homepage_11_1200x900.jpg" alt="Wedding" />
              <div className="registry_heroCardText">
                <h3>Wedding Registry</h3>
                <p>Register for gifts to start your new chapter.</p>
              </div>
            </div>
          </Link>

          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="registry_heroCard">
              <img src="https://m.media-amazon.com/images/G/01/img18/home/GL/AdobeStock_285034732_ggr_crop.jpeg" alt="Gift List" />
              <div className="registry_heroCardText">
                <h3>Gift List</h3>
                <p>Share gift ideas or needs for birthdays, holidays, graduations, new homes and more.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Reasons to register */}
        <div className="registry_section">
          <h2>Reasons to register with Tanashop</h2>
          <div className="registry_reasonsContainer">
            <div className="registry_reasonCard">
              <PublicIcon className="registry_reasonIcon" />
              <h3>Earth's biggest selection</h3>
              <p>Add items from Tanashop to create a gift registry for any occasion.</p>
            </div>
            <div className="registry_reasonCard">
              <CardGiftcardIcon className="registry_reasonIcon" />
              <h3>Easy to share</h3>
              <p>Share your gift registry with friends and family so they'll know exactly what gifts to get.</p>
            </div>
            <div className="registry_reasonCard">
              <AssignmentReturnIcon className="registry_reasonIcon" />
              <h3>Extended returns</h3>
              <p>Not quite right? Registry gifts have an extended return period.</p>
            </div>
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="registry_section">
          <h2>Create a registry or gift list</h2>
          <div className="registry_categories">
            <div className="registry_categoryItem">
              <img src="https://m.media-amazon.com/images/G/01/DiscoTec/2024/CategoryFlips/Fall/Gift_List/EN/Browse/WED_REG_2024_23_GL-TL_Gift_List_-_Baby_Registry_238x238_EN._CB545083473_UC216,216_.jpg" alt="Baby" />
              <span>Baby</span>
            </div>
            <div className="registry_categoryItem">
              <img src="https://m.media-amazon.com/images/G/01/DiscoTec/2024/CategoryFlips/Fall/Gift_List/EN/Browse/WED_REG_2024_24_GL-TL_Gift_List_-_Wedding_238x238_EN._CB544509104_UC216,216_.jpg" alt="Wedding" />
              <span>Wedding</span>
            </div>
            <div className="registry_categoryItem">
              <img src="https://m.media-amazon.com/images/G/01/DiscoTec/2024/CategoryFlips/Fall/Gift_List/EN/Browse/WED_REG_2024_25_GL-TL_Gift_List_-_Birthday_238x238_EN._CB564663344_UC216,216_.jpg" alt="Birthday" />
              <span>Birthday</span>
            </div>
            <div className="registry_categoryItem">
              <img src="https://m.media-amazon.com/images/G/01/DiscoTec/2025/Registeries/HOL/RegistriesFall2025Wave1.3__7451_DisplayCustom_HOLGiftList_238_x_238._CB798749852_UC216,216_.png" alt="Holiday" />
              <span>Holiday</span>
            </div>
            <div className="registry_categoryItem">
              <img src="https://m.media-amazon.com/images/G/01/DiscoTec/2024/CategoryFlips/Fall/Gift_List/EN/Browse/WED_REG_2024_30_GL-TL_Gift_List_-_Housewarming_238x238_EN._CB564663344_UC216,216_.jpg" alt="Housewarming" />
              <span>Housewarming</span>
            </div>
            <div className="registry_categoryItem">
              <img src="https://m.media-amazon.com/images/G/01/DiscoTec/2024/CategoryFlips/Fall/Gift_List/EN/Browse/WED_REG_2024_25_GL-TL_Gift_List_-_College2_238x238_EN._CB792213535_UC216,216_.jpg" alt="College" />
              <span>College</span>
            </div>
          </div>
        </div>

        {/* Unique to you section */}
        <div className="registry_section">
          <h2>Make your registry unique to you</h2>
          <div className="registry_uniqueGrid">
            <img src="https://m.media-amazon.com/images/G/01/weddingregistry/images/image-highlights/AWR-GCF.png" alt="Travel" className="registry_uniqueImage" />
            <img src="https://m.media-amazon.com/images/G/01/weddingregistry/images/image-highlights/AWR-TrackGifts.png" alt="Luggage" className="registry_uniqueImage" />
            <img src="https://m.media-amazon.com/images/G/01/weddingregistry/images/image-highlights/AWR-Personalize.png" alt="Cameras" className="registry_uniqueImage" />
            <img src="https://m.media-amazon.com/images/G/01/DiscoTec/2024/HomeLifestyle/AWR/CategoryBanners/SUM24_AWR_12_CatBanner_GiftRegistry_M_V4.jpg" alt="Kitchen" className="registry_uniqueImage" />
          </div>
        </div>

        {/* Reasons Continued */}
        <div className="registry_featuresRow">
          <div className="registry_featureItem">
            <h4>Building made easy</h4>
            <p>Use our recommendations or add items from product pages.</p>
          </div>
          <div className="registry_featureItem">
            <h4>Keep track of everything</h4>
            <p>We help keep track of who bought what item and when, so it's easy for you to send thank you notes.</p>
          </div>
          <div className="registry_featureItem">
            <h4>Personalize your registry</h4>
            <p>Add notes and highlight your most wanted gifts to guests.</p>
          </div>
          <div className="registry_featureItem">
            <h4>Easy to shop</h4>
            <p>Shopping a Tanashop Registry is a familiar experience for family and friends.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Registry;
