import {
    Box,
    Heading,
    Text,
    Img,
    Flex,
    Center,
    useColorModeValue,
    Card,
    CardBody,
    Skeleton,
    Stack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
} from "@chakra-ui/react";
import { BsArrowUpRight } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../Config/axiosInstance";
import { useEffect, useState } from "react";
import { IProduct } from "../../../types";
import Cookies from "universal-cookie";
import { RootState, useAppDispatch } from "../../app/Store";
import { addToCart } from "../../app/Cart/CartSlice";
import { useSelector } from "react-redux";

interface Iprops { }

function ProductDetails({ }: Iprops) {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [details, setDetails] = useState<IProduct | null>(null);
    const {internetMode} = useSelector((state: RootState) =>  state.internet );
    
    const colorMode = useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan");
    if (!colorMode) {
        return;
    }

    const cookies = new Cookies();
    const getProductDetails = async () => {
        try {
            setIsLoading(true);
            const product = await axiosInstance.get(
                `products/${id}?populate=thumbnail,category`,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.get("jwt")}`,
                    },
                }
            );
            setDetails(product?.data?.data);
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        getProductDetails();
    }, []);
    return (
        <>
            <Center py={6}>
                {isLoading || internetMode? (
                    <Card
                        width={{ base: "100%", lg: "23%", md: "30.3333%", sm: "40%" }}
                        mt={"20px"}
                    >
                        <CardBody>
                            <Skeleton height="200px" borderRadius={"md"} />
                            <Stack mt="6" spacing="3">
                                <Heading size="md"></Heading>
                                <Box>
                                    <Skeleton height="20px" />
                                </Box>
                                <Box color="blue.600" fontSize="2xl">
                                    <Skeleton height="60px" />
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                ) : error ? (
                    <Alert
                        status="error"
                        variant="subtle"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        height="200px"
                        width={"80%"}
                        borderRadius={"md"}
                    >
                        <AlertIcon boxSize="40px" mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize="lg">
                            Application submitted!
                        </AlertTitle>
                        <AlertDescription maxWidth="sm">
                            Thanks for submitting your application. Our team will get back to
                            you soon.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Box
                        w="xs"
                        rounded={"sm"}
                        my={5}
                        mx={[0, 5]}
                        overflow={"hidden"}
                        bg="white"
                        border={"1px"}
                        borderColor="black"
                        boxShadow={colorMode}
                    >
                        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
                            <Img
                                src={`${import.meta.env.VITE_LOCAL_HOST}${details?.attributes.thumbnail.data.attributes.formats
                                        .thumbnail.url
                                    }`}
                                roundedTop={"sm"}
                                objectFit="fill"
                                h="full"
                                w="full"
                                alt={details?.attributes.title}
                            />
                        </Box>
                        <Box p={4}>
                            <Box
                                bg="black"
                                display={"inline-block"}
                                px={2}
                                py={1}
                                color="white"
                                mb={3}
                            >
                                <Text fontSize={"xs"} fontWeight="medium">
                                    {details?.attributes.category.data.attributes.title} Category
                                </Text>
                            </Box>
                            <Heading color={"black"} fontSize={"2xl"} noOfLines={1} mb={3}>
                                {details?.attributes.title}
                            </Heading>
                            <Text color={"gray.500"} noOfLines={2}>
                                {details?.attributes.description}
                            </Text>
                        </Box>
                        <Flex borderTop={"1px"} color="black" padding={"0"}>
                            <Button
                                p={5}
                                alignItems="center"
                                justifyContent={"space-between"}
                                roundedBottom={"sm"}
                                cursor={"pointer"}
                                w="full"
                                h="full"
                                m={0}
                                bg={"white"}
                                onClick={() => {
                                    dispatch(addToCart(details));
                                }}
                            >
                                <Text fontSize={"md"} fontWeight={"semibold"}>
                                    Add To Card
                                </Text>
                                <BsArrowUpRight />
                            </Button>
                            <Center>
                                <Box
                                    px={4}
                                    borderLeft={"1px solid black"}
                                    h={"full"}
                                    lineHeight={"60px"}
                                    _hover={{ bg: "#F5F5F5" }}
                                >
                                    <Text fontSize="xl">${details?.attributes.price}</Text>
                                </Box>
                            </Center>
                        </Flex>
                    </Box>
                )}
            </Center>
        </>
    );
}

export default ProductDetails;
