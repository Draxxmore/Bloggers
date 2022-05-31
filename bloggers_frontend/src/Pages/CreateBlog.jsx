import React, { useState, useContext } from "react";
import Header from "../Components/Header";
import { Box, TextField, Button, ThemeProvider, createTheme } from "@mui/material";
import styled from "styled-components";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();

        const blogPost = {
            title: document.getElementById("create-blog-title").value,
            content: document.getElementById("create-blog-content").value,
        };

        const options = {
            mode: "cors",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogPost),
        };

        console.log(document.getElementById("create-blog-title"));

        fetch(`http://localhost:4000/api/blog/${user.id}`, options)
            .then(() => {
                console.log("Success!");
                navigate("/");
            })
            .catch((error) => console.log(error));
    };

    const limeGreenButtonTheme = createTheme({
        palette: { primary: { main: "#89E347", darker: "#8AE845", contrastText: "#fff" } },
        typography: { fontWeightBold: 700 },
    });

    return (
        <>
            <Header />
            <PageTitle>Create Blog</PageTitle>
            <PageContainer>
                <CreateBlogForm>
                    <TitleHeader>Blog Title</TitleHeader>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField id="create-blog-title" sx={{ width: 700 }} />
                    </Box>
                    <TitleHeader>Blog Content</TitleHeader>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField id="create-blog-content" sx={{ width: 700, height: "80%" }} rows={20} multiline />
                    </Box>
                    <ThemeProvider theme={limeGreenButtonTheme}>
                        <ButtonContainer>
                            <Button variant="contained" onClick={handleSubmit}>
                                Create Blog Post
                            </Button>
                        </ButtonContainer>
                    </ThemeProvider>
                </CreateBlogForm>
            </PageContainer>
        </>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 90vh;
    padding-top: 20px;
    font-family: "Arial", san-serif;
`;

const CreateBlogForm = styled.div``;

const TitleHeader = styled.h3`
    margin: 5px 0px;
`;

const PageTitle = styled.h1`
    text-align: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: right;
`;

export default CreateBlog;
