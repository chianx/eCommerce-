import axios from "axios";

import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, CLEAR_ERRORS } from "../constants/productConstants";

export const getProduct = (keyword = "") => async(dispatch) => {
    try{
        dispatch({type:ALL_PRODUCT_REQUEST});
        console.log("keyword = ",keyword)
        const {data} = await axios.get("http://192.168.1.9:4000/api/v1/products?keyword=" + keyword);
        // console.log(data);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    }catch(error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get("http://192.168.1.9:4000/api/v1/product/" + id);
        // console.log(data);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        })
    }catch(error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

// Clering Errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    });
}
