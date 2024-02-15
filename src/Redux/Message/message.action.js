import { USER_API_URL, api } from "../../config/api"
import * as actionType from "./message.action.type"

export const createMessage = (reqData) => async (dispatch) => {

    dispatch({ type: actionType.CREATE_MESSAGE_REQUEST })

    try {

        const { data } = await api.post(`${USER_API_URL}/api/chat/message/${reqData.message.chatId}`, reqData.message);

        reqData.sendMessageToServer(data);

        console.log("Message created", data);

        dispatch({ type: actionType.CREATE_MESSAGE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: actionType.CREATE_MESSAGE_FAILURE, payload: error })
        console.log("Error create message ", error);

    }

}

export const createChat = (chat) => async (dispatch) => {

    dispatch({ type: actionType.CREATE_CHAT_REQUEST })

    try {

        const { data } = await api.post(`${USER_API_URL}/api/chats/user`, chat);

        console.log("Chat created", data);

        dispatch({ type: actionType.CREATE_CHAT_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: actionType.CREATE_CHAT_FAILURE, payload: error })
        console.log("Error create chat ", error);

    }

}

export const getAllChats = () => async (dispatch) => {

    dispatch({ type: actionType.GET_ALL_CHAT_REQUEST })

    try {
        const { data } = await api.get(`${USER_API_URL}/api/chats`);

        console.log("Chat retrieved", data);

        dispatch({ type: actionType.GET_ALL_CHAT_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: actionType.GET_ALL_CHAT_FAILURE, payload: error })
        console.log("Error get chat ", error);

    }

}