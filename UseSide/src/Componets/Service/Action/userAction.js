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
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCES,
    FORGET_PASSWORD_FAIL,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCES,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCES,
    RESET_PASSWORD_FAIL
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

        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const token = localStorage.getItem("token");

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        };

        const { data } = await axios.put("http://localhost:3005/api/v1/updateuser", userData, config);

        dispatch({ type: UPDATE_PROFILE_SUCCES, payload: data.profile });

    } catch (error) {
        console.log("❌ Error while updating:", error);
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};


export const updatePassword = (password) => async (dispatch) => {
    try {
        console.log('password', password);


        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const token = localStorage.getItem("token");

        const config = {
            headers: {
                "Content-Type": "application/json", // ✅ This is correct for JSON
                "Authorization": `Bearer ${token}`,
            },
        };

        const { data } = await axios.put("http://localhost:3005/api/v1/updateUserPassword", password, config);

        dispatch({ type: UPDATE_PASSWORD_SUCCES, payload: data });

    } catch (error) {
        console.log("❌ Error while updating:", error);
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};


export const forgetPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGET_PASSWORD_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
       
        const { data } = await axios.post(`http://localhost:3005/api/v1/forgetPassword`,email, config)
        dispatch({ type: FORGET_PASSWORD_SUCCES, payload: data.message, })

    } catch (error) {
        dispatch({
            type: FORGET_PASSWORD_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
}


export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            `http://localhost:3005/api/v1/resetPassword/${token}`,
            passwords,
            config
        );
        console.log('dadadatatat', data);


        dispatch({ type: RESET_PASSWORD_SUCCES, payload: data.success });

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response?.data?.success || error.success,
        });
    }
};
