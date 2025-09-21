import ReactECharts from "echarts-for-react";
import { Box, Typography ,useTheme,useMediaQuery} from "@mui/material";
const PruebaECharts = () => {
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
            data: ["Sábado", "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Hoy"]
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                name: "Recetas",
                type: "line",
                smooth: true,
                data: [2, 1, 3, 2, 5, 2, 1, 0]
            }
        ]
    };

    return (
        <Box sx={{ width: isMobile ? "100%":'65%', height: 400 }}>
            <ReactECharts option={option} style={{ height: 350 }} />
        </Box>
    );
};
//SELECT COUNT(*)AS CANTIDAD  , _FECHA_REGISTRO AS DIA FROM rfrecetas GROUP BY _FECHA_REGISTRO

export default PruebaECharts;
