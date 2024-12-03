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
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import MyContext from "../Component/ContextApi/MyContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signup = () => {
  const {api_domain} = useContext(MyContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const signupHandler = async (e) => {
    e.preventDefault();

    // 'email', 'password', and other necessary data are obtained from the form input fields
    let data = {
      userName: name,
      email,
      password,
    };
    console.log(data);

    try {
      if(!name || !email || !password){
        toast({
          title: 'Field is empty',
          description: "Please ensure that you have provided username, email and password.",
          status: 'error',
          duration: 9000,
          isClosable: true,
          position:"top",
          colorScheme:"red"
        })
      }
      else{
        const response = await axios.post(
          `${api_domain}user/signup`,
          data
        );
  
        // Check the response status and handle the data accordingly
        if (response.status === 201) {
          console.log("Signup successful");
          console.log(response.data); // Modify or use response.data as needed
        } else {
          console.log("Signup failed");
          console.log(response.data); // Display error messages or handle accordingly
        }
      }
      
    } catch (error) {
      // Handle Axios errors and display appropriate messages
      console.error("Error:", error.message);
      if(error.response && error.response.status === 409){
        toast({
          title: 'User already registered',
          description: "Please sign in",
          status: 'success',
          duration: 9000,
          isClosable: true,
          position:"top",
        })
      }
    }
  };

  return (
    <Flex w={"90vw"} justifyContent={"space-between"}>
       <Box w={"70%"} border={"0px solid black"} h={"100vh"} bgPosition={"cover"} bgImage={"https://airwavz1.wpengine.com/wp-content/uploads/2020/11/slider-image01.jpg"}>
        {/* <Image  src=""></Image> */}
    </Box>
    <Box w={"20%"}>
    <Flex
      flexDirection="column"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Text color="gray.500" fontWeight={"600"}>
          Sign up to join Real Estate Calculator.
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
                    type="text"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

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
                colorScheme="teal"
                width="full"
                onClick={(e) => signupHandler(e)}
              >
                Sign up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        already have an account?{" "}
        <Link to="/signin">
          <span style={{ color: "teal" }}>Sign in</span>
        </Link>
      </Box>
    </Flex>
    </Box>
    </Flex>
   
  );
};

export default Signup;
