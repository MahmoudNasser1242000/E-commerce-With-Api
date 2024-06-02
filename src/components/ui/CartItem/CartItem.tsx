import { Box, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { IProduct } from "../../../types";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../app/Cart/CartSlice";

function CartItem({ attributes, id, quantity }: IProduct) {
    const dispatch = useDispatch();
    // console.log(quantity);
    console.log(attributes.thumbnail);
    
    return (
        <>
            <Flex justifyContent={"space-between"} alignItems={"center"} px={2}>
                <Flex
                    flexDirection={"column"}
                    justifyContent={"start"}
                    alignItems={"center"}
                >
                    <Image
                        src={`${attributes.thumbnail.data.attributes.url
                            }`}
                        alt=""
                        rounded={"50%"}
                        width={"45px"}
                        height={"45px"}
                        objectFit={"cover"}
                        border={"1px solid black"}
                    />
                    <Heading
                        as={"h5"}
                        fontSize={"xs"}
                        textAlign={"center"}
                        width={"100px"}
                    >
                        {attributes.title}
                    </Heading>
                </Flex>
                <Box
                    _hover={{
                        opacity: "0.8",
                    }}
                >
                    <FaTrash
                        fontSize={"20px"}
                        cursor={"pointer"}
                        onClick={() => {
                            dispatch(removeFromCart(id));
                        }}
                        color="#E53E3E"
                    />
                </Box>
                <Flex
                    height={"full"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                >
                    <Text fontWeight={"bold"} my={"2px"}>Quantity: ({quantity})</Text>
                    <Text fontWeight={"bold"} my={"2px"}>Price: ${attributes.price}</Text>
                </Flex>
            </Flex>
            <Divider my={3} />
        </>
    );
}

export default CartItem;
