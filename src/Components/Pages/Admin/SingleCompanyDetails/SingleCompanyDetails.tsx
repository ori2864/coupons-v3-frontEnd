import { useNavigate, useParams } from "react-router-dom";
import "./SingleCompanyDetails.css";
import { useEffect, useState } from "react";
import { checkAuth } from "../../../Utils/checkAuth";
import { systemStore } from "../../../Redux/store";
import notify from "../../../Utils/notify";
import axiosJWT from "../../../Utils/axiosJWT";
import { Button } from "@mui/material";
import { Company } from "../../../Models/Company";
import { error } from "console";
import { SingleCompany } from "../SingleCompany/SingleCompany";
import { MySingleCoupon } from "../../MySingleCoupon/MySingleCoupon";
import { checkData } from "../../../Utils/checkData";
import { titleAction } from "../../../Redux/titleReducer";

export function SingleCompanyDetails(): JSX.Element {
    const navigate = useNavigate(); 
    const [companyId,setId] = useState(-1);
    const [company,setCompany] = useState<Company>();
    let {id} = useParams();
    useEffect(() => {
        if (!checkAuth("ADMIN")) {
            if (systemStore.getState().auth.isLogged) {
                notify.error("only admin is able to access this page!");
                navigate("/");
            } else {
                notify.error("you must first authenticate to access this page!");
                navigate("/login");
            }
        } else {
            checkData();
            systemStore.dispatch(titleAction("Company Details"))
        }
        console.log(id);
        if (id !== undefined) {
            const saveId = parseInt(id);
            setId(saveId);
            console.log(companyId);
        }
    }, [companyId, navigate]);

    useEffect(() => {
        if (companyId !== -1) {
            const allCompanies = systemStore.getState().admin.allCompanies;
            const existingCompany = allCompanies.find((item) => item.id === companyId);

            if (existingCompany) {
                setCompany(existingCompany);
            } else {
                axiosJWT.get(`http://localhost:8080/api/admin/get/one/company/${companyId}`)
                    .then((res) => {
                        setCompany(res.data);
                    })
                    .catch(() => {
                        console.error();
                        notify.error("problem occurred");
                        navigate("/");
                    });
            }
        }
    }, [companyId, navigate]);


    return (
        

        <div className="SingleCompanyDetails">
            <>
            
            <h2>{`Company Details:`}</h2>
            <Button variant="contained" color="warning" onClick={()=>navigate(`/admin/updateCompany/${company?.id}`)} >Update</Button>
			<Button variant="contained" color="error" onClick={()=>navigate(`/admin/deleteCompany/${company?.id}`)} >Delete</Button>
            
            <br />

             {company!=undefined&&<SingleCompany company={company} key={company.id}/>}
            <div><strong>Coupons: </strong>
                <br />
                {company!=undefined&&company.coupons.length!=0?
                company.coupons.map(item=><MySingleCoupon coupon={item} key={item.id}/>):
                "No coupons owned..."}
            </div>
             
             <br />

			
            
            </>
        </div>
    );
}
