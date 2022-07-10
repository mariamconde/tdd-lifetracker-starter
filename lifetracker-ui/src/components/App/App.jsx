import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"
// import axios from "axios"
import API from "../../services/apiClient";

import Navbar from "components/Navbar/Navbar";
import LandingPage from "components/LandingPage/LandingPage";
import LoginPage from "components/LoginPage/LoginPage";
import RegistrationPage from "components/RegistrationPage/RegistrationPage";
import NotFound from "components/NotFound/NotFound";
import AccessForbidden from "components/AccessForbidden/AccessForbidden";
import ActivityPage from "components/ActivityPage/Activitypage";
import NutritionPage from "components/NutritionPage/NutritionPage";
import { AuthContextProvider, useAuthContext } from "../../contexts/auth";
import apiClient from "../../services/apiClient";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  )
}
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appState, setAppState] = useState({})
  const [user, setUser] = useState({})
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, err } = await API.fetchUserFromToken()
      if (data) {
        setUser(data.user)
      }
      if(err){
        setError(err)
      }
    }

    const token = localStorage.getItem("my_token")
    if (token) {
      API.setToken(token)
      fetchUser()
    }
  }, [])

  const handleLogout = async () => {
    await API.logoutUser()
    setUser({})
    setError(null)
  }

  function handleLoggedIn(evt){
    setIsLoggedIn(true)
  }

  return (
    <div className="app">
      <React.Fragment>
          <BrowserRouter>
            <main>
              <Navbar  user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Navbar>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage user={user} setUser={setUser} isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLoggedIn={handleLoggedIn} setAppState={setAppState}/>} />
                <Route path="/register" element={<RegistrationPage user={user} setUser={setUser} isLoggedIn = {isLoggedIn}  setIsLoggedIn={setIsLoggedIn} setAppState={setAppState}/>} />
                <Route path="/activity" element={isLoggedIn ? (<ActivityPage/>) : (<AccessForbidden/>)} ></Route>
                <Route path="/exercise" element={isLoggedIn ? (<ActivityPage/>) : (<AccessForbidden/>)} ></Route>
                <Route path="/nutrition/*" element={isLoggedIn ? (<NutritionPage user={user}/>) : (<AccessForbidden/>)}></Route>
                <Route path="/sleep" element={isLoggedIn ? (<ActivityPage/>) : (<AccessForbidden/>)} ></Route>
                <Route path="*" element={<NotFound/>}></Route>
              </Routes>
            </main>
          </BrowserRouter>
      </React.Fragment>
    </div>
  );
}
