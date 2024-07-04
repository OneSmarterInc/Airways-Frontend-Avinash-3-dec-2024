import { useContext, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, json, useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../Component/ContextApi/MyContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {api_domain} = useContext(MyContext);
  const toast = useToast();

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    //'email' and 'password' are obtained from the form input fields
    let data = {
      email,
      password,
    };
    console.log(data);

    try {
      if (!email || !password) {
        toast({
          title: "Field is empty",
          description:
            "Please ensure that you have provided both the email and password.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
          colorScheme: "red",
        });
      } else {
        setLoading(true);
        const response = await axios.post(
          `${api_domain}admin/signin`,
          data
        );

        // Check the response status and handle the data accordingly
        if (
          (response.status === 200 &&
            response.data.userData.type === "admin") ||
          response.data.userData.type === "employee"
        ) {
          console.log("Login successful");
          setLoading(false);
          toast({
            title: "Login successful",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",  
          });
          
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("userData",JSON.stringify(response.data.userData));
          localStorage.setItem(
            "type",
            JSON.stringify(response.data.userData.type)
          );
          localStorage.setItem("userId",JSON.stringify(response.data.userData.userId))
          navigate("/");
          console.log(response.data.userData); // Modify or use response.data as needed
        } else {
          setLoading(false);
          console.log("Login failed");
          console.log(response.data); // Display error messages or handle accordingly
        }
      }
    } catch (error) {
      // Handle Axios errors and display appropriate messages
      console.error("Error:", error.code);
      setLoading(false);
      if (error.response && error.response.status === 401) {
        console.log("User not found. Please sign up.");
        toast({
          title: "User not found",
          description: "Please sign up.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else if (error.response && error.response.status === 402) {
        console.error("Wrong Password");
        setLoading(false);
        toast({
          title: "Wrong Password.",
          description:
            "Please check that you have entered the correct password.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex border={"0px solid red"} w={"90vw"} justifyContent={"space-between"}>
      <Box
        w={"70%"}
        border={"0px solid black"}
        h={"100vh"}
        bgPosition={"cover"}
        bgImage={
          "https://airwavz1.wpengine.com/wp-content/uploads/2020/11/slider-image01.jpg"
        }
      >
        {/* <Image  src=""></Image> */}
      </Box>
      <Box w={"20%"}>
        <Flex
          flexDirection="column"
          width="100%"
          height="100vh"
          // backgroundColor="gray.200"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar bg="#8DB23F" />
            <Heading color="#8DB23F">Employee Login</Heading>
            <Text color="gray.500" fontWeight={"600"}>
              Sign in to continue.
            </Text>
            <Box minW={{ base: "90%", md: "468px" }}>
              <form>
                <Stack spacing={4} p="1rem">
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color="gray.300" />}
                      />
                      <Input
                        type="email"
                        placeholder="email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        // color="gray.300"
                        children={<CFaLock color="gray.300" />}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign="right">
                      <Link>forgot password?</Link>
                    </FormHelperText>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    bg="#8DB23F"
                    color={"white"}
                    width="full"
                    onClick={loginHandler}
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AdminLogin;
