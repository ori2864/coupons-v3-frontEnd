import { useEffect, useState } from "react";
import "./AllCompanies.css";
import { systemStore } from "../../../Redux/store";
import { titleAction } from "../../../Redux/titleReducer";
import axiosJWT from "../../../Utils/axiosJWT";
import { SingleCompany } from "../SingleCompany/SingleCompany";
import { Company } from "../../../Models/Company";
import { setAllCompaniesAction } from "../../../Redux/adminReducer";
import { Button, TextField } from "@mui/material";
import { Mouse } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { checkData } from "../../../Utils/checkData";
import notify from "../../../Utils/notify";
import { checkAuth } from "../../../Utils/checkAuth";

export function AllCompanies(): JSX.Element {
    const [companies,setCompanies]= useState<Company[]>([]);
    const [findId,setId]= useState<number>();
    const navigate = useNavigate();
    useEffect(()=>{
        if (!checkAuth("ADMIN")) {
            if (systemStore.getState().auth.isLogged) {
                notify.error("Only admins are able to access this page!")
                navigate("/")
            } else {
                notify.error("You must first authenticate to access this page!")
                navigate("/login")
            }
        } else {
            checkData();
            systemStore.dispatch(titleAction("All Companies"))
    }
        if(systemStore.getState().admin.allCompanies.length===0){
            console.log("api request");
        
            axiosJWT.get(`http://localhost:8080/api/admin/get/all/companies`).then(res=>{
            
            console.log("api request: ",res.data);
            setCompanies(res.data);
            systemStore.dispatch(setAllCompaniesAction(res.data));
            // systemStore.dispatch(setMyCompanycompaniesAction(res.data));
        console.log("companies: ",companies)
        })     
    }
    else{
        console.log("redux: ",systemStore.getState().admin.allCompanies);
        setCompanies(systemStore.getState().admin.allCompanies);
        // systemStore.dispatch(setAllCompaniesAction(systemStore.getState().admin.allCompanies));
        // systemStore.dispatch(setMyCompanyCompaniesAction(systemStore.getState().admin.allCompanies));
    console.log("companies: ",companies)
}
    },[])
    return (
        <div className="AllCompanies">
            <TextField  onChange={(item)=>setId(parseInt(item.target.value))} type="number" style={{marginRight:'2vh'}} label="Select Company Id..."></TextField>
            
            <Button onClick={()=>{
                console.log(findId)
                setCompanies(systemStore.getState().admin.allCompanies
                .filter(item=>item.id===findId))}}
                 variant="contained" style={{marginRight:'2vh',height:'10vh'}}>Find Company</Button>
            <hr />
            {companies!=null&&companies.map(company =>
                 <span className="MyBox" onClick={()=>{
                console.log(company.id)
                navigate(`/admin/getCompanyDetails/${company.id}`)}}>
                    <SingleCompany  key={company.id}  company={company} />
                    </span>)}
        </div>
    );
}
