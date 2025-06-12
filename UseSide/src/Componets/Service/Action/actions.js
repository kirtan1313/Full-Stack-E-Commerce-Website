import axios from 'axios';
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCES,
  CLEAR_ERROR,
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_DETAILS_SUCCES,
  PRODUCTS_DETAILS_REQUEST
} from '../ReducersName/ProductsReducersName';

export const getAllProducts = (keyword = "",page = 1 ) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    const link = `http://localhost:3005/api/v1/product?keyword=${keyword}&page=${page}`;
    const { data } = await axios.get(link);
    dispatch({
      type: ALL_PRODUCTS_SUCCES,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response?.data?.message || "Unknown error"
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
