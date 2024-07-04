import axios from "axios";
import { systemStore } from "../Redux/store";
import { updateTokenAction, updateWorkIdAction } from "../Redux/authReducer";
import { useNavigate } from "react-router-dom";
import notify from "./notify";
import { jwtDecode } from "jwt-decode";
import { checkData } from "./checkData";
// import { updateCustomerIdAction } from "../Redux/customerReducer";
type jwtData = { 
    "workId":number,
    "userType": string,
    "userName": string,
    "sub": string,
    "iat": number,
    "exp": number
}

const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(  request=>{
    const token = systemStore.getState().auth.token
    const workId = systemStore.getState().auth.workId
    console.log(systemStore.getState().auth)
    if(token){
        request.headers.Authorization = `${token}`;
    }
    if(workId){
        request.headers['WorkId'] = workId;
    }
    return request;
})
axiosJWT.interceptors.response.use(
    response=>{
    let decodedToken = jwtDecode<jwtData>(response.headers.authorization);
    console.log(jwtDecode<jwtData>(response.headers.authorization))
        systemStore.dispatch(updateTokenAction(response.headers.authorization));
        systemStore.dispatch(updateWorkIdAction(decodedToken.workId))      
        sessionStorage.setItem("jwt",response.headers.authorization);
        return response;
    }
)




export default axiosJWT;