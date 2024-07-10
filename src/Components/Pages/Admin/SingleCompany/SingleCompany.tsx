import { useNavigate } from "react-router-dom";
import "./SingleCompany.css";
import { Company } from "../../../Models/Company";
import { Button } from "@mui/material";
import { SingleCoupon } from "../../SingleCoupon/SingleCoupon";

export function SingleCompany(props:{company:Company}): JSX.Element {
   const navigate = useNavigate();
   return (
        <div  className="SingleCompany" >
    <h3 className="CenterSpan">{props.company.name}</h3><hr />
     
        <>
            <p><strong>email: </strong>{props.company.email}</p>
            <p><strong>Id: </strong> {props.company.id}</p>
            
            </>
    
            </div>
    );
}
