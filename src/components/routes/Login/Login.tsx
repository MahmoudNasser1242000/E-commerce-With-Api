import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormHelperText,
    Link,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validation";
import axiosInstance from "../../../Config/axiosInstance";
import { IError } from "../../../types";
import { AxiosError } from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { RootState } from "../../app/Store";
import { useSelector } from "react-redux";

interface Inputs {
    identifier: string;
    password: string;
}
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { internetMode } = useSelector((state: RootState) => state.internet);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver<Inputs>(loginSchema),
    });
    // console.log(errors);

    const toast = useToast();
    const navigate = useNavigate();
    const cookies = new Cookies();
    let onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        try {
            const login = await axiosInstance.post(
                "auth/local",
                data
            );
            if (login.status === 200) {
                toast({
                    title: "You Are Logged In Now.",
                    description: "Welcome To Enjoy All Of Our Cool Features",
                    status: "success",
                    duration: 3000,
                    isClosable: false,
                    position: "top",
                });

                const date = new Date();
                date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 7 * 4 * 13);
                
                setTimeout(() => {
                    cookies.set("jwt", login?.data?.jwt, { path: "/", expires: date });
                    navigate("/");
                }, 3500);
            }
        } catch (error) {
            const err = error as AxiosError<IError>;
            // console.log(err);
            toast({
                title: "Sorry, Can't Log In Now.",
                description: err.response?.data?.error?.message || err.message,
                status: "error",
                duration: 3000,
                isClosable: false,
                position: "top",
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} minW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Log In
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                {...register("identifier")}
                                required={false}
                                isInvalid={errors.identifier ? true : false}
                                errorBorderColor="crimson"
                            />
                            <FormHelperText>
                                {errors.identifier ? errors.identifier.message : ""}
                            </FormHelperText>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    required={false}
                                    isInvalid={errors.password ? true : false}
                                    errorBorderColor="crimson"
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"none"}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }
                                    >
                                        <Text>
                                            {showPassword ? (
                                                <FiEye size={"15px"} />
                                            ) : (
                                                <FiEyeOff size={"15px"} />
                                            )}
                                        </Text>
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormHelperText>
                                {errors.password ? errors.password.message : ""}
                            </FormHelperText>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                w={"full"}
                                isLoading={isLoading || internetMode}
                                loadingText="Loading..."
                                size="lg"
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                type="submit"
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Don't Have An Acount?{" "}
                                <Link as={RouterLink} color={"blue.400"} to={"/register"}>
                                    Sign Up
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
