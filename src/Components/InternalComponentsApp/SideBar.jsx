import {
    Drawer, List, ListItemIcon, ListItemText,
    Toolbar, Typography, Box, Grid, ListItemButton,
    useMediaQuery, useTheme, Container, ListSubheader
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import CalculateIcon from '@mui/icons-material/Calculate';
import { dataContext } from "../Context/MetricsContext";
import { useEffect, useContext } from "react";


const SideBar = () => {
    const { top, setTop } = useContext(dataContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { openDrawer, setOpenDrawer } = useContext(dataContext);
    const correo = localStorage.getItem("correo");
    const { setOptions, menuOptions } = useContext(dataContext);


    const handleLogout = () => {
        const formData = new FormData();
        formData.append('mail', correo);
        formData.append('token', localStorage.getItem('barer'));
        fetch('http://localhost/recetaFacil/RecetaFacil.com/public/Session/Jwt/Logout', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (!response.ok) {
                return {
                    data: { 'Code': 500, "Message": "Error interno del servidor" }
                }
            }
            return response.json();
        }).then(data => {
            switch (data.statusCode || data.Code) {
                case 200:
                    if (data.statusCode.Code === 200) {
                        localStorage.removeItem("correo"); debugger;
                        localStorage.removeItem("barer"); debugger;
                        window.location.href = '/login';
                    }
                case 401:
                    localStorage.removeItem("correo"); debugger;
                    localStorage.removeItem("barer"); debugger;
                    window.location.href = '/login';
                    window.location.href = '/login';
                    break;
                default: break;
            }
        })
    }

    const handleDashboard = () => {
        setOptions("dashboard")
    }
    const handleRecetas = ()=>{
        setOptions("receta")
    }
    useEffect(() => {
        if (!isMobile) handleAppBarClose()
        if (isMobile) setTop('0');
    }, [isMobile])


    const handleAppBarClose = () => {
        setOpenDrawer(false);
        setTop('65');
    }

    return (
        <>
            <Drawer variant={isMobile ? 'temporary' : 'persistent'} open={openDrawer} slotProps={{
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
                        <ListItemButton onClick={handleDashboard }>
                            <ListItemIcon>
                                <Toolbar><HomeIcon /><ListItemText primary="Inicio"></ListItemText></Toolbar>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={handleRecetas}>
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
                        <ListItemButton onClick={handleLogout}>
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