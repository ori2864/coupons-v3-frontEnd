import { ButtonGroup, Button, Select, MenuItem, TextField } from "@mui/material";
import "./ByPriceCoupons.css";
import { Category } from "../../../Models/Category";
import {  systemStore } from "../../../Redux/store";
import { useEffect, useState } from "react";
import { checkData } from "../../../Utils/checkData";
import axiosJWT from "../../../Utils/axiosJWT";
import { Coupon } from "../../../Models/Coupon";
import { titleAction } from "../../../Redux/titleReducer";
import { SubmitHandler, useForm } from "react-hook-form";
import { MySingleCoupon } from "../../MySingleCoupon/MySingleCoupon";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../../Utils/checkAuth";
import notify from "../../../Utils/notify";

export function ByPriceCoupons(): JSX.Element {
    const navigate = useNavigate();
    checkData();
    systemStore.dispatch(titleAction("Coupons By Price"))
    const [coupons,setCoupons]= useState<Coupon[]>([]);
    interface priceForm{
        priceForm:number
    };
    const { register, handleSubmit, formState: { errors } } = useForm<priceForm>();
    
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
    
    const categoryInput: SubmitHandler<priceForm> = (data) => {
        console.log(data.priceForm)
        axiosJWT.get(`http://localhost:8080/api/customer/get/coupons/by/price/${data.priceForm}`).then(res=>{
            
            setCoupons(res.data);
            
        })
        .catch(err => {
            console.error('Error fetching coupons:', err);
          });
    }
    
    
    return (
        <div className="ByPriceCoupons">
             <form onSubmit={handleSubmit(categoryInput)}>
                
                <TextField {...register("priceForm")} style={{marginRight:'2vh'}} type="number"></TextField>
                    <Button type="submit" style={{height:'10vh'}} variant="contained">
                    Filter By Max Price
                    </Button>
            </form> <br /><hr /><br />
            {coupons!=null&&coupons.map(coupon => <MySingleCoupon key={coupon.id}  coupon={coupon} />)}
        </div>
    );
}

