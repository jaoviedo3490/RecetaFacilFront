import { Grid, Container, Stack, Typography, Alert, FormControlLabel, Checkbox, CircularProgress, Backdrop, Modal, Box } from "@mui/material";
import ButtonComponent from "./Button";
import InputComponent from "./InputComponent";
import { useState, useEffect } from "react";



const RecoverAccount = (props) => {

    const [Email, setEmail] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [response_backend, setResponseB] = useState({ data: {} });
    const [openLoadingScreen, setLoadingScreen] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isWarning, setWarning] = useState(false);
    const [isInfo, setInfo] = useState(false);
    const [isError, setError] = useState(false);
    const [isSendMail, setSendMail] = useState(false);
    const [Token, setToken] = useState('');
    const [RevealPass, setRevealPass] = useState(false);
    const [PassWord, setPassword] = useState('');
    const [PassWordC, setPasswordC] = useState('');
    const [id, setID] = useState('');

    const RevealPassCheck = (Event) => {
        setRevealPass(Event.target.checked);
    }
    const resetVars = () => {
        setError(false);
        setInfo(false);
        setSuccess(false);
        setWarning(false);

    }
    const handleClose = () => {
        setSendMail(false);
        setEmail('');
        props.onClose();
    };
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
    const ActivateRecoverLogin = () => {

        if (Email.length < 3 && !isSendMail) {
            setIsAlert(true);
            setSuccess(false);
        } else if (Email.length > 3 || isSendMail) {
            debugger;
            if (PassWord !== PassWordC) {
                setIsAlert(true);
                setSuccess(false);
                debugger;
            }
            setIsAlert(false);
            let formdata = new FormData();

            if (!isSendMail) {
                formdata.append('_email', Email);
            } else {
             
                formdata.append('_email', Email);
                formdata.append("redis_token", String(Token));
                formdata.append("id", String(id));
                formdata.append("protocol", "recover_verify");
                formdata.append("new_password", PassWord);
            }
            setLoadingScreen(true);
            fetch(`http://localhost/recetaFacil/RecetaFacil.com/public/Services/loginUser/RecoveryPassword`, {
                method: 'POST',
                body: formdata
            }).then(response => {
                if (!response.ok) {
                    return {
                        statusCode: 500,
                        Message: `SERVER INTERNAL ERROR: ${response.message}`
                    }
                }
                return response.json();

            }).then(data => {
                switch (data.statusCode) {
                    case 200:
                        if (isSendMail) {
                            setEmail('');
                            setToken('');
                            setPassword('');
                            setPasswordC('');
                        }
                        resetVars();
                        setSendMail(true);
                        setID(data.data.id);
                        if (data.Code) {
                            setSendMail(true);
                            setSuccess(true);
                        }
                        switch (data.data.Code) {
                            case 401: setInfo(true); break;
                            case 404: setInfo(true); break;
                            case 403: setWarning(true); break;
                            case 201: setSuccess(true); setEmail(''); break;
                            case 500: setError(true); break;
                            default: setInfo(true); break;
                        }
                        setResponseB(data);
                        debugger
                        break;
                    case 500:
                        setError(true);
                        setResponseB(data);
                        setEmail('');
                        break;
                    default:
                        setWarning(true);
                        setResponseB(data);
                        debugger;
                        break;
                }
                setLoadingScreen(false);
            }).catch(error => {
                setLoadingScreen(false);
                setError(true);
                setResponseB(`SERVER INTERNAL ERROR: ${error.message}`);
                setEmail('');
            })
        }
    }


    const InputValidate = (Event) => {
        setEmail(Event.target.value);
        setIsAlert(false);
    }
    const InputValidateT = (Event) => {
        setToken(Event.target.value);
        setIsAlert(false);
    }
    const InputValidatePassword = (Event) => {
        setPassword(Event.target.value);
        setIsAlert(false);
    }
    const InputValidatePasswordC = (Event) => {
        setPasswordC(Event.target.value);
        setIsAlert(false);
    }

    return (
        <Modal sx={{
            position: 'fixed',
            width: '90%',
            maxWidth: '600px'
        }} open={props.open} onClose={handleClose}>
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
                            {!isSendMail && (<InputComponent variant='standard' onChange={InputValidate} label="Correo" value={Email} />)}
                            {isSendMail && (<InputComponent variant='standard' onChange={InputValidateT} label="Token" value={Token} />)}
                            {isSendMail && (<InputComponent variant='standard' onChange={InputValidatePassword} value={PassWord} type={RevealPass ? 'text' : 'password'} label="Contraseña" />)}
                            {isSendMail && (<InputComponent variant='standard' onChange={InputValidatePasswordC} value={PassWordC} type={RevealPass ? 'text' : 'password'} label="Contraseña Nueva" />)}
                            {isSendMail && (<FormControlLabel control={<Checkbox checked={RevealPass} onChange={RevealPassCheck} />} label='Mostrar contraseña' />)}
                            <ButtonComponent variant='text' onClick={ActivateRecoverLogin} text={isSendMail ? 'Cambiar Contraseña' : 'Enviar codigo de Recuperación'} />
                            <ButtonComponent variant='contained' sx={{ bgcolor: '#db7875ff' }} onClick={handleClose} text="Regresar" />
                            {isAlert && <Alert severity="info">{isSendMail ? 'Las contraseñas no coinciden' : 'Campos incompletos'}</Alert>}
                            {(isInfo) && <Alert severity="info">{response_backend.data.Message}</Alert>}
                            {(isWarning) && <Alert severity="warning">{response_backend.data.Message}</Alert>}
                            {(isSuccess) && <Alert severity="success">{response_backend.Message}</Alert>}
                            {(isError) && <Alert severity="error">{response_backend?.Message || 'INTERNAL SERVER ERROR'}</Alert>}
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
export default RecoverAccount; 