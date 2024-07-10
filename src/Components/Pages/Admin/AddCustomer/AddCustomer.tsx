import "./AddCustomer.css";
import { useEffect } from "react";
import { Customer } from "../../../Models/Customer";
import { useNavigate } from "react-router-dom";
import { systemStore } from "../../../Redux/store";
import { checkData } from "../../../Utils/checkData";
import { checkAuth } from "../../../Utils/checkAuth";
import notify from "../../../Utils/notify";
import axiosJWT from "../../../Utils/axiosJWT";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { titleAction } from "../../../Redux/titleReducer";
import { addCustomerAction } from "../../../Redux/adminReducer";

export function AddCustomer(): JSX.Element {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!checkAuth("ADMIN")) {
            if (systemStore.getState().auth.isLogged) {
                notify.error("Only admins are able to access this page!")
                navigate("/")
            } else {
                notify.error("You must first authenticate to access this page!")
                navigate("/login")
            }
        } else {
            checkData();
            systemStore.dispatch(titleAction("Add Customer"))
        }
    }, [navigate]);

    const { register, handleSubmit, formState: { errors } } = useForm<Customer>();

    const makeCustomer: SubmitHandler<Customer> = (data) => {
        console.log(data);
        data.id = 0;
       
        axiosJWT.post("http://localhost:8080/api/admin/add/customer", data).then(res => {
            data.id = res.data;
            systemStore.dispatch(addCustomerAction(data));
            notify.success("Customer added successfully");
            navigate("/admin/getAllCustomers");
        })
        .catch(err => {
            notify.error("Problem occurred with adding customer");
            console.error('Error adding customer:', err);
            navigate("/")
        });
    }

    return (
        <div className="AddCustomer" style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <div className="Box" style={{ width: "50%" }}>
                <Typography variant="h4" style={{ textAlign: "center" }} className="HeadLine">Create New Customer</Typography>
                <hr /><br/>
                <form onSubmit={handleSubmit(makeCustomer)}>
                    <TextField required type="text" label="First Name" fullWidth 
                        {...register("first_name", { required: true, maxLength: 50 })} />
                    {errors.first_name?.type === "required" && <><br /><span style={{ color: "red" }}>First Name is required</span></>}
                    {errors.first_name?.type === "maxLength" && <><br/><span style={{ color: "red" }}>First Name is too long. Max length: 50</span></>}
                    <br /><br />
                    <TextField required type="text" label="Last Name" fullWidth 
                        {...register("last_name", { required: true, maxLength: 50 })} />
                    {errors.last_name?.type === "required" && <><br /><span style={{ color: "red" }}>Last Name is required</span></>}
                    {errors.last_name?.type === "maxLength" && <><br/><span style={{ color: "red" }}>Last Name is too long. Max length: 50</span></>}
                    <br /><br />
                    <TextField required type="email" label="Email" fullWidth 
                        {...register("email", { required: true, maxLength: 50 })} />
                    {errors.email?.type === "required" && <><br /><span style={{ color: "red" }}>Email is required</span></>}
                    {errors.email?.type === "maxLength" && <><br/><span style={{ color: "red" }}>Email is too long. Max length: 50</span></>}
                    <br /><br />
                    <TextField required type="password" label="Password" fullWidth 
                        {...register("password", { required: true, maxLength: 20 })} />
                    {errors.password?.type === "required" && <><br/><span style={{ color: "red" }}>Password is required</span></>}
                    {errors.password?.type === "maxLength" && <><br/><span style={{ color: "red" }}>Password is too long. Max length: 20</span></>}
                    <br /><br />
                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" color="primary">Add Customer</Button>
                        <Button color="error" onClick={() => { navigate("/") }}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}
