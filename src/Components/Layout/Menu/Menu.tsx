import { NavLink } from "react-router-dom";
import "./Menu.css";
import { Main } from "../Main/Main";
import { systemStore } from "../../Redux/store";
import { useEffect, useState } from "react";
import { checkData } from "../../Utils/checkData";

export function Menu(): JSX.Element {
    // console.log(systemStore.getState().auth.userType==="CUSTOMER")
    const [userType,setType]=useState("");
    systemStore.subscribe(()=>{
        setType(systemStore.getState().auth.userType);
    });
    
    

    const customerMenu = ()=>{
        // if(systemStore.getState().auth.userType==="CUSTOMER"){}
        return (
            
            <>
            <hr  />
                <NavLink to="/customer/allCoupons">My Coupons</NavLink> <br />
                {/* <NavLink to="/customer/byPrice">Coupons By Price</NavLink><br/>
                <NavLink to="/customer/byCat">Coupons By Category</NavLink><br/> */}
                <NavLink to="/customer/details">My Details</NavLink> <br/>
            </>
        )
    
    }
        const companyMenu = ()=>{
            return (
                
                <>
                <hr />
                    <NavLink to="/company/allCoupons">My Coupons</NavLink> <br/>
                    <NavLink to="/company/details">My Details</NavLink> <br/>
                    <NavLink to="/company/coupon/add">Add New Coupon</NavLink> <br/>
                    <NavLink to="/company/coupon/update">Update Coupon</NavLink> <br/>
                    <NavLink to="/company/coupon/delete">Delete Coupon</NavLink> <br/>
                    
                    
                </>
            )
        }
            const adminMenu = ()=>{
                return (
                    
                    <>
                    <br /><br />
                    hey mr. admin
                    <hr />

                        <NavLink to="/admin/getAllCompanies">All Companies</NavLink><br />
                        <NavLink to="/admin/getAllCustomers">All Customers</NavLink><br />
                        <NavLink to="/admin/addCompany">Add Company</NavLink><br />
                        <NavLink to="/admin/addCustomer">Add Customer</NavLink><br />
                        {/* <NavLink to="/admin/getAllCustomers">All Customers</NavLink><br /> */}
                        
                    </>
                )
            }
            
    
    return (
        <div className="Menu">
			    <NavLink to={"/"}>Coupon Menu</NavLink> 
                {systemStore.getState().auth.userType==="CUSTOMER"&&customerMenu()} 
                {systemStore.getState().auth.userType==="COMPANY"&&companyMenu()} 
                {systemStore.getState().auth.userType==="ADMIN"&&adminMenu()} 

			    
                
        </div>
    );
}
