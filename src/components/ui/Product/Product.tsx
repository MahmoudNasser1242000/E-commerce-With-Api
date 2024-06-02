import { Card, CardBody, Image, Stack, Heading, Text, Button } from '@chakra-ui/react'
import { IProduct } from '../../../types'
import { Link } from 'react-router-dom'

function Product({attributes, id }: IProduct) {
    
    return (
        <>
            <Card maxWidth={{base:"100%", lg:"23%", md: "30.3333%", sm:"40%"}}>
                <CardBody>
                    <Image
                        src={`${attributes.thumbnail.data.attributes.formats.thumbnail.url}`}
                        alt='Green double couch with wooden legs'
                        borderRadius='md'
                        height={"140px"}
                        objectFit={"contain"}
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{attributes.title}</Heading>
                        <Text>
                            {attributes.description.split(' ').slice(0, 8).join(" ") + "..."}
                        </Text>
                        <Text color='blue.600' fontSize='2xl'>
                            ${attributes.price}
                        </Text>
                        <Button as={Link} to={`/product/${id}`} mt={"10px"}>
                            View Product Details
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}

export default Product