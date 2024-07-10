import "./AddCoupon.css";
import { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../Models/Category";
import { systemStore } from "../../../Redux/store";
import { checkData } from "../../../Utils/checkData";
import { checkAuth } from "../../../Utils/checkAuth";
import notify from "../../../Utils/notify";
import axiosJWT from "../../../Utils/axiosJWT";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonGroup, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { titleAction } from "../../../Redux/titleReducer";
import { addCouponAction } from "../../../Redux/companyReducer";
import { addGuestCouponAction } from "../../../Redux/guestReducer";


export function AddCoupon(): JSX.Element {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!checkAuth("COMPANY")){
            if(systemStore.getState().auth.isLogged){
                notify.error("only companies are able to access this page!")
                navigate("/")
            }else{
            notify.error("you must first authenticate to access this page!")
            navigate("/login")
            }
        }else{
            checkData();
            systemStore.dispatch(titleAction("Add Coupon"))
        }

    },[])


        const { register, handleSubmit, formState: { errors } } = useForm<Coupon>();

        const makeCoupon: SubmitHandler<Coupon> = (data) => {
            console.log(data);
            data.id=0;
           
            
            axiosJWT.post("http://localhost:8080/api/company/add/coupon",data).then(res=>{
                    data.id = res.data;
                    systemStore.dispatch(addCouponAction(data));
                    systemStore.dispatch(addGuestCouponAction(data));
                    notify.success("coupon added successfully");
                    navigate("/company/allCoupons");
                
                
            })
            .catch(err => {
                    notify.error("problem occurred with adding coupon");
                    console.error('Error adding coupon:', err);
                navigate("/")
              });
        }
        

        



    return (
        <div className="AddCoupon" style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <div className="Box" style={{ width: "50%", }}>
			<Typography variant="h4" style={{textAlign:"center"}} className="HeadLine">Create New Coupon</Typography>
                <hr /><br/>
                <form onSubmit={handleSubmit(makeCoupon)}>
                    <TextField required type="text" label="Title" fullWidth 
                    {...register("title",{required:true, maxLength:15})} />
                    {errors.title?.type === "required" && <><br /><span style={{ color: "red" }}>Title is required</span></>}
                    {errors.title?.type == "maxLength" && <><br/><span style={{ color: "red" }}>Title is too long. Max length: 50</span></>}
                    <br /><br />
                    <TextField type="text" label="Description" fullWidth 
                    {...register("description", {maxLength: 70})} />
                    {errors.description?.type == "maxLength" && <><br/><span style={{ color: "red" }}>Description is too long. Max length: 70</span></>}
                    <br /><br />
                    <InputLabel id="startDate">Start Date</InputLabel>
                    <TextField required id = "startDate" type="date" fullWidth {...register("start_date",{required:true})} />
                    <br /><br />
                    <InputLabel id="endDate">End Date</InputLabel>
                    <TextField required id = "endDate" type="date" fullWidth {...register("end_date",{required:true})} />
                    <br /><br />
                    <TextField required type="number" label="Amount" fullWidth {...register("amount", { required: true })} />
                    <br /><br />
                    <TextField required type="number" label="Price" fullWidth {...register("price", { required: true })} />
                    <br /><br />
                    <InputLabel id="category-label">Select Category</InputLabel>
                    <Select required labelId="category-label" id="Category" label="Select Category" {...register("category", {required:true})} fullWidth >
                        <MenuItem disabled selected> -- select a category -- </MenuItem>
                        {Object.entries(Category).map(([key,val])=><MenuItem key={key} value={val.toUpperCase()}>{val}</MenuItem>)}
                    </Select>
                    <br/><br/>
                    <TextField type="text" label="Image" fullWidth {...register("image")} />
                    <br/><br />
                    <hr />
                    <br/>
                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" color="primary"  >Add Coupon</Button>
                        <Button color="error"  onClick={() => { navigate("/") }}>Cancel</Button>
                    </ButtonGroup>
                </form>
                </div>
        </div>
    );
}
