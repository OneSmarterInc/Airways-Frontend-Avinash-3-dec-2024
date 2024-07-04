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
  Divider,
  Heading,
} from "@chakra-ui/react";
import { BsBuildingsFill } from "react-icons/bs";
import { TbRulerMeasure } from "react-icons/tb";
import { ImMan } from "react-icons/im";
import { MdOutlineLineStyle } from "react-icons/md";
import { GiNetworkBars } from "react-icons/gi";
import { useContext } from "react";
import MyContext from "./ContextApi/MyContext";

const HistoryModal = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const onLoad = (el)=>{

    let obj = {
      recurringFees: el.obj.recurringFees,
      prePayment: el.obj.prePayment,
      reducedAnnualOpex: el.obj.reducedAnnualOpex,
      npv: el.obj.npv,
      totalCost: el.obj.totalCost,
      tovDiscount: el.obj.tovDiscount,
      dealStatus: el.obj.dealStatus,
    }
    setSolutionArr((prev)=>[...prev,obj])
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
    onClose();
  }

  return (
    <>
      <Button w={"75%"} onClick={onOpen}>
        View History
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent bg={"gray.200"}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody overflow="auto" maxH={500}>
            {data.length > 0 ? (
              data.map((el, i) => (
                <Flex
                  key={i}
                  height={"10%"}
                  w={"100%"}
                  bg={"white"}
                  m={"auto"}
                  mt={3}
                  borderRadius={10}
                  alignItems={"center"}
                  pl={4}
                  pr={4}
                  pt={5}
                  pb={5}
                >
                  <Flex
                    flexDirection={"column"}
                    rowGap={5}
                    w={"35%"}
                    border={"0px solid red"}
                  >
                    <Flex border={"0px solid black"} columnGap={6}>
                      <VStack alignItems={"flex-start"} gap={-1}>
                        <Text fontWeight={500} fontSize={20}>
                          {el.projectName}
                        </Text>
                        <Text fontSize={15}>{el.address}</Text>
                      </VStack>
                      <HStack>
                        <Divider
                          border={"1px solid gray"}
                          h={10}
                          orientation="vertical"
                        />
                        <Text fontWeight={500} fontSize={20}>
                          {el.vertical}
                        </Text>
                      </HStack>
                    </Flex>
                    <Flex columnGap={6} border={"0px solid red"}>
                      <HStack>
                        <BsBuildingsFill /> <Text>{el.numberOfBuildings}</Text>
                      </HStack>
                      <HStack>
                        <TbRulerMeasure />
                        <Text>{el.projectSize} sq.ft.</Text>
                      </HStack>
                      <Text>{el.sqFtRange} range</Text>
                    </Flex>
                    <Flex columnGap={6}>
                      <HStack>
                        <ImMan />
                        <Text>{el.labourImpact === "no" ? "No" : "Yes"}</Text>
                      </HStack>
                      <HStack>
                        <MdOutlineLineStyle />

                        <Text>
                          {el.conduitRequired === "no" ? "No" : "Yes"}
                        </Text>
                      </HStack>
                      <HStack>
                        <GiNetworkBars
                          style={{ transform: `rotate(270deg) scale(-1,1)` }}
                        />
                        <Text>{el.tier}</Text>
                      </HStack>
                    </Flex>
                    <Button
                      w={"60%"}
                      bg={
                        (el.dealStatus === "Approved" && "#19B400") ||
                        (el.dealStatus === "Deal Committee" && "#CA0000") ||
                        (el.dealStatus === "Deal Desk" && "#DB9000")
                      }
                      color={"white"}
                    >
                      {el.dealStatus}
                    </Button>
                  </Flex>
                  <Divider
                    orientation="vertical"
                    h={200}
                    mr={5}
                    border="1px solid gray"
                  />
                  <Flex
                    flexDirection={"column"}
                    rowGap={6}
                    w={"65%"}
                    border={"0px solid blue"}
                  >
                    <Flex justifyContent={"space-between"}>
                      <Text fontWeight={500}>{el.classOfService}</Text>
                      <Divider
                        border={"1px solid gray"}
                        h={5}
                        orientation="vertical"
                      />
                      <Text fontWeight={500}>{el.service}</Text>
                      <Divider
                        border={"1px solid gray"}
                        h={5}
                        orientation="vertical"
                      />
                      <Text fontWeight={500}>{el.dealType}</Text>{" "}
                      <Divider
                        border={"1px solid gray"}
                        h={5}
                        orientation="vertical"
                      />
                      <Text fontWeight={500}>{el.financialModel}</Text>{" "}
                      <Divider
                        border={"1px solid gray"}
                        h={5}
                        orientation="vertical"
                      />
                      <Text fontWeight={500}>{el.term}yr</Text>{" "}
                      <Divider
                        border={"1px solid gray"}
                        h={5}
                        orientation="vertical"
                      />
                      <Text fontWeight={500}>{el.prePaymentPercent}%</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                      <VStack gap={1}>
                        <Text fontWeight={500}>Annual BOP</Text>
                        <Text>$ {el.obj.recurringFees}</Text>
                        <Divider border={"1px solid gray"} />
                        <Text>
                          $ {(el.obj.recurringFees / el.projectSize).toFixed(3)}
                        </Text>
                      </VStack>

                      <VStack gap={1}>
                        <Text fontWeight={500}>Pre-Payment</Text>
                        <Text>$ {el.obj.prePayment}</Text>
                        <Divider border={"1px solid gray"} />
                        <Text>
                          $ {(el.obj.prePayment / el.projectSize).toFixed(3)}
                        </Text>
                      </VStack>
                      <VStack gap={1}>
                        <Text fontWeight={500}>Reduced OPEX</Text>
                        <Text>$ {el.obj.reducedAnnualOpex}</Text>
                        <Divider border={"1px solid gray"} />
                        <Text>
                          ${" "}
                          {(el.obj.reducedAnnualOpex / el.projectSize).toFixed(
                            3
                          )}
                        </Text>
                      </VStack>
                      <VStack gap={1}>
                        <Text fontWeight={500}>NPV</Text>
                        <Text>$ {el.obj.npv}</Text>
                        <Divider border={"1px solid gray"} />
                        <Text>
                          $ {(el.obj.npv / el.projectSize).toFixed(3)}
                        </Text>
                      </VStack>
                      <VStack gap={1}>
                        <Text fontWeight={500}>Total Cost</Text>
                        <Text>$ {el.obj.totalCost}</Text>
                        <Divider border={"1px solid gray"} />
                        <Text>
                          $ {(el.obj.totalCost / el.projectSize).toFixed(3)}
                        </Text>
                      </VStack>
                      <VStack>
                        <Text fontWeight={500}>Total Discount</Text>
                        <Text>{el.obj.tovDiscount}%</Text>
                      </VStack>
                    </Flex>
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"flex-end"}
                    >
                      <Text fontWeight={500}>{el.date}</Text>
                      <Button onClick={()=>onLoad(el)} w={"20%"} bg={"#8DB23F"} color={"white"}>
                        Load
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              ))
            ) : (
              <Text fontSize={25} fontWeight={600} textAlign={"center"}>
                No history found
              </Text>
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

export default HistoryModal;
