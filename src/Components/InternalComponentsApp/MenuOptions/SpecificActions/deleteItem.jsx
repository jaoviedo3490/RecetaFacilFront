import { Grid, Container, Stack, Typography, Box, Alert, FormControlLabel, Checkbox, CircularProgress, Backdrop, Modal } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ButtonComponent from "../../../Button";
import Snackbar from '@mui/material/Snackbar';

//import InputComponent from "./InputComponent";
import { useState, useEffect, useContext } from "react";
const deleteReceta = (props) => {
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
    const deleteItem = (item, route, value) => {

        const formData = new FormData();
        formData.append('mail', localStorage.getItem('correo'));
        formData.append('token', localStorage.getItem('barer'));
        formData.append('id', item);
        formData.append('value', value)

        fetch(`http://localhost/recetaFacil/RecetaFacil.com/public/Recetas${route}`, {
            method: 'POST',
            body: formData
        }).then(data => {
            if (!data.ok) {
                setSnackBarOpen(true);
            }
            return data.json();
        }).then(response => {
            debugger
            switch (response.statusCode) {
                case 200:
                    switch (response.data.Code) {
                        case 200:
                            debugger
                            setSnackBarOpen(true);
                            setMessage(response.data.Message);
                            props.onSuccess();
                            props.onClose();

                            break;
                        case 404:
                            debugger
                            setWarning(true);
                            setMessage(response.data.Message);
                            break;
                        case 500:
                            debugger
                            setError(true);
                            setMessage(response.data.Message);
                            break;
                        default:
                            debugger
                            setInfo(true);
                            setMessage(response.data.Message);
                            break;
                    }
                    break;
                default:

                    setInfo(true);
                    setMessage(response.data.Message);
                    break;
            }
        })
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
                    maxWidth: '400px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    boxShadow: '24',
                    p: '2%',
                    //borderRadius: '5%'
                }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>{props.title}</Typography>
                    <Stack direction='column' spacing={1}>
                        <ButtonComponent variant='contained' sx={{ bgcolor: '#75c7dbff', width: '100%' }} onClick={() => deleteItem(props.id, props.route, props.value)} text='Confirmar Acción' />
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
                autoHideDuration={3000}
                onClose={handleClose}
                message={Message}
            />
        </>
    );
}
export default deleteReceta;
