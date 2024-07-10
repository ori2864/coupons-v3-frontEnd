import { useEffect, useState } from "react";
import "./AllCustomers.css";
import { systemStore } from "../../../Redux/store";
import { titleAction } from "../../../Redux/titleReducer";
import axiosJWT from "../../../Utils/axiosJWT";
import { SingleCustomer } from "../SingleCustomer/SingleCustomer";
import { Customer } from "../../../Models/Customer";
import { setAllCustomersAction } from "../../../Redux/adminReducer";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { checkData } from "../../../Utils/checkData";
import notify from "../../../Utils/notify";
import { checkAuth } from "../../../Utils/checkAuth";

export function AllCustomers(): JSX.Element {
    const [findId,setId]= useState<number>();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const navigate = useNavigate();
    // checkData();
    // console.log(systemStore.getState().auth.token)
    useEffect(() => {
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
            systemStore.dispatch(titleAction("All Customers"))
    }
        if (systemStore.getState().admin.allCustomers.length === 0) {
            console.log("api request");
            axiosJWT.get(`http://localhost:8080/api/admin/get/all/customers`).then(res => {
                
                console.log("api request: ", res.data);
                setCustomers(res.data);
                systemStore.dispatch(setAllCustomersAction(res.data));
                // systemStore.dispatch(setMyCompanycustomersAction(res.data));
            })
                
        } else {
            console.log("redux: ", systemStore.getState().admin.allCustomers);
            setCustomers(systemStore.getState().admin.allCustomers);
            systemStore.dispatch(setAllCustomersAction(systemStore.getState().admin.allCustomers));
            // systemStore.dispatch(setMyCompanyCustomersAction(systemStore.getState().admin.allCustomers));
        }
        console.log("customers: ", customers)
    }, [])
    return (
        <div className="AllCustomers">
            <TextField  onChange={(item)=>setId(parseInt(item.target.value))} type="number" style={{marginRight:'2vh'}} label="Select Customer Id..."></TextField>
            <Button onClick={()=>{
                console.log(findId)
                setCustomers(systemStore.getState().admin.allCustomers
                .filter(item=>item.id===findId))}}
                 variant="contained" style={{marginRight:'2vh',height:'10vh'}}>Find Company</Button>
            <hr />
            {customers != null && customers.map(customer => 
            <span className="MyBox" onClick={()=>{
                console.log(customer.id)
                navigate(`/admin/getCustomerDetails/${customer.id}`)}}>
                    <SingleCustomer key={customer.id} customer={customer} />
                    </span>)}
        </div>
    );
}