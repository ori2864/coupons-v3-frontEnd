import { useNavigate, useParams } from "react-router-dom";
import "./ConfirmBuy.css";
import { useEffect, useState } from "react";
import axiosJWT from "../../../Utils/axiosJWT";
import { set } from "react-hook-form";
import { Button } from "@mui/material";
import notify from "../../../Utils/notify";
import { error } from "console";
import { checkAuth } from "../../../Utils/checkAuth";
import { systemStore } from "../../../Redux/store";
import { couponPurchaseAction, getAllCouponsAction } from "../../../Redux/guestReducer";
import { resetListAfterCustomerPurchaseAction } from "../../../Redux/customerReducer";
import { MySingleCoupon } from "../../MySingleCoupon/MySingleCoupon";
import { Coupon } from "../../../Models/Coupon";

export function ConfirmBuy(): JSX.Element {
    const navigate = useNavigate(); 
    const [couponId,setId] = useState(-1);
    const [coupon,setCoupon] = useState<Coupon>();
    let {id} = useParams();
    useEffect(()=>{
        if(!checkAuth("CUSTOMER")){
            if(systemStore.getState().auth.isLogged){
                notify.error("only customers are able to purchase a coupon");
                navigate("/");
            }else{
            notify.error("you must first authenticate to purchase a coupon");
            navigate("/login");
            }
        }
        id!=undefined&&setId(parseInt(id));
        if(systemStore.getState().guest.allCoupons.at(couponId)!=undefined){
            setCoupon(systemStore.getState().guest.allCoupons.at(couponId))
        }
    })
    const [isBuy,setBuy] = useState(false);
   const BuyCoupon=()=>{
        axiosJWT.post(`http://localhost:8080/api/customer/purchase/${id}`).then(()=>{
                if(id!=undefined){        
                    // const couponId:number = parseInt(id);
                    
                    systemStore.dispatch(couponPurchaseAction(couponId))
                    systemStore.dispatch(resetListAfterCustomerPurchaseAction())
                    //dispatch customer add coupon to my coupons
                    notify.success("coupon successfully purchased!")
                    navigate("/");
                }else{    throw new Error("problem occurred with this coupon"); }
                }
        )
        .catch( 
            ()=>{
                console.error();
                notify.error("problem occurred")
                navigate("/");
            }
        )
    }
    return (
        

        <div className="ConfirmBuy">
            <>
            
            <h2>{`Are You Sure You Want To Purchase This Coupon?`}</h2>
            
             <br />
            
			<Button variant="contained" onClick={()=>BuyCoupon()} >Buy</Button>
			<Button variant="contained" color="error" onClick={()=>navigate("/")} >Cancel</Button>
            <br />
            {coupon!=undefined&&<MySingleCoupon coupon={coupon}></MySingleCoupon>}
            </>
        </div>
    );
}
