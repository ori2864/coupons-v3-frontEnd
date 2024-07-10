import "./AddCompany.css";
import { useEffect } from "react";
import { Company } from "../../../Models/Company";
import { useNavigate } from "react-router-dom";
import { systemStore } from "../../../Redux/store";
import { checkData } from "../../../Utils/checkData";
import { checkAuth } from "../../../Utils/checkAuth";
import notify from "../../../Utils/notify";
import axiosJWT from "../../../Utils/axiosJWT";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { titleAction } from "../../../Redux/titleReducer";
import { addCompanyAction } from "../../../Redux/adminReducer";

export function AddCompany(): JSX.Element {
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
            systemStore.dispatch(titleAction("Add Company"))
        }
    }, [navigate]);

    const { register, handleSubmit, formState: { errors } } = useForm<Company>();

    const makeCompany: SubmitHandler<Company> = (data) => {
        console.log(data);
        data.id = 0;
        data.coupons = [];
       
        axiosJWT.post("http://localhost:8080/api/admin/add/company", data).then(res => {
            data.id = res.data;
            systemStore.dispatch(addCompanyAction(data));
            notify.success("Company added successfully");
            navigate("/admin/getAllCompanies");
        })
        .catch(err => {
            notify.error("Problem occurred with adding company");
            console.error('Error adding company:', err);
            navigate("/")
        });
    }

    return (
        <div className="AddCompany" style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <div className="Box" style={{ width: "50%" }}>
                <Typography variant="h4" style={{ textAlign: "center" }} className="HeadLine">Create New Company</Typography>
                <hr /><br/>
                <form onSubmit={handleSubmit(makeCompany)}>
                    <TextField required type="text" label="Name" fullWidth 
                        {...register("name", { required: true, maxLength: 50 })} />
                    {errors.name?.type === "required" && <><br /><span style={{ color: "red" }}>Name is required</span></>}
                    {errors.name?.type === "maxLength" && <><br/><span style={{ color: "red" }}>Name is too long. Max length: 50</span></>}
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
                        <Button type="submit" color="primary">Add Company</Button>
                        <Button color="error" onClick={() => { navigate("/") }}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}
