import React from "react";
import Header from "../Components/Header";
import BlogCards from "../Components/MainPage/BlogCards";
import styled from "styled-components";
import { Button } from "@mui/material";

const MainPage = () => {
    return (
        <div>
            <Header />
            <Heading>Welcome to Bloggers!</Heading>
            <ButtonContainer>
                <Button variant="contained">+ New Blog</Button>
            </ButtonContainer>
            <CardsContainer>
                <BlogCards />
            </CardsContainer>
        </div>
    );
};

const Heading = styled.h1`
    font-family: "Arial", san-serif;
    text-align: center;
`;

const CardsContainer = styled.div`
    margin: 0px 30px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: right;
    margin: 10px;
`;

export default MainPage;
