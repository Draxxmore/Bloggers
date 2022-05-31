import React from "react";
import { Button } from "@mui/material";
import styled from "styled-components";

const EditButton = () => {
    return (
        <ButtonContainer>
            <Button id="edit-button__card" sx={{ height: 62, width: 30, borderRadius: 50, background: "gray" }}></Button>
        </ButtonContainer>
    );
};

const ButtonContainer = styled.div`
    float: right;
    margin-right: 5px;
`;

export default EditButton;
