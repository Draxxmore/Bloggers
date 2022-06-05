import React, { useContext } from "react";
import Header from "../Components/Header";
import { TextField, Button, ThemeProvider, createTheme } from "@mui/material";
import styled from "styled-components";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import config from "../config";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const CreateBlog = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

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

        fetch(`${ApiUrl}/api/blog/${user.id}`, options)
            .then(() => {
                console.log("Success!");
                navigate("/my-blogs");
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
                    <TextField id="create-blog-title" sx={{ width: "100%" }} />
                    <TitleHeader>Blog Content</TitleHeader>
                    <TextField id="create-blog-content" sx={{ width: "100%" }} rows={20} multiline />
                    <ThemeProvider theme={limeGreenButtonTheme}>
                        <Button variant="contained" sx={{ width: "100%", marginTop: 2 }} onClick={handleSubmit}>
                            Create Blog Post
                        </Button>
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

const CreateBlogForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 65vw;
`;

const TitleHeader = styled.h3`
    margin: 5px 0px;
    align-self: left;
    width: 100%;
    margin-top: 20px;
`;

const PageTitle = styled.h1`
    text-align: center;
    font-family: "Arial", san-serif;
    margin-bottom: 0px;
`;

export default CreateBlog;
