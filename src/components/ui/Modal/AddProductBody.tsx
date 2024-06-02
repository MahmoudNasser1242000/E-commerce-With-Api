import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
} from "@chakra-ui/react";
import { FcMultipleCameras } from "react-icons/fc";
import { IAddProductForm } from "../../../types";
import { useGetDahboardCategoriesQuery } from "../../app/Category/categorySlice";

interface IProps {
    changeProductInputs: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    changeProductThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addProductForm: IAddProductForm;
}
const AddProductBody = ({
    changeProductInputs,
    changeProductThumbnail,
    addProductForm,
}: IProps) => {
    const { data } = useGetDahboardCategoriesQuery(1);
    // console.log(data);

    return (
        <>
            <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                    name="title"
                    onChange={(e) => {
                        changeProductInputs(e);
                    }}
                    value={addProductForm?.title}
                />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                    name="description"
                    onChange={(e) => {
                        changeProductInputs(e);
                    }}
                    value={addProductForm?.description}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Select
                    mt={4}
                    name="category"
                    onChange={(e) => {
                        changeProductInputs(e);
                    }}
                >
                    <option disabled selected value={""}>Select Category</option>
                    {data?.data.length
                        ? data?.data.map(
                            ({
                                id,
                                attributes: { title },
                            }: {
                                id: number;
                                attributes: { title: string };
                            }) => (
                                <option value={id} key={id}>
                                    {title}
                                </option>
                            )
                        )
                        : "There Are No Categories"}
                </Select>
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
                    value={addProductForm?.price}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Stock</FormLabel>
                <Input
                    min={1}
                    type="number"
                    name="stock"
                    onChange={(e) => {
                        changeProductInputs(e);
                    }}
                    value={addProductForm?.stock}
                />
            </FormControl>
            <FormControl mt={4}>
                <Button position={"relative"}>
                    <FormLabel display={"flex"} mb={0} alignItems={"center"}>
                        <Text mx={1}>Product Thumbnail</Text>
                        <FcMultipleCameras fontSize={"20px"} />
                    </FormLabel>
                    <Input
                        type="file"
                        display={"none"}
                        position={"absolute"}
                        name="thumbnail"
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

export default AddProductBody;
