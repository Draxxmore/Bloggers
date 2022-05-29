import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoggedInContext from "../Context/LoggedInContext";
import UserContext from "../Context/UserContext";

// Consider using MUI App bar

const Header = () => {
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
    const user = useContext(UserContext);

    return (
        <HeaderContainer>
            <Logo>Bloggers</Logo>
            {loggedIn ? `Welcome ${user.firstName + " " + user.lastName}` : <StyledLink to="/login">Sign In</StyledLink>}
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
`;

const Logo = styled.div`
    font-family: "Dancing Script", cursive;
    font-size: 40px;
    color: white;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-family: courier;
`;

export default Header;
