import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import MyContext from "./ContextApi/MyContext";

const ManageEmployees = () => {
  const {api_domain} = useContext(MyContext);
  const [employeeData, setEmployeeData] = useState({
    username: "",
    email: "",
    password: "",
    type: "employee",
  });

  const [employees, setEmployees] = useState([]);

  const toast = useToast();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   console.log(employeeData);

  const addEmployee = async () => {
    try {
      if (
        !employeeData.username ||
        !employeeData.email ||
        !employeeData.password
      ) {
        toast({
          title: "Field is empty",
          description:
            "Please ensure that you have provided username , email and password.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else {
        let res = await axios.post(
          `${api_domain}/admin/signup`,
          employeeData
        );
        console.log(res);
        if (res.status === 201) {
          getEmployees();
          toast({
            title: "Employee added successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        console.log("Email is already used");
        toast({
          title: "Email is already used",
          description: "Please use another email",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const getEmployees = async () => {
    try {
      let data = await axios.get(`${api_domain}admin/list`);
      console.log(data);
      if (data.status === 201) {
        setEmployees(data.data.result);
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      //  axios.delete(`http://localhost:3500/api/admin/list/${id}`);
      await axios.delete(`${api_domain}admin/list/${id}`);
      // After successful deletion, update the employees state
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
      toast({
        title: "Employee deleted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);
  // console.log("aa", employees);

  return (
    <Box border={"0px solid black"} w={"100%"} m={"auto"} h={"100%"} textAlign={"center"}>
      <Heading mb={5} fontSize={20}>Add Employees</Heading>
      <VStack w={"60%"} m={"auto"} rowGap={4}>
        <Input
          placeholder="Username"
          name="username"
          type="text"
          value={employeeData.username}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Email"
          name="email"
          type="email"
          value={employeeData.email}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          value={employeeData.password}
          onChange={handleInputChange}
        />
        <Input
          cursor={"pointer"}
          type="submit"
          value="Add Employee"
          onClick={addEmployee}
        />
      </VStack>

      <Heading mt={10} fontSize={20}>Current Employees</Heading>

      <Box maxH={"350px"} overflow={"auto"} border={"0px solid blue"} mt={5}>
        <Table variant="simple" textAlign={"center"}>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Type</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.length > 0 &&
              employees
                .filter((el) => el.type === "employee")
                .map((el, index) => (
                  <Tr key={index}>
                    <Td>{el.username}</Td>
                    <Td>{el.email}</Td>
                    <Td>{el.type}</Td>
                    <Td>
                      <MdDelete
                      color="red"
                        cursor={"pointer"}
                        onClick={() => handleDelete(el._id)}
                      />
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ManageEmployees;
