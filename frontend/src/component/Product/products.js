import React, {Fragment, useEffect, useState} from 'react'
import "./products.css"
import { UseDispatch, useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/loader';
import Product from './productCard';
import {useParams} from "react-router-dom";
import Pagination from "react-js-pagination";

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const {products, loading, error, productsCount, resultPerPage} = useSelector(state => state.products);
  console.log(products);
  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }
  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword])
  return (
    <Fragment>
      {loading? <Loader /> :
      <Fragment>
        <h2 className='productsHeading'>Products</h2>
        <div className='products'>
          {products && products.map((product) => {
            return <Product key={product._id} product={product}/>
          })}
        </div>

        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="next"
            prevPageText="prev"
            firstPageText="1st" 
            lastPageText="last" 
            itemClass='page-item' 
            linkClass='page-link' 
            activeClass='pageItemActive' 
            activeLinkClass='pageLinkActive'
          /> 
        </div>
      </Fragment>}
    </Fragment>
  )
}

export default Products
