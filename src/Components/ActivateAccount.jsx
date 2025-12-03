import { Grid, Container, Stack, Typography, Alert, FormControlLabel, Checkbox, CircularProgress, Backdrop, Modal, Box } from "@mui/material";
import ButtonComponent from "./Button";
import InputComponent from "./InputComponent";
import { useState, useEffect } from "react";
import { Password } from "@mui/icons-material";


const ActivateAccount = (props) => {

    const [Token, setToken] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [response_backend, setResponseB] = useState({ data: {} });
    const [openLoadingScreen, setLoadingScreen] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isWarning, setWarning] = useState(false);
    const [isInfo, setInfo] = useState(false);
    const [isError, setError] = useState(false);



    const resetVars = () => {
        setError(false);
        setInfo(false);
        setSuccess(false);
        setWarning(false);
    }
    useEffect(() => {
        if (isAlert) {
            const timer = setTimeout(() => setIsAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isAlert]);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => setSuccess(false), 3000);

            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => setError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isError]);

    useEffect(() => {
        if (isWarning) {
            const timer = setTimeout(() => setWarning(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isWarning]);

    useEffect(() => {
        if (isInfo) {
            const timer = setTimeout(() => setInfo(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isInfo]);
    const ActivateLogin = (Event) => {
       Event.preventDefault();
        /*debugger*/
        if (Token.length < 3) {
            setIsAlert(true);
            setSuccess(false);
        } else {
            setIsAlert(false);
            /*debugger*/
            let formdata = new FormData();
            formdata.append('email', localStorage.getItem('email'));
            formdata.append('token', Token);
            formdata.append('id', localStorage.getItem('tempData'));
            console.log(props.email);
            console.log(props.id);
            console.log(Token);
            /*debugger*/
            setLoadingScreen(true) ;
            fetch('http://localhost/recetaFacil/RecetaFacil.com/public/Services/loginUser/ActivateAccount', {
                method: 'POST',
                body: formdata
            }).then(response => {
                localStorage.removeItem('tempData');
                if (!response.ok) {
                    return {
                        statusCode: 500,
                        Message: `SERVER INTERNAL ERROR: ${response.message}`
                    }
                }
                return response.json();

            }).then(data => {
                localStorage.removeItem("tempData");
                localStorage.removeItem("email");
                console.log(`${JSON.stringify(data)}`);
                switch (data.statusCode) {
                    case 200:
                        resetVars();
                        switch (data.data.Code) {
                            case 401: setInfo(true); break;
                            case 404: setInfo(true); break;
                            case 403: setWarning(true); break;
                            case 200: setSuccess(true); break;
                            case 201: setSuccess(true); setToken(''); break;
                            case 500: setError(true); break;
                            default: setInfo(true); break;
                        }
                        setResponseB(data);
                        /*debugger*/
                        break;
                    case 500:
                        setError(true);
                        setResponseB(data);
                    default:
                        setWarning(true);
                        setResponseB(data);
                        /*debugger*/;
                }
                setLoadingScreen(false);
            }).catch(error => {
                setLoadingScreen(false);
                setError(true);
                setResponseB(`SERVER INTERNAL ERROR: ${error.message}`);
            })
        }
    }


    const InputValidate = (Event) => {
        setToken(Event.target.value);
        setIsAlert(false);
    }

    return (
        <Modal sx={{
            position: 'fixed',
            width: '90%',
            maxWidth: '400px'
        }} open={props.open}>
            <Box sx={{
                bgcolor: 'background.paper',
                position: 'fixed',
                width: '90%',
                maxWidth: '180px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                boxShadow: '24',
                p: '2%',
                borderRadius: '5%'
            }}>
                <Grid container>
                    <Grid item >
                        <Stack direction='column' spacing={2}>
                            <Typography variant="h6">Receta Facil</Typography>
                            <InputComponent variant='standard' onChange={InputValidate} label="Token" value={Token} />
                            <ButtonComponent variant='text' onClick={ActivateLogin} text={"Activar Cuenta"} />
                            <ButtonComponent variant='contained' sx={{ bgcolor: '#db7875ff' }} onClick={props.onClose} text="Regresar" />
                            {isAlert && <Alert severity="info">Campos incompletos</Alert>}
                            {(isInfo) && <Alert severity="info">{response_backend.data.Message}</Alert>}
                            {(isWarning) && <Alert severity="warning">{response_backend.data.Message}</Alert>}
                            {(isSuccess) && <Alert severity="success">{response_backend.data.Message}</Alert>}
                            {(isError) && <Alert severity="error">{response_backend.data.Message}</Alert>}
                        </Stack>
                    </Grid>
                </Grid>

                <Backdrop open={openLoadingScreen} sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}>
                    <CircularProgress />
                </Backdrop>
            </Box>
        </Modal >
    );
}
export default ActivateAccount; 