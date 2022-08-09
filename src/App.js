import React, { createContext, useEffect } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import ManageTeacher from './Components/Admin/ManageTeacher';
import ImageGallery from './Components/ImageGallery';
import ImgGallery from './Components/Admin/ImgGallery';
import AddTeacher from './Components/Admin/AddTeacher';
import AddHistory from './Components/Admin/AddHistory';
import AddGovtBody from './Components/AddGovtBody';
import Project from './Components/Admin/Project';
import Notice from './Components/Admin/Notice';
import { useState } from 'react';
import Register from './Pages/Register';
import PhotoView from './Components/PhotoView';
import History from './Components/History';
import ManageHistory from './Components/Admin/ManageHistory';
import ViewGovtBody from './Components/ViewGovtBody';
import Funding from './Components/Funding';
import Result from './Components/Result';
import AddResult from './Components/Admin/AddResult';
import AddNotice from './Components/Admin/AddNotice';
import ShowNotice from './Components/ShowNotice';
import Contact from './Components/Contact';
import AddBanner from './Components/Admin/AddBanner';
import ManageAdmin from './Components/Admin/ManageAdmin';
import PrivateRoute from './Components/PrivateRoute';
import axios from 'axios';
import ShowProject from './Components/ShowProject';
import ManageProject from './Components/Admin/ManageProject';
import Download from './Components/Download';
import AddFunding from './Components/Admin/AddFunding';
import AddEvent from './Components/Admin/AddEvent';


export const userContex = createContext()
function App() {
  const [logedInUser, setLogedInUser] = useState({})
  const [notice, setNotice] = useState({});
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    axios.post('https://secret-badlands-60025.herokuapp.com/isAdmin', { email: logedInUser.email })
      .then(res => setIsAdmin(res.data))
      .catch(err => console.log(err))

  }, [logedInUser.email])
  return (
    <userContex.Provider value={{ not: [notice, setNotice], login: [logedInUser, setLogedInUser] }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/photoGallery" element={<PhotoView />} />
          <Route path="history" element={<History />} />
          <Route path="viewGovtBody" element={<ViewGovtBody />} />
          <Route path="funding" element={<Funding />} />
          <Route path="funding" element={<Funding />} />
          <Route path="result" element={<Result />} />
          <Route path="notice" element={<Notice />} />
          <Route path="showNotice" element={<ShowNotice />} />
          <Route path="contact" element={<Contact />} />
          <Route path="showProject" element={<ShowProject />} />
          <Route path="download" element={<Download />} />

         {isAdmin &&  <Route path="admin" element={<PrivateRoute><Admin /></PrivateRoute>}>
            <Route path="manage-teacher" element={<PrivateRoute><ManageTeacher /></PrivateRoute>} />
            <Route path='image-gallery' element={<PrivateRoute><ImgGallery /></PrivateRoute>} />
            <Route path='history' element={<PrivateRoute><AddHistory /></PrivateRoute>} />
            <Route path='manage-history' element={<PrivateRoute><ManageHistory /></PrivateRoute>} />
            <Route path='govt-body' element={<PrivateRoute><AddGovtBody /></PrivateRoute>} />
            <Route path='add-funding' element={<PrivateRoute><AddFunding /></PrivateRoute>} />
            <Route path='project' element={<Project />} />
            <Route path='addNotice' element={<PrivateRoute><AddNotice /></PrivateRoute>} />
            <Route path='add-teacher' element={<PrivateRoute><AddTeacher /></PrivateRoute>} />
            <Route path='addResult' element={<PrivateRoute><AddResult /></PrivateRoute>} />
            <Route path='addBanner' element={<PrivateRoute><AddBanner /></PrivateRoute>} />
            <Route path='manageAdmin' element={<PrivateRoute><ManageAdmin /></PrivateRoute>} />
            <Route path='project' element={<PrivateRoute><Project /></PrivateRoute>} />
            <Route path='manage-project' element={<PrivateRoute><ManageProject /></PrivateRoute>} />
            <Route path='addEvent' element={<PrivateRoute><AddEvent /></PrivateRoute>} />

          </Route>

  } 

        </Routes>
      </BrowserRouter>

    </userContex.Provider>
  );
}

export default App;
