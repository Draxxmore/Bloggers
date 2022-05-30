import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BlogCards = ({ data }) => {
    const [blogCards, setBlogCards] = useState(data);

    return (
        <CardContainer>
            <BlogTitle>{blogCards.title}</BlogTitle>
            <BlogContent>{blogCards.content}</BlogContent>
        </CardContainer>
    );
};

const CardContainer = styled.div`
    height: 250px;
    width: 350px;
    border: solid black 1px;
    border-radius: 12px;
    padding: 15px 20px;
    box-shadow: 3px 3px 7px 3px rgba(0, 0, 0, 0.19);
    margin: 10px;
    text-decoration: none;
    color: black;
    &:hover {
        box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.4);
    }
`;

const BlogTitle = styled.h3``;
const BlogContent = styled.p``;

export default BlogCards;
