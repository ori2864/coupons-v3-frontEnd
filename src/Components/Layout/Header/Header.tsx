import { ButtonGroup, Button } from "@mui/material";
import "./Header.css";
import { systemStore } from "../../Redux/store";
import { useLocation, useNavigate } from "react-router-dom";

import { logoutAction } from "../../Redux/authReducer";
import { useEffect, useState } from "react";
import { checkData } from "../../Utils/checkData";
import { alignProperty } from "@mui/material/styles/cssUtils";
import axios from "axios";
import notify from "../../Utils/notify";

export function Header(): JSX.Element {
    const [isLogged, setLogged] = useState(false);
    const [userName, setName] = useState("");
    const [pageTitle, setTitle] = useState("");
    const [userTypeStr,setType] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(checkData);
    console.log("user logged: "+isLogged)

    systemStore.subscribe(() => {
        setName(systemStore.getState().auth.name);
        setLogged(systemStore.getState().auth.isLogged);
        setTitle(systemStore.getState().title.title);
        setType(systemStore.getState().auth.userType.toString())
    })
// console.log(userTypeStr)
    return (
        <div className="Header">
                <h1>Coupon shopping system</h1> <hr /> 
                <div className="headerRow">
                    <h2 className="centerSpan">{systemStore.getState().title.title}</h2>
                    <ButtonGroup className="SideButton" variant="contained">
                        <Button type="submit" color={isLogged ? "error" : "primary"}
                            onClick={() => {
                                if (isLogged) {
                                    sessionStorage.removeItem("jwt");
                                    sessionStorage.removeItem("workId");
                                    localStorage.removeItem("jwt");
                                    systemStore.dispatch(logoutAction());
                                    notify.success("logged out")    
                                        navigate("/login")
                                   
                                } else {
                                    navigate("/login");
                                }
                            }}>{isLogged ? "Logout" : "Login"}</Button>
                        {!isLogged && <Button color="success" onClick={() => { navigate("/register") }}>register</Button>}
                    </ButtonGroup>
                </div>
        </div>
    );
}
