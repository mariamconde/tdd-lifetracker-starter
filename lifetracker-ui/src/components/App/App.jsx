import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios"

import Navbar from "components/Navbar/Navbar";
import LandingPage from "components/LandingPage/LandingPage";
import LoginPage from "components/LoginPage/LoginPage";
import RegistrationPage from "components/RegistrationPage/RegistrationPage";
import NotFound from "components/NotFound/NotFound";
import AccessForbidden from "components/AccessForbidden/AccessForbidden";
import ActivityPage from "components/ActivityPage/Activitypage";
import NutritionPage from "components/NutritionPage/NutritionPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appState, setAppState] = useState({})


  function handleLoggedIn(evt){
    setIsLoggedIn(true)
  }

  return (
    <div className="app">
      <React.Fragment>
          <BrowserRouter>
            <main>
              <Navbar  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Navbar>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLoggedIn={handleLoggedIn} setAppState={setAppState}/>} />
                <Route path="/register" element={<RegistrationPage isLoggedIn = {isLoggedIn}  setIsLoggedIn={setIsLoggedIn} setAppState={setAppState}/>} />
                <Route path="/activity" element={isLoggedIn ? (<ActivityPage/>) : (<AccessForbidden/>)} ></Route>
                <Route path="/exercise" element={isLoggedIn ? (<ActivityPage/>) : (<AccessForbidden/>)} ></Route>
                <Route path="/nutrition/*" element={isLoggedIn ? (<NutritionPage/>) : (<AccessForbidden/>)}></Route>
                <Route path="/sleep" element={isLoggedIn ? (<ActivityPage/>) : (<AccessForbidden/>)} ></Route>
                <Route path="*" element={<NotFound/>}></Route>
              </Routes>
            </main>
          </BrowserRouter>
      </React.Fragment>
    </div>
  );
}