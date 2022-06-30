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
                <Route path="/login" element={<LoginPage isLoggedIn = {isLoggedIn} handleLoggedIn={handleLoggedIn}/>} />
                <Route path="/register" element={<RegistrationPage isLoggedIn = {isLoggedIn}/>} />
                <Route path="/activity" element={<ActivityPage />} />
                {/* <Route path="/nutrition/*" element={<NutritionPage/>}/> */}
                <Route path="*" element={<NotFound/>}></Route>
              </Routes>
            </main>
          </BrowserRouter>
      </React.Fragment>
    </div>
  );
}