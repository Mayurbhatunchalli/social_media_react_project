import { USER_API_URL, api } from "../../config/api";
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS } from "./comment.actionType";

export const createCommentAction = (reqData) => async(dispatch) => {

    try{

        dispatch({type:CREATE_COMMENT_REQUEST})
        const {data} = await api.post(`${USER_API_URL}/api/comments/post/${reqData.postId}`, reqData.data);

        dispatch({type:CREATE_COMMENT_SUCCESS, payload:data});

        console.log("Comment posted..!", data);

    } catch(error) {
        dispatch({type:CREATE_COMMENT_FAILURE, payload:error});
        console.log("Error while creating comment");
    }

}