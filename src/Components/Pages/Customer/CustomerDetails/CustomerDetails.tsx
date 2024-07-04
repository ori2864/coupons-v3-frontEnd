import { useEffect, useState } from "react";
import axiosJWT from "../../../Utils/axiosJWT";
import { checkData } from "../../../Utils/checkData";
import "./CustomerDetails.css";
import { Coupon } from "../../../Models/Coupon";
import { SingleCoupon } from "../../SingleCoupon/SingleCoupon";
import { MySingleCoupon } from "../../MySingleCoupon/MySingleCoupon";

export function CustomerDetails(): JSX.Element {
    interface customer{
        id:number
        first_name:string
        last_name:string
        email:string
        password:string
        coupons:Coupon[]
    }
    const [customer,setCustomer] = useState<customer>();
    const [coupons,setCoupons] = useState<Coupon[]>([]);
    checkData();
    useEffect(()=>{
        axiosJWT.get(`http://localhost:8080/api/customer/get/customerDetails`).then((res)=>{
            setCustomer(res.data);
            if (res.data.coupons) {
                setCustomer(res.data);
                setCoupons(res.data.coupons);
 //         setCoupons(customer.coupons)
}
        });
    },[]);

    
    return (
        <div className="myText">
            <div><strong>Id: </strong>{customer?.id}</div>
            <div><strong>First Name: </strong>{customer?.first_name}</div>
            <div><strong>Last Name: </strong>{customer?.last_name}</div>
            <div><strong>Email: </strong>{customer?.email}<br/><hr/></div>
            <h2>Coupons:</h2><br />
            {coupons.length > 0 ? coupons.map(coupon => <MySingleCoupon key={coupon.id}  coupon={coupon} />) : <p>No coupons available</p>}

			
        </div>
    );
}
