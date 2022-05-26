import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import loginImage from "../Images/login-image.jpg";

const Login = () => {
    let loginInfo = {
        username: document.getElementById("login-username"),
        password: document.getElementById("login-password"),
    };

    let postOptions = {
        mode: "cors",
        method: "POST",
        body: loginInfo,
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const loginInfo = {
            username: document.getElementById("login-username"),
            password: document.getElementById("login-password"),
        };

        const postOptions = {
            mode: "cors",
            method: "POST",
            body: loginInfo,
        };

        fetch("#", postOptions)
            .then((response) => response.json())
            .then(data)
            .catch(error);
    };

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
                    <Button variant="contained" sx={{ width: "60%", borderRadius: 5, marginBottom: 2 }} onClick={handleSubmit}>
                        Sign in
                    </Button>
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
