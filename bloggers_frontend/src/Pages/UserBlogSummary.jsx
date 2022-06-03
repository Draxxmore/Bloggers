import React, { useState, useEffect, useContext } from "react";
import Header from "../Components/Header";
import styled from "styled-components";
import BlogCards from "../Components/MainPage/BlogCards";
import UserContext from "../Context/UserContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "../config";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const UserBlogSummary = () => {
    const [myBlogPosts, setMyBlogPosts] = useState([]);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            mode: "cors",
            method: "GET",
        };

        fetch(`${ApiUrl}/api/blog/`, options)
            .then((response) => response.json())
            .then((data) => {
                setMyBlogPosts(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const userPagePosts = (posts) => {
        const userPosts = posts.map((post) => {
            if (user.id === post.user_id) {
                return <BlogCards data={post} />;
            }
        });
        return userPosts;
    };

    const handleCreateBlog = (event) => {
        event.preventDefault();
        navigate("/create-blog");
    };

    return (
        <>
            <Header />
            <PageContainer>
                <MyBlogPageHeader>My Blogs</MyBlogPageHeader>
                <ButtonContainer>
                    <Button variant="contained" onClick={handleCreateBlog} sx={{ marginLeft: 5 }}>
                        Create Blog
                    </Button>
                </ButtonContainer>
                {userPagePosts(myBlogPosts).includes(!undefined) ? (
                    <NoBlogs>You have no blogs</NoBlogs>
                ) : (
                    <CardsContainer>{userPagePosts(myBlogPosts)}</CardsContainer>
                )}
            </PageContainer>
        </>
    );
};

const PageContainer = styled.div`
    height: 88vh;
    width: 100%;
`;

const MyBlogPageHeader = styled.h1`
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
    gap: 10px;
`;

const NoBlogs = styled.div`
    font-size: 20px;
    margin-top: 20px;
    margin-left: 40px;
    font-family: "Arial", san-serif;
`;

export default UserBlogSummary;
