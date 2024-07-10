import "./CompanyDetails.css";
import { useEffect, useState } from "react";
import axiosJWT from "../../../Utils/axiosJWT";
import { checkData } from "../../../Utils/checkData";
import { Coupon } from "../../../Models/Coupon";
import { SingleCoupon } from "../../SingleCoupon/SingleCoupon";
import { MySingleCoupon } from "../../MySingleCoupon/MySingleCoupon";
import { checkAuth } from "../../../Utils/checkAuth";
import { systemStore } from "../../../Redux/store";
import notify from "../../../Utils/notify";
import { useNavigate } from "react-router-dom";
import { sys } from "typescript";
import { titleAction } from "../../../Redux/titleReducer";
export function CompanyDetails(): JSX.Element {
    const navigate = useNavigate();
    interface company{
        id:number
        name:string
        email:string
        password:string
        coupons:Coupon[]
    }
    const [company,setCompany] = useState<company>();
    const [coupons,setCoupons] = useState<Coupon[]>([]);
    checkData();
    useEffect(()=>{
        systemStore.dispatch(titleAction("My Details"))
        axiosJWT.get(`http://localhost:8080/api/company/get/companyDetails`).then((res)=>{
            if(!checkAuth("COMPANY")){
                if(systemStore.getState().auth.isLogged){
                    notify.error("only companys are able to access this page!")
                    navigate("/")
                }else{
                notify.error("you must first authenticate to access this page!")
                navigate("/login")
                }
            }
            setCompany(res.data);
            if (res.data.coupons) {
                setCompany(res.data);
                setCoupons(res.data.coupons);
 //         setCoupons(company.coupons)
}
        });
    },[]);

    return (
        <div className="myText">
            <div><strong>Id: </strong>{company?.id}</div>
            <div><strong>Company Name: </strong>{company?.name}</div>
            <div><strong>Email: </strong>{company?.email}<br/><hr/></div>
            <h2>Coupons:</h2><br />
            {coupons.length > 0 ? coupons.map(coupon => <MySingleCoupon key={coupon.id}  coupon={coupon} />) : <p>No coupons owned</p>}

			
        </div>
    );
}
