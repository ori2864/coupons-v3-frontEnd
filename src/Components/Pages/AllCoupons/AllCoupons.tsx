import "./AllCoupons.css";
import { checkData } from "../../Utils/checkData";
import { useEffect, useState } from "react";
import axiosJWT from "../../Utils/axiosJWT";
import { Coupon } from "../../Models/Coupon";
import { Button, ButtonGroup } from "@mui/material";
import { SingleCoupon } from "../../Pages/SingleCoupon/SingleCoupon";
import axios from "axios";

export function AllCoupons(): JSX.Element {
    // const [coupons,setCoupons]= useState<Coupon[]>([]);
    // checkData();
    // useEffect(()=>{
    //     axiosJWT(`http://localhost:8080/guest/get/coupons/all`).then(res=>{
            
    //         console.log(res.data)
    //         setCoupons(res.data);
            
    //     })
    // },[])

    return (
        <div className="AllCoupons">
			<>
                {/* {coupons!=null&&coupons.map(coupon => <SingleCoupon key={coupon.id}  coupon={coupon} />)} */}
                </>
        </div>
    );
}
