import { SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS } from "../Message/message.action.type"
import { ALL_USERS_SUCCESS, FOLLOW_USER_SUCCESS, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ACTION, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from "./auth.actionType"

const initialState = {
    jwt: null,
    error: null,
    loading: false,
    user: null,
    users: [],
    getUsers: [],
    followings: null,
    searchUser:[]
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_USER_REQUEST:
        case SEARCH_USER_REQUEST:
            return { ...state, loading: true, error: null }

        case GET_USER_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null }

        case SEARCH_USER_SUCCESS:
            return { ...state, searchUser: action.payload, loading: false, error: null }

        case FOLLOW_USER_SUCCESS:
            return {
                ...state, followings: action.payload,
                user: action.payload,
                loading: false, error: null
            }

        case ALL_USERS_SUCCESS:
            return { ...state, users: action.payload, loading: false, error: null }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, jwt: action.payload, loading: false, error: null }

        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case UPDATE_USER_FAILURE:
        case SEARCH_USER_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case LOGOUT_ACTION:
            return { ...initialState }

        default:
            return state;
    }

}