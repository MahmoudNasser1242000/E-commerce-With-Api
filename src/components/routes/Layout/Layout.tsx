import { Outlet } from "react-router-dom";
import NavBar from "../../ui/NavBar/NavBar";
import { useDisclosure } from "@chakra-ui/react";
import CartDrawer from "../../ui/Drawer/Drawer";
// import Footer from "../../ui/Footer/Footer";

const Layout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <NavBar onOpen={onOpen}/>
            <Outlet/>
            <CartDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
            {/* <Footer/> */}
        </>
    );
};

export default Layout;
