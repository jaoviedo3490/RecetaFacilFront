import { Modal, Typography, Container, Grid, Stack } from "@mui/material";
import ButtonComponent from "./Button";
import InputComponent from "./InputComponent";

const CreateUser = (props) => {
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Container sx={{
                position: 'absolute',
                top: '30%',
                left: '30%',
                transform: 'transalate(-50%,-50%)',
                bgcolor: 'background.paper',
                p: 'auto',
                borderRadius: '2%',
                boxShadow: '100',
                width: '34%',
                height: '50%'
            }}>
                <Grid container>
                    <Grid item spacing={5} sx={{
                        position: 'absolute',
                        top: '10%',
                        left: '5%',
                    }}><Typography variant='h4' component='h5'>Nuevo Usuario</Typography>
                        <Stack direction='row' spacing={6}>
                            <InputComponent variant='standard' label='Nombre de Usuario'></InputComponent>
                            <InputComponent variant='standard' label='Correo Electronico'></InputComponent>

                        </Stack>
                        <Stack direction='row' spacing={6}>
                            <InputComponent variant='standard' label='Contraseña'></InputComponent>
                            <InputComponent variant='standard' label='Confirmar Contraseña'></InputComponent>
                        </Stack>
                        <Stack sx={{
                            position: 'absolute',
                            top: '140%',
                            left: '0%',
                            width:'100%'
                        }} direction='column' spacing={3}>
                            <ButtonComponent variant='contained' sx={{bgcolor:'#759ADB'}} text='Continuar' />
                            <ButtonComponent variant='contained' sx={{bgcolor:'#db7875ff'}}text='Cerrar' />
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Modal>
    )
}
export default CreateUser;