import React, {Fragment, useEffect, useState} from 'react'
import {CgMouse} from "react-icons/cg";
import "./home.css";
import { getProduct, clearErrors } from '../../actions/productAction.js';
import {useSelector, useDispatch} from "react-redux"
import MetaData from '../layout/metaData.js';
import Product from "../Product/productCard.js";

import shoe1 from "../../images/shoe1.jpg";
import shoe2 from "../../images/shoe2.jpg";
import shoe3 from "../../images/shoe3.png";
import shoe4 from "../../images/shoe4.png";
import shoe5 from "../../images/shoe5.png";
import shoe6 from "../../images/shoe6.jfif";
import shoe7 from "../../images/shoe7.jpg";
import shoe8 from "../../images/shoe8.jfif";

import {useAlert} from "react-alert"

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Loader from '../layout/Loader/loader.js';
const handleDragStart = (e) => e.preventDefault();

const product = {
    name:"Jacket",
    images:[{url:""}],
    prixe:1000,
    _id:"789vhj789"
}
const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, error, products, productsCount} = useSelector(state => state.products)
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    const [shuffleImg, setShuffleImg] = useState(true);
    const [shuffleImg1, setShuffleImg1] = useState(true);
    const items = [
        <div className="hero-div"><img className="hero-img" src={shoe1} onDragStart={handleDragStart} role="presentation" alt="shoe-pic" /></div>,
        <div className="hero-div"><img className="hero-img" src={shoe2} onDragStart={handleDragStart} role="presentation" alt="shoe-pic" /></div>,
        <div className="hero-div"><img className="hero-img" src={shuffleImg ? shoe3: shoe8} onDragStart={handleDragStart} role="presentation" alt="shoe-pic" /></div>,
        <div className="hero-div"><img className="hero-img" src={shuffleImg1 ? shoe4: shoe7} onDragStart={handleDragStart} role="presentation" alt="shoe-pic" /></div>,
        <div className="hero-div"><img className="hero-img" src={shoe5} onDragStart={handleDragStart} role="presentation" alt="shoe-pic" /></div>,
    ];
    useEffect(() => {
        const changePic = () => {
          setShuffleImg((prev) =>  !prev);
          setTimeout(() => {
            setShuffleImg1((prev) =>  !prev);
          }, 10);
        };
    
        changePic();

        const intervalId = setInterval(changePic, 1800);
    
        return () => clearInterval(intervalId);
      }, []);
    const responsive= {
        0 :{items:1},
        600: {items:2, itemsFit:"contain"},
        900 : {items:3, itemsFit:"contain"},
    };
    
    return (
        <Fragment>
        {loading? <Loader /> : <Fragment>
        <MetaData title="E-Commerce"/>
        <AliceCarousel items={items} autoPlay={true} autoPlayInterval={3000} autoPlayStrategy="none" infinite={true} mouseTracking={true} disableButtonsControls={true} responsive={responsive}/>
        <h1 className='heading'>Featured Products</h1>
        <div className='featured-products-container' id="container">
            {
                products && products.map(product => {
                    return <Product product={product}/>
                })
            }
        </div>
        </Fragment>}
        </Fragment>
    );
}

export default Home
