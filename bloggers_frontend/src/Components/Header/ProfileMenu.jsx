import React, { useContext, useState, useEffect } from "react";
import { Button, Menu, MenuItem, createTheme, ThemeProvider } from "@mui/material";
import UserContext from "../../Context/UserContext";
import { useCookies } from "react-cookie";
import LoggedInContext from "../../Context/LoggedInContext";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
    const [user, setUser] = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
    const [initials, setInitials] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        const userInitials = async () => {
            const firstNameInitial = user.first_name.slice(0, 1);
            const lastNameInitial = user.last_name.slice(0, 1);
            setInitials(firstNameInitial + lastNameInitial);
        };
        userInitials();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        removeCookie("access_token");
        setAnchorEl(null);
        setLoggedIn(false);
        navigate("/");
        window.location.reload();
    };

    const limeGreenButtonTheme = createTheme({
        palette: { primary: { main: "#89E347", darker: "#8AE845", contrastText: "#fff" } },
        typography: { fontWeightBold: 700 },
    });

    return (
        <>
            {initials.length ? (
                <ThemeProvider theme={limeGreenButtonTheme}>
                    <Button
                        id="profile-button"
                        variant="contained"
                        sx={{ borderRadius: 50, width: 50, height: 60, fontSize: 25 }}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        {initials}
                    </Button>
                </ThemeProvider>
            ) : (
                <></>
            )}
            <Menu id="profile-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ "aria-labelledby": "profile-button" }}>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default ProfileMenu;
