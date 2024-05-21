import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectAuth = ({children}: {children: ReactNode}) => {
    const cookies = new Cookies();
    if (cookies.get("jwt")) {
        return <Navigate to={"/"}/>
    } else {
        return children
    };
};

export default ProtectAuth;
