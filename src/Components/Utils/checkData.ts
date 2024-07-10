import { jwtDecode } from "jwt-decode";
import { systemStore} from "../Redux/store";
import { loginAction } from "../Redux/authReducer";
import { error } from "console";
import { updateCompanyIdAction } from "../Redux/companyReducer";
import { updateCustomerIdAction } from "../Redux/customerReducer";

type jwtData = {
    "workId":number,
    "userType": string,
    "userName": string,
    "sub": string,
    "iat": number,
    "exp": number
}
const findToken=()=>{
    let findJWT;
    if (systemStore.getState().auth.token.length < 10) {
        try{
         findJWT = sessionStorage.getItem("jwt");
         return findJWT;
        }catch{
            
            findJWT = localStorage.getItem("jwt");
            return findJWT;   
            
        }
         
    }
    return " ";
}

export const checkData = () => {
    //check if the redux is not updated, and check if we can update it from the session storage
    if (systemStore.getState().auth.token==undefined || systemStore.getState().auth.token.length < 10) {
            //try to load it from the session storage
            try {
    const JWT = findToken();
            if(JWT==null)throw console.error("no token found in session/local storage");
            const decoded_jwt = jwtDecode<jwtData>(JWT.split(" ")[1]);
            console.log(decoded_jwt);
            let myAuth = {
                name: decoded_jwt.userName,
                workId: decoded_jwt.workId,
                email: decoded_jwt.sub,
                token: JWT,
                userType: decoded_jwt.userType,
                isLogged: true
            };
           
            systemStore.dispatch(loginAction(myAuth));
            myAuth.userType == "COMPANY"&& systemStore.dispatch(updateCompanyIdAction(myAuth.workId));
            myAuth.userType == "CUSTOMER"&&systemStore.dispatch(updateCustomerIdAction(myAuth.workId));
        } catch {
            return;
        }

    }
    else{
    const JWT = systemStore.getState().auth.token;
    const decoded_jwt = jwtDecode<jwtData>(JWT.split(" ")[1]);
    let myAuth = {
        name: decoded_jwt.userName,
        workId: decoded_jwt.workId,
        email: decoded_jwt.sub,
        token: JWT,
        userType: decoded_jwt.userType,
        isLogged: true
    };
    myAuth.userType == "COMPANY"&& systemStore.dispatch(updateCompanyIdAction(myAuth.workId));
    myAuth.userType == "CUSTOMER"&&systemStore.dispatch(updateCustomerIdAction(myAuth.workId));
    }
    
}