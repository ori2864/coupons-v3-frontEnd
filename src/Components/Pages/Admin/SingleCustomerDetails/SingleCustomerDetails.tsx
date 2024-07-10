import { useNavigate, useParams } from "react-router-dom";
import "./SingleCustomerDetails.css";
import { useEffect, useState } from "react";
import { checkAuth } from "../../../Utils/checkAuth";
import { systemStore } from "../../../Redux/store";
import notify from "../../../Utils/notify";
import axiosJWT from "../../../Utils/axiosJWT";
import { Button } from "@mui/material";
import { Customer } from "../../../Models/Customer";
import { SingleCustomer } from "../SingleCustomer/SingleCustomer";
import { MySingleCoupon } from "../../MySingleCoupon/MySingleCoupon";
import { checkData } from "../../../Utils/checkData";
import { titleAction } from "../../../Redux/titleReducer";

export function SingleCustomerDetails(): JSX.Element {
    const navigate = useNavigate();
    const [customerId, setId] = useState(-1);
    const [customer, setCustomer] = useState<Customer>();
    let { id } = useParams();

    useEffect(() => {
        if (!checkAuth("ADMIN")) {
            if (systemStore.getState().auth.isLogged) {
                notify.error("only admin is able to access this page!");
                navigate("/");
            } else {
                notify.error("you must first authenticate to access this page!");
                navigate("/login");
            }
        }else {
            checkData();
            systemStore.dispatch(titleAction("Customer Details"))
        }
        if (id !== undefined) {
            const saveId = parseInt(id);
            setId(saveId);
        }
    }, [id, navigate]);

    useEffect(() => {
        if (customerId !== -1) {
            const allCustomers = systemStore.getState().admin.allCustomers;
            const existingCustomer = allCustomers.find((item) => item.id === customerId);

            if (existingCustomer) {
                setCustomer(existingCustomer);
            } else {
                axiosJWT.get(`http://localhost:8080/api/admin/get/one/customer/${customerId}`)
                    .then((res) => {
                        setCustomer(res.data);
                    })
                    .catch(() => {
                        console.error();
                        notify.error("problem occurred");
                        navigate("/");
                    });
            }
        }
    }, [customerId, navigate]);

    return (
        <div className="SingleCustomerDetails">
            <> 
                <h2>{`Customer Details:`}</h2>
                <Button variant="contained" color="warning" onClick={() => navigate(`/admin/updateCustomer/${customer?.id}`)} >Update</Button>
                <Button variant="contained" color="error" onClick={() => navigate(`/admin/deleteCustomer/${customer?.id}`)} >Delete</Button>
                <br />
                {customer != undefined && <SingleCustomer customer={customer} key={customer.id} />}
                <div>
                    <strong>Coupons: </strong>
                    <br />
                    {customer?.coupons!=undefined&&customer.coupons.length!=0?
                        customer.coupons.map(item => <MySingleCoupon coupon={item} key={item.id} />) :
                        "No coupons owned..."}
                </div>
                <br />
            </>
        </div>
    );
}
