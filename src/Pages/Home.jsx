import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
// import { AiOutlineLogout } from "react-icons/ai";
import dp from "../Images/dp.png";
import map from "../Images/map.png";
import save from "../Images/save.png";
import { FaUserEdit } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaSave } from "react-icons/fa";
import SolutionTable from "../Component/SolutionTable";
import UnitSolutionTable from "../Component/UnitSolutionTable";
import UserModal from "../Component/UserModal";
import { useNavigate } from "react-router-dom";
import HistoryModal from "../Component/HistoryModal";
import LogoutConfirm from "../Component/LogoutConfirm";
import axios from "axios";
import { dataArray } from "../data";
import { calculate0, calculate25 } from "../Component/discount";
import MyContext from "../Component/ContextApi/MyContext";

const Home = () => {
  
  const [dealStatusColor, setDealStatusColor] = useState("#19B400");
 
  
const [dependencies, setDependencies] =  useState({});


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
    // dealStatusColor,
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
    data,
    setData,
    classOfServiceArr,
    setClassOfServiceArr,
    serviceArr,
    setServiceArr,
    dealTypeArr,
    setDealTypeArr,
    financialModelArr,
    setFinancialModelArr,
  } = useContext(MyContext);

  let userData = JSON.parse(localStorage.getItem("userData")) || null;

  const toast = useToast();

  let avg = 0;
  if (projectSize !== "" && numberOfBuildings !== "") {
    avg = (projectSize / numberOfBuildings).toFixed(0);
  }

  const getDealStatus = async () => {
    try {
      let data = await axios.get(`${api_domain}rules`);
      console.log(data.data.result, "arrreeee");
      setDealStatusObj(data.data.result.dealStatus);
      setTierObj(data.data.result.pricingTier);
      setSqFtRangeObj(data.data.result.sqFtRange);
      setClassOfServiceArr(data.data.result.classOfService);
      // setServiceArr(data.data.result.service);
      // setDealTypeArr(data.data.result.dealType);
      setFinancialModelArr(data.data.result.financialModel);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleVerticalChange = (e) => {
    setVertical(e.target.value);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleNumberOfBuildingsChange = (e) => {
    setNumberOfBuildings(e.target.value);
  };

  const handleProjectSizeChange = (e) => {
    setProjectSize(+e.target.value);
  };

  const handleLabourImpactChange = (value) => {
    setLabourImpact(value);
  };

  const handleConduitRequiredChange = (value) => {
    setConduitRequired(value);
  };

  const handleCalculate = async () => {
    if (
      name == "" ||
      address == "" ||
      vertical == "" ||
      region == "" ||
      numberOfBuildings == "" ||
      projectSize == "" ||
      classOfService == "" ||
      service == "" ||
      dealType == "" ||
      financialModel == "" ||
      term == "" ||
      prePaymentPercent == ""
    ) {
      toast({
        title: "Please fill all the fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      if (prePaymentPercent === "0") {
        setSolutionArr((prev) => [...prev, objfor0]);
      } else {
        setSolutionArr((prev) => [...prev, objfor25]);
      }

      let date = new Date();
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(date);

      if (prePaymentPercent === "0") {
        let obj = {
          projectName: name,
          address,
          vertical,
          region,
          numberOfBuildings,
          projectSize,
          labourImpact,
          conduitRequired,
          sqFtRange,
          tier,
          dealStatus,
          classOfService,
          service,
          dealType,
          financialModel,
          term,
          prePaymentPercent,
          date: formattedDate,
          userId: userData.userId,
          obj: objfor0,
        };
        // setSaveArr((prev)=>[...prev, obj]);
        console.log(obj);
        const response = await axios.post(`${api_domain}save/adddata`, obj);
      } else {
        let obj = {
          projectName: name,
          address,
          vertical,
          region,
          numberOfBuildings,
          projectSize,
          labourImpact,
          conduitRequired,
          sqFtRange,
          tier,
          dealStatus,
          classOfService,
          service,
          dealType,
          financialModel,
          term,
          prePaymentPercent,
          userId: userData.userId,
          date: formattedDate,
          obj: objfor25,
        };
        console.log(obj);
        const response = await axios.post(`${api_domain}save/adddata`, obj);
        // setSaveArr((prev)=>[...prev, obj]);
      }
    }
  };

  const handleSave = async () => {
    console.log(saveArr, "savearr");
    let saveObj = {
      data: saveArr,
    };

    try {
      //   if(solutionArr.length>0){
      //   const response = await axios.post(`${api_domain}save/adddata`, saveObj);
      //   console.log(response.status);
      //   if(response.status === 201){
      //     getSaveData();
      //     toast({
      //       title: "The data has been successfully stored.",
      //       status: "success",
      //       duration: 3000,
      //       isClosable: true,
      //       position: "top",
      //     });
      //   }
      // }
      // else{
      //   toast({
      //     title: "There are no computations to preserve.",
      //     status: "error",
      //     duration: 6000,
      //     isClosable: true,
      //     position: "top",
      //   });
      // }
    } catch (error) {}
  };

  const getDependencies = async()=>{
    try {
      

      let data = await axios.get(`${api_domain}dependencies`);
      // console.log(data.data.result[0].classOfService);
      setDependencies(data.data.result[0]);
      } catch (error) {
      console.log(error.message);
    }
  };
  
  useEffect(()=>{
      console.log(dependencies.classOfService);
      if(Object.keys(dependencies).length > 0){
        let classData = dependencies.classOfService;
        let samplearr = [];
        let arrdata = classData.forEach((el)=>{
          if(el[classOfService] ){
            // console.log(el[classOfService]);
            // return el[classOfService];
            samplearr = el[classOfService]
          }
        })
        console.log(samplearr);
        setServiceArr(samplearr)
      }
      // dependencies
  },[classOfService])

  useEffect(()=>{
    console.log(dependencies.service);
    if(Object.keys(dependencies).length > 0){
      let serviceData = dependencies.service;
      let samplearr = [];
      let arrdata = serviceData.forEach((el)=>{
        if(el[service] ){
          // console.log(el[classOfService]);
          // return el[classOfService];
          samplearr = el[service]
        }
      })
      console.log(samplearr);
      setDealTypeArr(samplearr)
    }
    // dependencies
},[service])

  const getSaveData = async () => {
    try {
      let userId = userData.userId;
      // console.log(userId)
      let obj = {
        userId,
      };
      let data = await axios.post(`${api_domain}save`, obj);
      // console.log(data.data.result, "save");
      setData(data.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDealStatus();
    getSaveData();
    getDependencies();
  }, []);

  useEffect(() => {
    if (vertical === "Enterprise") {
      setDealStatus(dealStatusObj.Enterprise);
      setDealStatusColor("#CA0000");
    } else if (vertical === "Hospitality") {
      setDealStatus(dealStatusObj.Hospitality);
      setDealStatusColor("#19B400");
    } else if (vertical === "Office") {
      setDealStatus(dealStatusObj.Office);
      setDealStatusColor("#19B400");
    } else if (vertical === "ParkingGarage") {
      setDealStatus(dealStatusObj.ParkingGarage);
      setDealStatusColor("#19B400");
    } else if (vertical === "Healthcare") {
      setDealStatus(dealStatusObj.Healthcare);
      setDealStatusColor("#19B400");
    } else if (vertical === "HigherEd") {
      setDealStatus(dealStatusObj.HigherEd);
      setDealStatusColor("#CA0000");
    } else if (vertical === "Government") {
      setDealStatus(dealStatusObj.Government);
      setDealStatusColor("#CA0000");
    } else if (vertical === "Industrial") {
      setDealStatus(dealStatusObj.Industrial);
      setDealStatusColor("#CA0000");
    } else if (vertical === "Manufacturing") {
      setDealStatus(dealStatusObj.Manufacturing);
      setDealStatusColor("#CA0000");
    } else if (vertical === "MixedUse") {
      setDealStatus(dealStatusObj.MixedUse);
      setDealStatusColor("#DB9000");
    } else if (vertical === "Retail") {
      setDealStatus(dealStatusObj.Retail);
      setDealStatusColor("#DB9000");
    } else if (vertical === "Residential") {
      setDealStatus(dealStatusObj.Residential);
      setDealStatusColor("#DB9000");
    } else if (vertical === "PublicVenue") {
      setDealStatus(dealStatusObj.PublicVenue);
      setDealStatusColor("#DB9000");
    } else {
      setDealStatus(""); // Set default value if the condition doesn't match
    }
  }, [vertical]);

  useEffect(() => {
    if (region === "South") {
      if (labourImpact === "yes") {
        setTier(`Tier${+tierObj.South + 1}`);
      } else {
        setTier(`Tier${tierObj.South}`);
      }
    } else if (region === "Southeast") {
      if (labourImpact === "yes") {
        setTier(`Tier${+tierObj.Southeast + 1}`);
      } else {
        setTier(`Tier${tierObj.Southeast}`);
      }
    } else if (region === "Northeast") {
      if (labourImpact === "yes") {
        setTier(`Tier${+tierObj.Northeast + 1}`);
      } else {
        setTier(`Tier${tierObj.Northeast}`);
      }
    } else if (region === "Midwest") {
      if (labourImpact === "yes") {
        setTier(`Tier${+tierObj.Midwest + 1}`);
      } else {
        setTier(`Tier${tierObj.Midwest}`);
      }
    } else if (region === "Northwest") {
      if (labourImpact === "yes") {
        setTier(`Tier${+tierObj.Northwest + 1}`);
      } else {
        setTier(`Tier${tierObj.Northwest}`);
      }
    } else if (region === "West") {
      if (labourImpact === "yes") {
        setTier(`Tier${+tierObj.West + 1}`);
      } else {
        setTier(`Tier${tierObj.West}`);
      }
    }
  }, [region, labourImpact]);

  useEffect(() => {
    if (projectSize < 250001) {
      setSqFtRange(sqFtRangeObj.lt250001);
    } else if (projectSize > 250000 && projectSize < 500001) {
      setSqFtRange(sqFtRangeObj.gt250000andlt500001);
    } else if (projectSize > 500000 && projectSize < 1000001) {
      setSqFtRange(sqFtRangeObj.gt500000andlt1000001);
    } else if (projectSize > 1000000 && projectSize < 1500001) {
      setSqFtRange(sqFtRangeObj.gt1000000andlt1500001);
    } else if (projectSize > 1500000 && projectSize < 2000001) {
      setSqFtRange(sqFtRangeObj.gt1500000andlt2000001);
    } else if (projectSize > 2000000) {
      setSqFtRange(sqFtRangeObj.gt2000000);
    }
  }, [projectSize]);

  useEffect(() => {
    let calculateBopRate = `${vertical}${sqFtRange}${tier}${classOfService}${service}${dealType}${financialModel}`;
    // console.log(calculateBopRate, "string");
    const result = dataArray.filter((el) => el.Lookup === calculateBopRate);
    // console.log(result, "filtered array");

    if (result.length > 0) {
      // console.log(result);
      let boprate = result[0]["BuildingOwnerRateSF"];
      if (vertical === "ParkingGarage" && conduitRequired === "yes") {
        boprate = boprate * 1.2;
      } else if (vertical === "ParkingGarage" && conduitRequired === "no") {
        boprate = boprate * 0.8;
      }
      // console.log(boprate, "boprateeee");
      // setBopRate(boprate);
      let escalator = 0.03;
      let CRE = 0.045;
      let finalResult = calculate0(projectSize, boprate, escalator, CRE, term);
      console.log(boprate, "final");
      if (boprate / 1 == boprate) {
        boprate = "Approved";
      } else if (boprate === "DealDeskDealCommittee") {
        boprate = "DealCommittee";
      }
      // console.log(boprate, "shenduk");
      let final25 = calculate25(
        finalResult.npv,
        escalator,
        term, 
        0.25,
        finalResult.firstEMI0,
        finalResult.total0
      );
        
      setObjfor0({
        recurringFees: finalResult.firstEMI0,
        prePayment: 0,
        reducedAnnualOpex: finalResult.firstEMI0,
        npv: finalResult.npv,
        totalCost: finalResult.total0,
        tovDiscount: 0.0,
        dealStatusF: boprate,
        projectName: name,
        address,
        vertical,
        region,
        numberOfBuildings,
        projectSize,
        labourImpact,
        conduitRequired,
        sqFtRange,
        tier,
        dealStatus,
        classOfService,
        service,
        dealType,
        financialModel,
        term,
        prePaymentPercent,
      });

      setobjfor25({
        recurringFees: finalResult.firstEMI0,
        prePayment: final25.prepayment25,
        reducedAnnualOpex: final25.firstEMI25,
        npv: finalResult.npv,
        totalCost: final25.total25,
        tovDiscount: final25.discount25,
        dealStatusF: boprate,
        projectName: name,
        address,
        vertical,
        region,
        numberOfBuildings,
        projectSize,
        labourImpact,
        conduitRequired,
        sqFtRange,
        tier,
        dealStatus,
        classOfService,
        service,
        dealType,
        financialModel,
        term,
        prePaymentPercent,
      });
      console.log(objfor0, "sjhdjhsg");
    } else {
      setObjfor0({
        recurringFees: "N/A",
        prePayment: "N/A",
        reducedAnnualOpex: "N/A",
        npv: "N/A",
        totalCost: "N/A",
        tovDiscount: "N/A",
        dealStatusF: "N/A",
        projectName: name,
        address,
        vertical,
        region,
        numberOfBuildings,
        projectSize,
        labourImpact,
        conduitRequired,
        sqFtRange,
        tier,
        dealStatus,
        classOfService,
        service,
        dealType,
        financialModel,
        term,
        prePaymentPercent,
      });

      setobjfor25({
        recurringFees: "N/A",
        prePayment: "N/A",
        reducedAnnualOpex: "N/A",
        npv: "N/A",
        totalCost: "N/A",
        tovDiscount: "N/A",
        dealStatusF: "N/A",
        projectName: name,
        address,
        vertical,
        region,
        numberOfBuildings,
        projectSize,
        labourImpact,
        conduitRequired,
        sqFtRange,
        tier,
        dealStatus,
        classOfService,
        service,
        dealType,
        financialModel,
        term,
        prePaymentPercent,
      });
    }
    // console.log(dealStatusF,"deeeelll");
  }, [
    vertical,
    region,
    numberOfBuildings,
    sqFtRange,
    labourImpact,
    conduitRequired,
    tier,
    classOfService,
    service,
    dealType,
    financialModel,
    projectSize,
    term,
    prePaymentPercent,
    bopRate,
  ]);

  useEffect(() => {
    // Update Service options based on Class of Service
    if (classOfService === "Infrastructure") {
      setServiceOptions(["PublicCellular", "Fiber"]);
    } else if (classOfService === "AccessNetworks") {
      setServiceOptions([
        "Core",
        "Internet",
        "NetworkPrivate",
        "NetworkPublic",
      ]);
    } else {
      setServiceOptions([]);
    }
  }, [classOfService]);

  useEffect(() => {
    // Update Deal Type options based on Service
    if (service === "PublicCellular") {
      setDealTypeOptions([
        "1-Carrier",
        "2-Carrier",
        "3-Carrier",
        "NoBOP",
        "CarrierPursuit",
        "Colo",
      ]);
    } else {
      setDealTypeOptions(["OwnerNetwork"]);
    }
  }, [service]);

  return (
    <Box w={"100vw"} bgColor={"gray.200 "}>
      <Flex w={"100%"} h={"100vh"} pt={2} pb={2} pl={2}>
        <Box
          w={"20%"}
          bgColor={"white"}
          display={"flex"}
          flexDirection={"column"}
          pb={0.5}
          border={"0px solid red"}
          borderRadius={10}
        >
          <Flex
            height={"10%"}
            w={"90%"}
            bgColor={"gray.200"}
            m={"auto"}
            mt={3}
            borderRadius={10}
            alignItems={"center"}
            pl={1}
            pr={2}
          >
            <Box w={"14"}>
              <Image w={"80%"} src={dp} />
            </Box>

            <Box w={"86%"} fontSize={14} textAlign={"left"}>
              <Text fontWeight={"600"}>{userData.username}</Text>
              <Text fontWeight={"500"}>{userData.role}</Text>
              <Text fontSize={11}>last Login : {userData.time}</Text>
            </Box>

            <UserModal />
          </Flex>
          <Flex
            className="footer"
            justifyContent={"space-around"}
            alignItems={"center"}
            w={"92%"}
            h={"7%"}
            alignSelf={"center"}
            justifySelf={"flex-end"}
          >
            <HistoryModal data={data} />
            <LogoutConfirm />
          </Flex>
        </Box>
        <Box w={"80%"} pr={2} pl={2} border={"0px solid red"}>
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            pr={10}
            bgColor={"white"}
            h={"32.5%"}
            borderRadius={10}
          >
            <Box w={"30%"} h={"100%"} borderRadius={10}>
              <Image w={"92%"} borderRadius={10} src={map} />
            </Box>
            <Box w={"70%"} display={"grid"} border={"0px solid blue"}>
              <Box
                w={"100%"}
                m={"auto"}
                mt={2}
                rowGap={3}
                display={"grid"}
                alignItems={"center"}
                gridTemplateColumns={"repeat(2, 1fr)"}
                justifyContent={"space-between"}
                textAlign={"left"}
                columnGap={6}
                border={"0px solid red"}
              >
                <HStack justifyContent={"space-between"}>
                  <Text fontWeight={"500"} fontSize={15}>
                    Name :
                  </Text>
                  <Input
                    size={"sm"}
                    bgColor={"gray.200 "}
                    w={"70%"}
                    placeholder="Enter project name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text fontWeight={"500"} fontSize={15}>
                    Address :
                  </Text>
                  <Input
                    size={"sm"}
                    bgColor={"gray.200 "}
                    w={"70%"}
                    placeholder="Enter address"
                    value={address}
                    onChange={handleAddressChange}
                  />
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text fontWeight={"500"} fontSize={15}>
                    Vertical :
                  </Text>
                  <Select
                    size={"sm"}
                    bgColor={"gray.200 "}
                    w={"70%"}
                    value={vertical}
                    onChange={handleVerticalChange}
                  >
                    <option value="">Select Vertical</option>
                    {Object.keys(dealStatusObj).map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                  </Select>
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text fontWeight={"500"} fontSize={15}>
                    Region :
                  </Text>
                  <Select
                    size={"sm"}
                    ml={2}
                    bgColor={"gray.200 "}
                    w={"70%"}
                    value={region}
                    onChange={handleRegionChange}
                  >
                    <option value="">Select Region</option>
                    {Object.keys(tierObj).map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                  </Select>
                </HStack>
                <HStack
                  justifyContent={"space-between"}
                  textAlign={"left"}
                  alignItems={"center"}
                >
                  <Text fontWeight={"500"} fontSize={15}>
                    No. of buildings:{" "}
                  </Text>
                  <Input
                    size={"sm"}
                    bgColor={"gray.200 "}
                    w={"70%"}
                    placeholder="Enter no. of buildings"
                    value={numberOfBuildings}
                    onChange={handleNumberOfBuildingsChange}
                  />
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text fontWeight={"500"} fontSize={15}>
                    Project size(SqFt) :
                  </Text>
                  <Input
                    size={"sm"}
                    bgColor={"gray.200 "}
                    w={"60%"}
                    placeholder="Enter size of project"
                    value={projectSize}
                    onChange={handleProjectSizeChange}
                  />
                  <Text fontWeight={"500"} fontSize={15}>
                    Avg:
                  </Text>
                  <Text
                    size={"sm"}
                    bgColor={"gray.200 "}
                    w={"40%"}
                    textAlign={"center"}
                    fontSize={15}
                    pt={1}
                    pb={1}
                  >
                    {avg}
                  </Text>
                </HStack>
                <RadioGroup
                  value={labourImpact}
                  onChange={handleLabourImpactChange}
                >
                  <Flex columnGap={6}>
                    <Text fontWeight={"500"} fontSize={15}>
                      Labour Impact:
                    </Text>
                    <Radio size={"md"} value="yes">
                      Yes
                    </Radio>
                    <Radio size={"md"} value="no">
                      No
                    </Radio>
                  </Flex>
                </RadioGroup>
                {vertical === "ParkingGarage" && (
                  <RadioGroup
                    value={conduitRequired}
                    onChange={handleConduitRequiredChange}
                  >
                    <Flex columnGap={6}>
                      <Text fontSize={15} fontWeight={"500"}>
                        Conduit Required:
                      </Text>
                      <Radio size={"md"} value="yes">
                        Yes
                      </Radio>
                      <Radio size={"md"} value="no">
                        No
                      </Radio>
                    </Flex>
                  </RadioGroup>
                )}
              </Box>
              <Box
                w={"75%"}
                border={"0px solid red"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                justifySelf="flex-end"
              >
                <HStack>
                  <Text fontWeight={"500"} fontSize={15}>
                    Sq.Ft.Range:
                  </Text>
                  <Text
                    border={"none"}
                    borderRadius={10}
                    bgColor={"#6D91D6"}
                    w={"100px"}
                    h={"30px"}
                    color={"white"}
                  >
                    {sqFtRange}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontWeight={"500"} fontSize={15}>
                    Pricing Tier:
                  </Text>
                  <Text
                    border={"none"}
                    borderRadius={10}
                    bgColor={"#DB9000"}
                    w={"100px"}
                    h={"30px"}
                    color={"white"}
                  >
                    {tier}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontWeight={"500"} fontSize={15}>
                    Deal Status:
                  </Text>
                  <Text
                    border={"none"}
                    borderRadius={10}
                    bgColor={dealStatusColor}
                    w={"150px"}
                    h={"30px"}
                    color={"white"}
                  >
                    {dealStatus}
                  </Text>
                </HStack>
              </Box>
            </Box>
          </Flex>
          <Flex
            borderRadius={10}
            pt={2.5}
            flexDirection={"column"}
            w={"100%"}
            h={"18%"}
            mt={2}
            bgColor={"white"}
          >
            <Flex
              justifyContent={"space-around"}
              alignItems={"center"}
              w={"100%"}
            >
              <VStack w={"14%"}>
                <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                  Class of Service
                </Text>
                <Select
                  size={"sm"}
                  bgColor={"gray.200 "}
                  value={classOfService}
                  onChange={(e) => setClassOfService(e.target.value)}
                >
                  <option value="">Select</option>
                  {classOfServiceArr.length > 0 &&
                    classOfServiceArr.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                </Select>
              </VStack>
              <VStack w={"14%"}>
                <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                  Service
                </Text>
                <Select
                  size={"sm"}
                  bgColor={"gray.200 "}
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="">Select</option>
                  {serviceArr.length > 0 &&
                    serviceArr.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                </Select>
              </VStack>
              <VStack w={"14%"}>
                <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                  Deal Type
                </Text>
                <Select
                  size={"sm"}
                  bgColor={"gray.200 "}
                  value={dealType}
                  onChange={(e) => setDealType(e.target.value)}
                >
                  <option value="">Select</option>
                  {dealTypeArr.length > 0 &&
                    dealTypeArr.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                </Select>
              </VStack>
              <VStack w={"14%"}>
                <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                  Financial Model
                </Text>
                <Select
                  size={"sm"}
                  bgColor={"gray.200 "}
                  value={financialModel}
                  onChange={(e) => setFinancialModel(e.target.value)}
                >
                  <option value="">Select</option>
                  {financialModelArr.length > 0 &&
                    financialModelArr.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                </Select>
              </VStack>
              <VStack w={"8%"}>
                <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                  Term (Yrs)
                </Text>
                <Select
                  size={"sm"}
                  bgColor={"gray.200 "}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="10">10</option>
                </Select>
              </VStack>
              <VStack w={"10%"}>
                <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                  Pre-Payment(%)
                </Text>
                <Select
                  size={"sm"}
                  bgColor={"gray.200 "}
                  value={prePaymentPercent}
                  onChange={(e) => setprePaymentPercent(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="0">0</option>
                  <option value="25">25</option>
                </Select>
              </VStack>
            </Flex>
            <Flex
              mr={4}
              w={"13%"}
              mt={4}
              alignItems={"center"}
              border={"0px solid red"}
              alignSelf={"flex-end"}
              justifyContent={"space-between"}
            >
              <Button
                size={"sm"}
                bgColor={"#8DB23F"}
                w={"68%"}
                onClick={handleCalculate}
              >
                Calculate
              </Button>
              <Tooltip label="Reset">
                <Button size={"sm"}>
                  <GrPowerReset color="#8DB23F" size={20} />
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
          <Flex
            borderRadius={10}
            w={"100%"}
            bg={"white"}
            h={"47%"}
            mt={2}
            border={"0px solid red"}
          >
            <Tabs
              display={"flex"}
              flexDirection={"column"}
              border={"0px solid red"}
              variant="unstyled"
              w={"100%"}
              pt={1}
            >
              <TabList
                border={"0px solid red"}
                gap={2}
                pr={2}
                alignSelf={"flex-end"}
                size="sm"
                alignItems={"center"}
              >
                <Tab
                  _selected={{ color: "white", bg: "#8DB23F" }}
                  borderLeftRadius={20}
                  bg={"gray.200"}
                  fontSize={15}
                >
                  Solution
                </Tab>
                <Tab
                  fontSize={15}
                  ml={-2}
                  _selected={{ color: "white", bg: "#8DB23F" }}
                  size="sm"
                  borderRightRadius={20}
                  display={"flex"}
                  flexDirection={"column"}
                  bg={"gray.200"}
                >
                  <Text>Per Sq.Ft Solution</Text>
                </Tab>
                <Tooltip label="Download Excel">
                  <Button borderRadius={12} size={"sm"} bg={"gray.200"}>
                    <SiMicrosoftexcel color="green" size={23} />
                  </Button>
                </Tooltip>
                {/* <Tooltip label="Save">
                  <Button
                    borderRadius={12}
                    size={"sm"}
                    bg={"gray.200"}
                    onClick={handleSave}
                  >
                    <FaSave color={"green"} size={23} />
                  </Button>
                </Tooltip> */}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SolutionTable data={solutionArr}  />
                </TabPanel>
                <TabPanel>
                  <UnitSolutionTable
                    data={solutionArr}
                    projectSize={projectSize}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
