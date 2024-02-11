import React from 'react'
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./product.css"

const Product = ({product}) => {
	const options = {
		edit:false,
		color:"rgba(20, 20, 20, 0.1)",
		activeColor:"tomato",
		value:product.ratings,
		isHalf:true,
	}
  return (
    <Link to={"/product/" + product._id}>
    <div className="product-card">
		<div className="badge">Hot</div>
		<div className="product-thumb">
			<img src={product.images[0].public_url} alt="" />
		</div>
		<div className="product-details">
			{/* <span className="product-catagory">{product.category}</span> */}
			<h5>{product.name}</h5>
      {/* <p style={{display:"flex", flexDirection:"row"}}><ReactStars {...options} /> <span>({product.numOfReviews} Reviews)</span></p> */}
			{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p> */}
			<div className="product-bottom-details">
				<div className="product-price"><small>₹349.00</small>₹{product.price}</div>
				<div className="product-links">
					<a href=""><i className="fa fa-heart"></i></a>
					{/* <a href=""><i className="fa fa-shopping-cart"></i></a> */}
				</div>
			</div>
		</div>
    </div>
    </Link>
  );
}

export default Product
