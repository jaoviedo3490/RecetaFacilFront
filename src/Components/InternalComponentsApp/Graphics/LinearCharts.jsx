import ReactECharts from "echarts-for-react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { dataContext } from "../../Context/MetricsContext";
import { useContext } from "react";

const LinearChart = (props) => {
    const { openDrawer } = useContext(dataContext);
    const { eChartData, setChartData } = useContext(dataContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!props.data || props.data.length === 0) return null;

    const llaves = Object.keys(props.data[0]);
    const values_ = Object.values(props.data[0]);

    const option = {
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
        title: {
            text: "Cantidad por Estado",
            left: "center"
        },
        xAxis: {
            type: 'category',
            data: llaves
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: values_,
                type: 'bar'
            }
        ]
    };

    return (
        <Box sx={{ width: isMobile ? "100%" : '100%', height: 400 }}>
            <ReactECharts option={option} style={{ height: 400 }} />
        </Box>
    );
};

export default LinearChart;
