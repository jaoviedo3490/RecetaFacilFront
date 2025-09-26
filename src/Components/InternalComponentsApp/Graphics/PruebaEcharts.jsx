import ReactECharts from "echarts-for-react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { dataContext } from "../../Context/MetricsContext";
import { useContext } from "react";
const PruebaECharts = () => {
    const { openDrawer } = useContext(dataContext);
    const { eChartData, setChartData } = useContext(dataContext);
 
    const dataKeys = Object.keys(eChartData);
    let Dias = [];
    let Cantidad = [];
    const arr = dataKeys.map((obj)=>{
        Cantidad.push(eChartData[obj].CANTIDAD);
        Dias.push(eChartData[obj].DIA);
    })

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const option = {
        title: {
            text: "Recetas por Semana",
            left: "center"
        },
        tooltip: {
            trigger: "axis"
        },
        legend: {
            bottom: 0
        },
        toolbox: {
            feature: {
                saveAsImage: {},
                restore: {},
                dataZoom: {
                    yAxisIndex: "none"
                }
            }
        },
        xAxis: {
            type: "category",
            data: Dias
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                name: "Recetas",
                type: "line",
                smooth: true,
                data: Cantidad
            }
        ]
    };

    return (
        <Box sx={{ width: isMobile ? "100%" : '100%', height: 400 }}>
            <ReactECharts option={option} style={{ height: 400 }} />
        </Box>
    );
};
//SELECT COUNT(*)AS CANTIDAD  , _FECHA_REGISTRO AS DIA FROM rfrecetas GROUP BY _FECHA_REGISTRO

export default PruebaECharts;
