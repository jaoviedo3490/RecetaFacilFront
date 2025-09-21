import { Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Prueba = () => {
  const data = [
    { name: "Sabado", recetas: 2 },
    { name: "Domingo", recetas: 1 },
    { name: "Lunes", recetas: 3 },
    { name: "Martes", recetas: 2 },
    { name: "Miercoles", recetas: 5 },
    { name: "Jueves", recetas: 2 },
    { name: "Viernes", recetas: 1 },
    { name: "Hoy", recetas: 0 },
  ];

  return (
    <Box sx={{ width: "100%", height: 400 }}>
      <Typography variant="h6" align="center" gutterBottom>Recetas por Semana</Typography>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="recetas" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Prueba;
