import "./ByCatCoupons.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, MenuItem, Select, TextField } from "@mui/material";
import { Coupon } from "../../../Models/Coupon";
import axiosJWT from "../../../Utils/axiosJWT";
import { checkData } from "../../../Utils/checkData";
import { systemStore } from "../../../Redux/store";
import { titleAction } from "../../../Redux/titleReducer";
import { MySingleCoupon } from "../../MySingleCoupon/MySingleCoupon";
import { Category } from "../../../Models/Category";
import { SubmitHandler, useForm } from "react-hook-form";
import { checkAuth } from "../../../Utils/checkAuth";
import notify from "../../../Utils/notify";
import { useNavigate } from "react-router-dom";

export function ByCatCoupons(): JSX.Element {
const navigate = useNavigate();
checkData();
systemStore.dispatch(titleAction("My Coupons"))
const [coupons,setCoupons]= useState<Coupon[]>([]);
interface catForm{
        categoryForm:string
    };
    useEffect(()=>{
        if(!checkAuth("CUSTOMER")){
            if(systemStore.getState().auth.isLogged){
                notify.error("only customers are able to access this page!")
                navigate("/")
            }else{
            notify.error("you must first authenticate to access this page!")
            navigate("/login")
            }
        }

    },[])
const { register, handleSubmit, formState: { errors } } = useForm<catForm>();


const categoryInput: SubmitHandler<catForm> = (data) => {
        axiosJWT.get(`http://localhost:8080/api/customer/get/coupons/by/category/${data.categoryForm}`).then(res=>{
            
            setCoupons(res.data);
            
        })
        .catch(err => {
            console.error('Error fetching coupons:', err);
          });
    }

    
return (
    <div className="byCatCoupons">
         <form onSubmit={handleSubmit(categoryInput)}>
        
                
                
        
                <Select {...register("categoryForm")} style={{ width: '20%', marginRight:'10px' }}>
                <MenuItem value="Electricity">Electricity</MenuItem>
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Restaurant">Restaurant</MenuItem>
                    <MenuItem value="Vacation">Vacation</MenuItem>
                </Select> 
                    
                
                    <ButtonGroup variant="contained" style={{  height: '10vh' }}>
                    <Button type="submit">
                    Filter By Category
                    </Button>    
                </ButtonGroup>
                
                    <br />
            
                    </form>
            {coupons!=null&&coupons.map(coupon => <MySingleCoupon key={coupon.id}  coupon={coupon} />)}
    </div>
);
}
