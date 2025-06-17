import axios from 'axios';
import {
    LOGIN_FAIL, LOGIN_SUCCES,
    LOGIN_REQUEST, REGISTER_REQUEST,
    REGISTER_SUCCES, REGISTER_FAIL,
    LOAD_REQUEST,
    LOAD_SUCCES,
    LOAD_FAIL,
    LOGOUT_USER,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCES,
    UPDATE_PROFILE_RESET
} from '../ReducersName/userReducerName';



export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }


        const { data } = await axios.post(`http://localhost:3005/api/v1/login`, { email, password }, config)

        localStorage.setItem("token", data.token);

        console.log("Login Success:", data);
        console.log("DISPATCHING USER:", data.user.avatar);

        dispatch({ type: LOGIN_SUCCES, payload: data.user, })

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
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get("http://localhost:3005/api/v1/getuser", config);

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



export const updateProfile = (userData) => async (dispatch) => {
    try {
        console.log('🧾 FormData content:');
        for (let pair of userData.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        const { data } = await axios.put(`http://localhost:3005/api/v1/updateuser`, userData, config);

        console.log('✅ Response from server:', data);

        dispatch({ type: UPDATE_PROFILE_SUCCES, payload: data.profile });

    } catch (error) {
        console.log("❌ Error while updating:", error);
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
