import "./UpdateCustomer.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Customer } from "../../../Models/Customer";
import { checkAuth } from "../../../Utils/checkAuth";
import { systemStore } from "../../../Redux/store";
import axiosJWT from "../../../Utils/axiosJWT";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import notify from "../../../Utils/notify";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateCustomerAction } from "../../../Redux/adminReducer";
import { checkData } from "../../../Utils/checkData";
import { titleAction } from "../../../Redux/titleReducer";

export function UpdateCustomer(): JSX.Element {
    const navigate = useNavigate(); 
    const [customerId, setId] = useState(-1);
    const [isExist, setExist] = useState(false);
    const [customer, setCustomer] = useState<Customer>();
    let { id } = useParams();

    useEffect(() => {
        if (!checkAuth("ADMIN")) {
            if (systemStore.getState().auth.isLogged) {
                notify.error("only admin is able to access this page!");
                navigate("/");
            } else {
                notify.error("you must first authenticate to access this page!");
                navigate("/login");
            }
        }else {
            checkData();
            systemStore.dispatch(titleAction("Update Customer"))
    }
    }, [navigate]);

    useEffect(() => {
        if (id !== undefined) {
            setId(parseInt(id));
        }
    }, [id]);

    useEffect(() => {
        if (customerId !== -1) {
            const allCustomers = systemStore.getState().admin.allCustomers;
            const existingCustomer = allCustomers.find((item) => item.id === customerId);

            if (existingCustomer) {
                setCustomer(existingCustomer);
                setExist(true);
            } else {
                axiosJWT.get(`http://localhost:8080/api/admin/get/one/customer/${customerId}`)
                    .then((res) => {
                        setCustomer(res.data);
                        setExist(true);
                    })
                    .catch(() => {
                        console.error();
                        notify.error("problem occurred");
                        navigate("/");
                    });
            }
        }
    }, [customerId, navigate]);

    const { register, handleSubmit, formState: { errors } } = useForm<Customer>();

    const makeCustomer: SubmitHandler<Customer> = (data) => {
        if (customer) {
            data.id = customerId;
            data.first_name = customer.first_name;
            data.last_name = customer.last_name;
            data.coupons = [];
            
            axiosJWT.put("http://localhost:8080/api/admin/update/customer", data).then(res => {
                systemStore.dispatch(updateCustomerAction(data));
                notify.success("Customer updated successfully");
                navigate("/admin/getAllCustomers");
            })
            .catch(err => {
                notify.error("problem occurred with update Customer");
                console.error('Error updating Customer:', err);
                navigate("/");
            });
        } else {
            console.error("no customer");
        }
    };

    return (
        <div className="UpdateCustomer">
            <div className="Box" style={{ width: "50%", }}>
                <Typography variant="h4" style={{ textAlign: "center" }} className="HeadLine">Update Customer</Typography>
                <hr /><br/>
                <form onSubmit={handleSubmit(makeCustomer)}>
                    <h2>{customer && `Name: ${customer.first_name} ${customer.last_name}`}</h2>
                    <TextField required type="text" label="Email" fullWidth 
                    {...register("email", { required: true, maxLength: 25 })} />
                    {errors.email?.type === "required" && <><br /><span style={{ color: "red" }}>Email is required</span></>}
                    {errors.email?.type === "maxLength" && <><br /><span style={{ color: "red" }}>Email is too long. Max length: 25</span></>}
                    <br /><br />
                    <TextField required type="text" label="Password" fullWidth 
                    {...register("password", { required: true, maxLength: 8 })} />
                    {errors.password?.type === "required" && <><br /><span style={{ color: "red" }}>New Password is required</span></>}
                    {errors.password?.type === "maxLength" && <><br /><span style={{ color: "red" }}>Password is too long. Max length: 8</span></>}
                    <br /><br />
                    
                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" color="success" >Update Customer</Button>
                        <Button color="error" onClick={() => { navigate("/") }}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}
