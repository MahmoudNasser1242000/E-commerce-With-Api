import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Flex,
    Image,
    Skeleton,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import {
    useDeleteDahboardProductsMutation,
    useGetDahboardProductsQuery,
    useUpdateDahboardProductsMutation,
} from "../../app/Products/ProductSlice";
import { IProduct } from "../../../types";
import OpenModal from "../../ui/Modal/Modal";
import UpdateBody from "../../ui/Modal/UpdateBody";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useState } from "react";

function DashboardProducts() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [action, setAction] = useState<string>("Delete");
    const [thumbnail, setThumbnail] = useState<File | any>(null);
    const [productIndex, setProductIndex] = useState<number>(0);
    const [productUpdate, setProductUpdate] = useState({});

    const changeProductInputs = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value, name } = e.target;
        setProductUpdate((prev: IProduct) => {
            return {
                ...prev,
                [name]: name === "price" ? +value : value,
            };
        });
    };

    const changeProductThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        setThumbnail(files? files[0]: null)
    };

    const { isLoading, error, data } = useGetDahboardProductsQuery(1);
    const [deleteProduct, { isLoading: deleteLoading, isError: deleteError }] =
        useDeleteDahboardProductsMutation();
    const [updateProduct, { isLoading: updateLoading, isError: updateError }] =
        useUpdateDahboardProductsMutation();

    // console.log(error);
    // console.log(data?.data[0].attributes);

    const getActionAndIndex = (
        action: "Delete" | "Update" | "Watch",
        id: number
    ) => {
        setAction(action);
        setProductIndex(id);
        onOpen();
    };

    if (isLoading) {
        return Array.from({ length: 8 }, (_, index) => (
            <Flex
                key={index}
                my={2}
                justifyContent={"space-between"}
                alignItems={"center"}
                rounded={"sm"}
                border={"1px solid"}
                borderColor={"#99999985"}
                px={2}
                py={3}
            >
                <Skeleton height="10px" width={"100px"} />
                <Skeleton height="10px" width={"100px"} />
                <Skeleton height="10px" width={"100px"} />
                <Skeleton height="10px" width={"100px"} />
                <Skeleton height="10px" width={"100px"} />
                <Skeleton height="10px" width={"100px"} />
                <Flex>
                    <Skeleton
                        height="25px"
                        width={"50px"}
                        startColor={"blue.300"}
                        endColor={"blue.500"}
                        mr={1}
                    />
                    <Skeleton
                        height="25px"
                        width={"50px"}
                        startColor={"red.300"}
                        endColor={"red.500"}
                    />
                </Flex>
            </Flex>
        ));
    }

    if (error) {
        return (
            <Alert
                status="error"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
                width={"100%"}
                borderRadius={"md"}
            >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                    Application submitted!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                    Thanks for submitting your application. Our team will get back to you
                    soon.
                </AlertDescription>
            </Alert>
        );
    }
    return (
        <>
            <TableContainer>
                <Table variant="striped" colorScheme="blue">
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Title</Th>
                            <Th>Price</Th>
                            <Th>thumbnail</Th>
                            <Th>Stock</Th>
                            <Th>Catehory</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.data?.length
                            ? data?.data?.map((prod: IProduct, index: number) => (
                                <Tr key={prod.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{prod.attributes.title}</Td>
                                    <Td>${prod.attributes.price}</Td>
                                    <Td>
                                        <Image
                                            boxSize="30px"
                                            src={`${import.meta.env.VITE_LOCAL_HOST}${prod.attributes.thumbnail.data.attributes.formats
                                                    .thumbnail.url
                                                }`}
                                            borderRadius="full"
                                            alt={prod.attributes.title}
                                        />
                                    </Td>
                                    <Td>{prod.attributes.stock}</Td>
                                    <Td>{prod.attributes.category.data.attributes.title}</Td>
                                    <Td>
                                        <Box>
                                            <Button
                                                color={"white"}
                                                colorScheme="orange"
                                                rounded={"4px"}
                                                size={"sm"}
                                                mx={1}
                                                onClick={() => {
                                                    setProductUpdate(prod.attributes)
                                                    getActionAndIndex("Update", prod.id);
                                                }}
                                            >
                                                <FaPencilAlt />
                                            </Button>
                                            <Button
                                                color={"white"}
                                                colorScheme="red"
                                                rounded={"4px"}
                                                size={"sm"}
                                                mx={1}
                                                onClick={() => {
                                                    getActionAndIndex("Delete", prod.id);
                                                }}
                                            >
                                                <FaTrash />
                                            </Button>
                                            <Button
                                                color={"white"}
                                                colorScheme="green"
                                                rounded={"4px"}
                                                size={"sm"}
                                                mx={1}
                                                onClick={() => {
                                                    getActionAndIndex("Watch", prod.id);
                                                }}
                                            >
                                                <FaEye />
                                            </Button>
                                        </Box>
                                    </Td>
                                </Tr>
                            ))
                            : ""}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>#</Th>
                            <Th>Title</Th>
                            <Th>Price</Th>
                            <Th>thumbnail</Th>
                            <Th>Stock</Th>
                            <Th>Catehory</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>

            <OpenModal
                title="Delete Product"
                action={action}
                isOpen={isOpen}
                onClose={onClose}
                Loading={action === "Delete"? deleteLoading: updateLoading}
                Error={action === "Delete"? deleteError: updateError}
                productIndex={productIndex}
                actionFunc={action === "Delete" ? deleteProduct : updateProduct}
                productUpdate={productUpdate}
                thumbnail={thumbnail}
            >
                {action === "Delete" ? (
                    "Are You Sure You Want To Delete This Product?"
                ) : (
                    <UpdateBody
                        changeProductInputs={changeProductInputs}
                        changeProductThumbnail={changeProductThumbnail}
                        productUpdate={productUpdate}
                    />
                )}
            </OpenModal>
        </>
    );
}

export default DashboardProducts;
