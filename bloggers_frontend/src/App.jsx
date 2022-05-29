import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import MainPage from "./Pages/MainPage";
import { useCookies } from "react-cookie";

const App = () => {
    const [cookies, setCookie] = useCookies(["access-token"]);
    console.log(cookies);

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
