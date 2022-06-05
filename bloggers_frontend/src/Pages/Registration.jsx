import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button, ThemeProvider, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "../config";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Registration = () => {
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        let firstName = document.getElementById("registration_firstName").value;
        let lastName = document.getElementById("registration_lastName").value;
        let username = document.getElementById("registration_username").value;
        let password = document.getElementById("registration_password").value;
        let confirmPassword = document.getElementById("registration_confirm_pw").value;

        setPasswordError(false);
        setPasswordErrorMsg("");

        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        }

        const options = {
            mode: "cors",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName: firstName, lastName: lastName, username: username, password: password }),
        };

        fetch(`${ApiUrl}/api/registration`, options)
            .then((response) => {
                response.json();
            })
            .then((data) => {
                console.log({ Success: data });
                navigate("/login");
            })
            .catch((error) => console.log(error));
    };

    const limeGreenButtonTheme = createTheme({
        palette: { primary: { main: "#89E347", darker: "#8AE845", contrastText: "#fff" } },
        typography: { fontWeightBold: 700 },
    });

    return (
        <PageSettings>
            <RegistrationContainer>
                <RegistrationForm>
                    <Title>Registration</Title>
                    <TextField id="registration_firstName" variant="standard" type="text" label="First Name" sx={{ marginBottom: 2 }}></TextField>
                    <TextField id="registration_lastName" variant="standard" type="text" label="Last Name" sx={{ marginBottom: 2 }}></TextField>
                    <TextField id="registration_username" variant="standard" type="text" label="Username" sx={{ marginBottom: 2 }}></TextField>
                    <TextField id="registration_password" variant="standard" type="password" label="Password" sx={{ marginBottom: 2 }}></TextField>
                    <TextField
                        id="registration_confirm_pw"
                        variant="standard"
                        type="password"
                        label="Confirm Password"
                        sx={{ marginBottom: 2 }}
                        error={passwordError}
                        helperText={passwordError ? "Passwords must match" : ""}
                    ></TextField>
                    <ThemeProvider theme={limeGreenButtonTheme}>
                        <Button variant="contained" sx={{ borderRadius: 10, marginTop: 5, width: "75%", alignSelf: "center" }} onClick={handleSubmit}>
                            Register
                        </Button>
                    </ThemeProvider>
                </RegistrationForm>
                <Text>
                    Bloggers
                    <QuoteContainer>
                        <Quote>"Don't focus on having a great blog. Focus on producing a blog that's great for your readers."</Quote>
                        <Author>- Brian Clark</Author>
                    </QuoteContainer>
                </Text>
            </RegistrationContainer>
        </PageSettings>
    );
};

const PageSettings = styled.div`
    background: salmon;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RegistrationContainer = styled.div`
    height: 80%;
    width: 80vw;
    display: grid;
    grid-template-columns: 70% 30%;
    grid-template-areas: "images form";
`;

const RegistrationForm = styled.form`
    grid-area: form;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 2px 5px 12px 5px rgba(0, 0, 0, 0.28);
`;

const Title = styled.h1`
    margin: 0px;
    padding: 0px;
    text-align: center;
    margin-bottom: 50px;
    font-family: "Arial", san-serif;
`;

const Text = styled.h2`
    font-family: "Dancing Script", cursive;
    font-size: 70px;
    color: white;
`;

const QuoteContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90%;
`;

const Quote = styled.h3`
    font-family: "Dancing Script", cursive;
    font-size: 50px;
    color: white;
`;

const Author = styled.h3`
    text-align: right;
    font-size: 50px;
    margin-right: 50px;
`;

export default Registration;
