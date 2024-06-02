import ProductList from "../../ui/ProductList/ProductList"
import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useSelector } from 'react-redux'
import { jwtDecode } from "jwt-decode";
import { RootState } from "../../app/Store";
import axiosInstance from "../../../Config/axiosInstance";
interface Iprops {

}

function Home({ }: Iprops) {
    const cookies = new Cookies();
    const { profileId } = useSelector((state: RootState) => state.profileImage);
    // console.log(profileId);

    const getProfileImage = async () => {
        if (cookies.get("jwt")) {
            const decoded: { id: number } = jwtDecode(cookies.get("jwt"));
            if (profileId) {
                await axiosInstance.put(`users/${decoded.id}`, { profileImage: profileId })
            }
        }
    }
    useEffect(() => {
        getProfileImage()
    }, []);
    return (
        <>
            <ProductList />
        </>
    )
}

export default Home
