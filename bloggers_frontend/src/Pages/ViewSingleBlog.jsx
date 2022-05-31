import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import { Button } from "@mui/material";
import LoggedInContext from "../Context/LoggedInContext";

const ViewSingleBlog = () => {
    const { state } = useLocation();
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
    const [blogPostInfo, setBlogPostInfo] = useState([]);
    const [displayButtons, setDisplayButtons] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            mode: "cors",
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        fetch(`http://localhost:4000/api/blog/blog-post/${state.id}`, options)
            .then((response) => response.json())
            .then((data) => {
                setBlogPostInfo(data[0]);
            });
    }, []);

    useEffect(() => {
        if (loggedIn) {
            setDisplayButtons(true);
        } else {
            setDisplayButtons(false);
        }
    }, [blogPostInfo]);

    const handleEdit = (event) => {
        event.preventDefault();
        navigate("/edit-blog", { state: blogPostInfo });
    };

    const handleDelete = (event) => {};

    const author = blogPostInfo.first_name + " " + blogPostInfo.last_name;

    return (
        <>
            <Header />
            <BlogPostContainer>
                <ButtonContainer>
                    {displayButtons ? (
                        <>
                            <Button onClick={handleEdit} variant="contained">
                                Edit
                            </Button>
                            <Button variant="contained">Delete</Button>
                        </>
                    ) : (
                        ""
                    )}
                </ButtonContainer>
                <Container>
                    <Title>{blogPostInfo.title}</Title>
                    <Author>
                        Created by {author} on {new Date(blogPostInfo.creation_date).toDateString()}
                    </Author>
                    <Content>{blogPostInfo.content}</Content>
                </Container>
            </BlogPostContainer>
        </>
    );
};

const BlogPostContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    border: solid red 1px;
    font-family: "Arial", san-serif;
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 65vw;
    justify-content: right;
    margin-top: 20px;
    gap: 10px;
`;

const Title = styled.h1``;

const Content = styled.p`
    font-family: "Arial", san-serif;
    white-space: pre-wrap;
`;

const Author = styled.p`
    font-style: italic;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 65vw;
`;

export default ViewSingleBlog;
