import { Grid, Container, Stack, Typography, Alert ,FormControlLabel,Checkbox,CircularProgress,Backdrop} from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ButtonComponent from "./Button";
import InputComponent from "./InputComponent";
import { useState, useEffect } from "react";
import CreateUser from "./CreateUser";


const LoginUserForm = () => {
    const [UserMail, setUser] = useState('');
    const [Password, setPassword] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [server_error, setServer] = useState(false);
    const [response_backend, setResponseB] = useState({ data: {} });
    const [openModal, setOpen] = useState(false);
    const [RevealPass, setRevealPass] = useState(false);
    const [openLoadingScreen,setLoadingScreen] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isWarning, setWarning] = useState(false);
    const [isInfo, setInfo] = useState(false);
    const [isError, setError] = useState(false);

    const handleCloseModal = () => { setOpen(false) }
    const RevealPassCheck = (Event) => {
        setRevealPass(Event.target.checked);
    }
    useEffect(() => {
        if (isAlert) {
            const timer = setTimeout(() => setIsAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isAlert]);
    const CreateAccount = () => {
        setOpen(true);
    }
    const LoginAccount = (Event) => {
        Event.preventDefault();
        if (UserMail.length < 3 || Password.length < 3) {
            setIsAlert(true);
            setSuccess(false);
        } else {
            //setSuccess(true);
            setIsAlert(false);
            //let data = { username: UserMail, password: Password }

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
                console.log(data);
                switch(data.statusCode){
                    case 200:
                        setSuccess(true);
                        setResponseB(data);
                        break;
                    case 500:
                        setError(true);
                        setResponseB(data);
                    default:
                        setWarning(true);
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
    const RecoverAccount = (Event) => {
        Event.preventDefault();
        alert('Recuperar cuenta');
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
                                {<Typography variant="h6">Receta Facil</Typography>}
                                <InputComponent variant='standard' onChange={InputValidate} label="Token" />
                                
                                <ButtonComponent variant='text' onClick={RecoverAccount} text="Activar Cuenta" />
                                {isAlert && <Alert severity="info">Campos incompletos</Alert>}
                                {(response_backend.data.Code === 404) && <Alert severity="info">{response_backend.data.Message}</Alert>}
                                {(response_backend.data.Code === 403) && <Alert severity="warning">{response_backend.data.Message}</Alert>}
                                {(response_backend.data.Code === 200) && <Alert severity="success">{response_backend.data.Message}</Alert>}
                                {(response_backend.data.Code === 500) && <Alert severity="error">{response_backend.data.Message}</Alert>}
                                {server_error && (<Alert severity="error">Failed to fecth</Alert>)}
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <CreateUser open={openModal} onClose={handleCloseModal}></CreateUser>
            <Backdrop open={openLoadingScreen} sx={(theme)=>({color: '#fff', zIndex: theme.zIndex.drawer + 1 })}>
                <CircularProgress/>
            </Backdrop>
        </Container>
    );
}
export default LoginUserForm; 