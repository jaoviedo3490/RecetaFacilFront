import { Grid, Container, Stack, Typography, Box, Alert, FormControlLabel, Chip, Checkbox, CircularProgress, Backdrop, Modal } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ButtonComponent from "../../../Button";
import Snackbar from '@mui/material/Snackbar';
import InputComponent from "../../../../Components/InputComponent";

//import InputComponent from "./InputComponent";
import { useState, useEffect, useContext } from "react";
const newItem = (props) => {
    const [isSuccess, setSuccess] = useState(false);
    const [isInfo, setInfo] = useState(false);
    const [isWarning, setWarning] = useState(false);
    const [isError, setError] = useState(false);
    const [Message, setMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    };
    const onDelete = ()=>{
        console.log("psss , por ahora tenemos esto, no es mucho , pero es tiempo invertido");
    }
    return (
        <>
            <Modal sx={{
                position: 'fixed',
                width: '90%',
                maxWidth: '400px'
            }} open={props.open} onClose={props.onClose} BackdropProps={{
                onClick: (e) => e.stopPropagation()
            }}>

                <Box sx={{
                    bgcolor: 'background.paper',
                    position: 'fixed',
                    width: '90%',
                    maxWidth: '600px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    boxShadow: '24',
                    p: '2%',
                    //borderRadius: '5%'
                }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>{props.title}</Typography>
                    <Box>
                        <Stack direction='row' spacing={2}>
                            <Box sx={{ width: '100%' }}>
                                <InputComponent variant='standard' label="Ingrediente" type='email' />
                                {(isInfo) && <Alert severity="info">{response_backend.data.Message}</Alert>}
                                {(isWarning) && <Alert severity="warning">{response_backend.data.Message}</Alert>}
                                {(isSuccess) && <Alert severity="success">{response_backend.data.Message}</Alert>}
                                {(isError) && <Alert severity="error">{response_backend?.Message || 'SERVER INTERNAL ERROR'}</Alert>}
                            </Box>
                            <Box sx={{ width: '70%' }}>
                                <Typography>Ingredientes</Typography>
                                <Card>
                                    <CardContent>
                                        <Stack direction='column' spacing={1}>
                                            <Chip label="Pepinos" onDelete={onDelete}/>
                                            <Chip label="Tocino" onDelete={onDelete}/>
                                            <Chip label="Arroz" onDelete={onDelete}/>
                                            <Chip label="Papa" onDelete={onDelete}/>
                                            <Chip label="Huevos" onDelete={onDelete}/>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Stack>
                    </Box>
                    <Stack direction='column' spacing={1}>
                        <ButtonComponent variant='contained' sx={{ bgcolor: '#75c7dbff', width: '100%' }} text='Buscar Recetas' />
                        <ButtonComponent variant='contained' sx={{ bgcolor: '#db7575ff', width: '100%' }} onClick={props.onClose} text='Cerrar' />
                    </Stack>
                    <br />
                    {(isInfo) && <Alert severity="info">{Message}</Alert>}
                    {(isWarning) && <Alert severity="warning">{Message}</Alert>}
                    {(isSuccess) && <Alert severity="success">{Message}</Alert>}
                    {(isError) && <Alert severity="error">{Message || 'SERVER INTERNAL ERROR'}</Alert>}
                </Box>


            </Modal>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Ocurrio un error al realizar la Acción"
            />
        </>
    );
}
export default newItem;
