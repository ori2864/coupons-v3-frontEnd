import axios from "axios";
import "./Main.css";
import { checkData } from "../../Utils/checkData";
import { useEffect, useState } from "react";
import axiosJWT from "../../Utils/axiosJWT";
import { Coupon } from "../../Models/Coupon";
import { Button, ButtonGroup } from "@mui/material";
import { SingleCoupon } from "../../Pages/SingleCoupon/SingleCoupon";
import { systemStore } from "../../Redux/store";
import { noneAction, titleState } from "../../Redux/titleReducer";
import { getAllCouponsAction } from "../../Redux/guestReducer";

export function Main(): JSX.Element {
    const [coupons,setCoupons]= useState<Coupon[]>([]);
    checkData();
    console.log(systemStore.getState().auth.token)
    useEffect(()=>{
        systemStore.dispatch(noneAction("All Coupons"))
        if(systemStore.getState().guest.allCoupons.length===0){
            console.log("api request")
        axios.get(`http://localhost:8080/guest/get/coupons/all`).then(res=>{
            
            console.log(res.data)
            setCoupons(res.data);
            systemStore.dispatch(getAllCouponsAction(res.data));
        })
            
    }else{
        console.log("redux: ",systemStore.getState().guest.allCoupons)
        setCoupons(systemStore.getState().guest.allCoupons)
    }
    console.log("coupons: ",coupons)
    },[])
    return (
        <div className="Main">
                
                {coupons!=null&&coupons.map(coupon => <SingleCoupon key={coupon.id}  coupon={coupon} />)}
              
        </div>
    );
}
