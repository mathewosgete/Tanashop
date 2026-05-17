import React from 'react';
import './ShopByInterest.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

function ShopByInterest() {
    const navigate = useNavigate();
    const posts = [
        {
            id: 1,
            creator: 'Fit Foodie Finds',
            creatorImg: 'https://m.media-amazon.com/images/S/amzn-author-media-prod/7i8b3u9j4k5l6m7n8o9p.jpg',
            title: 'No Bake Peanut Butter Oat Cups',
            tags: ['#baking'],
            likes: '11.4K',
            image: 'https://m.media-amazon.com/images/I/81+m1n-s-sL._AC_SL1500_.jpg', // Placeholder for video
            products: [
                'https://m.media-amazon.com/images/I/71zQ0O0lXPL._AC_SL1500_.jpg',
                'https://m.media-amazon.com/images/I/71WtwEvYDOS._AC_SL1500_.jpg',
                'https://m.media-amazon.com/images/I/61dmOa7U-fL._AC_SL1500_.jpg'
            ]
        },
        {
            id: 2,
            creator: 'Sweet Melissa',
            creatorImg: 'https://m.media-amazon.com/images/S/amzn-author-media-prod/1a2b3c4d5e6f7g8h9i0j.jpg',
            title: 'Pretty in Pink Cake!',
            tags: ['#baking'],
            likes: '376',
            image: 'https://m.media-amazon.com/images/I/71zQ0O0lXPL._AC_SL1500_.jpg', // Placeholder
            products: [
                'https://m.media-amazon.com/images/I/81yN-7mHVXL._AC_UX679_.jpg',
                'https://m.media-amazon.com/images/I/81QVe9SrdKL._AC_UX679_.jpg'
            ]
        },
        {
            id: 3,
            creator: 'Grace Anderson',
            creatorImg: 'https://m.media-amazon.com/images/S/amzn-author-media-prod/a1b2c3d4e5f6g7h8i9j0.jpg',
            title: 'Microwave Mug Cookie',
            tags: ['#baking', '#cookie'],
            likes: '2.3K',
            image: 'https://m.media-amazon.com/images/I/71WtwEvYDOS._AC_SL1500_.jpg', // Placeholder
            products: [
                'https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SL1000_.jpg',
                'https://m.media-amazon.com/images/I/713ixhq-MLL._AC_SL1500_.jpg'
            ]
        }
    ];

    return (
        <div className="sbi">
            <div className="sbi_header">
                <div className="sbi_headerLeft">
                    <ArrowBackIcon onClick={() => navigate(-1)} className="sbi_backIcon" />
                    <h2>Shop By Interest</h2>
                </div>
                <div className="sbi_headerRight">
                    <AddBoxIcon className="sbi_icon" />
                    <FavoriteBorderIcon className="sbi_icon" />
                </div>
            </div>

            <div className="sbi_explore">
                <span>Explore</span>
                <KeyboardArrowDownIcon />
            </div>

            <div className="sbi_feed">
                {posts.map(post => (
                    <div key={post.id} className="sbi_post">
                        <div className="sbi_videoContainer">
                            <img src={post.image} alt={post.title} className="sbi_videoPlaceholder" />
                            <div className="sbi_playButton">
                                <PlayArrowIcon fontSize="large" />
                            </div>
                            
                            <div className="sbi_overlay">
                                <div className="sbi_creatorInfo">
                                    <img src={post.creatorImg} alt={post.creator} className="sbi_creatorAvatar" />
                                    <div className="sbi_creatorText">
                                        <span className="sbi_creatorName">{post.creator}</span>
                                        <span className="sbi_earnsRevenue">Earns revenue</span>
                                    </div>
                                </div>
                                
                                <h3 className="sbi_postTitle">{post.title}</h3>
                                <div className="sbi_tags">
                                    {post.tags.map(tag => <span key={tag}>{tag}</span>)}
                                </div>

                                <div className="sbi_actions">
                                    <div className="sbi_action">
                                        <div className="sbi_actionBtn">
                                            <FavoriteIcon />
                                            <span>{post.likes}</span>
                                        </div>
                                    </div>
                                    <div className="sbi_action">
                                        <div className="sbi_actionBtn">
                                            <MoreHorizIcon />
                                        </div>
                                    </div>
                                </div>

                                <div className="sbi_productsRow">
                                    {post.products.map((prod, idx) => (
                                        <img key={idx} src={prod} alt="Product" className="sbi_productThumb" />
                                    ))}
                                    <div className="sbi_productMore">+2</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShopByInterest;
