import "./AllCompanyCoupons.css";
import { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../Models/Category";
import { systemStore } from "../../../Redux/store";
import { checkData } from "../../../Utils/checkData";
import { checkAuth } from "../../../Utils/checkAuth";
import notify from "../../../Utils/notify";
import axiosJWT from "../../../Utils/axiosJWT";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { MySingleCoupon } from "../../MySingleCoupon/MySingleCoupon";
import { titleAction } from "../../../Redux/titleReducer";
import { getCompanyCouponsByCatAction, getCompanyCouponsByPriceAction, getMyCompanyCouponsAction } from "../../../Redux/companyReducer";
import { MySingleCompanyCoupon } from "../MySingleCompanyCoupon/MySingleCompanyCoupon";

export function AllCompanyCoupons(): JSX.Element {
    const [coupons,setCoupons]= useState<Coupon[]>([]);
    const [filterType, setFilterType] = useState<string>("");
    const navigate = useNavigate();
    interface formData{
        categoryForm?:Category
        priceForm?:number
    }
    systemStore.dispatch(titleAction("My Coupons"))
// checkData();
useEffect(()=>{
    if(!checkAuth("COMPANY")){
        if(systemStore.getState().auth.isLogged){
            notify.error("only companies are able to access this page!")
            navigate("/")
        }else{
        notify.error("you must first authenticate to access this page!")
        navigate("/login")
        }
    }else{
        checkData();
    }
    // console.log(systemStore.getState().auth.token)
        console.log(systemStore.getState().company.myCompanyCoupons.length===0)
        if(systemStore.getState().company.myCompanyCoupons.length===0){
    axiosJWT.get(`http://localhost:8080/api/company/get/coupon/all`).then(res=>{
        
        console.log(res.data);
        setCoupons(res.data);
        systemStore.dispatch(getMyCompanyCouponsAction(res.data));
        // console.log("api request", res.data);
    })
    .catch(err => {
        console.error('Error fetching coupons:', err);
        navigate("/")
      });
    }else{
        // console.log("redux company coupons: ",systemStore.getState().company.myCompanyCoupons);
        setCoupons(systemStore.getState().company.myCompanyCoupons);
    }
},[])


const { register, handleSubmit, formState: { errors } } = useForm<formData>();


const onSubmit: SubmitHandler<formData> = (data) => {
    console.log(data)
    if (filterType === "price" && data.priceForm !== undefined) {
        systemStore.dispatch(getCompanyCouponsByPriceAction(data.priceForm));
        setCoupons(systemStore.getState().company.companyCouponsByPrice);
    } else if (filterType === "category" && data.categoryForm !== undefined) {
        console.log("inside category condition")
        systemStore.dispatch(getCompanyCouponsByCatAction(data.categoryForm));
        console.log(systemStore.getState().company.companyCouponsByCat);
        setCoupons(systemStore.getState().company.companyCouponsByCat);
        console.log(coupons)
    }
};

const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterType(event.target.value as string);
};



    return (
        <div className="AllCompanyCoupons">
			  <form onSubmit={handleSubmit(onSubmit)}>
            <select value={filterType} onChange={handleFilterChange} style={{ height:'10vh', width:'20%' , marginRight: '10px' }}>
                    <option value="" disabled>Select Filter Type</option>
                    <option value="category">Category</option>
                    <option value="price">Price</option>
                </select>

                {filterType === "category" && (
                    <Select {...register("categoryForm")} defaultValue="" style={{height:'10vh', width: '20%', marginRight: '10px' }}>
                        <MenuItem value="Electricity">Electricity</MenuItem>
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Restaurant">Restaurant</MenuItem>
                        <MenuItem value="Vacation">Vacation</MenuItem>
                    </Select>
                )}

                {filterType === "price" && (
                    <TextField {...register("priceForm")} style={{ marginRight: '2vh' }} type="number" label="Max Price" />
                )}

                <Button variant="contained" type="submit">
                    Filter
                </Button>
            </form>
            <hr />
                <>
                {coupons!=null&&coupons.map(coupon => <MySingleCompanyCoupon key={coupon.id}  coupon={coupon} />)}
                </>
        </div>
    );
}
