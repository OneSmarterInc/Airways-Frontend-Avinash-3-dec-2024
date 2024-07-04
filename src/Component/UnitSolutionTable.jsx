import React from "react";
import {
  Box,
  Flex,
} from "@chakra-ui/react";
import { RiEdit2Fill } from "react-icons/ri";

const UnitSolutionTable = ({data, projectSize}) => {
  return (
   
    <Box>
    <Box display="flex" bg="#8DB23F" color="white" justifyContent={"center"} fontWeight="bold">
      <Box flex="1">Edit</Box>
      <Box flex="1">BOP Rate</Box>
      <Box flex="1">Pre-Payment</Box>
      <Box flex="1">Reduced Annual OPEX</Box>
      <Box flex="1">NPV</Box>
      <Box flex="1">Total Cost</Box>
      <Box flex="1">TOV Discount</Box>
    </Box>

    <Box overflow={"auto"} maxH={"15rem"}>
  {data.length > 0 &&
    data.map((el, i) => (
      <Box key={i} display="flex" bg="gray.200" justifyContent={"center"}>
        <Box flex="1" p={2} textAlign="center">
          <Flex justifyContent={"center"} alignItems={"center"} cursor="pointer" ><RiEdit2Fill /></Flex>
        </Box>
        <Box flex="1" p={2} textAlign="center">${(el.recurringFees/projectSize).toFixed(3)}</Box>
        <Box flex="1" p={2} textAlign="center">${(el.prePayment/projectSize).toFixed(3)}</Box>
        <Box flex="1" p={2} textAlign="center">${(el.reducedAnnualOpex/projectSize).toFixed(3)}</Box>
        <Box flex="1" p={2} textAlign="center">${(el.npv/projectSize).toFixed(3)}</Box>
        <Box flex="1" p={2} textAlign="center">${(el.totalCost/projectSize).toFixed(3)}</Box>
        <Box flex="1" p={2} textAlign="center">{el.tovDiscount}%</Box>
      </Box>
    ))
  }
  </Box>
  </Box>
  );
};

export default UnitSolutionTable;
