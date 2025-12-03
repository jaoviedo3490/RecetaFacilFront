import { Box, Card, CardContent, Button, ButtonGroup, Backdrop } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { dataContext } from "../../Context/MetricsContext";
import { useContext, useState, useEffect } from "react";
import ViewSingleRecetas from "./SpecificActions/viewSingleRecetas";
import DeleteReceta from "./SpecificActions/deleteItem";
import Snackbar from '@mui/material/Snackbar';
import NewItem from "./SpecificActions/newItem";

const NewReceta = () => {
    const [rowsBD, setRows] = useState([]);
    const [reloadData, setReloadData] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [viewOpenModal, setStatusModal] = useState(false);
    const [deleteReceta, setDelete] = useState(false);
    const [dataRow, setDataRow] = useState([]);
    const [dataRowDelete, setDataRowDelete] = useState([]);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [Message, setMessage] = useState('');
    const [newRecipe, setNewRecipe] = useState(false);
    const [updateRender, setUpdateRender] = useState(false);


    const handCloseNewRecipe = () => {
        setNewRecipe(false);
        setReloadData(prev => !prev);
    }
    const handOpenNewRecipe = () => {
        console.log('Abierto')
        setNewRecipe(true);
    }
    const handleCloseDeleteModal = () => {
        setDelete(false);

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    };
    const handleOpenDeleteModal = (param) => {
        setDataRowDelete(param);
        setDelete(true);
    }

    const handleOpenModal = (param) => {
        setDataRow(param)
        setStatusModal(true);
    }
    const handleCloseModal = () => {
        setStatusModal(false);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: '_nombre', headerName: 'Nombre', flex: 1 },
        { field: '_fecha_registro', headerName: 'Fecha', width: 180 },

        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 220,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <ButtonGroup>
                    <Button variant="outlined" size="small" sx={{ background: '#2b96b6ff', color: 'white' }} onClick={() => handleOpenModal(params.row)} startIcon={<RemoveRedEyeIcon sx={{ color: 'white' }} />}>
                        Ver
                    </Button>
                    <Button variant="contained" size="small" sx={{ background: '#b6342bff' }} onClick={() => handleOpenDeleteModal(params.row.id)} startIcon={<DeleteIcon />}>
                        Borrar
                    </Button>
                </ButtonGroup>
            ),
        },
    ];



    useEffect(() => {
        const formData = new FormData();
        formData.append('mail', localStorage.getItem('correo'));
        formData.append('token', localStorage.getItem('barer'));

        setReloadData(true);
        fetch("http://localhost/recetaFacil/RecetaFacil.com/public/Recetas/findAll", {
            method: 'POST',
            body: formData
        })
            .then((res) => {
                if (!res.ok) {
                    setMessage("Error al consultar las recetas")
                    setSnackBarOpen(true);
                    throw new Error("Error al consultar las recetas");
                }
                setReloadData(false);
                return res.json();
            })
            .then((data) => {
                setReloadData(false);
                if (data?.data?.Code === 200) {
                    // console.log(data);
                    let arrayResult = [];
                    let dataRowBD = [data.data.Data];
                    dataRowBD.forEach((obj) => {
                        for (let subObj in obj) arrayResult.push(obj[subObj]);
                    });

                    const rowsWithId = arrayResult.map((r, idx) => ({id: r._id ?? r.id ?? idx,...r,}));

                    setRows([...rowsWithId]);
                } else if (data?.data?.Code > 300 && data?.data?.Code < 500) {
                    setMessage(data.data.Message);
                    setSnackBarOpen(true);
                    setRows([]);
                } else if (data?.data?.Code >= 500) {
                    setMessage(data.data.Message);
                    setSnackBarOpen(true);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [updateRender]);

    const { openDrawer } = useContext(dataContext);

    return (
        <>
            <Box
                component="main"
                sx={{
                    height: "calc(100vh - 64px)",
                    ml: openDrawer ? "270px" : "20px",
                    pr: "2%",
                    transition: "margin .3s ease",
                    overflow: "hidden",
                    mt: "64px",
                }}
            >
                <br />
                <Card sx={{ width: "100%", height: "90%" }}>
                    <CardContent>
                        <ButtonGroup>
                            <Button variant="outlined" onClick={handOpenNewRecipe} sx={{ background: '#2bb675ff', color: 'white' }} startIcon={<CreateIcon sx={{ color: 'white' }} />}>
                                Nueva Receta
                            </Button>
                            <Button variant="outlined" sx={{ background: '#000000ff', color: 'white' }} onClick={()=>setUpdateRender(prev_Value=>!prev_Value)}startIcon={<CachedIcon />}>{reloadData ? 'Cargando Recetas' : 'Recargar'}
                            </Button>
                        </ButtonGroup>

                        <Box sx={{ height: "calc(100vh - 250px)", width: "100%", mt: 2 }}>
                            <DataGrid
                                sx={{
                                    "& .MuiDataGrid-columnHeaderTitle": {
                                        fontWeight: 'bold'
                                    }
                                }}

                                rows={rowsBD}
                                columns={columns}
                                pagination
                                paginationModel={paginationModel}
                                onPaginationModelChange={setPaginationModel}
                                pageSizeOptions={[10, 20, 30, 50, 100]}
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </CardContent>
                </Card>
                <ViewSingleRecetas row={dataRow} open={viewOpenModal} onClose={handleCloseModal} />
                <DeleteReceta title='¿Desea eliminar la receta?' value={'0'} route={'/recetaChangeStatus'} open={deleteReceta} id={dataRowDelete} onClose={handleCloseDeleteModal} onSuccess={() => setUpdateRender(valuePrevio => !valuePrevio)} />
                <NewItem title='Nueva Receta' open={newRecipe} onClose={handCloseNewRecipe} />
            </Box>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                message={Message}
            />
        </>
    );
};

export default NewReceta;
