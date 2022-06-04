import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import { Button, FormControlLabel, Switch, TextField, createTheme, ThemeProvider } from "@mui/material";
import UserContext from "../Context/UserContext";
import config from "../config";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const ViewSingleBlog = () => {
    const { state } = useLocation();
    const [blogPostInfo, setBlogPostInfo] = useState([]);
    const [displayButtons, setDisplayButtons] = useState(false);
    const [editToggle, setEditToggle] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            mode: "cors",
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        fetch(`${ApiUrl}/api/blog/blog-post/${state.id}`, options)
            .then((response) => response.json())
            .then((data) => {
                setBlogPostInfo(data[0]);
            });
    }, []);

    useEffect(() => {
        if (state.user_id === user.id) {
            setDisplayButtons(true);
        } else {
            setDisplayButtons(false);
        }
    }, [blogPostInfo, user]);

    const handleEdit = (event) => {
        event.preventDefault();

        const editedBlogContent = {
            title: document.getElementById("edit-blog__title").value,
            content: document.getElementById("edit-blog__content").value,
        };

        const fetchOptions = {
            mode: "cors",
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedBlogContent),
        };

        fetch(`${ApiUrl}/api/blog/${state.id}`, fetchOptions)
            .then(() => {
                setEditToggle(false);
                navigate("/my-blogs");
            })
            .catch((error) => console.log(error));
    };

    const handleEditToggle = () => {
        setEditToggle(!editToggle);
    };

    const handleDelete = (event) => {
        event.preventDefault();

        const fetchOptions = {
            mode: "cors",
            method: "DELETE",
        };

        fetch(`${ApiUrl}/api/blog/${state.id}`, fetchOptions)
            .then(() => {
                navigate("/my-blogs");
            })
            .catch((error) => console.log(error));
    };

    const author = blogPostInfo.first_name + " " + blogPostInfo.last_name;

    const limeGreenButtonTheme = createTheme({
        palette: { primary: { main: "#89E347", darker: "#8AE845", contrastText: "#fff" } },
        typography: { fontWeightBold: 700 },
    });

    return (
        <>
            <Header />
            <ThemeProvider theme={limeGreenButtonTheme}>
                <BlogPostContainer>
                    <ButtonContainer>
                        {displayButtons ? (
                            <>
                                <FormControlLabel
                                    control={<Switch checked={editToggle} onChange={handleEditToggle} />}
                                    label="Edit"
                                    labelPlacement="start"
                                />
                                <Button variant="contained" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </>
                        ) : (
                            ""
                        )}
                    </ButtonContainer>
                    {!editToggle ? (
                        <Container>
                            <Title>{blogPostInfo.title}</Title>
                            <Author>
                                Created by {author} on {new Date(blogPostInfo.creation_date).toDateString()}
                            </Author>
                            <Content>{blogPostInfo.content}</Content>
                        </Container>
                    ) : (
                        <Container>
                            <TextField id="edit-blog__title" defaultValue={blogPostInfo.title} label="Title"></TextField>
                            <TextField id="edit-blog__content" defaultValue={blogPostInfo.content} label="Content" rows={20} multiline></TextField>
                            <Button variant="contained" onClick={handleEdit}>
                                Update Blog
                            </Button>
                        </Container>
                    )}
                </BlogPostContainer>
            </ThemeProvider>
        </>
    );
};

const BlogPostContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    font-family: "Arial", san-serif;
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 65vw;
    justify-content: right;
    margin-top: 20px;
    gap: 10px;
    margin-bottom: 20px;
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
    gap: 15px;
`;

export default ViewSingleBlog;
