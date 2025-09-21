import {
    IconButton,
    Toolbar, AppBar, Box,
    useMediaQuery, useTheme, Stack,
    Badge
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { dataContext } from "../Context/MetricsContext";
import { useEffect, useState,useContext } from "react";
import image from '../../../public/recetaFacil.png';

const AppBarContent = () => {
    const {openDrawer,setOpenDrawer} = useContext(dataContext);
    const {top, setTop} = useContext(dataContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {

        if (!isMobile) handleAppBarClose()
        if (isMobile) setTop('0');
    }, [isMobile])


    const handleAppBar = () => {
        if (isMobile) {
            setOpenDrawer(true);
            setTop('0');
        } else {
            let val = (openDrawer) ? false : true;
            setOpenDrawer(val);
        }

    }
    const handleAppBarClose = () => {
        setOpenDrawer(false);
        setTop('65');
    }

    return (
        <>
            <AppBar elevation={0} position="fixed" sx={{ p: 0, borderBottom: 'thin solid rgba(156, 156, 156, 0.12)', background: 'rgba(99, 99, 99, 0.12)' }}>
                <Toolbar sx={{ bgcolor: '#ffffffff' }}>
                    <IconButton onClick={handleAppBar}>
                        <MenuIcon />
                    </IconButton>
                    <img src={image} width='100px' height='60px'></img>
                    <Stack direction='row' spacing={1} sx={{ display: 'Flex', ml: 'auto' }}>
                        <Box>
                            <IconButton>
                                <Badge badgeContent={1} color='primary'>
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton>
                                <AccountCircleIcon />
                            </IconButton>
                        </Box>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default AppBarContent;