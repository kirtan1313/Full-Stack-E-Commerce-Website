import {
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCES,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCES
} from '../ReducersName/userReducerName'

const initialState = {
    loading: false,
    error: null
};

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_PROFILE_SUCCES:
        case UPDATE_PASSWORD_SUCCES:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        default:
            return state
    }

}