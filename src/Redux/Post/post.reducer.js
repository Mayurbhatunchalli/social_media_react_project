import { CREATE_COMMENT_SUCCESS } from "../Comment/comment.actionType";
import { CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_ALL_POSTS_FAILURE, GET_ALL_POSTS_REQUEST, GET_ALL_POSTS_SUCCESS, GET_SAVED_POSTS_SUCCESS, GET_USER_POSTS_FAILURE, GET_USER_POSTS_REQUEST, GET_USER_POSTS_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_SUCCESS } from "./post.actionType";

const initialState = {
    post: null,
    loading: false,
    error: null,
    posts: [],
    like: null,
    comments: [],
    newComment: null,
    savedPosts: [],
    deleteStatus: null
}

export const postReducer = (state = initialState, action) => {

    switch (action.type) {

        case CREATE_POST_REQUEST:
        case GET_ALL_POSTS_REQUEST:
        case GET_USER_POSTS_REQUEST:
        case DELETE_POST_REQUEST:
            return { ...state, loading: false, error: null }

        case CREATE_POST_SUCCESS:
            return {
                ...state,
                post: action.payload,
                posts: [...state.posts, action.payload],
                loading: false,
                error: null
            }

        case GET_ALL_POSTS_SUCCESS:
        case GET_USER_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                comments: action.payload.comments,
                loading: false,
                error: null
            };

        case DELETE_POST_SUCCESS:
            return {
                ...state,
                deleteStatus: action.payload.status,
                loading: false,
                error: null
            }

        case GET_SAVED_POSTS_SUCCESS:
            return {
                ...state,
                savedPosts: action.payload,
                comments: action.payload.comments,
                loading: false,
                error: null
            };

        case LIKE_POST_SUCCESS:
            return {
                ...state,
                like: action.payload,
                posts: state.posts.map((item) => item.id === action.payload.id ? action.payload : item),
                loading: false,
                error: null
            }


        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                newComment: action.payload,
                loading: false,
                error: null
            }

        case CREATE_POST_FAILURE:
        case GET_ALL_POSTS_FAILURE:
        case GET_USER_POSTS_FAILURE:
        case LIKE_POST_FAILURE:
        case DELETE_POST_FAILURE:
            return {
                ...state, error: action.payload, loading: false
            }

        default:
            return state;
    }

}