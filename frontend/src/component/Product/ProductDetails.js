import React, { Fragment, useEffect, useState } from 'react'
import "./productDetails.css";
import {useParams} from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import {useSelector, useDispatch} from "react-redux"
import ReactStars from "react-rating-stars-component";
import {clearErrors, getProductDetails} from "../../actions/productAction";
import ReviewCard from "./reviewCard"
import Loader from "../layout/Loader/loader";
import {useAlert} from "react-alert";

const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {product, loading, error} = useSelector(state => state.productDetails)

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id, error, alert])

    console.log(product.ratings);
  return (
    <Fragment>
        {loading? <Loader /> 
        :
        <Fragment>
        <div className='productDetails'>
            <div>
                <Carousel>
                    {product.images &&
                    product.images.map((item, i) => {
                        return <div className='carouselImageDiv'><img className='CarouselImage' key={item.url} src={item.public_url} alt={i+"slide"}/></div>
                    })}
                </Carousel>
            </div>
            <div className='detailsBlock1'>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
                <div className='detailsBlock2'>
                    {/* {product.ratings >0 ? <ReactStars isHalf={true} edit={false} size={21} value={product.ratings}/> : <></>} */}
                    <ReactStars isHalf={true} edit={false} size={21} value={product.ratings}/>
                    <span>({product.numOfReviews} Reviews)</span>
                </div>
                <div className='detailsBlock3'>
                    <h1>₹{product.price} <span>₹11099</span></h1>
                    <div className = "detailsBlock31">
                        <div className='detailsBlock311'>
                            <button>-</button>
                            <input value="1" type="number"/>
                            <button>+</button>
                        </div>{""}
                        <button>Add to Cart</button>
                    </div>
                    <p>
                        Status : {""}
                        <b className={product.Stock < 1 ? "redColor": "greenColor"}>
                            {product.Stock< 1? "Out of Stock" : "In Stock"}
                        </b>
                    </p>
                </div>
                <div className='detailsBlock4'>
                    Description : <p>{product.description}</p>
                </div>
                <button className='submitReview'>Submit Review</button>
            </div>
        </div>
        <h3 className='reviewHeading'>Reviews</h3>
        {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
                {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)

                }
            </div>
        ): <p>No reviews yet</p>}
    </Fragment>}
    </Fragment>
  )
}

export default ProductDetails
