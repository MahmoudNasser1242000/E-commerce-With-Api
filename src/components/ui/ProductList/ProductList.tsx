import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Card,
    CardBody,
    Container,
    Flex,
    Heading,
    Skeleton,
    Stack,
    Text,
} from "@chakra-ui/react";
import Product from "../Product/Product";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../Config/axiosInstance";
import { IProduct } from "../../../types";

interface Iprops { }

function ProductList({ }: Iprops) {
    const { isLoading, error, data } = useQuery({
        queryKey: ["getProducts"],
        queryFn: async () => {
            const products = await axiosInstance.get(
                "products?populate=thumbnail,category",
                {
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2MDUyOTQ1LCJleHAiOjE3MTg2NDQ5NDV9.9ACnV6WNK0NWqqdnFt2QtLaCGf0TkAnHZZA6rH9hNc8",
                    },
                }
            );
            return products;
        },
    });

    console.log(error);

    return (
        <Container maxWidth={"none"} mt={"30px"}>
            <Flex
                // templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
                justifyContent={"center"}
                alignItems={"center"}
                flexWrap={"wrap"}
                gap={"6"}
                width={"100%"}
            >
                {
                    isLoading ? (
                        Array.from({ length: 3 }, (_, index) => (
                            <Card key={index} width={{ base: "100%", lg: "23%", md: "30.3333%", sm: "40%" }}>
                                <CardBody>
                                    <Skeleton height="120px" borderRadius={"md"} />
                                    <Stack mt="6" spacing="3">
                                        <Heading size="md"></Heading>
                                        <Box>
                                            <Skeleton height="20px" />
                                        </Box>
                                        <Box color="blue.600" fontSize="2xl">
                                            <Skeleton height="40px" />
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                        ))
                    ) : (
                        error ? (
                            <Alert
                                status='error'
                                variant='subtle'
                                flexDirection='column'
                                alignItems='center'
                                justifyContent='center'
                                textAlign='center'
                                height='200px'
                                width={"80%"}
                                borderRadius={"md"}
                            >
                                <AlertIcon boxSize='40px' mr={0} />
                                <AlertTitle mt={4} mb={1} fontSize='lg'>
                                    Application submitted!
                                </AlertTitle>
                                <AlertDescription maxWidth='sm'>
                                    Thanks for submitting your application. Our team will get back to you soon.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            data?.data?.data.length ? (
                                data?.data?.data.map((prod: IProduct) => (
                                    <Product key={prod.id} {...prod} />
                                ))
                            ) : (
                                <Text width={"fit-content"} color="black" fontSize={"5xl"}>
                                    There Are No Products Right Now!
                                </Text>
                            )
                        )
                    )
                }
            </Flex>
        </Container>
    );
}

export default ProductList;
