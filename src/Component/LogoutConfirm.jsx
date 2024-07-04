import React from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  useDisclosure,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

const LogoutConfirm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast({
      title: "Logout successful",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    navigate("/adminlogin");
  };

  return (
    <Popover placement="top" isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        {/* <Button colorScheme="red" onClick={onOpen}>
          Delete
        </Button> */}
        <Tooltip label="Logout">
          <Button w={"20%"} onClick={onOpen}>
            <AiOutlineLogout
              color="red"
              size={30}
              style={{ transform: "rotate(270deg)" }}
            />
          </Button>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />

        <PopoverBody>Are you sure to Logout?</PopoverBody>
        <PopoverFooter d="flex" justifyContent="flex-end">
          <Button variant="ghost" mr={2} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={handleLogout}>
            Yes
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default LogoutConfirm;
