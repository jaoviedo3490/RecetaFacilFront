import { Grid, Container, Stack, Typography, Alert } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ButtonComponent from "./Button";
import InputComponent from "./InputComponent";
import { useState, useEffect } from "react";


const LoginUserForm = () => {
    const [UserMail, setUser] = useState('');
    const [Password, setPassword] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [response_backend,setResponseB] = useState([]);



    const CreateAccount = (Event) => {
        Event.preventDefault();
        alert('no pues , ta bien');

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
            
          
            formdata.append('username',UserMail);
            formdata.append('password',Password)
            fetch('http://localhost/recetaFacil/RecetaFacil.com/public/Services/loginUser/loginUsuario', {
                method: 'POST',
                body: formdata
            }).then(response => {
               
                return response.json();
            }).then(data => {
                console.log(data)
                setSuccess(true);
                setResponseB(data);
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
                                <InputComponent variant='standard' onChange={InputValidate} label="Correo" type='email' />
                                <InputComponent variant='standard' label="Contraseña" onChange={PasswordValidate} type="password" />
                                <ButtonComponent variant='contained' sx={{ bgcolor: '#759ADB' }} onClick={LoginAccount} text="Iniciar Sesion" />
                                <ButtonComponent variant='contained' sx={{ bgcolor: '#2bb675ff' }} onClick={CreateAccount} text="Soy Nuevo" />
                                <ButtonComponent variant='text' onClick={RecoverAccount} text="Recuperar Cuenta" />
                                {isAlert && <Alert severity="error">Campos incompletos</Alert>}
                                {(response_backend.data.Code===404) &&<Alert severity="error">{response_backend.data.Message}</Alert>}
                                {(response_backend.data.Code===403) &&<Alert severity="warning">{response_backend.data.Message}</Alert>}
                                {(response_backend.data.Code===200) &&<Alert severity="success">{response_backend.data.Message}</Alert>}
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}
export default LoginUserForm;