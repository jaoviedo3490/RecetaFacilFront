import { Grid, Container, Stack, Typography, Alert, FormControlLabel, Checkbox, CircularProgress, Backdrop } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ButtonComponent from "./Button";
import InputComponent from "./InputComponent";
import { useState, useEffect, useContext } from "react";
import CreateUser from "./CreateUser";
import ActivateAccount from "./ActivateAccount";
import RecoverAccount from "./RecoverAccount";
import { dataContext } from "./Context/MetricsContext";



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
    const [isActivatedUser, setActivateRedis] = useState(false);
    const [RecoverAccountUser, setRecover] = useState(false);
    const [id, setID] = useState('');
    const [userMailB, setUserMailB] = useState('');
    const { loginSuccess, setLoginSuccess } = useContext(dataContext);




    const handleCloseModal = () => { setOpen(false) }
    const RevealPassCheck = (Event) => {
        setRevealPass(Event.target.checked);
    }
    const handleCloseModalRedis = () => { setOpenRedis(false); setActivateRedis(false); }
    const handleCloseModalRecover = () => { setRecover(false) }


    useEffect(() => {
        console.log(loginSuccess)
    }, [loginSuccess])



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
                            setID(data.data.id);
                            setUserMailB(data.data.email);
                            debugger;
                            setOpenRedis(true);
                            isActivatedUser(true);
                        } else {
                            debugger;
                            console.log(data)
                            if (data.data.Code === 200 && data.data.JWT.Code === 200) {
                                setLoginSuccess(true);
                                //alert(`Vamos a la interfaz principal ${loginSuccess}`);
                                localStorage.setItem("correo", UserMail);
                                localStorage.setItem("barer",data.data.JWT.token);
                            }

                        }
                        debugger;
                        switch (data.data.Code) {
                            case 404: setInfo(true); break;
                            case 403: setWarning(true); break;
                            case 200: if(!loginSuccess){
                                setSuccess(false); 
                                setError(true);
                                setResponseB(data.data.JWT.Message);
                                break;
                            }
                            case 500: setError(true); break;
                            default: setInfo(true); break;
                        }
                        break;
                    case 500:
                        setUser('');
                        setPassword('');
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
                        break;
                }
                setLoadingScreen(false);
            }).catch(error => {
                setUser('');
                setPassword('');
                setLoadingScreen(false);
                setError(true);
                console.log(error);
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
                                <InputComponent variant='standard' onChange={InputValidate} label="Correo" type='email' value={UserMail} />
                                <InputComponent variant='standard' label="Contraseña" onChange={PasswordValidate} value={Password} type={RevealPass ? 'text' : 'password'} />
                                <FormControlLabel control={<Checkbox checked={RevealPass} onChange={RevealPassCheck} />} label='Mostrar contraseña' />
                                <ButtonComponent variant='contained' sx={{ bgcolor: '#759ADB' }} onClick={LoginAccount} text="Iniciar Sesion" />
                                <ButtonComponent variant='contained' sx={{ bgcolor: '#2bb675ff' }} onClick={CreateAccount} text="Soy Nuevo" />
                                <ButtonComponent variant='text' onClick={RecoverAccountF} text="Recuperar Cuenta" />
                                {isAlert && <Alert severity="info">Campos incompletos</Alert>}
                                {(isInfo) && <Alert severity="info">{response_backend.data.Message}</Alert>}
                                {(isWarning) && <Alert severity="warning">{response_backend.data.Message}</Alert>}
                                {(isSuccess) && <Alert severity="success">{response_backend.data.Message}</Alert>}
                                {(isError) && <Alert severity="error">{response_backend?.Message || 'SERVER INTERNAL ERROR'}</Alert>}
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <CreateUser open={openModal} onClose={handleCloseModal} onSuccess={(data) => {
                setOpen(false);
                setOpenRedis(true);
                setCreateData(data);
            }}></CreateUser>
            <RecoverAccount open={RecoverAccountUser} onClose={handleCloseModalRecover} onSuccess={(data) => {
                setRecoverInput(true);
                setRecover(false);
                setOpenRedis(true);
                setRecoverData(data);
            }}></RecoverAccount>
            <ActivateAccount open={openRedis} onClose={handleCloseModalRedis} email={userMailB} id={id}></ActivateAccount>
            <Backdrop open={openLoadingScreen} sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}>
                <CircularProgress />
            </Backdrop>
        </Container>
    );
}
export default LoginUserForm; 