import {
    Badge,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Text,
} from "@chakra-ui/react";
import { RootState } from "../../app/Store";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { IProduct } from "../../../types";
import { clearCart } from "../../app/Cart/CartSlice";

interface IProps {
    onClose: () => void;
    onOpen?: () => void;
    isOpen: boolean;
}
function CartDrawer({ onClose, isOpen }: IProps) {
    const { cart } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    return (
        <>
            <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px" display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}>
                        <Text>
                            Cart Shop
                        </Text>
                        <Badge ml='1' fontSize='lg' rounded={"3px"} p={1} colorScheme='blue'>
                            Total: $
                            {cart.length
                                ? cart.reduce(
                                    (curr, prod) =>
                                        curr + prod.attributes.price * prod.quantity,
                                    0
                                )
                                : "0"}
                        </Badge>
                    </DrawerHeader>
                    <DrawerBody>
                        {cart.length ? (
                            cart.map((item: IProduct) => <CartItem key={item.id} {...item} />)
                        ) : (
                            <Text>There Is No Item Right Now!</Text>
                        )}
                    </DrawerBody>
                    <DrawerFooter>
                        <Button
                            variant={"outline"}
                            colorScheme="red"
                            rounded={"4px"}
                            onClick={() => {
                                dispatch(clearCart());
                            }}
                        >
                            Clear Cart
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default CartDrawer;
