import React from 'react';
import './BabyRegistry.css';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PublicIcon from '@mui/icons-material/Public';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function BabyRegistry() {
    return (
        <div className="babyRegistry">
            {/* Top secondary nav */}
            <div className="babyReg_nav">
                <div className="babyReg_navLogo">baby registry</div>
                <div className="babyReg_navLinks">
                    <span className="babyReg_activeLink">Home</span>
                    <span>Benefits</span>
                    <span>Shopping guides</span>
                    <span>Find a registry</span>
                </div>
                <div className="babyReg_navHelp">
                    <span>Help</span>
                    <HelpOutlineIcon fontSize="small" />
                </div>
            </div>

            <div className="babyReg_content">
                {/* Hero */}
                <div className="babyReg_hero">
                    <img src="https://m.media-amazon.com/images/G/01/img18/home/GL/AdobeStock_285034732_ggr_crop.jpeg" className="babyReg_heroImg babyReg_imgLeft1" alt="Baby 1" />
                    <img src="https://m.media-amazon.com/images/G/01/DiscoTec/2024/CategoryFlips/Fall/Gift_List/EN/Browse/WED_REG_2024_23_GL-TL_Gift_List_-_Baby_Registry_238x238_EN._CB545083473_UC216,216_.jpg" className="babyReg_heroImg babyReg_imgLeft2" alt="Baby 2" />
                    <img src="https://m.media-amazon.com/images/G/01/DiscoTec/2024/HomeLifestyle/AWR/Images/SUM24_AWR_Homepage_11_1200x900.jpg" className="babyReg_heroImg babyReg_imgRight1" alt="Baby 3" />
                    <img src="https://m.media-amazon.com/images/G/01/img18/home/GL/AdobeStock_237143437_crop.jpeg" className="babyReg_heroImg babyReg_imgRight3" alt="Baby 4" />
                    
                    <div className="babyReg_heroContent">
                        <h2>Welcome to your one-stop<br/>baby registry.</h2>
                        <p>Everything you're looking for. All in one place.</p>
                        <button className="babyReg_createBtn">Create your registry</button>
                        <p className="babyReg_signInText">Have a registry? <span className="babyReg_signInLink">Sign in</span></p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="babyReg_searchBar">
                    <h3>Find a baby registry by name</h3>
                    <div className="babyReg_searchInputContainer">
                        <SearchIcon style={{ color: '#888C8C', marginRight: '5px' }} />
                        <input type="text" placeholder="Search" />
                    </div>
                    <button className="babyReg_searchBtn">Search</button>
                </div>

                {/* Benefits */}
                <div className="babyReg_section">
                    <div className="babyReg_sectionHeader">
                        <h2>Baby registry benefits</h2>
                        <span className="babyReg_learnMore">Learn more</span>
                    </div>
                    <div className="babyReg_benefitsGrid">
                        <div className="babyReg_benefitCard">
                            <CardGiftcardIcon className="babyReg_benefitIcon" />
                            <h3>Free Welcome Box</h3>
                            <p>Prime members get a free gift box with sample and full-size surprises for parents and baby.</p>
                        </div>
                        <div className="babyReg_benefitCard">
                            <LocalOfferIcon className="babyReg_benefitIcon" />
                            <h3>15% Completion Discount</h3>
                            <p>Enjoy a 15% discount on your baby registry, up to $300 in savings.</p>
                        </div>
                        <div className="babyReg_benefitCard">
                            <PublicIcon className="babyReg_benefitIcon" />
                            <h3>Earth's biggest selection</h3>
                            <p>Discover registry essentials and more for you and baby, whatever your style or budget.</p>
                        </div>
                        <div className="babyReg_benefitCard">
                            <KeyboardReturnIcon className="babyReg_benefitIcon" />
                            <h3>Free 1-year returns</h3>
                            <p>Return eligible gifts purchased from your registry for up to 365 days.</p>
                        </div>
                    </div>
                </div>

                {/* Building made simple */}
                <div className="babyReg_section">
                    <div className="babyReg_sectionHeader">
                        <h2>Registry building made simple</h2>
                        <span className="babyReg_learnMore">Learn more</span>
                    </div>
                    <div className="babyReg_simpleGrid">
                        <div className="babyReg_simpleCard">
                            <img src="https://m.media-amazon.com/images/G/01/weddingregistry/images/image-highlights/AWR-Personalize.png" alt="Personalize" />
                            <h3>Personalize your registry</h3>
                        </div>
                        <div className="babyReg_simpleCard">
                            <img src="https://m.media-amazon.com/images/G/01/DiscoTec/2024/CategoryFlips/Fall/Gift_List/EN/Browse/WED_REG_2024_24_GL-TL_Gift_List_-_Wedding_238x238_EN._CB544509104_UC216,216_.jpg" alt="Diaper fund" />
                            <h3>Add a diaper fund</h3>
                        </div>
                        <div className="babyReg_simpleCard">
                            <img src="https://m.media-amazon.com/images/G/01/weddingregistry/images/image-highlights/AWR-GCF.png" alt="Group gifting" />
                            <h3>Enable group gifting</h3>
                        </div>
                        <div className="babyReg_simpleCard">
                            <img src="https://m.media-amazon.com/images/G/01/weddingregistry/images/image-highlights/AWR-TrackGifts.png" alt="Keep track" />
                            <h3>Keep track of everything</h3>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="babyReg_section">
                    <h2 style={{ marginBottom: '20px' }}>Frequently asked questions</h2>
                    <div className="babyReg_faqItem">
                        <h3>How do I create a baby registry?</h3>
                        <KeyboardArrowDownIcon />
                    </div>
                    <div className="babyReg_faqItem">
                        <h3>How do I qualify for the Welcome Box?</h3>
                        <KeyboardArrowDownIcon />
                    </div>
                    <div className="babyReg_faqItem">
                        <h3>How do I qualify for the 15% Completion Discount?</h3>
                        <KeyboardArrowDownIcon />
                    </div>
                    <div className="babyReg_faqItem">
                        <h3>How does the Tanashop baby registry checklist work?</h3>
                        <KeyboardArrowDownIcon />
                    </div>
                    <div className="babyReg_faqItem">
                        <h3>Does Tanashop provide inspiration for baby registry ideas and must-haves?</h3>
                        <KeyboardArrowDownIcon />
                    </div>
                    <div className="babyReg_faqItem">
                        <h3>What brands are available to add to a Tanashop baby registry?</h3>
                        <KeyboardArrowDownIcon />
                    </div>
                </div>

                {/* Featured Brands */}
                <div className="babyReg_section">
                    <h2 style={{ marginBottom: '20px' }}>Featured brands</h2>
                    <div className="babyReg_brandsGrid">
                        <div className="babyReg_brandCard">
                            <div className="babyReg_brandImgContainer">
                                <img src="https://m.media-amazon.com/images/G/01/baby/registry/featured_brands/UPPAbaby.jpg" alt="UPPAbaby" />
                            </div>
                            <span>UPPAbaby</span>
                        </div>
                        <div className="babyReg_brandCard">
                            <div className="babyReg_brandImgContainer">
                                <img src="https://m.media-amazon.com/images/G/01/baby/registry/featured_brands/Chicco.jpg" alt="Chicco" />
                            </div>
                            <span>Chicco</span>
                        </div>
                        <div className="babyReg_brandCard">
                            <div className="babyReg_brandImgContainer">
                                <img src="https://m.media-amazon.com/images/G/01/baby/registry/featured_brands/Amazon_Essentials.jpg" alt="Tanashop Essentials" />
                            </div>
                            <span>Tanashop Essentials</span>
                        </div>
                        <div className="babyReg_brandCard">
                            <div className="babyReg_brandImgContainer">
                                <img src="https://m.media-amazon.com/images/G/01/baby/registry/featured_brands/SkipHop.jpg" alt="Skip Hop" />
                            </div>
                            <span>Skip Hop</span>
                        </div>
                        <div className="babyReg_brandCard">
                            <div className="babyReg_brandImgContainer">
                                <img src="https://m.media-amazon.com/images/G/01/baby/registry/featured_brands/Pampers.jpg" alt="Pampers" />
                            </div>
                            <span>Pampers</span>
                        </div>
                        <div className="babyReg_brandCard">
                            <div className="babyReg_brandImgContainer">
                                <img src="https://m.media-amazon.com/images/G/01/baby/registry/featured_brands/BabyBjorn.jpg" alt="BabyBjörn" />
                            </div>
                            <span>BabyBjörn</span>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="babyReg_section babyReg_cta">
                    <h2>Ready to get started?</h2>
                    <p style={{ color: '#565959', marginBottom: '20px' }}>We're here to help you prepare for your new arrival.</p>
                    <button className="babyReg_createBtn">Create your registry</button>
                    <p className="babyReg_signInText">Have a registry? <span className="babyReg_signInLink">Sign in</span></p>
                </div>
            </div>
        </div>
    );
}

export default BabyRegistry;
