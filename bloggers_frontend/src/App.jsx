import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import MainPage from "./Pages/MainPage";
import { useCookies } from "react-cookie";
import UserContext from "./Context/UserContext";
import LoggedInContext from "./Context/LoggedInContext";
import CreateBlog from "./Pages/CreateBlog";
import ViewSingleBlog from "./Pages/ViewSingleBlog";
import EditBlog from "./Pages/EditBlog";
import UserBlogSummary from "./Pages/UserBlogSummary";

const App = () => {
    const [cookies, setCookie] = useCookies(["access-token"]);
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    console.log(user);
    console.log(loggedIn);

    useEffect(() => {
        // Save cookie to the browser for local storage
        setCookie("access-token", user, { path: "/" });

        console.log(cookies);

        const userInfo = JSON.parse(atob(user.split(".")[1]));
        setUser({
            id: userInfo[0].id,
            first_name: userInfo[0].first_name,
            last_name: userInfo[0].last_name,
            username: userInfo[0].username,
        });
        setLoggedIn(true);
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
                <div>
                    <Router>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/registration" element={<Registration />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/create-blog" element={<CreateBlog />} />
                            <Route path="/blog-post" element={<ViewSingleBlog />} />
                            <Route path="/edit-blog" element={<EditBlog />} />
                            <Route path="/my-blogs" element={<UserBlogSummary />} />
                        </Routes>
                    </Router>
                </div>
            </LoggedInContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
