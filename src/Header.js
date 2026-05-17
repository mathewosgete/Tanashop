import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [searchInput, setSearchInput] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('main');

    const languages = [
        { code: 'EN', name: 'English', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg' },
        { code: 'ES', name: 'Español', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg' },
        { code: 'DE', name: 'Deutsch', flag: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg' },
        { code: 'FR', name: 'Français', flag: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg' },
        { code: 'ZH', name: '中文', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg' },
    ];
    const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
        dispatch({
            type: 'SET_SEARCH_QUERY',
            query: e.target.value
        });
    };

    const handleAuthentication = () => {
        if (user) {
            localStorage.removeItem('token');
            dispatch({
                type: 'SET_USER',
                user: null
            });
        }
    };

    return (
        <div className="header_wrapper">
            <div className='header'>
                <Link to='/' className="header_logoContainer">
                    <span className="header_logoText">
                        Tana<span className="header_logoTextShop">shop</span>
                    </span>
                </Link>

                <div className="header_nav header_location">
                    <LocationOnOutlinedIcon className="header_locationIcon" />
                    <div className='header_option'>
                        <span className='header_optionLineOne'>Deliver to</span>
                        <span className='header_optionLineTwo'>Ethiopia</span>
                    </div>
                </div>

                <div className='header_search'>
                    <select className="header_searchSelect">
                        <option>All</option>
                        <option>Arts & Crafts</option>
                        <option>Automotive</option>
                        <option>Baby</option>
                        <option>Computers</option>
                        <option>Electronics</option>
                    </select>
                    <div className="header_searchContainer">
                        <input
                            className='header_searchInput'
                            type='text'
                            placeholder="Search Tanashop"
                            value={searchInput}
                            onChange={handleSearch}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.target.blur();
                                }
                            }}
                        />
                        {searchInput && (
                            <div className="header_searchSuggestions">
                                <ul>
                                    <li><SearchIcon fontSize="small" className="suggestionIcon" /> <strong>{searchInput}</strong> in Electronics</li>
                                    <li><SearchIcon fontSize="small" className="suggestionIcon" /> <strong>{searchInput}</strong> in Computers</li>
                                    <li><SearchIcon fontSize="small" className="suggestionIcon" /> <strong>{searchInput}</strong> pro</li>
                                    <li><SearchIcon fontSize="small" className="suggestionIcon" /> <strong>{searchInput}</strong> accessories</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="header_searchIconContainer">
                        <SearchIcon className='header_searchIcon' />
                    </div>
                </div>

                <div className='header_nav'>
                    <div className="header_languageWrapper">
                        <div className='header_option header_optionHover header_language'>
                            <img src={currentLanguage.flag} alt="Flag" className="header_flag" />
                            <span className='header_optionLineTwo'>{currentLanguage.code} <ArrowDropDownIcon className="header_dropdownIcon" /></span>
                        </div>
                        <div className="header_languageDropdown">
                            <div className="header_languageDropdownInner">
                                <div className="header_languageDropdownTitle">Change language</div>
                                <ul className="header_languageList">
                                    {languages.map((lang) => (
                                        <li 
                                            key={lang.code} 
                                            className={currentLanguage.code === lang.code ? 'active' : ''}
                                            onClick={() => setCurrentLanguage(lang)}
                                        >
                                            <input 
                                                type="radio" 
                                                name="language" 
                                                checked={currentLanguage.code === lang.code} 
                                                readOnly 
                                            />
                                            <span>{lang.name} - {lang.code}</span>
                                        </li>
                                    ))}
                                </ul>
                                <hr />
                                <div className="header_languageDropdownTitle">Change currency</div>
                                <div className="header_currencySelect">
                                    <span>$ - USD - US Dollar</span>
                                    <a href="#currency-change" className="header_currencyLearn">Learn more</a>
                                </div>
                                <hr />
                                <div className="header_languageDropdownFooter">
                                    <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="US Flag" className="header_flag" />
                                    <span>You are shopping on Tanashop.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="header_accountWrapper">
                        <Link to={!user && '/login'} className='header_clearLink'>
                            <div onClick={handleAuthentication} className='header_option header_optionHover'>
                                <span className='header_optionLineOne'>Hello, {user ? user.email.split('@')[0] : 'sign in'}</span>
                                <span className='header_optionLineTwo'>Account & Lists <ArrowDropDownIcon className="header_dropdownIcon" /></span>
                            </div>
                        </Link>
                        
                        <div className="header_accountDropdown">
                            <div className="header_accountDropdownInner">
                                {!user && (
                                    <div className="header_accountDropdownSign">
                                        <Link to="/login" className="header_dropdownSignInBtn">Sign in</Link>
                                        <div className="header_dropdownNewCustomer">
                                            New customer? <Link to="/login">Start here.</Link>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="header_accountDropdownLists">
                                     <div className="header_accountDropdownColumn">
                                         <h3>Your Lists</h3>
                                         <ul>
                                             <li><Link to="/registry" className="header_dropdownLink">Create a List</Link></li>
                                             <li><Link to="/registry" className="header_dropdownLink">Find a List or Registry</Link></li>
                                         </ul>
                                     </div>
                                     <div className="header_accountDropdownColumn">
                                         <h3>Your Account</h3>
                                         <ul>
                                             <li><Link to="/login" className="header_dropdownLink">Account</Link></li>
                                             <li><Link to="/orders" className="header_dropdownLink">Orders</Link></li>
                                             <li><Link to="/shop-by-interest" className="header_dropdownLink">Recommendations</Link></li>
                                             <li><Link to="/" className="header_dropdownLink">Browsing History</Link></li>
                                             <li><Link to="/category/electronics" className="header_dropdownLink">Watchlist</Link></li>
                                             <li><Link to="/category/electronics" className="header_dropdownLink">Video Purchases</Link></li>
                                             <li><Link to="/category/arts" className="header_dropdownLink">Kindle Unlimited</Link></li>
                                             <li><Link to="/smart-home-lighting" className="header_dropdownLink">Content & Devices</Link></li>
                                             <li><Link to="/category/electronics" className="header_dropdownLink">Subscribe & Save</Link></li>
                                             <li><Link to="/registry" className="header_dropdownLink">Membership & Subscriptions</Link></li>
                                             <li><Link to="/category/electronics" className="header_dropdownLink">Music Library</Link></li>
                                         </ul>
                                     </div>
                                 </div>
                            </div>
                        </div>
                    </div>

                    <Link to='/orders' className='header_clearLink'>
                        <div className='header_option header_optionHover'>
                            <span className='header_optionLineOne'>Returns</span>
                            <span className='header_optionLineTwo'>& Orders</span>
                        </div>
                    </Link>

                    <Link to='/checkout' className='header_clearLink'>
                        <div className='header_optionBasket header_optionHover'>
                            <ShoppingCartOutlinedIcon className="header_cartIcon" />
                            <span className='header_optionLineTwo header_basketCount'>
                                {basket?.reduce((qty, item) => qty + (item.quantity || 1), 0)}
                            </span>
                            <span className="header_cartText">Cart</span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="header_belt">
                <div className="header_beltItem header_beltMenu" onClick={() => { setIsSidebarOpen(true); setActiveMenu('main'); }}>
                    <MenuIcon /> All
                </div>
                <div className="header_beltItem">Today's Deals</div>
                <div className="header_beltItem">Gift Cards</div>
                <div className="header_beltItem">Sell</div>
                <Link to="/registry" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="header_beltItem">Registry</div>
                </Link>
                <div className="header_beltItem">Prime Video</div>
                <div className="header_beltItem">Customer Service</div>
            </div>

            {/* Sidebar Overlay */}
            <div className={`header_sidebarOverlay ${isSidebarOpen ? 'header_sidebarOverlay--open' : ''}`} onClick={() => setIsSidebarOpen(false)}>
                <div className="header_sidebarCloseBtn" onClick={() => setIsSidebarOpen(false)}>
                    <CloseIcon fontSize="large" />
                </div>
            </div>

            {/* Sidebar Drawer */}
            <div className={`header_sidebar ${isSidebarOpen ? 'header_sidebar--open' : ''}`}>
                <div className="header_sidebarHeader">
                    <AccountCircleIcon fontSize="large" />
                    <span>Hello, {user ? user.email.split('@')[0] : 'sign in'}</span>
                </div>
                
                {activeMenu === 'main' ? (
                <div className="header_sidebarContent">
                    <div className="header_sidebarSection">
                        <h3>Shop by Department</h3>
                        <ul>
                            <li onClick={() => setActiveMenu('electronics')}>Electronics <KeyboardArrowRightIcon className="header_sidebarArrow" /></li>
                            <li onClick={() => setActiveMenu('computers')}>Computers <KeyboardArrowRightIcon className="header_sidebarArrow" /></li>
                            <li onClick={() => setActiveMenu('smart-home')}>Smart Home <KeyboardArrowRightIcon className="header_sidebarArrow" /></li>
                            <li onClick={() => setActiveMenu('arts')}>Arts & Crafts <KeyboardArrowRightIcon className="header_sidebarArrow" /></li>
                        </ul>
                    </div>
                    <div className="header_sidebarDivider"></div>

                    <div className="header_sidebarSection">
                        <h3>Programs & Features</h3>
                        <ul>
                            <li>Gift Cards <KeyboardArrowRightIcon className="header_sidebarArrow" /></li>
                            <Link to="/shop-by-interest" onClick={() => setIsSidebarOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <li>Shop By Interest</li>
                            </Link>
                            <li onClick={() => setActiveMenu('international')}>International Shopping <KeyboardArrowRightIcon className="header_sidebarArrow" /></li>
                        </ul>
                    </div>
                    <div className="header_sidebarDivider"></div>

                    <div className="header_sidebarSection">
                        <h3>Help & Settings</h3>
                        <ul>
                            <li>Your Account</li>
                            <li><LanguageIcon fontSize="small" className="header_sidebarIcon" /> English</li>
                            <li><img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="US" className="header_sidebarFlag"/> United States</li>
                            <li>Customer Service</li>
                            <Link to="/login" onClick={() => { setIsSidebarOpen(false); handleAuthentication(); }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <li>{user ? 'Sign Out' : 'Sign in'}</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                ) : (
                <div className="header_sidebarContent header_sidebarSubMenu">
                    <div className="header_sidebarBack" onClick={() => setActiveMenu('main')}>
                        <ArrowBackIcon className="header_sidebarBackIcon" /> MAIN MENU
                    </div>
                    <div className="header_sidebarDivider"></div>
                    <div className="header_sidebarSection">
                        {activeMenu === 'electronics' && (
                            <>
                                <h3>Electronics</h3>
                                <ul>
                                    <Link to="/category/electronics" onClick={() => setIsSidebarOpen(false)} style={{ textDecoration: 'none', color: '#007185', fontWeight: '700', padding: '12px 35px', display: 'block' }}>
                                        <li>See all Electronics</li>
                                    </Link>
                                    <div className="header_sidebarDivider"></div>
                                    <li>Car & Vehicle Electronics</li>
                                    <li>Cell Phones & Accessories</li>
                                    <li>Computers & Accessories</li>
                                    <li>GPS & Navigation</li>
                                    <li>Headphones</li>
                                    <li>Home Audio</li>
                                    <li>Office Electronics</li>
                                    <li>Portable Audio & Video</li>
                                    <li>Security & Surveillance</li>
                                    <li>Service Plans</li>
                                    <li>Television & Video</li>
                                    <li>Video Game Consoles & Accessories</li>
                                    <li>Video Projectors</li>
                                    <li>Wearable Technology</li>
                                    <li>eBook Readers & Accessories</li>
                                </ul>
                            </>
                        )}
                        {activeMenu === 'computers' && (
                            <>
                                <h3>Computers</h3>
                                <ul>
                                    <Link to="/category/computers" onClick={() => setIsSidebarOpen(false)} style={{ textDecoration: 'none', color: '#007185', fontWeight: '700', padding: '12px 35px', display: 'block' }}>
                                        <li>See all Computers</li>
                                    </Link>
                                    <div className="header_sidebarDivider"></div>
                                    <li>Computer Accessories & Peripherals</li>
                                    <li>Computer Components</li>
                                    <li>Computers & Tablets</li>
                                    <li>Data Storage</li>
                                    <li>External Components</li>
                                    <li>Laptop Accessories</li>
                                    <li>Monitors</li>
                                    <li>Networking Products</li>
                                    <li>Power Strips & Surge Protectors</li>
                                    <li>Printers</li>
                                    <li>Scanners</li>
                                    <li>Servers</li>
                                    <li>Tablet Accessories</li>
                                </ul>
                            </>
                        )}
                        {activeMenu === 'arts' && (
                            <>
                                <h3>Arts & Crafts</h3>
                                <ul>
                                    <Link to="/category/arts" onClick={() => setIsSidebarOpen(false)} style={{ textDecoration: 'none', color: '#007185', fontWeight: '700', padding: '12px 35px', display: 'block' }}>
                                        <li>See all Arts & Crafts</li>
                                    </Link>
                                    <div className="header_sidebarDivider"></div>
                                    <li>Painting, Drawing & Art Supplies</li>
                                    <li>Beading & Jewelry Making</li>
                                    <li>Crafting</li>
                                    <li>Fabric</li>
                                    <li>Fabric Decorating</li>
                                    <li>Knitting & Crochet</li>
                                    <li>Needlework</li>
                                    <li>Organization, Storage & Transport</li>
                                    <li>Printmaking</li>
                                    <li>Scrapbooking & Stamping</li>
                                    <li>Sewing</li>
                                    <li>Party Decorations & Supplies</li>
                                    <li>Gift Wrapping Supplies</li>
                                </ul>
                            </>
                        )}
                        {activeMenu === 'smart-home' && (
                            <>
                                <h3>Smart Home</h3>
                                <ul>
                                    <li>Tanashop Smart Home</li>
                                    <li>Works with Alexa</li>
                                    <Link to="/smart-home-lighting" onClick={() => setIsSidebarOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <li>Smart Home Lighting</li>
                                    </Link>
                                    <li>Smart Home Plugs and Outlets</li>
                                    <li>Smart Home Locks and Entry</li>
                                    <li>Smart Home Security Cameras and Systems</li>
                                    <li>Smart Home Entertainment</li>
                                    <li>Smart Home Heating and Cooling</li>
                                    <li>Smart Home Kitchen</li>
                                    <li>Smart Home Vacuum and Mop</li>
                                    <li>Smart Home Lawn and Garden</li>
                                    <li>Smart Home Networking and Wifi</li>
                                    <li>Smart Home Other</li>
                                </ul>
                            </>
                        )}
                        {activeMenu === 'international' && (
                            <>
                                <h3>International Shopping</h3>
                                <ul>
                                    <li>Tanashop Global Store</li>
                                    <li>Where we ship</li>
                                    <li>Visit Tanashop Global</li>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}

export default Header;
