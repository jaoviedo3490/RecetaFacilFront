import ReactECharts from "echarts-for-react";
import { Box,Card, CardContent } from "@mui/material";

const PruebaSunburstChart = () => {
  const option = {
    title: { text: "Categorías de Ingredientes", left: "center" },
     toolbox: {
            feature: {
                saveAsImage: {},
                restore: {},
            }
        },
    series: [{
      type: 'sunburst',
      data: [
        { name: 'Frutas', children: [{ name: 'Manzana', value: 5 }, { name: 'Banana', value: 3 }] },
        { name: 'Verduras', children: [{ name: 'Zanahoria', value: 4 }, { name: 'Lechuga', value: 2 }] }
      ],
      radius: [0, '90%'],
      label: { rotate: 'radial' }
    }]
  };

  return (
    
        <Box sx={{ width: "100%", height: 400 }}>
          <ReactECharts option={option} style={{ height: '100%' }} />
        </Box>
    
  );
};

export default PruebaSunburstChart;
