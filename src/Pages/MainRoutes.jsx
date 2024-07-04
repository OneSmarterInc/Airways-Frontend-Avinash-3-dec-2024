import React from 'react';
import Signin from './Signin';
import Signup from './Signup';
import {Routes, Route } from "react-router-dom"
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';
import { PrivateRoute } from '../Component/PrivateRoute';
import Home from './Home';
import EditRules from './EditRules';


const MainRoutes = () => {
  return (
    <Routes>
         {/* <Route path='/signin' element={<Signin/>} /> */}
         {/* <Route path='/signup' element={<Signup/>} /> */}
         {/* <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} /> */}
         <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path='/adminlogin' element={<AdminLogin/>} />
          <Route path='/editrules' element={<PrivateRoute><EditRules/></PrivateRoute>} />
         <Route path='*' element={<h3>Page Not Found</h3>} />
    </Routes>
  )
}

export default MainRoutes