import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoggedInContext from "../Context/LoggedInContext";
import UserContext from "../Context/UserContext";
import { Button, Menu } from "@mui/material";
import ProfileMenu from "./Header/ProfileMenu";

// Consider using MUI App bar

const Header = () => {
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

    return (
        <HeaderContainer>
            <Logo to="/">Bloggers</Logo>
            {loggedIn ? <ProfileMenu /> : <StyledLink to="/login">Sign In</StyledLink>}
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    max-height: 100px;
    background-color: salmon;
    margin: 0px;
    padding: 5px 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: white;
    height: 70px;
`;

const Logo = styled(Link)`
    font-family: "Dancing Script", cursive;
    font-size: 40px;
    color: white;
    text-decoration: none;
`;

const Name = styled.span`
    font-family: "Arial", san-serif;
    color: white;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-family: "Arial", san-serif;
`;

export default Header;
