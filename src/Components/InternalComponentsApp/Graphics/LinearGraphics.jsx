import ReactECharts from "echarts-for-react";
import { Box, Card, CardContent } from "@mui/material";

const LinearGraphics = () => {
  const option = {
     toolbox: {
            feature: {
                saveAsImage: {},
                restore: {},
            }
        },
    title: { text: "Ventas Semanales", left: "center" },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: { type: "value" },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        itemStyle: {
          borderRadius: [4, 4, 0, 0], // esquinas redondeadas
        }
      }
    ]
  };

  return (
  
        <Box sx={{ width: "100%", height: 400 }}>
          <ReactECharts option={option} style={{ height: "100%" }} />
        </Box>
     
  );
};

export default LinearGraphics;
