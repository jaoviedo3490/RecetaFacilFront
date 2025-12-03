import { Box, Card, CardContent, Button, ButtonGroup } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { dataContext } from "../../Context/MetricsContext";
import { useContext, useState, useEffect } from "react";

const NewCollection = () => {
    const [rowsBD, setRows] = useState([]);
    const [reloadData, setReloadData] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: '_nombre', headerName: 'Nombre', flex: 1 },
        { field: '_fecha_registro', headerName: 'Fecha', width: 180 },
        { field: 'Cantidad de Recetas', headerName: 'Cantidad de Recetas', width: 180 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 220,
            sortable: false,
            filterable: false,
            renderCell: () => (
                <ButtonGroup>
                    <Button variant="outlined" size="small" sx={{ background: '#2b96b6ff', color: 'white' }} startIcon={<RemoveRedEyeIcon sx={{ color: 'white' }} />}>
                        Ver
                    </Button>
                    <Button variant="contained" size="small" sx={{ background: '#b6342bff' }} startIcon={<DeleteIcon />}>
                        Borrar
                    </Button>
                </ButtonGroup>
            ),
        },
    ];

    const handleReload = () => setReloadData(true);
    const formData = new FormData();
    formData.append('mail', localStorage.getItem('correo'));
    formData.append('token', localStorage.getItem('barer'));
    formData.append('getAllCollection', true);
    useEffect(() => {
        fetch("http://localhost/recetaFacil/RecetaFacil.com/public/Recetas/viewAllCollection", {
            method: 'POST',
            body: formData
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al consultar las recetas");
                return res.json();
            })
            .then((data) => {
                setReloadData(false);
                if (data?.data?.Code === 200) {
                    let arrayResult = [];
                    let dataRowBD = [data.data.Data];
                    dataRowBD.forEach((obj) => {
                        for (let subObj in obj) arrayResult.push(obj[subObj]);
                    });

                    const rowsWithId = arrayResult.map((r, idx) => ({
                        id: r._id ?? r.id ?? idx,
                        ...r,
                    }));

                    setRows([...rowsWithId]);
                }
            })
            .catch((err) => {
                console.error(err);
                setReloadData(false);
            });
    }, [reloadData]);

    const { openDrawer } = useContext(dataContext);

    return (
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
                        <Button variant="outlined" sx={{ background: '#2bb675ff', color: 'white' }} startIcon={<CreateIcon sx={{ color: 'white' }} />}>
                            Nueva Colección
                        </Button>
                        <Button
                            variant="outlined" sx={{ background: '#000000ff', color: 'white' }}
                            startIcon={<CachedIcon />}
                            onClick={handleReload}
                        >
                            {reloadData ? "Recargando data" : "Recargar"}
                        </Button>
                    </ButtonGroup>

                    <Box sx={{ height: "calc(100vh - 250px)", width: "100%", mt: 2 }}>
                        <DataGrid
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
        </Box>
    );
};

export default NewCollection;