import { useNavigate } from "react-router-dom";
import "./SingleCustomer.css";
import { Customer } from "../../../Models/Customer";
import { Button } from "@mui/material";

export function SingleCustomer(props: { customer: Customer }): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="SingleCustomer">
            <h3 className="CenterSpan">{`${props.customer.first_name} ${props.customer.last_name}`}</h3><hr />
<>
<p><strong>Id: </strong>{props.customer.id}</p>
<p><strong>Email: </strong>{props.customer.email}</p>
<p><strong>Amount of coupons: </strong>{props.customer.coupons?props.customer.coupons.length:0}</p> 
</>
</div>
);
}
