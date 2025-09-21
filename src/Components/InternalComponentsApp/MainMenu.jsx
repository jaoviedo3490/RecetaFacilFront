import { Toolbar, Box, Container, useMediaQuery, useTheme } from "@mui/material";
import MainContent from "./MainContent";
import AppBarContent from "./AppBarContent";
import SideBar from "./SideBar";
import { dataContext } from "../Context/MetricsContext"
import { useContext } from "react";

const MainMenu = () => {
    const { openDrawer } = useContext(dataContext);
    const { loginSuccess } = useContext(dataContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {loginSuccess && (
                <>
                <AppBarContent />
                <SideBar></SideBar>
                <Box>
                    <MainContent />
                </Box>
            </>)
            }
        </>
    );
}

export default MainMenu;