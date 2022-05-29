import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import MainPage from "./Pages/MainPage";
import { useCookies } from "react-cookie";
import UserContext from "./Context/UserContext";
import LoggedInContext from "./Context/LoggedInContext";
import CreateBlog from "./Pages/CreateBlog";

const App = () => {
    const [cookies, setCookie] = useCookies(["access-token"]);
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (cookies.access_token) {
            const userInfo = JSON.parse(atob(cookies.access_token.split(".")[1]));
            setUser({
                id: userInfo[0].id,
                firstName: userInfo[0].first_name,
                lastName: userInfo[0].last_name,
                username: userInfo[0].username,
            });
            setLoggedIn(true);
        }
    }, []);

    return (
        <UserContext.Provider value={user}>
            <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
                <div>
                    <Router>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/registration" element={<Registration />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/create-blog" element={<CreateBlog />} />
                        </Routes>
                    </Router>
                </div>
            </LoggedInContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
