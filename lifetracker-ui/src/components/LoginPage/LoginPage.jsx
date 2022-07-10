import ActivityPage from "components/ActivityPage/ActivityPage"
import LoginForm from "components/LoginForm/LoginForm"
import * as React from "react"
import "./LoginPage.css"

export default function LoginPage(props) {
    console.log("TODO: change login from useState to context")
    return (
        <div className="login-page">
            {props.isLoggedIn ? (<ActivityPage/>) : (<LoginForm setIsLoggedIn={props.setIsLoggedIn} setAppState={props.setAppState}/>)}         
        </div>
    )}