import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import BlogCards from "../Components/MainPage/BlogCards";
import styled from "styled-components";

const MainPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const options = {
            mode: "cors",
            method: "GET",
        };

        fetch("http://localhost:4000/api/blog", options)
            .then((response) => response.json())
            .then((data) => {
                let sortPostByDate = data.sort((obj1, obj2) => new Date(obj2.creation_date) - new Date(obj1.creation_date));
                setPosts(sortPostByDate);
            });
    }, []);

    const mainPagePosts = (posts) => {
        const mainPosts = posts.map((post) => <BlogCards key={posts.id} data={post} />);
        return mainPosts;
    };

    return (
        <div>
            <Header />
            <Heading>Welcome to Bloggers!</Heading>
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
