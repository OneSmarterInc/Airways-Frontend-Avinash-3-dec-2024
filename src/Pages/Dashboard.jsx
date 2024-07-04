import { Box, Flex, VStack, Text, useToast } from '@chakra-ui/react';
import ManageEmployees from '../Component/ManageEmployes';
import { useEffect, useState } from 'react';
import UserLogs from '../Component/UserLogs';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  let type = JSON.parse(localStorage.getItem("type")) || null;

  const renderComponent = () => {
    switch (selectedSection) {
      case 'employees':
        return <ManageEmployees />;

      case 'userlogs':
        return <UserLogs />;
      // Add more cases for additional sections
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast({
      title: 'Logout successful',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    setIsLoggedIn(false);
    navigate("/adminlogin");
  };

  useEffect(() => {
    if (type === "admin") {
      setSelectedSection("employees");
    } else {
      setSelectedSection("userlogs");
    }
  }, [isLoggedIn, type]);

  return (
    <Flex border={"0px solid red"} h={"100vh"} w={"100vw"}>
      <Box w="350px" bg="gray.200" p={4}>
        <VStack spacing={4} align="stretch">
          <Text fontWeight="bold" fontSize="xl" mb={4}>Dashboard</Text>
          {type === "admin" &&
            <Text
              cursor="pointer"
              bg={selectedSection === 'employees' ? 'blue.400' : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ bg: 'blue.200' }}
              onClick={() => setSelectedSection('employees')}
            >
              Manage Employees
            </Text>
          }
          <Text
            cursor="pointer"
            bg={selectedSection === 'userlogs' ? 'blue.400' : 'transparent'}
            p={2}
            borderRadius="md"
            _hover={{ bg: 'blue.200' }}
            onClick={() => setSelectedSection('userlogs')}
          >
            User Logs
          </Text>
          <Text
            cursor="pointer"
            bg={selectedSection === 'logout' ? 'blue.400' : 'transparent'}
            p={2}
            borderRadius="md"
            _hover={{ bg: 'blue.200' }}
            onClick={handleLogout}
          >
            Logout
          </Text>
          {/* Add more sidebar items for additional sections */}
        </VStack>
      </Box>
      <Box flex="1" p={4} w={"350px"}>
        {renderComponent()}
      </Box>
    </Flex>
  );
};

export default Dashboard;
