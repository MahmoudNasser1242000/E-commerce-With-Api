import * as yup from "yup";
import { IProduct } from "../types";
import { createStandaloneToast } from "@chakra-ui/react";

// register
export const registerSchema = yup
    .object({
        username: yup
            .string()
            .min(3, "name must be at least 3 characters")
            .max(15, "name must be maximum 15 characters")
            .required("name required"),
        email: yup.string().email("enter valid email").required("email required"),
        password: yup
            .string()
            .matches(
                /^(?=.*\d{3,})(?=.*[a-zA-Z]{2,})(?=.*[\W_]+).{6,12}$/,
                "password must has at least 4 numbers, 1 charcater and 1 special charcater"
            )
            .required("password is required"),
    })
    .required();

// login
export const loginSchema = yup
    .object({
        identifier: yup
            .string()
            .email("enter valid email")
            .required("email required"),
        password: yup
            .string()
            .matches(
                /^(?=.*\d{3,})(?=.*[a-zA-Z]{2,})(?=.*[\w_]+).{6,12}$/,
                "password must has at least 4 numbers, 1 charcater and 1 special charcater"
            )
            .required("password is required"),
    })
    .required();

//cart shop
const {toast} = createStandaloneToast()
export const handleProductQuantity = (
    cartList: IProduct[],
    product: IProduct
) => {
    const cartProduct = cartList.find((prod) => prod.id === product.id);

    if (cartProduct) {
        toast({
            title: "Add Another One Of This Product.",
            description: "This Product Is Allready Exist",
            status: "info",
            duration: 3000,
            isClosable: false,
            position: "top",
        });
        cartProduct.quantity = cartProduct.quantity + 1
        return cartList
    } else {
        toast({
            title: "Product Added Successfully.",
            description: "check Yor Cart To Show Your Product",
            status: "success",
            duration: 3000,
            isClosable: false,
            position: "top",
        });
        return [...cartList, { ...product, quantity: 1 }];
    }
};
