import { USER_API_URL, api } from "../../config/api"
import { CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_ALL_POSTS_FAILURE, 
    GET_ALL_POSTS_REQUEST, GET_ALL_POSTS_SUCCESS, GET_SAVED_POSTS_FAILURE, GET_SAVED_POSTS_REQUEST, 
    GET_SAVED_POSTS_SUCCESS, 
    GET_USER_POSTS_FAILURE, GET_USER_POSTS_REQUEST, GET_USER_POSTS_SUCCESS, 
    LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS } from "./post.actionType"

export const createPostAction = (postData) => async(dispatch) => {

    try{
        dispatch({type:CREATE_POST_REQUEST})

        const {data} = await api.post(`${USER_API_URL}/api/posts`, postData);
        dispatch({type:CREATE_POST_SUCCESS, payload:data});
        console.log("Post created...", data);

    } catch(error) {

        dispatch({type:CREATE_POST_FAILURE, payload:error})
        console.log("Error", error);

    }

}

export const getAllPostsAction = (jwt) => async(dispatch) => {

    try{
        dispatch({type:GET_ALL_POSTS_REQUEST})

        const {data} = await api.get(`${USER_API_URL}/api/allPosts`,
        {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            },
        });
        dispatch({type:GET_ALL_POSTS_SUCCESS, payload:data});
        console.log("Post retrieved...", data);

    } catch(error) {

        dispatch({type:GET_ALL_POSTS_FAILURE, payload:error})
        console.log("Error", error);

    }

}

export const getUserPostsAction = (userId,jwt) => async(dispatch) => {

    try{
        dispatch({type:GET_USER_POSTS_REQUEST})

        const {data} = await api.get(`${USER_API_URL}/api/posts/user/${userId}`,
        {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            },
        });
        dispatch({type:GET_USER_POSTS_SUCCESS, payload:data});
        console.log("Post retrieved...", data);

    } catch(error) {

        dispatch({type:GET_USER_POSTS_FAILURE, payload:error})
        console.log("Error", error);

    }

}

export const getUserSavedPostsAction = (userId,jwt) => async(dispatch) => {

    try{
        dispatch({type:GET_SAVED_POSTS_REQUEST})

        const {data} = await api.get(`${USER_API_URL}/api/posts/saved/${userId}`,
        {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            },
        });
        dispatch({type:GET_SAVED_POSTS_SUCCESS, payload:data});
        console.log("Post retrieved...", data);

    } catch(error) {

        dispatch({type:GET_SAVED_POSTS_FAILURE, payload:error})
        console.log("Error", error);

    }

}

export const likePostAction = (postId) => async(dispatch) => {

    try{
        dispatch({type:LIKE_POST_REQUEST});
        const {data} = await api.put(`${USER_API_URL}/api/posts/like/${postId}`);

        dispatch({type:LIKE_POST_SUCCESS, payload:data});
        console.log("User liked the post", data);

    } catch(error) {
        dispatch({type:LIKE_POST_FAILURE, payload:error});
        console.log("Error", error);
    }

}

export const deleteUserPostsAction = (postId,jwt) => async(dispatch) => {

    try{
        dispatch({type:DELETE_POST_REQUEST})

        const {data} = await api.delete(`${USER_API_URL}/api/posts/delete/${postId}`,
        {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            },
        });
        dispatch({type:DELETE_POST_SUCCESS, payload:data});
        console.log("Post deleted...", data);

    } catch(error) {

        dispatch({type:DELETE_POST_FAILURE, payload:error})
        console.log("Error", error);

    }

}