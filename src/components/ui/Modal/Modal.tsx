import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { IProduct } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store";

interface IProps {
    title: string;
    action: string;
    isOpen: boolean;
    Loading: boolean,
    Error: boolean,
    productIndex: number,
    productUpdate: IProduct["attributes"] | any
    actionFunc: (arg: any)=> void
    onClose: () => void;
    children: ReactNode,
    thumbnail: File | any
}
export default function OpenModal({
    title,
    action,
    isOpen,
    Loading,
    Error,
    productIndex,
    productUpdate,
    actionFunc,
    onClose,
    children,
    thumbnail
}: IProps) {

    const {internetMode} = useSelector((state: RootState) =>  state.internet );

    const toast = useToast();    
    const deleteAction = () => { 
        actionFunc(productIndex);
        if (!Error) {
            toast({
                title: "Product Deleted Successfully",
                status: "success",
                duration: 3000,
                isClosable: false,
                position: "top",
            });
            onClose();
        } else {
            toast({
                title: "Can't Delete Product.",
                status: "error",
                duration: 3000,
                isClosable: false,
                position: "top",
            });
        }
    }

    const updateAction = () => {
        const formData = new FormData();
        formData.append("data", 
            JSON.stringify({
                title: productUpdate?.title,
                description: productUpdate?.description,
                price: productUpdate.price,
            })
        )
        formData.append("files.thumbnail", thumbnail);

        actionFunc({id: productIndex, body: formData});
        if (!Error) {
            toast({
                title: "Product Updated Successfully",
                status: "success",
                duration: 3000,
                isClosable: false,
                position: "top",
            });
            onClose();
        } else {
            toast({
                title: "Can't Update Product.",
                status: "error",
                duration: 3000,
                isClosable: false,
                position: "top",
            });
        }
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{children}</ModalBody>
                    <ModalFooter>
                        <Button rounded={"4px"} colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            onClick={() => { action === "Delete"? deleteAction() : updateAction() }}
                            isLoading={Loading || internetMode}
                            rounded={"4px"}
                            // variant="outline"
                            colorScheme={
                                action === "Delete"
                                    ? "red"
                                    : action === "Update"
                                        ? "orange"
                                        : "green"
                            }
                        >
                            {action}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
