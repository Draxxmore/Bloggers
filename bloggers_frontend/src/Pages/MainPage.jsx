import React, { useState, useEffect, useContext } from "react";
import Header from "../Components/Header";
import BlogCards from "../Components/MainPage/BlogCards";
import styled from "styled-components";
import { Button } from "@mui/material";
import LoggedInContext from "../Context/LoggedInContext";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const MainPage = () => {
    const [posts, setPosts] = useState([]);
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            mode: "cors",
            method: "GET",
        };

        fetch("http://localhost:4000/api/blog", options)
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        navigate("/create-blog");
    };

    const mainPagePosts = (posts) => {
        const mainPosts = posts.map((post) => <BlogCards data={post} />);
        return mainPosts;
    };

    return (
        <div>
            <Header />
            <Heading>Welcome to Bloggers!</Heading>
            {loggedIn ? (
                <ButtonContainer>
                    <Button variant="contained" onClick={handleClick}>
                        + Create Blog
                    </Button>
                </ButtonContainer>
            ) : (
                ""
            )}
            <CardsContainer>{mainPagePosts(posts)}</CardsContainer>
        </div>
    );
};

const Heading = styled.h1`
    font-family: "Arial", san-serif;
    text-align: center;
`;

const CardsContainer = styled.div`
    margin: 10px 30px;
    display: flex;
    flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: right;
    margin: 10px;
`;

export default MainPage;
