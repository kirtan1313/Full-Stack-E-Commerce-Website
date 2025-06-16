import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCES, REGISTER_REQUEST, REGISTER_FAIL, REGISTER_SUCCES, LOAD_REQUEST, LOAD_SUCCES, LOAD_FAIL, LOGOUT_USER } from '../ReducersName/userReducerName'

const initialState = {
    user: {},
    loading: false,
    error: null
};

export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_REQUEST:
            return {
                loading: true,
                isAuthentication: false
            }

        case LOGIN_SUCCES:
        case REGISTER_SUCCES:
        case LOAD_SUCCES:
            return {
                ...state,
                loading: false,
                isAuthentication: true,
                user: action.payload
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthentication: false,
                user: null,
                error: action.payload
            }

        case LOAD_FAIL:
            return {
                loading: false,
                isAuthentication: false,
                user: null,
                error: action.payload
            }

        case LOGOUT_USER:
            return {
                ...state,
                loading: false,
                isAuthentication: false,
                user: null,
                error: null,
            };

        default:
            return state
    }

}