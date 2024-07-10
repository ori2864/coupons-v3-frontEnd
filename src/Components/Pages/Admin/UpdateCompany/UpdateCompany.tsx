import "./UpdateCompany.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Company } from "../../../Models/Company";
import { checkAuth } from "../../../Utils/checkAuth";
import { systemStore } from "../../../Redux/store";
import axiosJWT from "../../../Utils/axiosJWT";
import { Button, ButtonGroup, InputLabel, TextField, Typography } from "@mui/material";
import notify from "../../../Utils/notify";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateCompanyAction } from "../../../Redux/adminReducer";
import { Coupon } from "../../../Models/Coupon";
import { titleAction } from "../../../Redux/titleReducer";
import { checkData } from "../../../Utils/checkData";

export function UpdateCompany(): JSX.Element {
    const navigate = useNavigate(); 
    const [companyId,setId] = useState(-1);
    const [isExist,setExist] = useState(false);
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
            systemStore.dispatch(titleAction("Update Company"))
    }
        // id!=undefined&&setId(parseInt(id));
    },[navigate])
    useEffect(() => {
        if (id !== undefined) {
            setId(parseInt(id));
        }
    }, [id]);
    useEffect(()=>{
        console.log(companyId);
        if(systemStore.getState().admin.allCompanies!=undefined){
            const myIndex = systemStore.getState().admin.allCompanies.findIndex(item=>
                item.id==companyId
            );
            console.log(company?.id);
            console.log(myIndex);
            setCompany(systemStore.getState().admin.allCompanies.at(myIndex));
            if(company){
                setExist(true);
            }
            console.log(company);
        }else{
            console.error();
        }
    },[company])

    const { register, handleSubmit, formState: { errors } } = useForm<Company>();

    const makeCompany: SubmitHandler<Company> = (data) => {
        if(company){
            console.log(data);
        console.log(company);
            data.id = companyId;
            data.name = company?.name;
            data.coupons=[];
            
        console.log(data)
        axiosJWT.put("http://localhost:8080/api/admin/update/company",data).then(res=>{
                systemStore.dispatch(updateCompanyAction(data));
                notify.success("Company updated successfully");
                navigate("/admin/getAllCompanies");
            
            
        })
        .catch(err => {
                notify.error("problem occurred with update Company");
                console.error('Error updating Company:', err);
            navigate("/")
          });
        }else{
            console.error("no company");
        }
    }

    return (
        <div className="UpdateCompany">
			  <div className="Box" style={{ width: "50%", }}>
			<Typography variant="h4" style={{textAlign:"center"}} className="HeadLine">Update Company</Typography>
                <hr /><br/>
                <form onSubmit={handleSubmit(makeCompany)}>
                    <h2>{company&&`Name: ${company?.name}`}</h2>
                    <TextField required type="text" label="Email" fullWidth 
                    {...register("email",{required:true, maxLength:25})} />
                    {errors.email?.type === "required" && <><br /><span style={{ color: "red" }}>Email is required</span></>}
                    {errors.email?.type == "maxLength" && <><br/><span style={{ color: "red" }}>Email is too long. Max length: 25</span></>}
                    <br /><br />
                    <TextField required type="text"  label="Password" fullWidth 
                    {...register("password", {required:true,maxLength: 8})} />
                    {errors.password?.type == "required" && <><br/><span style={{ color: "red" }}>New Password is required</span></>}
                    {errors.password?.type == "maxLength" && <><br/><span style={{ color: "red" }}>Password is too long. Max length: 8</span></>}
                    <br /><br />
                    
                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" color="success"  >Update Company</Button>
                        <Button color="error"  onClick={() => { navigate("/") }}>Cancel</Button>
                    </ButtonGroup>
                </form>
                </div>
        </div>
    );
}
