import { SubmitHandler, useForm, Controller } from "react-hook-form";
import "./Register.css";
import axios from "axios";
import { Button, ButtonGroup, Checkbox, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import notify from "../../Utils/notify";

export function Register(): JSX.Element {
    const [userType, setUserType] = useState<string>("");
    const navigate = useNavigate();
    // {
    //     "id": number,
    //     "name": "string",
    //     "firstName": "string",
    //     "lastName": "string",
    //     "email": "string",
    //     "password": "string",
    //     "userType": "UserType"
    //   }
    type userRegisterData = {
        userName:string,
        firstName?:string,
        lastName?:string,
        userEmail: string;
        userPass: string;
        userType: string;
    }
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<userRegisterData>();

    const makeRegister: SubmitHandler<userRegisterData> = (data) => {
        console.log(data);
        let userDetails = {
            "firstName":data.firstName,
            "lastName":data.lastName,
            "name":data.userName,
            "email":data.userEmail,
            "password":data.userPass,
            "userType":data.userType.toUpperCase()
        }
        axios.post("http://localhost:8080/user/register",userDetails)
        .then (res=>{
            notify.success("User Registered Successfully!");
            navigate("/login");
        })
        .catch(err=>{
            console.log(err);
            notify.error("problem occurred with registeration");
        });
        
    }
    return (
        <div className="Register">
                <Typography variant="h4" className="HeadLine">User Register</Typography><hr />
			 <form onSubmit={handleSubmit(makeRegister)}>
             <Select 
                 value={userType} 
                 onChange={(e) => {
                     setUserType(e.target.value);
                     setValue("userType", e.target.value);
                 }} 
                 fullWidth
             >
                    <MenuItem  value="Customer">Customer</MenuItem>
                    <MenuItem value="Company">Company</MenuItem>
                </Select><br /> <br />
                {userType === "Customer" && (
                    <>
                        <TextField label="First Name" variant="outlined" {...register("firstName")} /><br /><br />
                        <TextField label="Last Name" variant="outlined" {...register("lastName")} /><br /><br />
                    </>
                )}
                <TextField label="user name" variant="outlined" {...register("userName")}/><br /><br />
                <TextField label="user email" variant="outlined" {...register("userEmail")}/><br /><br />
                <TextField label="user password" variant="outlined" type="password" {...register("userPass")}/><br /><br/>
                
                <br/>
                <hr />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="success" style={{ marginRight: 10 }}>Register</Button>
                    <Button onClick={()=>{navigate("/")}} color="error">Cancel</Button>
                </ButtonGroup>
                </form>
        </div>
    );
}
