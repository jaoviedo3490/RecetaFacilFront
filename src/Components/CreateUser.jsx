import { Modal, Typography, Grid, Stack, Alert, Checkbox, FormControlLabel, Box, CircularProgress, Backdrop } from "@mui/material";
import ButtonComponent from "./Button";
import InputComponent from "./InputComponent";
import { useState } from "react";
import { useEffect } from "react";


const CreateUser = (props) => {
    const [UserName, setUserName] = useState('');
    const [UserMail, setUserMail] = useState('');
    const [PassWord, setPassWord] = useState('');
    const [PassWordVerify, setPassWordVerify] = useState('');
    const [InputsEmpty, setInputsEmpty] = useState(false);
    const [password_Bad, setPass_Bad] = useState('');
    const [RevealPass, setRevealPass] = useState(false);
    const [Mail_Not_Valid, setMail_Not_Valid] = useState('')
    const [response_api_backend, SetResponseBack] = useState('');
    const [server_info, setServerInfo] = useState('');
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isWarning, setWarning] = useState(false);
    const [isInfo, setInfo] = useState(false);
    const [isError, setError] = useState(false);

    const handleContinue = () => {
        let valid = true;

        if (UserMail?.length === 0 || UserName?.length === 0
            || PassWord?.length === 0 || PassWordVerify?.length === 0) {
            setInputsEmpty(true);
            valid = false;
        }

        if (PassWord !== PassWordVerify) {
            setPass_Bad(true);
            valid = false;
        }

        let RegexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!RegexEmail.test(UserMail)) {
            setMail_Not_Valid(true);
            valid = false;
        }

        if (!valid) return;

        let formdata = new FormData();
        formdata.append('username', UserName);
        formdata.append('password', PassWord);
        formdata.append('email', UserMail);
        setLoadingScreen(true);
        fetch('http://localhost/recetaFacil/RecetaFacil.com/public/Services/loginUser/CreateUser', {
            method: 'POST',
            body: formdata
        }).then(response => {
            if (!response.ok) {
                //setLoadingScreen(true);
                return {
                    statusCode: 500,
                    Message: "SERVER INTERNAL ERROR"
                }
            }
            return response.json();
        }).then(data => {
            setUserMail('');
            setPassWord('');
            setUserName('');
            setPassWordVerify('');
            setLoadingScreen(false);
            /*debugger*/;
            switch (data.statusCode) {
                case 200:
                    if (data.data.Code === '200') {
                        
                        SetResponseBack(data.data.Message);
                        localStorage.setItem('tempData',data.data.Data.id);
                        localStorage.setItem('email',UserMail);
                        setSuccess(true);
                        props.onClose();
                        if (props.onSuccess) {

                            props.onSuccess({
                                email:data.data.Data.Data,
                                id:data.data.Data.id
                            }); 
                        }


                    } else if (data.data.Code === '201') {
                        SetResponseBack(data.data.Message);
                        setInfo(true);
                    }
                    else if (data.data.Code === 409) {

                        SetResponseBack(data.data.Message);
                        setInfo(true);
                    } else if (data.data.Code === '500') {
                        SetResponseBack(data.data.Message);
                        setError(true);
                    }
                    break;
                case 500:
                    /*debugger*/;
                    SetResponseBack(data.Message);
                    setError(true);
                    break;
                default:
                    /*debugger*/;
                    SetResponseBack(data.Message);
                    setWarning(true);
                    break;
            }
        }).catch(error => {
            setUserMail('');
            setPassWord('');
            setUserName('');
            setPassWordVerify('');
            setLoadingScreen(false);
            setError(true);
            SetResponseBack(`Excepcion encontrada: ${error.message}`);
        })
    }

    const UserNameInput = (Event) => {
        setUserName(Event.target.value);
    }
    const UserMailInput = (Event) => {
        setUserMail(Event.target.value);
    }
    const userPassWord = (Event) => {
        setPassWord(Event.target.value);
    }
    const userPassWordVerify = (Event) => {
        setPassWordVerify(Event.target.value);
    }
    const RevealPassCheck = (Event) => {
        setRevealPass(Event.target.checked);
    }

    useEffect(() => {
        if (InputsEmpty) {
            const timer = setTimeout(() => setInputsEmpty(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [InputsEmpty]);

    useEffect(() => {
        if (password_Bad) {
            const timer = setTimeout(() => setPass_Bad(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [password_Bad]);

    useEffect(() => {
        if (Mail_Not_Valid) {
            const timer = setTimeout(() => setMail_Not_Valid(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [Mail_Not_Valid]);

    useEffect(() => {
        if (server_info) {
            const timer = setTimeout(() => setServerInfo(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [server_info]);

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





    return (
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
                borderRadius: '5%'
            }}>
                <Grid container>
                    <Grid item spacing={5} sx={{}}>
                        <Typography variant='h4' component='h5'>Nuevo Usuario</Typography>
                        <Stack direction='row' spacing={6}>
                            <InputComponent variant='standard' type='text' onChange={UserNameInput} label='Nombre de Usuario' value={UserName}></InputComponent>
                            <InputComponent variant='standard' type='mail' onChange={UserMailInput} label='Correo Electronico' value={UserMail}></InputComponent>
                        </Stack>

                        <Stack direction='row' spacing={6}>
                            <InputComponent variant='standard' type={RevealPass ? 'text' : 'password'} onChange={userPassWord} label='Contraseña' value={PassWord}></InputComponent>
                            <InputComponent variant='standard' type={RevealPass ? 'text' : 'password'} onChange={userPassWordVerify} label='Confirmar Contraseña' value={PassWordVerify}></InputComponent>
                        </Stack>
                        <FormControlLabel control={<Checkbox checked={RevealPass} onChange={RevealPassCheck} />} label='Mostrar contraseña' />
                        <Stack direction='column' spacing={1}>
                            <ButtonComponent variant='contained' sx={{ bgcolor: '#759ADB' }} onClick={handleContinue} text='Continuar' />
                            <ButtonComponent variant='contained' sx={{ bgcolor: '#db7875ff' }} onClick={props.onClose} text='Cerrar' />

                            {InputsEmpty && (<Alert severity="info">Campos incompletos</Alert>)}
                            {password_Bad && (<Alert severity="warning">Las contraseñas no coinciden</Alert>)}
                            {Mail_Not_Valid && (<Alert severity="warning">El correo ingresado no es valido</Alert>)}
                            {isError && (<Alert severity="error">{response_api_backend}</Alert>)}
                            {isWarning && (<Alert severity="warning">{response_api_backend}</Alert>)}
                            {isInfo && (<Alert severity="info">{response_api_backend}</Alert>)}
                            {isSuccess && (<Alert severity="success">{response_api_backend}</Alert>)}
                        </Stack>
                    </Grid>
                </Grid><Backdrop open={loadingScreen} sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}>
                    <CircularProgress color='inherit' />
                </Backdrop>
            </Box>
        </Modal>
    )
}
export default CreateUser;
