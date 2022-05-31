import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { Button } from "@mui/material";

const BlogCards = ({ data }) => {
    const [blogCards, setBlogCards] = useState(data);
    const [showButtons, setShowButtons] = useState(false);
    const [blogCardContent, setBlogCardContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const blogContentArr = blogCards.content.split(" ");
        if (blogContentArr.length > 100) {
            const displayContent = blogContentArr.slice(0, 99).join(" ") + "...";
            setBlogCardContent(displayContent);
        } else {
            setBlogCardContent(blogCards.content);
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/blog-post", { state: blogCards });
    };

    return (
        <CardContainer onClick={handleSubmit} onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)}>
            {/* {showButtons && (
                <>
                    <DeleteButton />
                    <EditButton />
                </>
            )} */}
            <BlogTitle>{blogCards.title}</BlogTitle>
            <BlogContent>{blogCardContent}</BlogContent>
        </CardContainer>
    );
};

const CardContainer = styled.div`
    height: 250px;
    width: 510px;
    border-radius: 7px;
    padding: 15px 20px;
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.19);
    margin: 10px;
    text-decoration: none;
    color: black;
    overflow: hidden;
    white-space: pre-wrap;
    &:hover {
        box-shadow: 3px 3px 7px 3px rgba(0, 0, 0, 0.4);
    }
`;

const BlogTitle = styled.h3`
    font-family: "Arial", san-serif;
`;
const BlogContent = styled.p`
    font-family: "Arial", san-serif;
`;

export default BlogCards;
