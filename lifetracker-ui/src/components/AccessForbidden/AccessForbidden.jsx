import * as React from "react";
import { Link } from "react-router-dom"


export default function AccessForbidden(props) {
    return ( <div className="access-forbid">
        <div className="access-cont">
            <div className="access-text">
                <h1>Access Denied</h1>
                <h2>Please login or sign up to access this content!</h2>
                <Link to="/login"><button>Login</button></Link>
            </div>
        </div>
    </div>);
}