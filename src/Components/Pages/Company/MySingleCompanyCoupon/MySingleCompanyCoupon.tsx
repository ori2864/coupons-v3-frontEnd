import "./MySingleCompanyCoupon.css";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";


export function MySingleCompanyCoupon(props:{coupon:Coupon}): JSX.Element {
    const navigate = useNavigate();
    return (
     <div  className="Box">
     <h3 className="CenterSpan">{props.coupon.title}</h3><hr />
      
         <>
             <p>{props.coupon.description}</p>
             <p><strong>Price:</strong> ${props.coupon.price}</p>
             <p><strong>Category:</strong> {props.coupon.category}</p>
             <p><strong>Expiration Date:</strong> {props.coupon.end_date.toString()}</p>
             
             <Button variant="contained" color="error" 
                    onClick={()=>{navigate(`/company/coupon/delete/${props.coupon.id}`)}}>Delete</Button>
                
             
             </>
     
 
 </div>
     );
}
