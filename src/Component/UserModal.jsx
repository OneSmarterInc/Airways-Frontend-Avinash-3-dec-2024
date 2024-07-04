import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Image,
  Text,
  Box,
  VStack,
  Input,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import dp from "../Images/dp.png";
import { GrPowerReset } from "react-icons/gr";
import EmployeeTable from "./EmployeeTable";
import { IconButton } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MyContext from "./ContextApi/MyContext";
import { Link } from "react-router-dom";

const UserModal = () => {
  let type = JSON.parse(localStorage.getItem("type")) || null;
  let userData = JSON.parse(localStorage.getItem("userData")) || null;


  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const { api_domain } = useContext(MyContext);

  const toast = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const generatePassword = () => {
    const length = 10; // Set the desired length of the password
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()-=_+[]{}|;:,.<>?";

    const allChars =
      uppercaseChars + lowercaseChars + numberChars + symbolChars;

    let pass = "";

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * allChars.length);
      pass += allChars[randomIndex];
    }
    setPassword(pass);
  };

  const handlePost = async () => {
    try {
      if (username == "" || email == "" || role == "" || password == "") {
        toast({
          title: "Field is empty",
          description: "Please ensure that you have entered all the fields.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      } else {
        let obj = {
          username,
          role,
          email,
          password,
          type: "employee",
        };
        setLoading(true);

        let response = await axios.post(`${api_domain}admin/signup`, obj);
        if (response.status === 409) {
          setLoading(false);
          toast({
            title: "Email already in use",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        } else if (response.status === 201) {
          toast({
            title: "Employee added successfully",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }
        getEmployees();
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 409) {
        setLoading(false);
        toast({
          title: "Email already in use",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      } else {
        setLoading(false);
        toast({
          title: "There is something error, please try again",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const resetData = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("");
  };

  const deleteEmployee = async (employeeId) => {
    try {
      setLoading(true);
      // Send a DELETE request to the server to delete the employee
      await axios.delete(`${api_domain}admin/list/${employeeId}`);

      getEmployees();

      setLoading(false);
      toast({
        title: "Employee deleted successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Failed to delete employee",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const getEmployees = async () => {
    try {
      let data = await axios.get(`${api_domain}admin/list`);
      // console.log(data.data.result.username);
      data = data.data.result;
      let filteredData = data.filter((el) => {
        return el.type === "employee";
      });
      // console.log(filteredData);
      setEmployees(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(employees);
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <FaUserEdit cursor={"pointer"} color="gray" size={30} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent bg={"gray.200"}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              height={"10%"}
              w={"100%"}
              bg={"white"}
              m={"auto"}
              mt={3}
              borderRadius={10}
              alignItems={"center"}
              pl={2}
              pr={2}
              pt={5}
              pb={5}
            >
              <Box w={"14"}>
                <Image w={"80%"} src={dp} />
              </Box>

              <Box w={"86%"} fontSize={14} textAlign={"left"}>
                <Text fontWeight={"600"}>{userData.username}</Text>
                <Text fontWeight={"500"}>{userData.role}</Text>
                <Text fontSize={11}>last Login : {userData.time}</Text>
              </Box>

              {type === "admin" ? (
                <VStack>
                  <Link to={"/editrules"}>
                    <Button
                      color={"white"}
                      bg="#8DB23F"
                      size={"sm"}
                      fontSize={13}
                    >
                      Edit Rules
                    </Button>
                  </Link>
                  <Button
                    color={"white"}
                    bg="#8DB23F"
                    size={"sm"}
                    fontSize={13}
                  >
                    Report Issue
                  </Button>
                </VStack>
              ) : (
                <Button color={"white"} bg="#8DB23F" size={"sm"} fontSize={13}>
                  Report Issue
                </Button>
              )}
            </Flex>

            {type === "admin" && (
              <Flex
                height={"10%"}
                w={"100%"}
                bg={"white"}
                m={"auto"}
                mt={3}
                borderRadius={10}
                alignItems={"flex-start"}
                pl={2}
                pr={2}
                pt={5}
                pb={5}
                justifyContent={"space-evenly"}
                columnGap={2}
              >
                <Input
                  bg={"gray.200"}
                  size={"sm"}
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  bg={"gray.200"}
                  size={"sm"}
                  placeholder="Role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />

                <Input
                  bg={"gray.200"}
                  size={"sm"}
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <VStack w={"100%"} columnGap={1}>
                  <HStack>
                    <Input
                      bg={"gray.200"}
                      w={"100%"}
                      size={"sm"}
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <IconButton
                      aria-label={
                        showPassword ? "Hide Password" : "Show Password"
                      }
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={togglePasswordVisibility}
                      variant="ghost"
                      size="sm"
                      bg={"gray.200"}
                    />
                  </HStack>

                  <Button
                    size={"sm"}
                    w={"100%"}
                    fontSize={14}
                    bg="#8DB23F"
                    color={"white"}
                    onClick={generatePassword}
                  >
                    Auto Generate
                  </Button>
                </VStack>
                <HStack>
                  <Button
                    isDisabled={loading}
                    color={"white"}
                    bg="#8DB23F"
                    size={"sm"}
                    onClick={handlePost}
                  >
                    {loading ? "Loading" : "Create+"}
                  </Button>
                  <Button size={"sm"} onClick={resetData}>
                    <GrPowerReset color="#8DB23F" size={20} />
                  </Button>
                </HStack>
              </Flex>
            )}
            {type === "admin" && (
              <Box
                height={"10%"}
                w={"100%"}
                bg={"white"}
                m={"auto"}
                mt={3}
                borderRadius={10}
                alignItems={"flex-start"}
                pl={2}
                pr={2}
                pt={5}
                pb={5}
                justifyContent={"space-evenly"}
                columnGap={2}
              >
                <EmployeeTable
                  employees={employees}
                  deleteEmployee={deleteEmployee}
                />
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button color={"white"} bg="#8DB23F" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserModal;
