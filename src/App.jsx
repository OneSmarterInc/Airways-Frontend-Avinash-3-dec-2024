import { useState } from 'react'

import './App.css'
import Navbar from './Component/Navbar'
import MainRoutes from './Pages/MainRoutes'
import { Box } from '@chakra-ui/react'
import Home from './Pages/Home'

function App() {

  return (
    <div className='App'>
      {/* <Navbar/> */}
      <MainRoutes/>
      {/* <Home/> */}
    </div>
  )
}

export default App

// {
//     "dealStatus":{ 
//     "office": "Approved",
//     "hospitality": "Approved",
//     "parkingGarage": "Approved",
//     "healthcare": "Approved",
//     "higherEd": "Deal Committee",
//     "government": "Deal Committee",
//     "industrial": "Deal Committee",
//     "enterprise": "Deal Committee",
//     "manufacturing": "Deal Committee",
//     "mixedUse": "Deal Desk",
//     "retail": "Deal Desk",
//     "residential": "Deal Desk",
//     "publicVenue": "Deal Desk"
//      },

    
//         "pricingTier": {
//             "south": "Tier-1",
//             "southeast": "Tier-1",
//             "northeast": "Tier-2",
//             "midwest": "Tier-2",
//             "northwest": "Tier-2",
//             "west": "Tier-2"
//         },
//         "sqFtRange":{
//             "lt250001" :"<250K",
//             "gt250000andlt500001" : "250K-500K",
//             "gt500000andlt1000001" : "500K-1M",
//             "gt1000000andlt1500001" :"1M-1.5M",
//             "gt1500000andlt2000001" : "1.5M-2M",
//             "gt2000000" : ">2M"
//         }
    
         
    

// }



// {
//   "dealStatus": [
//     { "key": "Office", "value": "Approved" },
//     { "key": "Hospitality", "value": "Approved" },
//     { "key": "ParkingGarage", "value": "Approved" },
//     { "key": "Healthcare", "value": "Approved" },
//     { "key": "HigherEd", "value": "Deal Committee" },
//     { "key": "Government", "value": "Deal Committee" },
//     { "key": "Industrial", "value": "Deal Committee" },
//     { "key": "Enterprise", "value": "Deal Committee" },
//     { "key": "Manufacturing", "value": "Deal Committee" },
//     { "key": "MixedUse", "value": "Deal Desk" },
//     { "key": "Retail", "value": "Deal Desk" },
//     { "key": "Residential", "value": "Deal Desk" },
//     { "key": "PublicVenue", "value": "Deal Desk" }
//   ],
//   "pricingTier": [
//     { "key": "South", "value": "1" },
//     { "key": "Southeast", "value": "1" },
//     { "key": "Northeast", "value": "2" },
//     { "key": "Midwest", "value": "2" },
//     { "key": "Northwest", "value": "2" },
//     { "key": "West", "value": "2" }
//   ],
//   "sqFtRange": [
//     { "key": "lt250001", "value": "<250K" },
//     { "key": "gt250000andlt500001", "value": "250K-500K" },
//     { "key": "gt500000andlt1000001", "value": "500K-1M" },
//     { "key": "gt1000000andlt1500001", "value": "1M-1.5M" },
//     { "key": "gt1500000andlt2000001", "value": "1.5M-2M" },
//     { "key": "gt2000000", "value": ">2M" }
//   ],
//   "cre": "4.5",
//   "escalator": "3",
//   "classOfService": ["Infrastructure", "Access Network", "Real Estate", "Other", "Advisory Service"],
//   "service": ["PublicCellular", "Fiber", "Core", "Internet", "NetworkPrivate", "NetworkPublic"],
//   "dealType": ["1-Carrier", "2-Carrier", "3-Carrier", "NoBOP", "CarrierPursuit", "Colo", "OwnerNetwork"],
//   "financialModel": ["OPEX", "CAPEX"]
// }
