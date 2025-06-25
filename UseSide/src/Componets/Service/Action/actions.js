import axios from 'axios';
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCES,
  CLEAR_ERROR,
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_DETAILS_SUCCES,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_REVIEW_FAIL,
  PRODUCTS_REVIEW_SUCCES,
  PRODUCTS_REVIEW_REQUEST
} from '../ReducersName/ProductsReducersName';

export const getAllProducts = (keyword = "", currentPage = 1, category) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    let url = `http://localhost:3005/api/v1/product?keyword=${keyword}&page=${currentPage}`;
    if (category) {
      url += `&category=${category}`;
    }

    const { data } = await axios.get(url);

    dispatch({
      type: ALL_PRODUCTS_SUCCES,
      payload: {
        products: data.products,
        productCount: data.productCount,
        resultPerPage: data.resultPerPage,
        filteredProductCount: data.filteredProductCount,
      },
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const getProductsDetails = (_id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_DETAILS_REQUEST });

    const response = await axios.get(`http://localhost:3005/api/v1/product/${_id}`);

    dispatch({
      type: PRODUCTS_DETAILS_SUCCES,
      payload: response.data.getSingleProduct
    });

  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload: error.response?.data?.message || "Unknown error"
    });
  }
};

export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};


export const newReviews = (reviewData) => async (dispatch) => {
  try {
 
    dispatch({ type: PRODUCTS_REVIEW_REQUEST });

    const token = localStorage.getItem("token");
    const config = {

      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.put(`http://localhost:3005/api/v1/product/review`, reviewData, config);
  
    dispatch({
      type: PRODUCTS_REVIEW_SUCCES,
      payload: response.data.product,
    });

  } catch (error) {
    dispatch({
      type: PRODUCTS_REVIEW_FAIL,
      payload: error.response?.data?.message || "Unknown error"
    });
  }
};