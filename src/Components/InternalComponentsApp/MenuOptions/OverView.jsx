import { Box, Typography, Stack, useTheme, useMediaQuery, Card, CardContent, Button, ButtonGroup } from "@mui/material";
import { dataContext } from "../../Context/MetricsContext";
import { useContext, useState, useEffect } from "react";
import PruebaECharts from "../Graphics/PruebaEcharts";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BoxCustom from "../Customed/BoxCustom";
import { DataGrid } from "@mui/x-data-grid";
import ViewSingleRecetas from "./SpecificActions/viewSingleRecetas";
import ChangeRecetaStatus from "./SpecificActions/deleteItem";
import LinearChart from "../Graphics/LinearCharts";

const OverView = () => {
  const { openDrawer, setChartData, collectionData, setCollectionData, recetasToday, setToday } = useContext(dataContext);

  const [todayPercent, setPercent] = useState('');
  const [collectPercent, setCollectPercent] = useState('');
  const [recetas_week, setRecetasWeek] = useState('');
  const [recetas_week_percent, setRecetasWeelPercent] = useState('');
  const [top_5_recetas, setTop5] = useState([]);
  const [all_week_collections, setCollection] = useState('');
  const [all_week_collections_percent, setWeekCollectionsPercent] = useState('');
  const [paginationModel, setPagination] = useState({ page: 0, pageSize: 10 });
  const [viewOpenModal, setOpenModal] = useState(false);
  const [viewChangeModal, setChangeModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowsChangeModal, setRowsChangeModal] = useState([]);
  const [recipes_per_status, setRecipes_per_status] = useState([]);
  const [update_render,setUpdateRender] = useState(false);

  const handleCloseChangeStatusModal = () => {
    setChangeModal(false);
  }


  const handleOpenModal = (param) => {
    setOpenModal(true);
    setRows(param);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }
  const handleOpenChangeStatusModal = (param) => {
    setRowsChangeModal(param)
    setChangeModal(true);
  }

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
      renderCell: (param) => (
        <ButtonGroup>
          <Button variant="outlined" size="small" sx={{ background: '#2b96b6ff', color: 'white' }}
            startIcon={<RemoveRedEyeIcon sx={{ color: 'white' }} />} onClick={() => handleOpenModal(param.row)}>
            Ver
          </Button>
          <Button variant="contained" size="small" sx={{ background: '#2bb675ff' }}
            startIcon={<SaveAltIcon />} onClick={() => handleOpenChangeStatusModal(param.row.id)}>
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
    formData.append('date_init', `${year}-${month}-${day - 7}`);
    formData.append('date_end', `${year}-${month}-${day}`);
    formData.append('today', `${year}-${month}-${day}`);

    fetch('http://localhost/recetaFacil/RecetaFacil.com/public/Reports/home', {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(data => {
        if (data.Code === 401) {
          localStorage.removeItem("correo");
          localStorage.removeItem("barer");
          window.location.href = '/login';
        }
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
        setRecipes_per_status(data.data.rf_recipes_per_status);
      });
  }, [update_render]);

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
        <Typography variant='h6'>Panel</Typography>
        <Stack direction="column" spacing={2}>
          <Stack direction={isMobile ? 'column' : 'row'} spacing={2} sx={{ minHeight: 300 }}>
            <Card sx={{ flex: 2, width: '100%', minHeight: isMobile ? 300 : 450 }}>
              <CardContent sx={{ height: "100%" }}>
                <PruebaECharts />
              </CardContent>
            </Card>
            <Stack direction="column" spacing={2} sx={{ flex: 1, width: '100%' }}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1">Recetas totales Hoy</Typography>
                  <Stack direction="row" spacing={0.5} justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">{recetasToday}</Typography>
                    <BoxCustom valueA={todayPercent} text={`${todayPercent} % del total`} />
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="subtitle1">Recetas totales esta Semana</Typography>
                  <Stack direction="row" spacing={0.5} justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">{recetas_week}</Typography>
                    <BoxCustom valueA={recetas_week_percent} text={`${recetas_week_percent} % del total`} />
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="subtitle1">Colecciones totales hoy</Typography>
                  <Stack direction="row" spacing={0.5} justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">{collectionData}</Typography>
                    <BoxCustom valueA={collectPercent} text={`${collectPercent} % del total`} />
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="subtitle1">Colecciones totales esta semana</Typography>
                  <Stack direction="row" spacing={0.5} justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">{all_week_collections}</Typography>
                    <BoxCustom valueA={all_week_collections_percent} text={`${all_week_collections_percent} % del total`} />
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Stack>

          <Card sx={{ flex: 2, width: '100%', minHeight: isMobile ? 300 : 450 }}>
            <CardContent sx={{ height: "100%" }}>
              <LinearChart data={recipes_per_status} />
            </CardContent>
          </Card>
          <Card>
            <Typography variant="h5" sx={{ textAlign: 'center', mt: 2 }}>Últimas 5 recetas</Typography>
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
            </CardContent>
          </Card>
        </Stack>
      </Box>
      <ViewSingleRecetas row={rows} open={viewOpenModal} onClose={handleCloseModal} />
      <ChangeRecetaStatus title='¿Desea Guardar la receta?' value={'1'} route={'/recetaChangeStatus'} open={viewChangeModal} id={rowsChangeModal} onClose={handleCloseChangeStatusModal} onSuccess={()=>setUpdateRender(prev=>!prev)}/>
    </Box>
  );
};

export default OverView;
