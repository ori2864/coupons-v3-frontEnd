import "./DeleteCustomer.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Customer } from "../../../Models/Customer";
import { checkAuth } from "../../../Utils/checkAuth";
import { systemStore } from "../../../Redux/store";
import axiosJWT from "../../../Utils/axiosJWT";
import { Button } from "@mui/material";
import notify from "../../../Utils/notify";
import { SingleCustomer } from "../SingleCustomer/SingleCustomer";
import { deleteCustomerAction } from "../../../Redux/adminReducer";
import { titleAction } from "../../../Redux/titleReducer";
import { checkData } from "../../../Utils/checkData";

export function DeleteCustomer(): JSX.Element {
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
        }  else {
            checkData();
            systemStore.dispatch(titleAction("Delete Customer"))
    }
        if (id !== undefined) {
            setId(parseInt(id));
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

    const deleteCustomer = () => {
        axiosJWT.delete(`http://localhost:8080/api/admin/delete/customer/${customerId}`).then((res) => {
            if (customerId !== undefined || res.data) {
                systemStore.dispatch(deleteCustomerAction(customerId));
                notify.success("Customer successfully deleted!");
                navigate("/admin/getAllCustomers");
            } else {
                throw new Error("problem occurred with deleting this Customer");
            }
        }).catch(() => {
            console.error();
            notify.error("problem occurred with deleting this Customer");
            navigate("/");
        });
    }

    return (
        <div className="DeleteCustomer">
            <>
                <h2>{`Are you sure you want to delete this customer?`}</h2>
                <br />
                <Button variant="contained" color="error" onClick={deleteCustomer}>Delete</Button>
                <Button variant="contained" onClick={() => navigate("/")}>Cancel</Button>
                <br />
                {customer !== undefined && <SingleCustomer customer={customer} />}
            </>
        </div>
    );
}
