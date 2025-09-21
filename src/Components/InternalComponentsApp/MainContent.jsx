import { Box, Typography, Stack, useTheme, useMediaQuery, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Toolbar, Badge } from "@mui/material";
import { dataContext } from "../Context/MetricsContext";
import { useContext } from "react";
import PruebaECharts from "./Graphics/PruebaEcharts";
const MainContent = () => {
  const { openDrawer } = useContext(dataContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        ml: openDrawer ? "270px" : "20px", pr: '2%', // se ajusta al ancho del drawer
        transition: "margin .3s ease",      // animación suave
        overflowX: "hidden"
      }}
    >
      <Typography variant="h7" sx={{ ml: 0 }}>Esta semana</Typography>
      <Box>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
          <PruebaECharts></PruebaECharts>
          <Stack direction="column" spacing={2}>
            <Card >
              <CardContent>
                <Typography variant='h7'>Recetas totales Hoy</Typography>

                <Typography variant='h4'>3</Typography>
                <Box
                  sx={{
                    display: "inline-block",
                    backgroundColor: "rgba(245, 196, 196, 0.3)",
                    border: "1px solid rgba(200, 0, 0, 0.7)",
                    borderRadius: "8px",
                    px: 2,
                    py: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "rgba(150, 0, 0, 1)", fontWeight: 600 }}
                  >
                    5% del total
                  </Typography>
                </Box>

              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant='h7'>Recetas totales esta Semana</Typography>
                <Typography variant='h4'>3</Typography>
                <Box
                  sx={{
                    display: "inline-block",
                    backgroundColor: "rgba(245, 240, 196, 0.3)",
                    border: "1px solid rgba(200, 197, 0, 0.7)",
                    borderRadius: "8px",
                    px: 2,
                    py: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "rgba(147, 150, 0, 1)", fontWeight: 600 }}
                  >
                    25% del total
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant='h7'>Colecciones</Typography>
                <Typography variant='h4'>5</Typography>
                <Box
                  sx={{
                    display: "inline-block",
                    backgroundColor: "rgba(196, 219, 245, 0.3)",
                    border: "1px solid rgba(0, 120, 200, 0.7)",
                    borderRadius: "8px",
                    px: 2,
                    py: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "rgba(0, 90, 150, 1)", fontWeight: 600 }}
                  >
                    25% del total
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
        <Typography>Top 10 Recetas</Typography>
        <Card>
          <CardContent>
            <Table>
              <TableHead >
                <TableRow sx={{ backgroundColor: 'success.light' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Ingredientes</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Fecha</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Guardada</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Pollo a la Naranja</TableCell>
                  <TableCell>Pollo , Naranja,mas</TableCell>
                  <TableCell>20/09/2025</TableCell>
                  <TableCell>no</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Pollo a la Naranja</TableCell>
                  <TableCell>Pollo , Naranja,mas</TableCell>
                  <TableCell>20/09/2025</TableCell>
                  <TableCell>no</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Pollo a la Naranja</TableCell>
                  <TableCell>Pollo , Naranja,mas</TableCell>
                  <TableCell>20/09/2025</TableCell>
                  <TableCell>no</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Pollo a la Naranja</TableCell>
                  <TableCell>Pollo , Naranja,mas</TableCell>
                  <TableCell>20/09/2025</TableCell>
                  <TableCell>no</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Pollo a la Naranja</TableCell>
                  <TableCell>Pollo , Naranja,mas</TableCell>
                  <TableCell>20/09/2025</TableCell>
                  <TableCell>no</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Pollo a la Naranja</TableCell>
                  <TableCell>Pollo , Naranja,mas</TableCell>
                  <TableCell>20/09/2025</TableCell>
                  <TableCell>no</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Toolbar></Toolbar>
      </Box>

    </Box >
  );
};

export default MainContent;