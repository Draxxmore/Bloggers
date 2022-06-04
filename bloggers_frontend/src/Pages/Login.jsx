import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TextField, Button, createTheme, ThemeProvider } from "@mui/material";
import loginImage from "../Images/login-image.jpg";
import LoggedInContext from "../Context/LoggedInContext";
import UserContext from "../Context/UserContext";
import config from "../config";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Login = () => {
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const loginInfo = {
            username: document.getElementById("login-username").value,
            password: document.getElementById("login-password").value,
        };

        const postOptions = {
            mode: "cors",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(loginInfo),
        };

        fetch(`${ApiUrl}/api/login`, postOptions)
            .then((response) => response.json())
            .then(() => {
                setUser(data);
                setLoggedIn(true);
                navigate("/my-blogs");
                // window.location.reload();
            })
            .catch((error) => console.log(error));
    };

    const limeGreenButtonTheme = createTheme({
        palette: { primary: { main: "#89E347", darker: "#8AE845", contrastText: "#fff" } },
        typography: { fontWeightBold: 700 },
    });

    return (
        <PageSettings>
            <LoginContainer>
                <LoginForm>
                    <Title>Bloggers</Title>
                    <TextField id="login-username" variant="standard" label="Username" sx={{ width: "60%" }} />
                    <TextField
                        id="login-password"
                        variant="standard"
                        label="Password"
                        type="password"
                        sx={{ width: "60%", margin: 3, marginBottom: 5 }}
                    />
                    <ThemeProvider theme={limeGreenButtonTheme}>
                        <Button variant="contained" sx={{ width: "60%", borderRadius: 5, marginBottom: 2 }} onClick={handleSubmit}>
                            Sign in
                        </Button>
                    </ThemeProvider>
                    <div>
                        Not a member? <RegisterLink to="/registration">Register</RegisterLink>
                    </div>
                </LoginForm>
                <Image src={loginImage} />
            </LoginContainer>
        </PageSettings>
    );
};

const PageSettings = styled.div`
    background: salmon;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 98vh;
`;

const LoginContainer = styled.div`
    display: grid;
    grid-template-columns: 35% 65%;
    border-radius: 10px;
    height: 70vh;
    width: 80vw;
    background: white;
    box-shadow: 2px 5px 12px 5px rgba(0, 0, 0, 0.28);
`;

const Title = styled.h1`
    margin: 0px;
    padding: 0px;
    text-align: center;
    margin-bottom: 50px;
    font-family: "Dancing Script", cursive;
    font-size: 60px;
`;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30vw;
    height: 70vh;
`;

const RegisterLink = styled(Link)`
    text-decoration: none;
    color: blue;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    align-self: center;
    border-radius: 10px;
`;

export default Login;
