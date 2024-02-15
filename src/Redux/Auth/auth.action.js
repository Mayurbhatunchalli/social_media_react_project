import axios from "axios"
import { API_BASE_URL, USER_API_URL, api } from "../../config/api"
import { ALL_USERS_FAILURE, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ACTION, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./auth.actionType"
import { SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS } from "../Message/message.action.type"



export const loginUserAction=(loginData)=>async(dispatch)=>{

    dispatch({type:LOGIN_REQUEST})

    try{
        const {data} = await axios.post(`${API_BASE_URL}/auth/signIn`, loginData.data)

        if(data.token) {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("isLoggedIn", true);
        }
        console.log("Login Success", data)
        dispatch({type:LOGIN_SUCCESS, payload:data.token})
    } catch(error) {
        console.log(error);
        dispatch({type:LOGIN_FAILURE, payload:error})
    }
}

export const registerUserAction=(registerData)=>async(dispatch)=>{

    dispatch({type:REGISTER_REQUEST})

    try{
        const {data} = await axios.post(`${API_BASE_URL}/auth/signUp`, registerData.data)

        if(data.token) {
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("isLoggedIn", true);
        }
        console.log("Register Success", data)
        dispatch({type:REGISTER_SUCCESS, payload:data.token})
    } catch(error) {
        console.log(error);
        dispatch({type:REGISTER_FAILURE, payload:error})
    }
}

export const getUserProfileAction=(jwt)=>async(dispatch)=>{

    dispatch({type:GET_USER_REQUEST})

    try{
        const {data} = await axios.get(`${USER_API_URL}/api/user/profile`, 
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                },
            }
        );

        console.log("Get profile Success", data)
        dispatch({type:GET_USER_SUCCESS, payload:data})
    } catch(error) {
        console.log("------", error);
        dispatch({type:GET_USER_FAILURE, payload:error})
    }
}

export const updateUserProfileAction = (reqData) => async(dispatch) => {

    dispatch({type:UPDATE_USER_REQUEST})

    try{
        const {data} = await api.put(`${USER_API_URL}/api/user/profile/update`, reqData);

        console.log("Profile update Success", data)
        dispatch({type:UPDATE_USER_SUCCESS, payload:data})
    } catch(error) {
        console.log("------", error);
        dispatch({type:UPDATE_USER_FAILURE, payload:error})
    }
}

export const followUserAction = (reqId) => async(dispatch) => {

    dispatch({type:FOLLOW_USER_REQUEST})

    try{
        const {data} = await api.put(`${USER_API_URL}/api/user/follow/${reqId}`);

        console.log("Follow Success", data)
        dispatch({type:FOLLOW_USER_SUCCESS, payload:data})
    } catch(error) {
        console.log("------", error);
        dispatch({type:FOLLOW_USER_FAILURE, payload:error})
    }
}



export const searchUserProfileAction=(query,jwt)=>async(dispatch)=>{

    dispatch({type:SEARCH_USER_REQUEST})

    try{
        const {data} = await api.get(`${USER_API_URL}/api/user/query?query=${query}`, 
        {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            },
        }
    );

        console.log("Search user Success", data)
        dispatch({type:SEARCH_USER_SUCCESS, payload:data})
    } catch(error) {
        console.log("Search user failure------", error);
        dispatch({type:SEARCH_USER_FAILURE, payload:error})
    }
}

export const allUsersProfileAction=(jwt)=>async(dispatch)=>{

    dispatch({type:ALL_USERS_REQUEST})

    try{
        const {data} = await axios.get(`${USER_API_URL}/api/user/allUsers`, 
        {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            },
        }
    );
        console.log("All users Success", data)
        dispatch({type:ALL_USERS_SUCCESS, payload:data})
    } catch(error) {
        console.log("All users failure------", error);
        dispatch({type:ALL_USERS_FAILURE, payload:error})
    }
}

export const logoutAction = () => async(dispatch) => {

    dispatch({type:LOGOUT_ACTION, payload:null})

}