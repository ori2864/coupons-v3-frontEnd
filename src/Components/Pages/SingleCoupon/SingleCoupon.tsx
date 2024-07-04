import { Button } from "@mui/material";
import { Category } from "../../Models/Category";
import { Coupon } from "../../Models/Coupon";
import "./SingleCoupon.css";
import { useNavigate } from "react-router-dom";

export function SingleCoupon(props:{coupon:Coupon}): JSX.Element {
   const navigate = useNavigate();
    return (
        <div  className="Box">
        <h3 className="CenterSpan">{props.coupon.title}</h3><hr />
         
            <>
                <p>{props.coupon.description}</p>
                <p><strong>Amount in stock: </strong>{props.coupon.amount}</p>
                <p><strong>Price:</strong> ${props.coupon.price}</p>
                <p><strong>Expiration Date:</strong> {props.coupon.end_date.toString()}</p>
                {props.coupon.amount === 0 ? (
                <p style={{color: 'red', fontSize: '20px'}}>Out of stock</p>    
                ) :
                <Button variant="contained" color="success" 
                    onClick={()=>navigate(`/customer/confirmBuy/${props.coupon.id}`)}>Buy Now</Button>
                }
                </>
        

    </div>
    );
}
