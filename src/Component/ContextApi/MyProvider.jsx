import { useState } from "react";
import MyContext from "./MyContext";

// const api_domain = "http://localhost:3500/api/";
// const api_domain = "https://api.cyberbriefs.org/airwayz/";
const api_domain = "https://semantic.onesmarter.com/airwayz/";

// const api_domain = "https://hrrwc7nhpj.execute-api.us-east-2.amazonaws.com/airwayz/"

const MyProvider = ({ children }) => {
  const [dealStatusObj, setDealStatusObj] = useState({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [vertical, setVertical] = useState("");
  const [region, setRegion] = useState("");
  const [numberOfBuildings, setNumberOfBuildings] = useState("");
  const [projectSize, setProjectSize] = useState("");
  const [labourImpact, setLabourImpact] = useState("no");
  const [conduitRequired, setConduitRequired] = useState("no");
  const [dealStatus, setDealStatus] = useState("");
  const [dealStatusColor, setDealStatusColor] = useState("#19B400");
  const [tierObj, setTierObj] = useState({});
  const [tier, setTier] = useState("");
  const [sqFtRangeObj, setSqFtRangeObj] = useState({});
  const [sqFtRange, setSqFtRange] = useState("");
  const [classOfService, setClassOfService] = useState("");
  const [service, setService] = useState("");
  const [dealType, setDealType] = useState("");
  const [financialModel, setFinancialModel] = useState("");
  const [term, setTerm] = useState("");
  const [prePaymentPercent, setprePaymentPercent] = useState("");
  const [bopRate, setBopRate] = useState("");
  const [solutionArr, setSolutionArr] = useState([]);
  const [objfor0, setObjfor0] = useState({});
  const [objfor25, setobjfor25] = useState({});
  const [serviceOptions, setServiceOptions] = useState([]);
  const [dealTypeOptions, setDealTypeOptions] = useState([]);
  const [saveArr, setSaveArr] = useState([]);
  const [data, setData] = useState([]);
  const [classOfServiceArr, setClassOfServiceArr] = useState([]);
  const [serviceArr, setServiceArr] = useState([]);
  const [dealTypeArr, setDealTypeArr] = useState([]);
  const [financialModelArr, setFinancialModelArr] = useState([]);

  return (
    <MyContext.Provider
      value={{
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
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
