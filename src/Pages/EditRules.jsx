import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  HStack,
  Input,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import MyContext from "../Component/ContextApi/MyContext";
import axios from "axios";
import "./EditRules.css";
const EditRules = () => {
  const [selectedField, setSelectedField] = useState("Deal Status");

  const handleFieldSelection = (field) => {
    setSelectedField(field);
  };

  const [sqFtRangeObj, setSqFtRangeObj] = useState({});
  const [dealStatusObj, setDealStatusObj] = useState({});
  const [tierObj, setTierObj] = useState({});
  const [cre, setCre] = useState("");
  const [escalator, setEscalator] = useState("");
  const [classOfService, setClassOfService] = useState([]);
  const [service, setService] = useState([]);
  const [dealType, setDealType] = useState([]);
  const [financialModel, setFinancialModel] = useState([]);
  const [bopRateData, setBopRateData] = useState([]);
  const [newVertical, setNewVertical] = useState("");
  const [newSqft, setNewSqft] = useState([]);
  const [newtier, setNewTier] = useState([]);
  const [newClassOfService, setNewClassOfService] = useState([]);
  const [newService, setNewService] = useState([]);
  const [newDealType, setNewDealType] = useState([]);
  const [newFinancialModel, setNewFinancialModel] = useState([]);
  const [newBopUpdateArr, setNewBopUpdateArr] = useState([]);
  const [newBopInputArr, setNewBopInputArr] = useState([]);
  const [inputValues, setInputValues] = useState([
    { Lookup: "", BuildingOwnerRateSF: "" },
  ]);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [arrValue, setArrValue] = useState("");
  const [bop, setBop] = useState({
    bopR: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  let [bopObj, setBopObj] = useState({
    vertical: "",
    sqFtRange: "",
    pricingTier: "",
    classOfService: "",
    service: "",
    dealType: "",
    financialModel: "",
  });

  const [selectedClassOfService, setSelectedClassOfService] = useState("");
  const [
    selectedClassOfServiceCheckboxes,
    setSelectedClassOfServiceCheckboxes,
  ] = useState([]);

  const [selectedService, setSelectedService] = useState("");
  const [selectedServiceCheckboxes, setSelectedServiceCheckboxes] = useState(
    []
  );

  const { api_domain } = useContext(MyContext);

  const handleClassOfServiceChangeForDependencies = (e) => {
    setSelectedClassOfService(e.target.value);
  };

  const handleCheckboxChangeForDependencies = (e) => {
    const { value, checked } = e.target;

    // Update the selectedCheckboxes array based on checkbox selection
    if (checked) {
      setSelectedClassOfServiceCheckboxes((prevCheckboxes) => [
        ...prevCheckboxes,
        value,
      ]);
    } else {
      setSelectedClassOfServiceCheckboxes((prevCheckboxes) =>
        prevCheckboxes.filter((checkbox) => checkbox !== value)
      );
    }
  };

  const handleClickForClassOfService = async () => {
    try {
      if (
        selectedClassOfService !== "" &&
        selectedClassOfServiceCheckboxes.length > 0
      ) {
        let obj = {
          fieldToUpdate: "classOfService",
          objectToAdd: {},
        };
        obj.objectToAdd[selectedClassOfService] =
          selectedClassOfServiceCheckboxes;
        // console.log(obj);
        setLoading(true);

        let data = await axios.patch(`${api_domain}dependencies/edit`, obj);
        if (data.status === 200) {
          toast({
            title: "Dependencies added successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setLoading(false);
        }
      } else {
        toast({
          title: "Field cannot be empty.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Network issue, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const handleServiceChangeForDependencies = (e) => {
    setSelectedService(e.target.value);
  };

  const handleServiceCheckboxChangeForDependencies = (e) => {
    const { value, checked } = e.target;

    // Update the selectedCheckboxes array based on checkbox selection
    if (checked) {
      setSelectedServiceCheckboxes((prevCheckboxes) => [
        ...prevCheckboxes,
        value,
      ]);
    } else {
      setSelectedServiceCheckboxes((prevCheckboxes) =>
        prevCheckboxes.filter((checkbox) => checkbox !== value)
      );
    }
  };

  const handleClickForService = async () => {
    try {
      if (selectedService !== "" && selectedServiceCheckboxes.length > 0) {
        let obj = {
          fieldToUpdate: "service",
          objectToAdd: {},
        };
        obj.objectToAdd[selectedService] = selectedServiceCheckboxes;
        // console.log(obj);
        setLoading(true);
        let data = await axios.patch(`${api_domain}dependencies/edit`, obj);
        if (data.status === 200) {
          toast({
            title: "Dependencies added successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setLoading(false);
        }
      } else {
        toast({
          title: "Field cannot be empty.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Network issue, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleNewTierChange = (value) => {
    if (newtier.includes(value)) {
      // If value already exists in the array, remove it
      setNewTier(newtier.filter((item) => item !== value));
    } else {
      // If value doesn't exist in the array, add it
      setNewTier([...newtier, value]);
    }
  };

  const handleNewSqftChange = (value) => {
    if (newSqft.includes(value)) {
      // If value already exists in the array, remove it
      setNewSqft(newSqft.filter((item) => item !== value));
    } else {
      // If value doesn't exist in the array, add it
      setNewSqft([...newSqft, value]);
    }
  };

  const handleNewClassOfServiceChange = (value) => {
    if (newClassOfService.includes(value)) {
      // If value already exists in the array, remove it
      setNewClassOfService(newClassOfService.filter((item) => item !== value));
    } else {
      // If value doesn't exist in the array, add it
      setNewClassOfService([...newClassOfService, value]);
    }
  };

  const handleNewServiceChange = (value) => {
    if (newService.includes(value)) {
      // If value already exists in the array, remove it
      setNewService(newService.filter((item) => item !== value));
    } else {
      // If value doesn't exist in the array, add it
      setNewService([...newService, value]);
    }
  };

  const handleNewDealTypeChange = (value) => {
    if (newDealType.includes(value)) {
      // If value already exists in the array, remove it
      setNewDealType(newDealType.filter((item) => item !== value));
    } else {
      // If value doesn't exist in the array, add it
      setNewDealType([...newDealType, value]);
    }
  };

  const handleNewFinancialModelChange = (value) => {
    if (newFinancialModel.includes(value)) {
      // If value already exists in the array, remove it
      setNewFinancialModel(newFinancialModel.filter((item) => item !== value));
    } else {
      // If value doesn't exist in the array, add it
      setNewFinancialModel([...newFinancialModel, value]);
    }
  };

  const handleClick = () => {
    // console.log(newSqft);
    if (
      newSqft.length > 0 &&
      newtier.length > 0 &&
      newClassOfService.length > 0 &&
      newService.length > 0 &&
      newDealType.length > 0 &&
      newFinancialModel.length > 0 &&
      newVertical !== ""
    ) {
      let arrbop = [];
      for (const i of newSqft) {
        for (const j of newtier) {
          for (const k of newClassOfService) {
            for (const l of newService) {
              for (const m of newDealType) {
                for (const n of newFinancialModel) {
                  const temp = `${newVertical}${i}${j}${k}${l}${m}${n}`;
                  arrbop.push(temp);
                  setNewBopInputArr((prev) => [...prev, temp]);
                }
              }
            }
          }
        }
      }
    } else {
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleClickForEditBop = async () => {
    // console.log(newSqft);

    try {
      if (
        newSqft.length > 0 &&
        newtier.length > 0 &&
        newClassOfService.length > 0 &&
        newService.length > 0 &&
        newDealType.length > 0 &&
        newFinancialModel.length > 0 &&
        newVertical !== ""
      ) {
        let arrbop = [];
        for (const i of newSqft) {
          for (const j of newtier) {
            for (const k of newClassOfService) {
              for (const l of newService) {
                for (const m of newDealType) {
                  for (const n of newFinancialModel) {
                    const temp = `${newVertical}${i}${j}${k}${l}${m}${n}`;
                    arrbop.push(temp);
                  }
                }
              }
            }
          }
        }

        console.log(arrbop);
        // let temparr =
        // [
        //       "Office250K-500KTier2InfrastructurePublicCellular1-CarrierOPEX",
        //       "Office<250KTier2InfrastructurePublicCellular1-CarrierCAPEX"
        // ]

        let data = await axios.post(`${api_domain}boprate/getbylookup`, arrbop);
        console.log(data.data.result);
        setNewBopUpdateArr(data.data.result);
        // console.log(newBopUpdateArr,"upppp");
      } else {
        toast({
          title: "Please fill all the fields",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast({
          title: "No Data found",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        console.error("An error occurred:", error.message);
        // Handle other types of errors if needed
      }
    }
  };

  //   useEffect(()=>{
  //  console.log(newBopUpdateArr,"neeeeeeee");

  //   },[newBopUpdateArr])
  const handleInputChangeForUpdateBop = (index, value) => {
    const updatedArr = [...newBopUpdateArr];
    updatedArr[index].BuildingOwnerRateSF = value; // Update the specific element
    setNewBopUpdateArr(updatedArr); // Update the state with the modified array
  };

  const handleUpdateBopRate = async () => {
    try {
      setLoading(true);
      let data = await axios.patch(
        `${api_domain}boprate/edit`,
        newBopUpdateArr
      );
      if (data.status === 200) {
        toast({
          title: "BOP rates updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setNewSqft([]);
        setNewTier([]);
        setNewClassOfService([]);
        setNewService([]);
        setNewDealType([]);
        setNewFinancialModel([]);
        setNewVertical("");
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Network issue, please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const handleAddNewBopRate = async () => {
    try {
      setLoading(true);
      let data = await axios.post(`${api_domain}boprate/addbop`, inputValues);

      
      if (data.status === 201) {
        toast({
          title: "New BOP rates added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        setNewSqft([]);
        setNewTier([]);
        setNewClassOfService([]);
        setNewService([]);
        setNewDealType([]);
        setNewFinancialModel([]);
        setNewVertical("");
      } else if (data.status === 200) {
        // Handle specific error cases based on different status codes or other conditions
        toast({
          title: "Combinations already added.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Network issue, please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const getDealStatus = async () => {
    try {
      let data = await axios.get(`${api_domain}rules`);
      // console.log(typeof data.data.result.dealStatus, "arrreeee");
      setDealStatusObj(data.data.result.dealStatus);
      setTierObj(data.data.result.pricingTier);
      setSqFtRangeObj(data.data.result.sqFtRange);
      setCre(data.data.result.cre);
      setEscalator(data.data.result.escalator);
      setClassOfService(data.data.result.classOfService);
      setService(data.data.result.service);
      setDealType(data.data.result.dealType);
      setFinancialModel(data.data.result.financialModel);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBOP = async () => {
    try {
      let data = await axios.get(`${api_domain}boprate`);
      // console.log(data.data.result);
      setBopRateData(data.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const convertToDesiredFormat = () => {
    const convertDealStatus = Object.keys(dealStatusObj).map((key) => ({
      key,
      value: dealStatusObj[key],
    }));

    const convertPricingTier = Object.keys(tierObj).map((key) => ({
      key,
      value: tierObj[key],
    }));

    const convertSqFtRange = Object.keys(sqFtRangeObj).map((key) => ({
      key,
      value: sqFtRangeObj[key],
    }));

    const transformedObj = {
      dealStatus: convertDealStatus,
      pricingTier: convertPricingTier,
      sqFtRange: convertSqFtRange,
      cre,
      escalator: escalator,
      classOfService,
      service,
      dealType,
      financialModel,
    };

    return transformedObj;
  };

  const handleSave = async () => {
    try {
      const transformedObj = convertToDesiredFormat();
      console.log(transformedObj);

      setLoading(true);
      await axios.patch(
        `${api_domain}rules/edit/657d8a046416bde491bb1056`,
        transformedObj
      );
      toast({
        title: "The rule has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Failed to update the rule, please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const addNewDealStatus = async () => {
    if (newKey === "" || newValue === "") {
      toast({
        title: "Please fill both the fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      let dealobj = {
        ...dealStatusObj,
        [newKey]: newValue,
      };

      const convertDealStatus = Object.keys(dealobj).map((key) => ({
        key,
        value: dealobj[key],
      }));

      const convertPricingTier = Object.keys(tierObj).map((key) => ({
        key,
        value: tierObj[key],
      }));

      const convertSqFtRange = Object.keys(sqFtRangeObj).map((key) => ({
        key,
        value: sqFtRangeObj[key],
      }));

      const transformedObj = {
        dealStatus: convertDealStatus,
        pricingTier: convertPricingTier,
        sqFtRange: convertSqFtRange,
        cre,
        escalator: escalator,
        classOfService,
        service,
        dealType,
        financialModel,
      };

      setNewKey("");
      setNewValue("");

      try {
        console.log(transformedObj, "transss");

        setLoading(true);
        await axios.patch(
          `${api_domain}rules/edit/657d8a046416bde491bb1056`,
          transformedObj
        );
        toast({
          title: "The rule has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        getDealStatus();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast({
          title: "Failed to update the rule, please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  const addNewTier = async () => {
    if (newKey === "" || newValue === "") {
      toast({
        title: "Please fill both the fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      let tier = {
        ...tierObj,
        [newKey]: +newValue,
      };
      // console.log(tier, "tierrrr");
      const convertDealStatus = Object.keys(dealStatusObj).map((key) => ({
        key,
        value: dealStatusObj[key],
      }));

      const convertPricingTier = Object.keys(tier).map((key) => ({
        key,
        value: tier[key],
      }));

      const convertSqFtRange = Object.keys(sqFtRangeObj).map((key) => ({
        key,
        value: sqFtRangeObj[key],
      }));

      // console.log(convertPricingTier,"pppppp");

      const transformedObj = {
        dealStatus: convertDealStatus,
        pricingTier: convertPricingTier,
        sqFtRange: convertSqFtRange,
        cre,
        escalator: escalator,
        classOfService,
        service,
        dealType,
        financialModel,
      };

      setNewKey("");
      setNewValue("");

      try {
        // const transformedObj = convertToDesiredFormat();
        console.log(transformedObj, "tireetrasnnss");

        setLoading(true);
        await axios.patch(
          `${api_domain}rules/edit/657d8a046416bde491bb1056`,
          transformedObj
        );
        toast({
          title: "The rule has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        getDealStatus();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast({
          title: "Failed to update the rule, please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  const addNewPricingRange = async () => {
    if (newKey === "" || newValue === "") {
      toast({
        title: "Please fill both the fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      let rangeobj = {
        ...sqFtRangeObj,
        [newKey]: newValue,
      };

      const convertDealStatus = Object.keys(dealStatusObj).map((key) => ({
        key,
        value: dealStatusObj[key],
      }));

      const convertPricingTier = Object.keys(tierObj).map((key) => ({
        key,
        value: tierObj[key],
      }));

      const convertSqFtRange = Object.keys(rangeobj).map((key) => ({
        key,
        value: rangeobj[key],
      }));

      const transformedObj = {
        dealStatus: convertDealStatus,
        pricingTier: convertPricingTier,
        sqFtRange: convertSqFtRange,
        cre,
        escalator: escalator,
        classOfService,
        service,
        dealType,
        financialModel,
      };

      setNewKey("");
      setNewValue("");

      try {
        // const transformedObj = convertToDesiredFormat();
        console.log(transformedObj, "transss");

        setLoading(true);
        await axios.patch(
          `${api_domain}rules/edit/657d8a046416bde491bb1056`,
          transformedObj
        );
        toast({
          title: "The rule has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        getDealStatus();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast({
          title: "Failed to update the rule, please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const addNewClassOfService = async () => {
    if (arrValue === "") {
      toast({
        title: "Field is empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      let classs = [...classOfService, arrValue];

      const convertDealStatus = Object.keys(dealStatusObj).map((key) => ({
        key,
        value: dealStatusObj[key],
      }));

      const convertPricingTier = Object.keys(tierObj).map((key) => ({
        key,
        value: tierObj[key],
      }));

      const convertSqFtRange = Object.keys(sqFtRangeObj).map((key) => ({
        key,
        value: sqFtRangeObj[key],
      }));

      const transformedObj = {
        dealStatus: convertDealStatus,
        pricingTier: convertPricingTier,
        sqFtRange: convertSqFtRange,
        cre,
        escalator: escalator,
        classOfService: classs,
        service,
        dealType,
        financialModel,
      };

      try {
        // const transformedObj = convertToDesiredFormat();
        console.log(transformedObj, "transss");

        setLoading(true);
        await axios.patch(
          `${api_domain}rules/edit/657d8a046416bde491bb1056`,
          transformedObj
        );
        toast({
          title: "The rule has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        getDealStatus();
        setLoading(false);
        setArrValue("");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast({
          title: "Failed to update the rule, please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  const addNewService = async () => {
    if (arrValue === "") {
      toast({
        title: "Field is empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      let servicee = [...service, arrValue];

      const convertDealStatus = Object.keys(dealStatusObj).map((key) => ({
        key,
        value: dealStatusObj[key],
      }));

      const convertPricingTier = Object.keys(tierObj).map((key) => ({
        key,
        value: tierObj[key],
      }));

      const convertSqFtRange = Object.keys(sqFtRangeObj).map((key) => ({
        key,
        value: sqFtRangeObj[key],
      }));

      const transformedObj = {
        dealStatus: convertDealStatus,
        pricingTier: convertPricingTier,
        sqFtRange: convertSqFtRange,
        cre,
        escalator: escalator,
        classOfService,
        service: servicee,
        dealType,
        financialModel,
      };

      try {
        // const transformedObj = convertToDesiredFormat();
        console.log(transformedObj, "transss");

        setLoading(true);
        await axios.patch(
          `${api_domain}rules/edit/657d8a046416bde491bb1056`,
          transformedObj
        );
        toast({
          title: "The rule has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        getDealStatus();
        setLoading(false);
        setArrValue("");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast({
          title: "Failed to update the rule, please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  const addNewDealType = async () => {
    if (arrValue === "") {
      toast({
        title: "Field is empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      let deal = [...dealType, arrValue];

      const convertDealStatus = Object.keys(dealStatusObj).map((key) => ({
        key,
        value: dealStatusObj[key],
      }));

      const convertPricingTier = Object.keys(tierObj).map((key) => ({
        key,
        value: tierObj[key],
      }));

      const convertSqFtRange = Object.keys(sqFtRangeObj).map((key) => ({
        key,
        value: sqFtRangeObj[key],
      }));

      const transformedObj = {
        dealStatus: convertDealStatus,
        pricingTier: convertPricingTier,
        sqFtRange: convertSqFtRange,
        cre,
        escalator: escalator,
        classOfService,
        service,
        dealType: deal,
        financialModel,
      };

      try {
        // const transformedObj = convertToDesiredFormat();
        console.log(transformedObj, "transss");

        setLoading(true);
        await axios.patch(
          `${api_domain}rules/edit/657d8a046416bde491bb1056`,
          transformedObj
        );
        toast({
          title: "The rule has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        getDealStatus();
        setLoading(false);
        setArrValue("");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast({
          title: "Failed to update the rule, please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  const addNewFinancialModel = async () => {
    if (arrValue === "") {
      toast({
        title: "Field is empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      let financial = [...financialModel, arrValue];

      const convertDealStatus = Object.keys(dealStatusObj).map((key) => ({
        key,
        value: dealStatusObj[key],
      }));

      const convertPricingTier = Object.keys(tierObj).map((key) => ({
        key,
        value: tierObj[key],
      }));

      const convertSqFtRange = Object.keys(sqFtRangeObj).map((key) => ({
        key,
        value: sqFtRangeObj[key],
      }));

      const transformedObj = {
        dealStatus: convertDealStatus,
        pricingTier: convertPricingTier,
        sqFtRange: convertSqFtRange,
        cre,
        escalator: escalator,
        classOfService,
        service,
        dealType,
        financialModel: financial,
      };

      try {
        // const transformedObj = convertToDesiredFormat();
        console.log(transformedObj, "transss");

        setLoading(true);
        await axios.patch(
          `${api_domain}rules/edit/657d8a046416bde491bb1056`,
          transformedObj
        );
        toast({
          title: "The rule has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        getDealStatus();
        setLoading(false);
        setArrValue("");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast({
          title: "Failed to update the rule, please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  const handleDealStatusChange = (key, value) => {
    setDealStatusObj({ ...dealStatusObj, [key]: value });
    console.log(dealStatusObj);
  };

  const handleTierChange = (key, value) => {
    setTierObj({ ...tierObj, [key]: value });
  };

  const handleClassOfServiceChange = (i, value) => {
    let updatedArray = [...classOfService];
    updatedArray[i] = value;
    setClassOfService(updatedArray);
    // console.log(classOfService);
  };

  const handleServiceChange = (i, value) => {
    let updatedArray = [...service];
    updatedArray[i] = value;
    setService(updatedArray);
    // console.log(classOfService);
  };

  const handleDealTypeChange = (i, value) => {
    let updatedArray = [...dealType];
    updatedArray[i] = value;
    setDealType(updatedArray);
    // console.log(classOfService);
  };

  const handleFinancialModelChange = (i, value) => {
    let updatedArray = [...financialModel];
    updatedArray[i] = value;
    setFinancialModel(updatedArray);
    // console.log(classOfService);
  };

  const handleRangeChange = (key, value) => {
    setSqFtRangeObj({ ...sqFtRangeObj, [key]: value });
  };

  const handleInputChange = (index, value) => {
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = {
      Lookup: newBopInputArr[index],
      BuildingOwnerRateSF: value,
    };
    setInputValues(updatedInputValues);
  };

  useEffect(() => {
    inputValues;
  }, [inputValues]);

  useEffect(() => {
    console.log(inputValues);
  }, [inputValues]);

  const renderContent = () => {
    if (selectedField === "Deal Status") {
      return (
        <Flex border={"0px solid red"} w={"100%"}>
          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"80%"}
              pt={2}
              pb={2}
            >
              <Text w={"40%"}>Vertical</Text>
              <Text w={"60%"}>Deal Status</Text>
            </HStack>
            {Object.keys(dealStatusObj).map((el) => (
              <HStack
                key={el}
                spacing={4}
                justifyContent={"space-between"}
                w={"80%"}
              >
                <Input
                  textAlign={"center"}
                  w={"40%"}
                  bg={"gray.200"}
                  value={el}
                  isReadOnly
                />
                <Input
                  textAlign={"center"}
                  w={"60%"}
                  bg={"gray.200"}
                  outline={"green"}
                  type="text"
                  value={dealStatusObj[el]}
                  onChange={(e) => handleDealStatusChange(el, e.target.value)}
                />
              </HStack>
            ))}
            <Button
              onClick={handleSave}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </VStack>

          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"70%"}
              pt={2}
              pb={2}
            >
              <Text w={"40%"}>Vertical</Text>
              <Text w={"60%"}>Deal Status</Text>
            </HStack>

            <HStack spacing={4} justifyContent={"space-between"} w={"70%"}>
              <Input
                textAlign={"center"}
                w={"40%"}
                bg={"gray.200"}
                value={newKey}
                placeholder={"enter vertical"}
                onChange={(e) => setNewKey(e.target.value)}
              />
              <Input
                textAlign={"center"}
                w={"60%"}
                bg={"gray.200"}
                outline={"green"}
                type="text"
                value={newValue}
                placeholder={"enter deal status"}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </HStack>

            <Button
              // onClick={handleAdd}
              onClick={addNewDealStatus}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Add New Rule"}
            </Button>
          </VStack>
        </Flex>
      );
    } else if (selectedField === "Pricing Tier") {
      return (
        <Flex border={"0px solid red"} w={"100%"}>
          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"80%"}
              pt={2}
              pb={2}
            >
              <Text w={"40%"}>Region</Text>
              <Text w={"60%"}>Tier</Text>
            </HStack>
            {Object.keys(tierObj).map((el) => (
              <HStack
                key={el}
                spacing={4}
                justifyContent={"space-between"}
                w={"80%"}
              >
                <Input
                  textAlign={"center"}
                  w={"40%"}
                  bg={"gray.200"}
                  value={el}
                  isReadOnly
                />
                <Input
                  textAlign={"center"}
                  w={"60%"}
                  bg={"gray.200"}
                  outline={"green"}
                  type="text"
                  value={tierObj[el]}
                  onChange={(e) => handleTierChange(el, e.target.value)}
                />
              </HStack>
            ))}
            <Button
              onClick={handleSave}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </VStack>

          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"70%"}
              pt={2}
              pb={2}
            >
              <Text w={"40%"}>Region</Text>
              <Text w={"60%"}>Tier</Text>
            </HStack>

            <HStack spacing={4} justifyContent={"space-between"} w={"70%"}>
              <Input
                textAlign={"center"}
                w={"40%"}
                bg={"gray.200"}
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder={"enter region"}
              />
              <Input
                textAlign={"center"}
                w={"60%"}
                bg={"gray.200"}
                outline={"green"}
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder={"enter tier"}
              />
            </HStack>

            <Button
              onClick={addNewTier}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Add New Rule"}
            </Button>
          </VStack>
        </Flex>
      );
    } else if (selectedField === "Range") {
      return (
        <Flex border={"0px solid red"} w={"100%"}>
          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"80%"}
              pt={2}
              pb={2}
            >
              <Text w={"60%"}>Project Size Range</Text>
              <Text w={"40%"}>Sq.Ft. Range</Text>
            </HStack>
            {Object.keys(sqFtRangeObj).map((el) => (
              <HStack
                key={el}
                spacing={4}
                justifyContent={"space-between"}
                w={"80%"}
              >
                <Input
                  textAlign={"center"}
                  w={"60%"}
                  bg={"gray.200"}
                  value={el}
                  isReadOnly
                />
                <Input
                  textAlign={"center"}
                  w={"40%"}
                  bg={"gray.200"}
                  outline={"green"}
                  type="text"
                  value={sqFtRangeObj[el]}
                  onChange={(e) => handleRangeChange(el, e.target.value)}
                />
              </HStack>
            ))}
            <Button
              onClick={handleSave}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </VStack>

          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"70%"}
              pt={2}
              pb={2}
            >
              <Text w={"40%"}>Project Size Range</Text>
              <Text w={"60%"}>Sq.Ft.Range</Text>
            </HStack>

            <HStack spacing={4} justifyContent={"space-between"} w={"70%"}>
              <Input
                textAlign={"center"}
                w={"60%"}
                bg={"gray.200"}
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder={"enter Project Size Range"}
              />
              <Input
                textAlign={"center"}
                w={"40%"}
                bg={"gray.200"}
                outline={"green"}
                type="text"
                value={newValue}
                placeholder={"enter sq.ft.range"}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </HStack>

            <Button
              onClick={addNewPricingRange}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Add New Rule"}
            </Button>
          </VStack>
        </Flex>
      );
    } else if (selectedField === "CRE") {
      return (
        <VStack spacing={4} w={"50%"} m={"auto"} overflow={"auto"} maxH={"85%"}>
          <HStack>
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"30%"}
              pt={2}
              pb={2}
            >
              <Text>CRE %</Text>
            </HStack>

            <HStack spacing={4} justifyContent={"space-between"} w={"70%"}>
              <Input
                textAlign={"center"}
                bg={"gray.200"}
                outline={"green"}
                type="text"
                value={cre}
                placeholder={"enter CRE"}
                onChange={(e) => setCre(e.target.value)}
              />
            </HStack>
          </HStack>
          <Button
            onClick={handleSave}
            w={400}
            pt={2}
            pb={2}
            bg={"#8DB23F"}
            color={"white"}
          >
            {loading ? "Loading..." : "Save Changes"}
          </Button>
        </VStack>
      );
    } else if (selectedField === "Escalator") {
      return (
        <VStack spacing={4} w={"50%"} m={"auto"} overflow={"auto"} maxH={"85%"}>
          <HStack>
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"30%"}
              pt={2}
              pb={2}
            >
              <Text>Escalator %</Text>
            </HStack>

            <HStack spacing={4} justifyContent={"space-between"} w={"70%"}>
              <Input
                textAlign={"center"}
                bg={"gray.200"}
                outline={"green"}
                type="text"
                value={escalator}
                placeholder={"enter CRE"}
                onChange={(e) => setEscalator(e.target.value)}
              />
            </HStack>
          </HStack>
          <Button
            onClick={handleSave}
            w={400}
            pt={2}
            pb={2}
            bg={"#8DB23F"}
            color={"white"}
          >
            {loading ? "Loading..." : "Save Changes"}
          </Button>
        </VStack>
      );
    } else if (selectedField === "Class of Service") {
      return (
        <Flex border={"0px solid red"} w={"100%"}>
          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"80%"}
              pt={2}
              pb={2}
            >
              <Text w={"60%"}>Class of Service</Text>
            </HStack>
            {classOfService.length > 0 &&
              classOfService.map((el, i) => (
                <HStack
                  key={i}
                  spacing={4}
                  justifyContent={"space-between"}
                  w={"80%"}
                >
                  <Input
                    textAlign={"center"}
                    bg={"gray.200"}
                    outline={"green"}
                    type="text"
                    value={el}
                    onChange={(e) =>
                      handleClassOfServiceChange(i, e.target.value)
                    }
                  />
                </HStack>
              ))}
            <Button
              onClick={handleSave}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </VStack>

          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"70%"}
              pt={2}
              pb={2}
            >
              <Text w={"40%"}>Class of Service</Text>
            </HStack>

            <HStack spacing={4} justifyContent={"space-between"} w={"70%"}>
              <Input
                textAlign={"center"}
                bg={"gray.200"}
                outline={"green"}
                type="text"
                value={arrValue}
                onChange={(e) => setArrValue(e.target.value)}
                placeholder={"enter class of service"}
              />
            </HStack>

            <Button
              onClick={addNewClassOfService}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Add New Class of Service"}
            </Button>
          </VStack>
        </Flex>
      );
    } else if (selectedField === "Service") {
      return (
        <Flex border={"0px solid red"} w={"100%"}>
          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"80%"}
              pt={2}
              pb={2}
            >
              <Text w={"60%"}>Service</Text>
            </HStack>
            {service.length > 0 &&
              service.map((el, i) => (
                <HStack
                  key={i}
                  spacing={4}
                  justifyContent={"space-between"}
                  w={"80%"}
                >
                  <Input
                    textAlign={"center"}
                    bg={"gray.200"}
                    outline={"green"}
                    type="text"
                    value={el}
                    onChange={(e) => handleServiceChange(i, e.target.value)}
                  />
                </HStack>
              ))}
            <Button
              onClick={handleSave}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </VStack>

          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"70%"}
              pt={2}
              pb={2}
            >
              <Text w={"40%"}>Service</Text>
            </HStack>

            <HStack spacing={4} justifyContent={"space-between"} w={"70%"}>
              <Input
                textAlign={"center"}
                bg={"gray.200"}
                outline={"green"}
                type="text"
                placeholder={"enter service"}
                value={arrValue}
                onChange={(e) => setArrValue(e.target.value)}
              />
            </HStack>

            <Button
              onClick={addNewService}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Add New Service"}
            </Button>
          </VStack>
        </Flex>
      );
    } else if (selectedField === "Deal Type") {
      return (
        <Flex border={"0px solid red"} w={"100%"}>
          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"80%"}
              pt={2}
              pb={2}
            >
              <Text w={"60%"}>Deal Type</Text>
            </HStack>
            {dealType.length > 0 &&
              dealType.map((el, i) => (
                <HStack
                  key={i}
                  spacing={4}
                  justifyContent={"space-between"}
                  w={"80%"}
                >
                  <Input
                    textAlign={"center"}
                    bg={"gray.200"}
                    outline={"green"}
                    type="text"
                    value={el}
                    onChange={(e) => handleDealTypeChange(i, e.target.value)}
                  />
                </HStack>
              ))}
            <Button
              onClick={handleSave}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </VStack>

          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"70%"}
              pt={2}
              pb={2}
            >
              <Text w={"40%"}>Deal Type</Text>
            </HStack>

            <HStack spacing={4} justifyContent={"space-between"} w={"70%"}>
              <Input
                textAlign={"center"}
                bg={"gray.200"}
                outline={"green"}
                type="text"
                placeholder={"enter deal type"}
                value={arrValue}
                onChange={(e) => setArrValue(e.target.value)}
              />
            </HStack>

            <Button
              onClick={addNewDealType}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Add New Deal Type"}
            </Button>
          </VStack>
        </Flex>
      );
    } else if (selectedField === "Financial Model") {
      return (
        <Flex border={"0px solid red"} w={"100%"}>
          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"80%"}
              pt={2}
              pb={2}
            >
              <Text w={"60%"}>Financial Model</Text>
            </HStack>
            {financialModel.length > 0 &&
              financialModel.map((el, i) => (
                <HStack
                  key={i}
                  spacing={4}
                  justifyContent={"space-between"}
                  w={"80%"}
                >
                  <Input
                    textAlign={"center"}
                    bg={"gray.200"}
                    outline={"green"}
                    type="text"
                    value={el}
                    onChange={(e) =>
                      handleFinancialModelChange(i, e.target.value)
                    }
                  />
                </HStack>
              ))}
            <Button
              onClick={handleSave}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </VStack>

          <VStack
            spacing={4}
            w={"50%"}
            m={"auto"}
            overflow={"auto"}
            maxH={"85%"}
          >
            <HStack
              bg={"#8DB23F"}
              color={"white"}
              fontWeight={"bold"}
              spacing={4}
              justifyContent={"space-around"}
              w={"70%"}
              pt={2}
              pb={2}
            >
              <Text w={"40%"}>Financial Model</Text>
            </HStack>

            <HStack spacing={4} justifyContent={"space-between"} w={"70%"}>
              <Input
                textAlign={"center"}
                bg={"gray.200"}
                outline={"green"}
                type="text"
                placeholder={"enter financial model"}
                value={arrValue}
                onChange={(e) => setArrValue(e.target.value)}
              />
            </HStack>

            <Button
              onClick={addNewFinancialModel}
              w={400}
              pt={2}
              pb={2}
              bg={"#8DB23F"}
              color={"white"}
            >
              {loading ? "Loading..." : "Add New Financial Model"}
            </Button>
          </VStack>
        </Flex>
      );
    } else if (selectedField === "BOP Rate") {
      return (
        <Flex
          borderRadius={10}
          pt={2.5}
          flexDirection={"column"}
          w={"100%"}
          mt={2}
          bgColor={"white"}
          pl={5}
        >
          <Grid
            templateColumns={"repeat(3, 1fr)"}
            gap={5}
            rowGap={10}
            w={"100%"}
            border={"0px solid red"}
          >
            <VStack w={"100%"}>
              <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                Vertical
              </Text>
              <Select
                size={"md"}
                bgColor={"gray.200 "}
                onChange={(e) =>
                  setBopObj((prev) => ({ ...prev, vertical: e.target.value }))
                }
              >
                <option value="">Select</option>
                {Object.keys(dealStatusObj).map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
              </Select>
            </VStack>
            <VStack w={"100%"}>
              <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                Sq.Ft Range
              </Text>
              <Select
                size={"md"}
                bgColor={"gray.200 "}
                onChange={(e) =>
                  setBopObj((prev) => ({ ...prev, sqFtRange: e.target.value }))
                }
              >
                <option value="">Select</option>
                {Object.keys(sqFtRangeObj).map((el, i) => (
                  <option key={i} value={sqFtRangeObj[el]}>
                    {sqFtRangeObj[el]}
                  </option>
                ))}
              </Select>
            </VStack>
            <VStack w={"100%"}>
              <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                Pricing Tier
              </Text>
              <Select
                size={"md"}
                bgColor={"gray.200 "}
                onChange={(e) =>
                  setBopObj((prev) => ({
                    ...prev,
                    pricingTier: e.target.value,
                  }))
                }
              >
                <option value="">Select</option>
                {Object.keys(tierObj).map((el, i) => (
                  <option key={i} value={`Tier${tierObj[el]}`}>
                    Tier{tierObj[el]}
                  </option>
                ))}
              </Select>
            </VStack>
            <VStack w={"100%"}>
              <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                Class of Service
              </Text>
              <Select
                size={"md"}
                bgColor={"gray.200 "}
                onChange={(e) =>
                  setBopObj((prev) => ({
                    ...prev,
                    classOfService: e.target.value,
                  }))
                }
              >
                <option value="">Select</option>
                {classOfService.length > 0 &&
                  classOfService.map((el, i) => (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  ))}
              </Select>
            </VStack>
            <VStack w={"100%"}>
              <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                Service
              </Text>
              <Select
                size={"md"}
                bgColor={"gray.200 "}
                onChange={(e) =>
                  setBopObj((prev) => ({ ...prev, service: e.target.value }))
                }
              >
                <option value="">Select</option>
                {service.length > 0 &&
                  service.map((el, i) => (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  ))}
              </Select>
            </VStack>
            <VStack w={"100%"}>
              <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                Deal Type
              </Text>
              <Select
                size={"md"}
                bgColor={"gray.200 "}
                onChange={(e) =>
                  setBopObj((prev) => ({ ...prev, dealType: e.target.value }))
                }
              >
                <option value="">Select</option>
                {dealType.length > 0 &&
                  dealType.map((el, i) => (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  ))}
              </Select>
            </VStack>
            <VStack w={"100%"}>
              <Text fontWeight={"500"} alignSelf={"flex-start"} fontSize={15}>
                Financial Model
              </Text>
              <Select
                size={"md"}
                bgColor={"gray.200 "}
                onChange={(e) =>
                  setBopObj((prev) => ({
                    ...prev,
                    financialModel: e.target.value,
                  }))
                }
              >
                <option value="">Select</option>
                {financialModel.length > 0 &&
                  financialModel.map((el, i) => (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  ))}
              </Select>
            </VStack>
          </Grid>
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
              color={"white"}
              bgColor={"#8DB23F"}
              w={"68%"}
              onClick={handleBopCalulate}
            >
              Get Bop Rate
            </Button>
            <Tooltip label="Reset">
              <Button size={"sm"}>
                <GrPowerReset color="#8DB23F" size={20} />
              </Button>
            </Tooltip>
          </Flex>
          <HStack m={"auto"}>
            <Text fontWeight={"bold"}>BOP Rate:</Text>
            <Input
              w={"30%"}
              value={bop.bopR}
              onChange={(e) =>
                setBop((prev) => ({ ...prev, bopR: e.target.value }))
              }
            />
            <Button
              onClick={() => editBop(bop.id)}
              bgColor={"#8DB23F"}
              color={"white"}
            >
              Save Changes
            </Button>
          </HStack>
        </Flex>
      );
    } else if (selectedField === "Add New BOP Rates") {
      return (
        <Flex w={"100%"} border={"0px solid red"} columnGap={5}>
          <Flex
            borderRadius={10}
            pt={2.5}
            flexDirection={"column"}
            w={"40%"}
            mt={2}
            bgColor={"white"}
            pl={10}
            border={"0px solid red"}
          >
            <VStack w={"50%"} alignSelf={"center"}>
              <Text fontWeight={"500"} alignSelf={"center"} fontSize={20}>
                Vertical
              </Text>
              <Select
                size={"md"}
                bgColor={"gray.200 "}
                onChange={(e) => setNewVertical(e.target.value)}
              >
                <option value="">Select</option>
                {Object.keys(dealStatusObj).map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
              </Select>
            </VStack>
            <Grid
              templateColumns={"repeat(2, 1fr)"}
              gap={5}
              rowGap={10}
              w={"100%"}
              border={"0px solid red"}
              mt={10}
              maxH={500}
              overflow={"auto"}
            >
              <VStack
                w={"100%"}
                border={"0px solid red"}
                alignItems={"flex-start"}
              >
                <Text fontWeight={"500"} fontSize={20}>
                  Sq.Ft Range :
                </Text>
                <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                  {Object.keys(sqFtRangeObj).map((el, i) => (
                    <Checkbox
                      key={i}
                      size="lg"
                      colorScheme="green"
                      onChange={() => handleNewSqftChange(sqFtRangeObj[el])}
                      isChecked={newSqft.includes(sqFtRangeObj[el])}
                    >
                      {sqFtRangeObj[el]}
                    </Checkbox>
                  ))}
                </Grid>
              </VStack>
              <VStack
                w={"100%"}
                border={"0px solid red"}
                alignItems={"flex-start"}
              >
                <Text fontWeight={"500"} fontSize={20}>
                  Pricing Tier :
                </Text>
                <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                  <Checkbox
                    size="lg"
                    colorScheme="green"
                    onChange={() => handleNewTierChange("Tier1")}
                    isChecked={newtier.includes("Tier1")}
                  >
                    Tier1
                  </Checkbox>
                  <Checkbox
                    size="lg"
                    colorScheme="green"
                    onChange={() => handleNewTierChange("Tier2")}
                    isChecked={newtier.includes("Tier2")}
                  >
                    Tier2
                  </Checkbox>
                  <Checkbox
                    size="lg"
                    colorScheme="green"
                    onChange={() => handleNewTierChange("Tier3")}
                    isChecked={newtier.includes("Tier3")}
                  >
                    Tier3
                  </Checkbox>
                </Grid>
              </VStack>
              <VStack
                w={"100%"}
                border={"0px solid red"}
                alignItems={"flex-start"}
              >
                <Text fontWeight={"500"} fontSize={20}>
                  Class of Service :
                </Text>
                <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                  {classOfService.length > 0 &&
                    classOfService.map((el, i) => (
                      <Checkbox
                        key={i}
                        size="lg"
                        colorScheme="green"
                        onChange={() => handleNewClassOfServiceChange(el)}
                        isChecked={newClassOfService.includes(el)}
                      >
                        {el}
                      </Checkbox>
                    ))}
                </Grid>
              </VStack>
              <VStack
                w={"100%"}
                border={"0px solid red"}
                alignItems={"flex-start"}
              >
                <Text fontWeight={"500"} fontSize={20}>
                  Service :
                </Text>
                <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                  {service.length > 0 &&
                    service.map((el, i) => (
                      <Checkbox
                        key={i}
                        size="lg"
                        colorScheme="green"
                        onChange={() => handleNewServiceChange(el)}
                        isChecked={newService.includes(el)}
                      >
                        {el}
                      </Checkbox>
                    ))}
                </Grid>
              </VStack>
              <VStack
                w={"100%"}
                border={"0px solid red"}
                alignItems={"flex-start"}
              >
                <Text fontWeight={"500"} fontSize={20}>
                  Deal Type :
                </Text>
                <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                  {dealType.length > 0 &&
                    dealType.map((el, i) => (
                      <Checkbox
                        key={i}
                        size="lg"
                        colorScheme="green"
                        onChange={() => handleNewDealTypeChange(el)}
                        isChecked={newDealType.includes(el)}
                      >
                        {el}
                      </Checkbox>
                    ))}
                </Grid>
              </VStack>
              <VStack
                w={"100%"}
                border={"0px solid red"}
                alignItems={"flex-start"}
              >
                <Text fontWeight={"500"} fontSize={20}>
                  Financial Model :
                </Text>
                <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                  {financialModel.length > 0 &&
                    financialModel.map((el, i) => (
                      <Checkbox
                        key={i}
                        size="lg"
                        colorScheme="green"
                        onChange={() => handleNewFinancialModelChange(el)}
                        isChecked={newFinancialModel.includes(el)}
                      >
                        {el}
                      </Checkbox>
                    ))}
                </Grid>
              </VStack>
            </Grid>

            <Button
              mt={5}
              onClick={handleClick}
              bgColor={"#8DB23F"}
              color={"white"}
            >
              Generate Combinations
            </Button>
          </Flex>
          <Box w={"60%"}>
            <Box
              w={"100%"}
              m={"auto"}
              mt={2}
              border={"0px solid red"}
              maxH={650}
              overflow={"auto"}
            >
              {newBopInputArr.length > 0 &&
                newBopInputArr.map((el, i) => (
                  <Flex
                    w={"100%"}
                    textAlign={"left"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    key={i}
                    border={"0px solid red"}
                    mt={2}
                  >
                    <Text w={"80%"}>{el}</Text>
                    <Input
                    border={"1px solid #8DB23F"}
                      mt={2}
                      value={
                        (inputValues[i] &&
                          inputValues[i].BuildingOwnerRateSF) ||
                        ""
                      }
                      type="text"
                      w={"20%"}
                      placeholder="enter bop rate"
                      onChange={(e) => handleInputChange(i, e.target.value)}
                    />
                  </Flex>
                ))}
            </Box>
            {newBopInputArr.length > 0 && (
              <Button
                mt={1}
                onClick={handleAddNewBopRate}
                bgColor={"#8DB23F"}
                color={"white"}
                isDisabled={loading == true}
              >
                {loading ? "Loading..." : "Add New BOP Rates"}
              </Button>
            )}
          </Box>
        </Flex>
      );
    } else if (selectedField === "Edit BOP Rates") {
      return (
        <Flex w={"100%"} border={"0px solid red"} columnGap={5}>
          <Flex
            borderRadius={10}
            pt={2.5}
            flexDirection={"column"}
            w={"40%"}
            mt={2}
            bgColor={"white"}
            pl={10}
            border={"0px solid red"}
          >
            <VStack w={"50%"} alignSelf={"center"}>
              <Text fontWeight={"500"} alignSelf={"center"} fontSize={20}>
                Vertical
              </Text>
              <Select
                size={"md"}
                bgColor={"gray.200 "}
                onChange={(e) => setNewVertical(e.target.value)}
              >
                <option value="">Select</option>
                {Object.keys(dealStatusObj).map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
              </Select>
            </VStack>
            <Grid
              templateColumns={"repeat(2, 1fr)"}
              gap={5}
              rowGap={10}
              w={"100%"}
              border={"0px solid red"}
              mt={10}
              maxH={500}
              overflow={"auto"}
            >
              <VStack
                w={"100%"}
                border={"0px solid red"}
                alignItems={"flex-start"}
              >
                <Text fontWeight={"500"} fontSize={20}>
                  Sq.Ft Range :
                </Text>
                <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                  {Object.keys(sqFtRangeObj).map((el, i) => (
                    <Checkbox
                      key={i}
                      size="lg"
                      colorScheme="green"
                      onChange={() => handleNewSqftChange(sqFtRangeObj[el])}
                      isChecked={newSqft.includes(sqFtRangeObj[el])}
                    >
                      {sqFtRangeObj[el]}
                    </Checkbox>
                  ))}
                </Grid>
              </VStack>
              <VStack
                w={"100%"}
                border={"0px solid red"}
                alignItems={"flex-start"}
              >
                <Text fontWeight={"500"} fontSize={20}>
                  Pricing Tier :
                </Text>
                <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                  <Checkbox
                    size="lg"
                    colorScheme="green"
                    onChange={() => handleNewTierChange("Tier1")}
                    isChecked={newtier.includes("Tier1")}
                  >
                    Tier1
                  </Checkbox>
                  <Checkbox
                    size="lg"
                    colorScheme="green"
                    onChange={() => handleNewTierChange("Tier2")}
                    isChecked={newtier.includes("Tier2")}
                  >
                    Tier2
                  </Checkbox>
                  <Checkbox
                    size="lg"
                    colorScheme="green"
                    onChange={() => handleNewTierChange("Tier3")}
                    isChecked={newtier.includes("Tier3")}
                  >
                    Tier3
                  </Checkbox>
                </Grid>
              </VStack>
              <VStack
                w={"100%"}
                border={"0px solid red"}
                alignItems={"flex-start"}
              >
                <Text fontWeight={"500"} fontSize={20}>
                  Class of Service :
                </Text>
                <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                  {classOfService.length > 0 &&
                    classOfService.map((el, i) => (
                      <Checkbox
                        key={i}
                        size="lg"
                        colorScheme="green"
                        onChange={() => handleNewClassOfServiceChange(el)}
                        isChecked={newClassOfService.includes(el)}
                      >
                        {el}
                      </Checkbox>
                    ))}
                </Grid>
              </VStack>
              <VStack
                w={"100%"}
                border={"0px solid red"}
                alignItems={"flex-start"}
              >
                <Text fontWeight={"500"} fontSize={20}>
                  Service :
                </Text>
                <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                  {service.length > 0 &&
                    service.map((el, i) => (
                      <Checkbox
                        key={i}
                        size="lg"
                        colorScheme="green"
                        onChange={() => handleNewServiceChange(el)}
                        isChecked={newService.includes(el)}
                      >
                        {el}
                      </Checkbox>
                    ))}
                </Grid>
              </VStack>
              <VStack
                w={"100%"}
                border={"0px solid red"}
                alignItems={"flex-start"}
              >
                <Text fontWeight={"500"} fontSize={20}>
                  Deal Type :
                </Text>
                <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                  {dealType.length > 0 &&
                    dealType.map((el, i) => (
                      <Checkbox
                        key={i}
                        size="lg"
                        colorScheme="green"
                        onChange={() => handleNewDealTypeChange(el)}
                        isChecked={newDealType.includes(el)}
                      >
                        {el}
                      </Checkbox>
                    ))}
                </Grid>
              </VStack>
              <VStack
                w={"100%"}
                border={"0px solid red"}
                alignItems={"flex-start"}
              >
                <Text fontWeight={"500"} fontSize={20}>
                  Financial Model :
                </Text>
                <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                  {financialModel.length > 0 &&
                    financialModel.map((el, i) => (
                      <Checkbox
                        key={i}
                        size="lg"
                        colorScheme="green"
                        onChange={() => handleNewFinancialModelChange(el)}
                        isChecked={newFinancialModel.includes(el)}
                      >
                        {el}
                      </Checkbox>
                    ))}
                </Grid>
              </VStack>
            </Grid>

            <Button
              mt={5}
              onClick={handleClickForEditBop}
              bgColor={"#8DB23F"}
              color={"white"}
            >
              Get Bop Rates
            </Button>
          </Flex>
          <Box w={"60%"}>
            <Box
              w={"100%"}
              m={"auto"}
              mt={2}
              border={"0px solid red"}
              maxH={650}
              overflow={"auto"}
            >
              {newBopUpdateArr.length > 0 &&
                newBopUpdateArr.map((el, i) => (
                  <Flex
                    w={"100%"}
                    textAlign={"left"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    key={i}
                    border={"0px solid red"}
                    mt={2}
                  >
                    <Text w={"80%"}>{el.Lookup}</Text>
                    <Input
                      mt={2}
                      value={el.BuildingOwnerRateSF}
                      type="text"
                      w={"20%"}
                      placeholder="enter bop rate"
                      border={"1px solid #8DB23F"}
                      onChange={(e) =>
                        handleInputChangeForUpdateBop(i, e.target.value)
                      }
                    />
                  </Flex>
                ))}
            </Box>
            {newBopUpdateArr.length > 0 && (
              <Button
                mt={1}
                onClick={handleUpdateBopRate}
                bgColor={"#8DB23F"}
                color={"white"}
                isDisabled={loading == true}
              >
                {loading ? "Loading..." : "Update BOP Rates"}
              </Button>
            )}
          </Box>
        </Flex>
      );
    } else if (selectedField === "Dependencies") {
      return (
        <Tabs border={"0px solid red"} w={"100%"} variant="unstyled" mt={5}>
          <TabList justifyContent={"center"}>
            <Tab
              _selected={{ color: "white", bg: "#8DB23F" }}
              borderLeftRadius={20}
            >
              Service Dependencies
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "#8DB23F" }}
              borderRightRadius={20}
            >
              Deal Type Dependencies
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex
                borderRadius={10}
                pt={2.5}
                flexDirection={"column"}
                w={"100%"}
                mt={2}
                bgColor={"white"}
                pl={10}
                border={"0px solid red"}
              >
                <VStack w={"50%"} alignSelf={"center"}>
                  <Text fontWeight={"500"} alignSelf={"center"} fontSize={20}>
                    Class of Service
                  </Text>
                  <Select
                    size={"md"}
                    bgColor={"gray.200 "}
                    onChange={handleClassOfServiceChangeForDependencies}
                  >
                    <option value="">Select</option>
                    {classOfService.length > 0 &&
                      classOfService.map((el, i) => (
                        <option key={i} value={el}>
                          {el}
                        </option>
                      ))}
                  </Select>
                </VStack>
                <Grid
                  templateColumns={"repeat(2, 1fr)"}
                  gap={5}
                  rowGap={10}
                  w={"100%"}
                  border={"0px solid red"}
                  mt={10}
                  maxH={500}
                  overflow={"auto"}
                >
                  <VStack
                    w={"100%"}
                    border={"0px solid red"}
                    alignItems={"flex-start"}
                  >
                    <Text fontWeight={"500"} fontSize={20}>
                      Service :
                    </Text>
                    <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                      {service.length > 0 &&
                        service.map((el, i) => (
                          <Checkbox
                            key={i}
                            size="lg"
                            value={el}
                            colorScheme="green"
                            onChange={handleCheckboxChangeForDependencies}
                          >
                            {el}
                          </Checkbox>
                        ))}
                    </Grid>
                  </VStack>
                </Grid>

                <Button
                  mt={5}
                  onClick={handleClickForClassOfService}
                  bgColor={"#8DB23F"}
                  color={"white"}
                  isDisabled={loading}
                >
                  {loading ? "Loading..." : "Add Dependencies"}
                </Button>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex
                borderRadius={10}
                pt={2.5}
                flexDirection={"column"}
                w={"100%"}
                mt={2}
                bgColor={"white"}
                pl={10}
                border={"0px solid red"}
              >
                <VStack w={"50%"} alignSelf={"center"}>
                  <Text fontWeight={"500"} alignSelf={"center"} fontSize={20}>
                    Service
                  </Text>
                  <Select
                    size={"md"}
                    bgColor={"gray.200 "}
                    onChange={handleServiceChangeForDependencies}
                  >
                    <option value="">Select</option>
                    {service.length > 0 &&
                      service.map((el, i) => (
                        <option key={i} value={el}>
                          {el}
                        </option>
                      ))}
                  </Select>
                </VStack>
                <Grid
                  templateColumns={"repeat(2, 1fr)"}
                  gap={5}
                  rowGap={10}
                  w={"100%"}
                  border={"0px solid red"}
                  mt={10}
                  maxH={500}
                  overflow={"auto"}
                >
                  <VStack
                    w={"100%"}
                    border={"0px solid red"}
                    alignItems={"flex-start"}
                  >
                    <Text fontWeight={"500"} fontSize={20}>
                      Deal Type :
                    </Text>
                    <Grid templateColumns={"repeat(1,1fr)"} gap={4} rowGap={6}>
                      {dealType.length > 0 &&
                        dealType.map((el, i) => (
                          <Checkbox
                            key={i}
                            size="lg"
                            value={el}
                            colorScheme="green"
                            onChange={
                              handleServiceCheckboxChangeForDependencies
                            }
                          >
                            {el}
                          </Checkbox>
                        ))}
                    </Grid>
                  </VStack>
                </Grid>

                <Button
                  mt={5}
                  onClick={handleClickForService}
                  bgColor={"#8DB23F"}
                  color={"white"}
                  isDisabled={loading}
                >
                  {loading ? "Loading..." : "Add Dependencies"}
                </Button>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      );
    }
    return null;
  };

  const handleBopCalulate = () => {
    let str = `${bopObj.vertical}${bopObj.sqFtRange}${bopObj.pricingTier}${bopObj.classOfService}${bopObj.service}${bopObj.dealType}${bopObj.financialModel}`;
    let bopRate = bopRateData.filter((el) => el.Lookup === str);
    console.log(bopRate);
    if (bopRate.length > 0) {
      setBop((prev) => ({
        ...prev,
        bopR: bopRate[0].BuildingOwnerRateSF,
        id: bopRate[0]._id,
      }));
    } else {
      setBop((prev) => ({ ...prev, bopR: "Not Found" }));
    }
  };

  const editBop = async (id) => {
    try {
      let obj = {
        BuildingOwnerRateSF: bop.bopR,
      };
      // console.log(obj);
      let data = await axios.patch(`${api_domain}boprate/edit/${id}`, obj);
      console.log(data);
    } catch (error) {}
  };
  useEffect(() => {
    getDealStatus();
    getBOP();
  }, []);

  useEffect(() => {}, [newBopInputArr]);

  return (
    <Box w={"100vw"} bgColor={"gray.200"}>
      <Flex w={"100%"} h={"100vh"} pt={2} pb={2} pl={2}>
        <Box
          w={"20%"}
          bgColor={"white"}
          display={"flex"}
          flexDirection={"column"}
          pb={0.5}
          pt={2}
          border={"0px solid red"}
          borderRadius={10}
          fontWeight={"bold"}
        >
          <Text bg={"gray.200"} fontWeight={"bold"} pt={2} pb={2}>
            Select Field to edit
          </Text>
          <Text
            pt={2}
            pb={2}
            mt={5}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("Deal Status")}
            className={selectedField === "Deal Status" ? "selectedField" : ""}
          >
            Deal Status / Vertical
          </Text>
          <Text
            pt={2}
            pb={2}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("Pricing Tier")}
            className={selectedField === "Pricing Tier" ? "selectedField" : ""}
          >
            Pricing Tier / Region
          </Text>
          <Text
            pt={2}
            pb={2}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("Range")}
            className={selectedField === "Range" ? "selectedField" : ""}
          >
            Range
          </Text>
          <Text
            pt={2}
            pb={2}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("CRE")}
            className={selectedField === "CRE" ? "selectedField" : ""}
          >
            CRE
          </Text>
          <Text
            pt={2}
            pb={2}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("Escalator")}
            className={selectedField === "Escalator" ? "selectedField" : ""}
          >
            Escalator
          </Text>
          <Text
            pt={2}
            pb={2}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("Class of Service")}
            className={
              selectedField === "Class of Service" ? "selectedField" : ""
            }
          >
            Class of Service
          </Text>
          <Text
            pt={2}
            pb={2}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("Service")}
            className={selectedField === "Service" ? "selectedField" : ""}
          >
            Service
          </Text>
          <Text
            pt={2}
            pb={2}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("Deal Type")}
            className={selectedField === "Deal Type" ? "selectedField" : ""}
          >
            Deal Type
          </Text>
          <Text
            pt={2}
            pb={2}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("Financial Model")}
            className={
              selectedField === "Financial Model" ? "selectedField" : ""
            }
          >
            Financial Model
          </Text>
          <Text
            pt={2}
            pb={2}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("BOP Rate")}
            className={selectedField === "BOP Rate" ? "selectedField" : ""}
          >
            BOP Rate
          </Text>
          <Text
            pt={2}
            pb={2}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("Add New BOP Rates")}
            className={
              selectedField === "Add New BOP Rates" ? "selectedField" : ""
            }
          >
            Add New BOP Rates
          </Text>
          <Text
            pt={2}
            pb={2}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("Edit BOP Rates")}
            className={
              selectedField === "Edit BOP Rates" ? "selectedField" : ""
            }
          >
            Edit BOP Rates
          </Text>
          <Text
            pt={2}
            pb={2}
            cursor={"pointer"}
            onClick={() => handleFieldSelection("Dependencies")}
            className={selectedField === "Dependencies" ? "selectedField" : ""}
          >
            Dependencies
          </Text>
        </Box>
        <Box w={"80%"} pr={2} pl={2} border={"0px solid red"}>
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            pr={10}
            bgColor={"white"}
            h={"100%"}
            borderRadius={10}
            border={"0px solid blue"}
          >
            {renderContent()}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default EditRules;
