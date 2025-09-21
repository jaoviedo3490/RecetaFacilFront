import ReactECharts from "echarts-for-react";
import { Box } from "@mui/material";

const PruebaTreemapChart = () => {
  const option = {
    title: { text: "Ventas por Categoría", left: "center" },
    series: [{
      type: 'treemap',
      data: [
        { name: 'Electrónica', value: 10 },
        { name: 'Ropa', value: 15 },
        { name: 'Alimentos', value: 8 }
      ],
      label: { show: true, formatter: '{b}: {c}' }
    }]
  };

  return (
    <Box sx={{ width: "100%", height: 400 }}>
      <ReactECharts option={option} style={{ height: '100%' }} />
    </Box>
  );
};

export default PruebaTreemapChart;
