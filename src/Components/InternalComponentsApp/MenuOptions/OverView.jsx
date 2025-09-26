import { Box, Typography, Stack, useTheme, useMediaQuery, Card, CardContent,Button  ,ButtonGroup ,Table, TableHead, TableRow, TableCell, TableBody, Toolbar, Badge, CardHeader } from "@mui/material";
import { dataContext } from "../../Context/MetricsContext";
import { useContext, useState, useEffect } from "react";
import PruebaECharts from "../Graphics/PruebaEcharts";
import CachedIcon from '@mui/icons-material/Cached';
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BoxCustom from "../Customed/BoxCustom";
import { DataGrid } from "@mui/x-data-grid";
const OverView = () => {
  const { openDrawer } = useContext(dataContext);
  const { setChartData } = useContext(dataContext);
  const { collectionData, setCollectionData } = useContext(dataContext);
  const { recetasToday, setToday } = useContext(dataContext);
  const [todayPercent, setPercent] = useState('');
  const [collectPercent, setCollectPercent] = useState('');
  const [recetas_week, setRecetasWeek] = useState('');
  const [recetas_week_percent, setRecetasWeelPercent] = useState('');
  const [top_5_recetas, setTop5] = useState('');
  const [all_week_collections, setCollection] = useState('');
  const [all_week_collections_percent, setWeekCollectionsPercent] = useState('');
  const [paginationModel, setPagination] = useState({ page: 0, pageSize: 10 });
  const columns = [
    { field: "id", headerName: "Identificador", width: 90 },
    { field: "_nombre", headerName: "Nombre", flex: 1 },
    { field: "_fecha_registro", headerName: "Fecha", width: 180 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <ButtonGroup>
          <Button variant="outlined" size="small" startIcon={<RemoveRedEyeIcon />}>
            Ver
          </Button>
          <Button variant="contained" size="small" color="success" startIcon={<SaveAltIcon />}>
            Guardar
          </Button>
        </ButtonGroup>
      ),
    },

  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formData = new FormData();

    formData.append('mail', localStorage.getItem('correo'));
    formData.append('token', localStorage.getItem('barer'));
    formData.append('date_init', `${year}-${(month === 13) ? 12 : month}-${day - 7}`);
    formData.append('date_end', `${year}-${(month === 13) ? 12 : month}-${day}`);
    formData.append('today', `${year}-${(month === 13) ? 12 : month}-${day}`);
    fetch('http://localhost/recetaFacil/RecetaFacil.com/public/Reports/home', {
      method: 'POST',
      body: formData
    }).then(response => {
      return response.json();
    }).then(data => {
      if (data.Code === 401) {

        localStorage.removeItem("correo"); debugger;
        localStorage.removeItem("barer"); debugger;
        alert("Su sesion ha expirado , inicie sesion nuevamente para continuar");
        window.location.href = '/login';
        setLoginSuccess(false);
      }
      //console.log(data);
      setChartData(data.data.statusWeek.data);
      setCollectionData(data.data.collections);
      setToday(data.data.today);
      setPercent(data.data.rf_all_);
      setRecetasWeek(data.data.rf_all_Week);
      setRecetasWeelPercent(data.data.rf_all_Week_percent);
      setCollection(data.data.rf_all_week_collections);
      setCollectPercent(data.data.rf_collect_today);
      setTop5(data.data.rf_top_5);
      setWeekCollectionsPercent(data.data.rf_all_week_collections_percent);



    })

  }, []);


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

      <Box sx={{ p: 1, pb: 1, top: '65px', overflowX: "hidden", height: 'calc(100vh - 100px)' }}>
        <Stack direction='column' spacing={2}>
          <Stack direction={isMobile ? 'column' : 'row'} spacing={1} sx={{ height: '450px' }}>
            <Card sx={{ width: isMobile ? "100%" : '100%', height: 450 }}>
              <CardContent>
                <PruebaECharts></PruebaECharts>
              </CardContent>
            </Card>
            <Stack direction="column" spacing={2}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant='h7'>Recetas totales Hoy</Typography>


                  <Stack direction='row' sx={{ width: '400px' }} spacing={0.5} justifyContent="space-between" alignItems="center">
                    <Typography variant='h4'>{recetasToday}</Typography>
                    <BoxCustom valueA={todayPercent} text={`${todayPercent}% del total`}></BoxCustom>
                  </Stack>

                </CardContent>
              </Card>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant='h7'>Recetas totales esta Semana</Typography>
                  <Stack direction='row' spacing={0.5} justifyContent="space-between" alignItems="center">
                    <Typography variant='h4'>{recetas_week}</Typography>
                    <BoxCustom valueA={recetas_week_percent} text={`${recetas_week_percent}% del total`}></BoxCustom>
                  </Stack>
                </CardContent>
              </Card>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant='h7'>Colecciones totales hoy</Typography>
                  <Stack direction='row' spacing={0.5} justifyContent="space-between" alignItems="center">
                    <Typography variant='h4'>{collectionData}</Typography>
                    <BoxCustom valueA={collectPercent} text={`${collectPercent}% del total`}></BoxCustom>
                  </Stack>
                </CardContent>
              </Card>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant='h7'>Colecciones totales esta semana</Typography>
                  <Stack direction='row' spacing={0.5} justifyContent="space-between" alignItems="center">
                    <Typography variant='h4'>{all_week_collections}</Typography>

                    <BoxCustom valueA={all_week_collections_percent} text={`${all_week_collections_percent}% del total`}></BoxCustom>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Stack>

          <Card>

            <Typography variant='h4' sx={{ textAlign: 'center' }}>Ultimas 5 recetas</Typography>
            <CardContent>
              <DataGrid
                rows={top_5_recetas}
                columns={columns}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={setPagination}
                pageSizeOptions={[5]}

                disableRowSelectionOnClick
              />
              {/*<Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'success.light' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>NOMBRE</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>INGREDIENTES</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>FECHA</TableCell>
                  </TableRow>
                  {Object.values(top_5_recetas).map((obj) => {
                    return (
                      <TableRow hover key={obj.id}>
                        <TableCell>{obj.id}</TableCell>
                        <TableCell>{obj._nombre}</TableCell>
                        <TableCell> <Stack direction='row' spacing={1}>
                          {Object.keys(JSON.parse(obj._ingredientes)).map((Ingredientes) => {
                            return (
                              <>
                                <Box key={Ingredientes} sx={{ backgroundColor: 'rgba(244, 167, 231, 0.87)', border: '1px solid rgba(243, 26, 206, 0.87)', borderRadius: '5px', p: 1, width: '10%' }}>{Ingredientes}</Box>
                              </>
                            );
                          })}</Stack>
                        </TableCell>
                        <TableCell>{obj._fecha_registro}</TableCell>
                      </TableRow>);
                  })}
                </TableHead>
                <TableBody>
                </TableBody>
              </Table>*/}
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box >
  );
};

export default OverView;