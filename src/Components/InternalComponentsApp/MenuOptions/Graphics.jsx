import DonutChart from "../Graphics/DonutChart";
import LinearGraphics from "../Graphics/LinearGraphics";
import PruebaSunburstChart from "../Graphics/PruebaSunburstChart";
import StackedLineChart from "../Graphics/StackedLineChart";
import { Box, Grid, useTheme, useMediaQuery, Card, CardContent, Typography, Stack } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { dataContext } from "../../Context/MetricsContext";
import { useContext, useState, useEffect } from "react";

const Graphics = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { openDrawer, setChartData, collectionData, setCollectionData, recetasToday, setToday } = useContext(dataContext);

    return (
        <Box
            component="main"
            sx={{
                height: "calc(100vh - 64px)",
                ml: openDrawer ? "270px" : "20px",
                pr: '2%',
                transition: "margin .3s ease",
                overflowX: "hidden",
                mt: '64px'
            }}
        >

            <Typography variant='h6'>Panel</Typography>
            <Stack direction="column" spacing={2}>
                <Stack direction={isMobile ? 'column' : 'row'} spacing={2} sx={{ minHeight: 300 }}>
                    <Card sx={{ flex: 2, width: '100%', minHeight: isMobile ? 300 : 450 }}>
                        <CardContent sx={{ height: "100%" }}>
                            <PruebaSunburstChart />
                        </CardContent>
                    </Card>
                    <Card sx={{ flex: 2, width: '100%', minHeight: isMobile ? 300 : 450 }}>
                        <CardContent sx={{ height: "100%" }}>
                            <LinearGraphics />
                        </CardContent>
                    </Card>
                    <Card sx={{ flex: 2, width: '100%', minHeight: isMobile ? 300 : 450 }}>
                        <CardContent sx={{ height: "100%" }}>
                            <DonutChart />
                        </CardContent>
                    </Card>
                    
                </Stack>

            </Stack>
            <Card sx={{ flex: 2, width: '100%', minHeight: isMobile ? 300 : 450 }}>
                <CardContent sx={{ height: "100%" }}>
                    <StackedLineChart />
                </CardContent>
            </Card>

        </Box>
    );
};

export default Graphics;
