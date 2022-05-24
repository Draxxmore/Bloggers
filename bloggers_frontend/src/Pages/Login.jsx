import React from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import loginImage from "../Images/login-image.jpg";

const Login = () => {
  return (
    <StyledDiv>
      <LoginContainer>
        <LoginForm>
          <Title>Bloggers</Title>
          <TextField variant="standard" label="Username" sx={{ width: "60%" }} />
          <TextField variant="standard" label="Password" type="password" sx={{ width: "60%", margin: 3, marginBottom: 5 }} />
          <Button variant="contained" sx={{ width: "60%", borderRadius: 5, marginBottom: 2 }}>
            Sign in
          </Button>
          <div>
            Not a member? <RegisterLink>Register</RegisterLink>
          </div>
        </LoginForm>
        <Image src={loginImage} />
      </LoginContainer>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
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
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 70vh;
`;

const RegisterLink = styled.span`
  text-decoration: none;
`;

const Image = styled.img`
  width: 100%;
  max-height: 70vh;
  align-self: center;
  border-radius: 10px;
`;

export default Login;
