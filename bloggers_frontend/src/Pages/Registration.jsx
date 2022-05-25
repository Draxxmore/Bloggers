import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import { findByPlaceholderText } from "@testing-library/react";
// import registrationImage from "../Images/registration-image3.jpg";

const Registration = () => {
    const [registrationInfo, setRegistrationInfo] = useState({});
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

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
            setPasswordErrorMsg("Passwords Must Match!");
            return;
        }

        const options = {
            mode: "cors",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName: firstName, lastName: lastName, username: username, password: password }),
        };

        fetch("#", options)
            .then((response) => response.json())
            .then((data) => console.log({ Success: data }))
            .catch((error) => console.log({ Error: error }));
    };

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
                        helperText={passwordErrorMsg}
                    ></TextField>
                    <Button variant="contained" sx={{ borderRadius: 10, marginTop: 5, width: "75%", alignSelf: "center" }} onClick={handleSubmit}>
                        Register
                    </Button>
                </RegistrationForm>
                <Text>Bloggers</Text>
            </RegistrationContainer>
        </PageSettings>
    );
};

const PageSettings = styled.div`
    background: salmon;
    height: 98vh;
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
`;

const Text = styled.h2`
    font-family: "Dancing Script", cursive;
    font-size: 70px;
    color: white;
`;

// const ImageDiv = styled.div``;

// const Image = styled.img`
//   max-width: 98%;
//   height: 100%;
//   opacity: 0.75;
//   border-radius: 10px;
// `;

export default Registration;
