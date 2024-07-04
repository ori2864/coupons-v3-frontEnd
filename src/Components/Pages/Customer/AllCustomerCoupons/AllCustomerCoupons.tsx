import "./AllCustomerCoupons.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, MenuItem, Select, TextField } from "@mui/material";
import { Coupon } from "../../../Models/Coupon";
import axiosJWT from "../../../Utils/axiosJWT";
import { checkData } from "../../../Utils/checkData";
import { systemStore } from "../../../Redux/store";
import { noneAction } from "../../../Redux/titleReducer";
import { MySingleCoupon } from "../../MySingleCoupon/MySingleCoupon";
import { RadarOutlined } from "@mui/icons-material";
import { Category } from "../../../Models/Category";
import { CustomerActionType, getCouponsByCatAction, getCouponsByPriceAction, getMyCouponsAction } from "../../../Redux/customerReducer";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

    export function AllCustomerCoupons(): JSX.Element {
        const [coupons,setCoupons]= useState<Coupon[]>([]);
        const [filterType, setFilterType] = useState<string>("");
        const navigate = useNavigate();
        interface formData{
            categoryForm?:Category
            priceForm?:number
        }
        systemStore.dispatch(noneAction("My Coupons"))
    checkData();
    useEffect(()=>{
        console.log(systemStore.getState().auth.token)
        if(systemStore.getState().customer.myCoupons.length===0){
        axiosJWT.get(`http://localhost:8080/api/customer/get/coupons/all`).then(res=>{
            
            // console.log(res.data)
            
            setCoupons(res.data);
            systemStore.dispatch(getMyCouponsAction(res.data))
            console.log("api request")
        })
        .catch(err => {
            console.error('Error fetching coupons:', err);
            navigate("/")
          });
        }else{
            console.log("redux: ",systemStore.getState().customer.myCoupons)
            setCoupons(systemStore.getState().customer.myCoupons)
        }
    },[])


    const { register, handleSubmit, formState: { errors } } = useForm<formData>();

   
    const onSubmit: SubmitHandler<formData> = (data) => {
        console.log(data)
        if (filterType === "price" && data.priceForm !== undefined) {
            systemStore.dispatch(getCouponsByPriceAction(data.priceForm));
            setCoupons(systemStore.getState().customer.couponsByPrice);
        } else if (filterType === "category" && data.categoryForm !== undefined) {
            console.log("inside category condition")
            systemStore.dispatch(getCouponsByCatAction(data.categoryForm));
            console.log(systemStore.getState().customer.couponsByCat);
            setCoupons(systemStore.getState().customer.couponsByCat);
            console.log(coupons)
        }
    };

    const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilterType(event.target.value as string);
    };



    return (
        <div className="allCustomerCoupons">
            <form onSubmit={handleSubmit(onSubmit)}>
            <select value={filterType} onChange={handleFilterChange} style={{ height:'10vh', width:'20%' , marginRight: '10px' }}>
                    <option value="" disabled>Select Filter Type</option>
                    <option value="category">Category</option>
                    <option value="price">Price</option>
                </select>

                {filterType === "category" && (
                    <Select {...register("categoryForm")} style={{height:'10vh', width: '20%', marginRight: '10px' }}>
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
                {coupons!=null&&coupons.map(coupon => <MySingleCoupon key={coupon.id}  coupon={coupon} />)}
                </>
        </div>
    );
}

