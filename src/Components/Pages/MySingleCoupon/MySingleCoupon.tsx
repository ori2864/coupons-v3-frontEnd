import "./MySingleCoupon.css";
import { Button } from "@mui/material";
import { Category } from "../../Models/Category";
import { Coupon } from "../../Models/Coupon";
import { useNavigate } from "react-router-dom";

export function MySingleCoupon(props:{coupon:Coupon}): JSX.Element {
   const navigate = useNavigate();
   return (
    <div  className="Box">
    <h3 className="CenterSpan">{props.coupon.title}</h3><hr />
     
        <>
            <p>{props.coupon.description}</p>
            <p><strong>Price:</strong> ${props.coupon.price}</p>
            <p><strong>Expiration Date:</strong> {props.coupon.end_date.toString()}</p>
            
            </>
    

</div>
    );
}
