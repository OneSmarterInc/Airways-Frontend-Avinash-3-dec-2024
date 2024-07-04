import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Button, IconButton, useToast } from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDelete, MdOutlineContentCopy } from "react-icons/md";

const EmployeeTable = ({ employees, deleteEmployee }) => {
  const [showPassword, setShowPassword] = useState({});

  const toast = useToast();
  
  const togglePasswordVisibility = (id) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [id]: !prevShowPassword[id],
    }));
  };

  const copyEmployeeInfo = (employee) => {
    const { username, role, email, password } = employee;
    const infoToCopy = `Username: ${username}\nRole: ${role}\nEmail: ${email}\nPassword: ${password}`;
    
    navigator.clipboard.writeText(infoToCopy)
      .then(() => {
        // Optionally, you can show a success message or perform any other action after copying.
        console.log('Employee information copied to clipboard!');
        toast({
          title: "Employee information copied to clipboard!",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        console.error('Error copying employee information: ', err);
        toast({
          title: "Error copying employee information",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      });
  };


  return (
    <Box>
    <Flex bg="#8DB23F" color="white" justifyContent="center" fontWeight="bold">
      <Box w="150px" textAlign="center" p={2}>
        Username
      </Box>
      <Box w="150px" textAlign="center" p={2}>
        Role
      </Box>
      <Box w="200px" textAlign="center" p={2}>
        Email
      </Box>
      <Box w="200px" textAlign="center" p={2}>
        Password
      </Box>
      <Box w="100px" textAlign="center" p={2}>
        Copy
      </Box>
      <Box w="100px" textAlign="center" p={2}>
        Delete
      </Box>
    </Flex>
    {employees.length > 0 &&
      employees.map((el,i) => (
        <Flex
          bg="gray.200"
          justifyContent="center"
          alignItems="center"
          key={el._id}
          borderBottom="1px solid #ccc"
        >
          <Box w="150px" textAlign="center" p={2}>
            {el.username}
          </Box>
          <Box w="150px" textAlign="center" p={2}>
            {el.role}
          </Box>
          <Box w="200px" textAlign="center" p={2}>
            {el.email}
          </Box>
          <Box w="200px" textAlign="center" p={2}>
          {showPassword[el._id] ? (
                el.password
              ) : (
                '••••••••'
              )}
            <Button
              size="sm"
              bg="transparent"
              onClick={()=>togglePasswordVisibility(el._id)}
              ml={2}
            >
              {showPassword ? (
                <FaEyeSlash fontSize={22} />
              ) : (
                <FaEye fontSize={22} />
              )}
            </Button>
          </Box>
          <Box w="100px" textAlign="center" p={2}>
            <IconButton
              size="sm"
              bg="transparent"
              aria-label="Copy"
              icon={<MdOutlineContentCopy fontSize={22} />}
              onClick={()=>copyEmployeeInfo(el)}
            />
          </Box>
          <Box w="100px" textAlign="center" p={2}>
            <IconButton
              size="sm"
              bg="transparent"
              aria-label="Delete"
              icon={<MdDelete color="red" fontSize={25} />}
              onClick={() => deleteEmployee(el._id)}
            />
          </Box>
        </Flex>
      ))}
  </Box>
  );
};

export default EmployeeTable;
