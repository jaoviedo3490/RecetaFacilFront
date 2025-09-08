import { Grid, Container, Stack, Typography, Alert, FormControlLabel, Checkbox, CircularProgress, Backdrop } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ButtonComponent from "./Button";
import InputComponent from "./InputComponent";
import { useState, useEffect } from "react";
import CreateUser from "./CreateUser";
import ActivateAccount from "./ActivateAccount";
import RecoverAccount from "./RecoverAccount";


const LoginUserForm = () => {
    const [UserMail, setUser] = useState('');
    const [Password, setPassword] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [response_backend, setResponseB] = useState({ data: {} });
    const [openModal, setOpen] = useState(false);
    const [openRedis, setOpenRedis] = useState(false);
    const [RevealPass, setRevealPass] = useState(false);
    const [openLoadingScreen, setLoadingScreen] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isWarning, setWarning] = useState(false);
    const [isInfo, setInfo] = useState(false);
    const [isError, setError] = useState(false);
    const [createData, setCreateData] = useState('');
    const [isActivatedUser, setActivateRedis] = useState(false);
    const [RecoverAccountUser,setRecover] = useState(false);
    const [RecoverInput,setRecoverInput] = useState(false);
    const [RecoverData,setRecoverData] = useState('');


    const handleCloseModal = () => { setOpen(false) }
    const RevealPassCheck = (Event) => {
        setRevealPass(Event.target.checked);
    }
    const handleCloseModalRedis = () => { setOpenRedis(false); setActivateRedis(false); }
    const handleCloseModalRecover = () => { setRecover(false) }
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

    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => setError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isError]);

    const CreateAccount = () => {
        setOpen(true);
    }


    const LoginAccount = (Event) => {
        Event.preventDefault();
        if (UserMail.length < 3 || Password.length < 3) {
            setIsAlert(true);
            setSuccess(false);
        } else {
            setIsAlert(false);
            let formdata = new FormData();

            formdata.append('username', UserMail);
            formdata.append('password', Password);
            setLoadingScreen(true);
            fetch('http://localhost/recetaFacil/RecetaFacil.com/public/Services/loginUser/loginUsuario', {
                method: 'POST',
                body: formdata
            }).then(response => {
                if (!response.ok) {
                    return {

                        statusCode: 500,
                        Message: "SERVER INTERNAL ERROR"

                    }
                }
                return response.json();

            }).then(data => {
                switch (data.statusCode) {
                    case 200:
                        setResponseB(data);
                        if (data.data.Message === 'Correo enviado correctamente') {
                            setActivateRedis(true);
                        }
                        debugger;
                        switch (data.data.Code) {
                            case 404:setInfo(true);break;
                            case 403:setWarning(true);break;
                            case 200:setSuccess(true);break;
                            case 500:setError(true); break;
                            default:setInfo(true);break;
                        }
                        break;
                    case 500:
                        setError(true);
                        setResponseB(data);
                        break;
                    case 400:
                        setWarning(true);
                        setResponseB(data);
                        break;
                    case 404:
                        setWarning(true);
                        setResponseB(data);
                        break;
                    default:
                        setInfo(true);
                        setResponseB(data);
                }
                setLoadingScreen(false);
            }).catch(error => {
                setLoadingScreen(false);
                setError(true);
                setResponseB(`SERVER INTERNAL ERROR: ${error.message}`);
            })
        }
    }
    const RecoverAccountF = () => {
        setRecover(true);
    }

    const InputValidate = (Event) => {
        setUser(Event.target.value);
        setIsAlert(false);
    }
    const PasswordValidate = (Event) => {
        setPassword(Event.target.value);
        setIsAlert(false);
    }
    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}>
            <Card raised sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <CardContent>
                    <Grid sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                    }} container spacing={3}>
                        <Grid item >
                            <Stack direction='column' spacing={2}>
                                <Typography variant="h6">Receta Facil</Typography>
                                <InputComponent variant='standard' onChange={InputValidate} label="Correo" type='email' />
                                <InputComponent variant='standard' label="Contraseña" onChange={PasswordValidate} type={RevealPass ? 'text' : 'password'} />
                                <FormControlLabel control={<Checkbox checked={RevealPass} onChange={RevealPassCheck} />} label='Mostrar contraseña' />
                                <ButtonComponent variant='contained' sx={{ bgcolor: '#759ADB' }} onClick={LoginAccount} text="Iniciar Sesion" />
                                <ButtonComponent variant='contained' sx={{ bgcolor: '#2bb675ff' }} onClick={CreateAccount} text="Soy Nuevo" />
                                <ButtonComponent variant='text' onClick={RecoverAccountF} text="Recuperar Cuenta" />
                                {isAlert && <Alert severity="info">Campos incompletos</Alert>}
                                {(isInfo) && <Alert severity="info">{response_backend.data.Message}</Alert>}
                                {(isWarning) && <Alert severity="warning">{response_backend.data.Message}</Alert>}
                                {(isSuccess) && <Alert severity="success">{response_backend.data.Message}</Alert>}
                                {(isError) && <Alert severity="error">{response_backend.data.Message}</Alert>}
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {isActivatedUser && (<ActivateAccount open={isActivatedUser} onClose={handleCloseModalRedis} email={response_backend.data.email} id={response_backend.data.id}></ActivateAccount>)}
            <CreateUser open={openModal} onClose={handleCloseModal} onSuccess={(data) => {
                setOpen(false);
                setOpenRedis(true);
                setCreateData(data);
            }}></CreateUser>
            <ActivateAccount open={openRedis} onClose={handleCloseModalRedis} email={createData.email} id={createData.id}></ActivateAccount>
            <RecoverAccount open={RecoverAccountUser} onClose={handleCloseModalRecover} onSuccess={(data)=>{
                setRecoverInput(true);
                setOpenRedis(true);
                setRecover(false);
                setRecoverData(data);
            }}></RecoverAccount>
            <Backdrop open={openLoadingScreen} sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}>
                <CircularProgress />
            </Backdrop>
        </Container>
    );
}
export default LoginUserForm; 