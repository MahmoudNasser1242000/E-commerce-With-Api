import { Outlet } from "react-router-dom";
import NavBar from "../../ui/NavBar/NavBar";
// import Footer from "../../ui/Footer/Footer";

const Layout = () => {
    return (
        <>
            <NavBar/>
            <Outlet/>
            {/* <Footer/> */}
        </>
    );
};

export default Layout;
