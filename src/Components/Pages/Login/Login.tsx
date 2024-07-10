import { Button, ButtonGroup, Checkbox, MenuItem, Select, TextField, Typography } from "@mui/material";
import "./Login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import notify from "../../Utils/notify";
import { systemStore } from "../../Redux/store";
import axiosJWT from "../../Utils/axiosJWT";
import { loginAction } from "../../Redux/authReducer";
import { useEffect } from "react";

type userLoginData = {
    userEmail: string;
    userPass: string;
    userType: string;
    userRemember: boolean;
}

type jwtData = { 
        "workId":number,
        "userType": string,
        "userName": string,
        "sub": string,
        "iat": number,
        "exp": number
}

//show message with animation on screen => npm install notyf

export function Login(): JSX.Element {
    const navigate = useNavigate();
    useEffect(()=>{
        rememberMe();
    })
    //get the methods that we need from react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm<userLoginData>();

    const makeLogin: SubmitHandler<userLoginData> = (data) => {
        console.log(data);
        let userDetails = {
            "email":data.userEmail,
            "password":data.userPass,
            "userType":data.userType.toUpperCase()
        }



        
        axiosJWT.post("http://localhost:8080/user/login",userDetails)
        .then (res=>{
            const JWT = res.headers["authorization"].split(" ")[1];
            //console.log("from server:",JWT); //email,name,userType
            
            //decode to the token.
            const decoded_jwt = jwtDecode<jwtData>(JWT);
            console.log(decoded_jwt);
            let myAuth = {
                workId: decoded_jwt.workId,
                name: decoded_jwt.userName,
                email: decoded_jwt.sub,
                token : res.headers["authorization"],
                userType: decoded_jwt.userType,
                isLogged:true    
            };

            systemStore.dispatch(loginAction(myAuth));
             console.log(res);
            if (data.userRemember){
                localStorage.setItem("jwt",`Bearer ${JWT}`);
            } else {
                localStorage.removeItem("jwt");
            }
            
            notify.success("Welcome back");
            navigate("/");
        })
        .catch(err=>{
            console.log(err);
            notify.error("bad user or password !!");
        });
    }


    const rememberMe=()=>{
        if(localStorage.getItem("jwt")!=null){
            const localToken=localStorage.getItem("jwt")
            if(localToken==null){
                throw console.error("problem occrred, maybe we forgot you :(");
            }
            const decoded_jwt = jwtDecode<jwtData>(localToken!.split(" ")[1]);
            console.log(decoded_jwt);
            let myAuth = {
                workId: decoded_jwt.workId,
                name: decoded_jwt.userName,
                email: decoded_jwt.sub,
                token : localToken,
                userType: decoded_jwt.userType,
                isLogged:true    
            };
            systemStore.dispatch(loginAction(myAuth))
            notify.success("welcome back!")
            navigate("/")
        }
    }

    return (
        <div className="Login Box">
            <form onSubmit={handleSubmit(makeLogin)}>
                <Typography variant="h4" className="HeadLine">User Login</Typography><hr />
                <TextField label="user email" variant="outlined" {...register("userEmail")}/><br /><br />
                <TextField label="user password" variant="outlined" type="password" {...register("userPass")}/><br /><br/>
                <Select  fullWidth {...register("userType")} >
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Company">Company</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                </Select>
                <br/>
                <Checkbox {...register("userRemember")}/> Remember me
                <hr />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="success" style={{ marginRight: 10 }}>Login</Button>
                    <Button onClick={()=>{navigate("/")}} color="error">Cancel</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}