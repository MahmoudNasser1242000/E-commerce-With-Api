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
import { registerSchema } from "../../../validation";
import axiosInstance from "../../../Config/axiosInstance";
import { IError } from "../../../types";
import { AxiosError } from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    interface Inputs {
        username: string;
        email: string;
        password: string;
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver<Inputs>(registerSchema),
    });
    // console.log(errors);

    const toast = useToast();
    const navigate = useNavigate();
    let onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        try {
            const register = await axiosInstance.post("auth/local/register", data);
            if (register.status === 200) {
                toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: false,
                    position: "top",
                });

                setTimeout(() => {
                    navigate("/login");
                }, 3500);
            }
        } catch (error) {
            const err = error as AxiosError<IError>;
            // console.log(err);
            toast({
                title: "Account Can Not created.",
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
            <Stack spacing={8} mx={"auto"} minW={"lg"} py={12} px={6} mt={12}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
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
                        <FormControl id="username" isRequired>
                            <FormLabel>User Name</FormLabel>
                            <Input
                                type="text"
                                {...register("username")}
                                required={false}
                                isInvalid={errors.username ? true : false}
                                errorBorderColor="crimson"
                            />
                            <FormHelperText>
                                {errors.username ? errors.username.message : ""}
                            </FormHelperText>
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                {...register("email")}
                                required={false}
                                isInvalid={errors.email ? true : false}
                                errorBorderColor="crimson"
                            />
                            <FormHelperText>
                                {errors.email ? errors.email.message : ""}
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
                                isLoading={isLoading}
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
                                Already a user?{" "}
                                <Link as={RouterLink} color={"blue.400"} to="/login">
                                    Login
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
