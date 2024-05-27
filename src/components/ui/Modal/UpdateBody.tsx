import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { FcMultipleCameras } from "react-icons/fc";
import { IProduct } from "../../../types";

interface IProps {
    changeProductInputs: (e: React.ChangeEvent<HTMLInputElement>)=> void,
    changeProductThumbnail: (e: React.ChangeEvent<HTMLInputElement>)=> void,
    productUpdate: IProduct["attributes"] | any
}
const UpdateBody = ({changeProductInputs, changeProductThumbnail, productUpdate}: IProps) => {
    return (   
                    <>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                name="title"
                                onChange={(e) => {
                                    changeProductInputs(e);
                                }}
                                value={productUpdate?.title}
                            />
                        </FormControl>
                        
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input
                                name="description"
                                onChange={(e) => {
                                    changeProductInputs(e);
                                }}
                                value={productUpdate?.description}
                            />
                        </FormControl>
                        
                        <FormControl mt={4}>
                            <FormLabel>Price</FormLabel>
                            <Input
                                min={1}
                                max={30}
                                type="number"
                                name="price"
                                onChange={(e) => {
                                    changeProductInputs(e);
                                }}
                                value={productUpdate?.price}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <Button position={"relative"}>
                                <FormLabel display={"flex"} mb={0} alignItems={"center"}>
                                    <Text mx={1}>Product Thumbnail</Text>
                                    <FcMultipleCameras fontSize={"20px"} />
                                </FormLabel>
                                <Input type="file" display={"none"} position={"absolute"} name="thumbnail"
                                    onChange={(e) => {
                                        changeProductThumbnail(e);
                                    }} 
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    />
                            </Button>
                        </FormControl>
                    </>
            
    );
};

export default UpdateBody;
