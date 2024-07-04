import React, { useContext } from 'react';
import {
    Text,
    Box,
    Flex,
    useToast,
  } from '@chakra-ui/react'
  import { RiEdit2Fill } from "react-icons/ri";
import MyContext from './ContextApi/MyContext';


const SolutionTable = ({data}) => {

  // console.log(data);
  const {
    api_domain,
    dealStatusObj,
    setDealStatusObj,
    name,
    setName,
    address,
    setAddress,
    vertical,
    setVertical,
    region,
    setRegion,
    numberOfBuildings,
    setNumberOfBuildings,
    projectSize,
    setProjectSize,
    labourImpact,
    setLabourImpact,
    conduitRequired,
    setConduitRequired,
    dealStatus,
    setDealStatus,
    dealStatusColor,
    tierObj,
    setTierObj,
    tier,
    setTier,
    sqFtRangeObj,
    setSqFtRangeObj,
    sqFtRange,
    setSqFtRange,
    classOfService,
    setClassOfService,
    service,
    setService,
    dealType,
    setDealType,
    financialModel,
    setFinancialModel,
    term,
    setTerm,
    prePaymentPercent,
    setprePaymentPercent,
    bopRate,
    setBopRate,
    solutionArr,
    setSolutionArr,
    objfor0,
    setObjfor0,
    objfor25,
    setobjfor25,
    serviceOptions,
    setServiceOptions,
    dealTypeOptions,
    setDealTypeOptions,
    saveArr,
    setSaveArr,
   
    classOfServiceArr,
    setClassOfServiceArr,
    serviceArr,
    setServiceArr,
    dealTypeArr,
    setDealTypeArr,
    financialModelArr,
    setFinancialModelArr,
  } = useContext(MyContext);


  const onEdit = (el)=>{
    // console.log(el);
    // let obj = {
    //   recurringFees: el.obj.recurringFees,
    //   prePayment: el.obj.prePayment,
    //   reducedAnnualOpex: el.obj.reducedAnnualOpex,
    //   npv: el.obj.npv,
    //   totalCost: el.obj.totalCost,
    //   tovDiscount: el.obj.tovDiscount,
    //   dealStatus: el.obj.dealStatus,
    // }
    // setSolutionArr((prev)=>[...prev,obj])
    setName(el.projectName);
    setAddress(el.address);
    setVertical(el.vertical);
    setRegion(el.region);
    setNumberOfBuildings(el.numberOfBuildings);
    setProjectSize(el.projectSize);
    setLabourImpact(el.labourImpact);
    setConduitRequired(el.conduitRequired);
    setSqFtRange(el.sqFtRange);
    setTier(el.tier);
    setDealStatus(el.dealStatus);
    setClassOfService(el.classOfService);
    setService(el.service);
    setDealType(el.dealType);
    setFinancialModel(el.financialModel);
    setTerm(el.term);
    setprePaymentPercent(el.prePaymentPercent)
    // onClose();
  }
 
  return (
  
  <Box>
  <Box display="flex" bg="#8DB23F" color="white" justifyContent={"center"} fontWeight="bold" >
    <Box flex="1">Edit</Box>
    <Box flex="2">Recurring Fees <Text fontSize={10}>Annual BOP</Text></Box>
    <Box flex="1">Pre-Payment</Box>
    <Box flex="2">Reduced Annual OPEX</Box>
    <Box flex="1">NPV</Box>
    <Box flex="1">Total Cost</Box>
    <Box flex="1">TOV Discount</Box>
    <Box flex="2">Solution Status</Box>
  </Box>

<Box  overflow={"auto"} maxH={"15rem"}>
  {data.length > 0 &&
    data.map((el, i) => (
      <Box key={i} display="flex" bg="gray.200" justifyContent={"center"} >
        <Box flex="1" p={2} textAlign="center" >
          <Flex onClick={()=>onEdit(el)} justifyContent={"center"} alignItems={"center"} cursor="pointer" ><RiEdit2Fill /></Flex>
        </Box>
        <Box flex="1" p={2} textAlign="center">${typeof el.recurringFees === "number" ? el.recurringFees.toFixed(0) : el.recurringFees}</Box>
        <Box flex="1" p={2} textAlign="center">${typeof el.prePayment === "number" ? el.prePayment.toFixed(0) : el.prePayment}</Box>
        <Box flex="1" p={2} textAlign="center">${typeof el.reducedAnnualOpex === "number" ? el.reducedAnnualOpex.toFixed(0) : el.reducedAnnualOpex}</Box>
        <Box flex="1" p={2} textAlign="center">${typeof el.npv === "number" ? el.npv.toFixed(0) : el.npv}</Box>
        <Box flex="1" p={2} textAlign="center">${typeof el.totalCost === "number" ? el.totalCost.toFixed(0) : el.totalCost}</Box>
        <Box flex="1" p={2} textAlign="center">{typeof el.tovDiscount === "number" ? el.tovDiscount.toFixed(2) : el.tovDiscount}%</Box>
        <Box flex="1" p={2} textAlign="center" bg={el.dealStatusF === "DealCommittee" ? '#CA0000' : '#19B400'} color="white">
          { el.dealStatusF}
        </Box>
      </Box>
    ))
  }
  </Box>
</Box>
  )
}

export default SolutionTable