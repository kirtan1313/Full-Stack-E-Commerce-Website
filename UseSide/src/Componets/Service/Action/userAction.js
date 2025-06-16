import axios from 'axios';
import { LOGIN_FAIL, LOGIN_SUCCES, LOGIN_REQUEST, REGISTER_REQUEST, REGISTER_SUCCES, REGISTER_FAIL, LOAD_REQUEST, LOAD_SUCCES, LOAD_FAIL, LOGOUT_USER } from '../ReducersName/userReducerName';



export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = { header: { "Content:Type": "application/json" } }

        const { data } = await axios.post(`http://localhost:3005/api/v1/login`, { email, password }, config)

        localStorage.setItem("token", data.token);

           console.log("Login Success:", data);
        dispatch({ type: LOGIN_SUCCES, payload: data.user })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
}


export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        const { data } = await axios.post(`http://localhost:3005/api/v1/register`, userData, config);

        localStorage.setItem("token", data.token);

        dispatch({ type: REGISTER_SUCCES, payload: data.user });

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_REQUEST });

        const token = localStorage.getItem("token");
        if (!token) {
            return dispatch({ type: LOAD_FAIL, payload: "Token missing" });
        }

        const { data } = await axios.get("http://localhost:3005/api/v1/getuser", {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: LOAD_SUCCES, payload: data.user });
    } catch (error) {
        dispatch({
            type: LOAD_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem("token");
        dispatch({ type: LOGOUT_USER });
        console.log("Logout successfully");
    } catch (error) {
        console.error("Logout error:", error);
    }
};
