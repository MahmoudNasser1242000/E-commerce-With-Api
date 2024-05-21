import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectAcount = ({children}: {children: ReactNode}) => {
    const cookies = new Cookies();
    if (cookies.get("jwt")) {
        return children
    } else {
        return <Navigate to={"/login"}/>
    }
};

export default ProtectAcount;
