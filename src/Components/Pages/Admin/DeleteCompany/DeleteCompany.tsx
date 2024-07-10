import "./DeleteCompany.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Company } from "../../../Models/Company";
import { checkAuth } from "../../../Utils/checkAuth";
import { systemStore } from "../../../Redux/store";
import axiosJWT from "../../../Utils/axiosJWT";
import { Button } from "@mui/material";
import notify from "../../../Utils/notify";
import { SingleCompany } from "../SingleCompany/SingleCompany";
import { deleteCompanyAction } from "../../../Redux/adminReducer";
import { titleAction } from "../../../Redux/titleReducer";
import { checkData } from "../../../Utils/checkData";

export function DeleteCompany(): JSX.Element {
    const navigate = useNavigate(); 
    const [companyId,setId] = useState(-1);
    const [company,setCompany] = useState<Company>();
    let {id} = useParams();
    useEffect(()=>{
        if(!checkAuth("ADMIN")){
            if(systemStore.getState().auth.isLogged){
                notify.error("only admin is able to access this page!");
                navigate("/");
            }else{
            notify.error("you must first authenticate to access this page!");
            navigate("/login");
            }
            
        }else {
            checkData();
            systemStore.dispatch(titleAction("Delete Company"))
    }
        id!=undefined&&setId(parseInt(id));
    },[id,navigate])
    useEffect(()=>{
        console.log(companyId)
        if(systemStore.getState().admin.allCompanies.at(companyId)!=undefined){
            setCompany(systemStore.getState().admin.allCompanies.find((item)=>item.id==companyId))
        }
        console.log(company)
    },[companyId,navigate])
    
   const DeleteCompany=()=>{
        axiosJWT.delete(`http://localhost:8080/api/admin/delete/company/${companyId}`).then((res)=>{
                if(companyId!=undefined||res.data){
                    
                    systemStore.dispatch(deleteCompanyAction(companyId));
                    notify.success("Company successfully deleted!");
                    navigate("/getAllCompanies");
                }else{    throw new Error("problem occurred with deleting this Company"); }
                }
        )
        .catch( 
            ()=>{
                console.error();
                notify.error("problem occurred with deleting this Company")
                navigate("/");
            }
        )
    }
    return (
        <div className="DeleteCompany">
			  <>
            
            <h2>{`Are you sure you want to delete this company?`}</h2>
            
             <br />
            
			<Button variant="contained" color="error" onClick={()=>DeleteCompany()} >Delete</Button>
			<Button variant="contained"  onClick={()=>navigate("/")} >Cancel</Button>
            <br />
            {company!=undefined&&<SingleCompany company={company}></SingleCompany>}
            </>
        </div>
    );
}
