import {
    Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton,
    Toolbar, AppBar, Typography, Box, Grid, Paper, ListItemButton,
    useMediaQuery, useTheme, Container, CardHeader, CardContent, Card, ListSubheader, Stack,
    Badge
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from "@mui/icons-material/Menu";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import CalculateIcon from '@mui/icons-material/Calculate';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useEffect, useState } from "react";
import image from '../../../public/recetaFacil.png';
import MainMenu from "./mainMenu";
const SideBar = () => {
    const [top, setTop] = useState('65');
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (!isMobile) handleAppBarClose()
        if (isMobile) setTop('0');
    }, [isMobile])


    const handleAppBar = () => {
        if (isMobile) {
            setOpen(true);
            setTop('0');
        } else {
            let val = (open) ? false : true;
            setOpen(val);
        }

    }
    const handleAppBarClose = () => {
        setOpen(false);
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
                        <Box sx={{}}>
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
            <Drawer variant={isMobile ? 'temporary' : 'persistent'} open={open} slotProps={{
                paper: {
                    sx:
                    {
                        width: '250px',
                        top: `${top}px`,
                        height: `calc(100% -  ${top}px)`
                    }
                }
            }}>
                <Box sx={{ m: 0, p: 0 }}>
                    <List subheader={
                        <ListSubheader sx={{
                            bgcolor: 'grey.300',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            fontSize: 12,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            lineHeight: '32px'
                        }} component="div">Menu de opciones</ListSubheader>
                    }>
                        <ListItemButton>
                            <ListItemIcon>
                                <Toolbar><HomeIcon /><ListItemText primary="Inicio"></ListItemText></Toolbar>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <Toolbar><CalculateIcon /><ListItemText primary="Crea tu Receta"></ListItemText></Toolbar>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <Toolbar><LibraryBooksIcon /><ListItemText primary="Colleciones"></ListItemText></Toolbar>
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                    <List subheader={
                        <ListSubheader sx={{
                            bgcolor: 'grey.300',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            fontSize: 12,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            lineHeight: '32px'
                        }} component="div">Estadisticas</ListSubheader>
                    }>
                        <ListItemButton>
                            <ListItemIcon>
                                <Toolbar><EqualizerIcon /><ListItemText primary="Graficos"></ListItemText></Toolbar>
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Toolbar>
                    <Box sx={{ justifyContent: 'flex-end' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon /><ListItemText primary="LogOut"></ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    </Box>
                    {isMobile && (<Box sx={{ flexFlow: 1, justifyContent: 'flex-end' }}>
                        <ListItemButton onClick={handleAppBarClose}>
                            <ListItemIcon>
                                <KeyboardDoubleArrowLeftIcon />
                            </ListItemIcon>
                        </ListItemButton>
                    </Box>)}
                </Toolbar>
            </Drawer>
         

        </>

    );
}

export default SideBar;