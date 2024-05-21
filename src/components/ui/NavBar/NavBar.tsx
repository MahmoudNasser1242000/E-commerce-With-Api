import { ReactNode } from "react";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image,
} from "@chakra-ui/react";
import logo from "../../../assets/images/logo.png";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";
import Cookies from "universal-cookie";

const Links = ["dashboard", "projects", "team"];

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        as={RouterLink}
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.200", "gray.700"),
        }}
        to={`${children}`}
    >
        {children}
    </Link>
);

export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cookies = new Cookies();
    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <IconButton
                        size={"md"}
                        icon={isOpen ? <IoClose size={"30px"} /> : <IoMenu size={"30px"} />}
                        aria-label={"Open Menu"}
                        display={{ base: "flex", md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                        justifyContent={"center"}
                    />
                    <HStack spacing={8} alignItems={"center"} width={"100%"}>
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                            width={{ base: "100%", md: "auto" }}
                        >
                            <Link as={RouterLink} to={cookies.get("jwt")? "/" : "#"}>
                                <Image
                                    src={logo}
                                    alt="logo"
                                    width={"45px"}
                                    height={"45px"}
                                    objectFit={"contain"}
                                />
                            </Link>
                        </Box>
                        <HStack
                            as={"nav"}
                            spacing={3}
                            display={{ base: "none", md: "flex" }}
                            justifyContent={"center"}
                            width={"100%"}
                        >
                            {
                                cookies.get("jwt")
                                    ? Links.map((link) => <NavLink key={link}>{link}</NavLink>)
                                    : ""
                            }
                        </HStack>
                    </HStack>
                    <Flex alignItems={"center"}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={"full"}
                                variant={"link"}
                                cursor={"pointer"}
                                minW={0}
                            >
                                <Avatar
                                    size={"sm"}
                                    src={
                                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                    }
                                />
                            </MenuButton>
                            <MenuList padding={"0"}>
                                {
                                    !cookies.get("jwt") ? (
                                    <>
                                        <MenuItem>
                                            <RouterLink to={"/register"}>Register</RouterLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <RouterLink to={"/login"}>Login</RouterLink>
                                        </MenuItem>
                                    </>
                                ) : <MenuItem onClick={() => { cookies.remove("jwt") }}>Link 3</MenuItem>
                                }

                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            {
                                cookies.get("jwt")
                                    ? Links.map((link) => <NavLink key={link}>{link}</NavLink>)
                                    : (
                                        <>
                                            <RouterLink to={"/register"}>Register</RouterLink>
                                            <RouterLink to={"/login"}>Login</RouterLink>
                                        </>
                                    )
                            }
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
