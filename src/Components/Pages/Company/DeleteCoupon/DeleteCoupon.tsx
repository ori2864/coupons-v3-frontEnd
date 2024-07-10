import "./DeleteCoupon.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import { checkAuth } from "../../../Utils/checkAuth";
import { systemStore } from "../../../Redux/store";
import axiosJWT from "../../../Utils/axiosJWT";
import { Button } from "@mui/material";
import notify from "../../../Utils/notify";
import { couponPurchaseAction, deleteGuestCouponAction } from "../../../Redux/guestReducer";
import { MySingleCoupon } from "../../MySingleCoupon/MySingleCoupon";
import { deleteCouponAction } from "../../../Redux/companyReducer";

export function DeleteCoupon(): JSX.Element {
    const navigate = useNavigate(); 
    const [couponId,setId] = useState(-1);
    const [coupon,setCoupon] = useState<Coupon>();
    let {id} = useParams();
    useEffect(()=>{
        if(!checkAuth("COMPANY")){
            if(systemStore.getState().auth.isLogged){
                notify.error("only companies are able to purchase a coupon");
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
    
   const DeleteCoupon=()=>{
        axiosJWT.delete(`http://localhost:8080/api/company/delete/coupon/${couponId}`).then((res)=>{
                if(couponId!=undefined||res.data){        
                    
                    systemStore.dispatch(deleteGuestCouponAction(couponId))
                    systemStore.dispatch(deleteCouponAction(couponId))
                    notify.success("coupon successfully deleted!")
                    navigate("/");
                }else{    throw new Error("problem occurred with deleting this coupon"); }
                }
        )
        .catch( 
            ()=>{
                console.error();
                notify.error("problem occurred with deleting this coupon")
                navigate("/");
            }
        )
    }
    return (
        

        <div className="DeleteCoupon">
            <>
            
            <h2>{`Are You Sure You Want To Delete This Coupon?`}</h2>
            
             <br />
            
			<Button variant="contained" color="error" onClick={()=>DeleteCoupon()} >Delete</Button>
			<Button variant="contained"  onClick={()=>navigate("/")} >Cancel</Button>
            <br />
            {coupon!=undefined&&<MySingleCoupon coupon={coupon}></MySingleCoupon>}
            </>
        </div>
    );
}
