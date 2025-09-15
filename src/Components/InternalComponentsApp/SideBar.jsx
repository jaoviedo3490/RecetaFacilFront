import {
    Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton,
    Toolbar, AppBar, Typography, Box, Grid, Paper, ListItemButton,
    useMediaQuery, useTheme, Container, CardHeader, CardContent, Card
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu"
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
const SideBar = () => {
    const [top, setTop] = useState('65');
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (!isMobile) handleAppBarClose()
    }, [isMobile])


    const handleAppBar = () => {
        setOpen(true);
        setTop('0');
    }
    const handleAppBarClose = () => {
        setOpen(false);
        setTop('65');
    }

    return (
        <>
            <AppBar elevation={0} position="fixed" sx={{ p: 0, borderBottom: 'thin solid rgba(156, 156, 156, 0.12)', background: 'rgba(99, 99, 99, 0.12)' }}>
                <Toolbar sx={{ bgcolor: '#ffffffff' }}>
                    {isMobile && (<IconButton onClick={handleAppBar}>
                        <MenuIcon />
                    </IconButton>)}
                    <Typography sx={{ color: 'black' }}>{isMobile ? 'En telefono' : 'En Escritorio'}</Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant={isMobile ? 'temporary' : 'permanent'} open={open} slotProps={{
                paper: {
                    sx:
                    {
                        width: '200px',
                        top: `${top}px`,
                    }
                }
            }}>

                <Box sx={{ m: 0, p: 0 }}>
                    <List >
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon /><ListItemText primary="Inicio"></ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon /><ListItemText primary="Inicio"></ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                {isMobile && (<Box sx={{ flexFlow: 1, justifyContent: 'flex-end' }}>
                    <ListItemButton onClick={handleAppBarClose}>
                        <ListItemIcon>
                            <HomeIcon /><ListItemText primary="Cerrar"></ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                </Box>)}
            </Drawer>
            <Toolbar></Toolbar>
            <Container>
                <Box sx={{ p: 1 }}>
                    <Grid container>
                        <Typography>Menu Principal</Typography>
                        <Grid item>
                            <Card>

                                <CardHeader><Typography>Collecion 1</Typography></CardHeader>
                                <CardContent>Aqui va la coleccion</CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

        </>

    );
}

export default SideBar;