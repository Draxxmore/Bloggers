import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import { Button, TextField, Box } from "@mui/material";

const EditBlog = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const handleEdit = (event) => {
        event.preventDefault();

        const editedBlogContent = {
            title: document.getElementById("edit-blog-title").value,
            content: document.getElementById("edit-blog-content").value,
        };

        const fetchOptions = {
            mode: "cors",
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedBlogContent),
        };

        fetch(`http://localhost:4000/api/blog/${state.post_id}`, fetchOptions)
            .then(() => navigate(-1))
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Header />
            <PageContainer>
                <TitleHeader>Blog Title</TitleHeader>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField id="edit-blog-title" defaultValue={state.title} sx={{ width: 700 }}></TextField>
                </Box>
                <TitleHeader>Content</TitleHeader>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField id="edit-blog-content" defaultValue={state.content} sx={{ width: 700, height: "80%" }} rows={20} multiline></TextField>
                </Box>
                <Button variant="contained" onClick={handleEdit}>
                    Edit Blog Post
                </Button>
            </PageContainer>
        </>
    );
};

const PageContainer = styled.div`
    padding-left: 20px;
    padding-top: 30px;
    height: 90vh;
    font-family: "Arial", san-serif;
`;

const TitleHeader = styled.h3`
    margin: 5px 0px;
`;

export default EditBlog;
