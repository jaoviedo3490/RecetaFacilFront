import { Grid, Container, Stack, Typography, Box, AlertTitle, Alert, FormControlLabel, Checkbox, CircularProgress, Backdrop, Modal, Button, ButtonGroup } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ButtonComponent from "../../../Button";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import TabContext from "@mui/lab/TabContext";



//import InputComponent from "./InputComponent";
import { useState, useEffect, useContext } from "react";


const viewSingleRecetas = (props) => {
    const [valueTab, setValueTab] = useState('1');

    const tempsInstructions = props.row.Instrucciones || 'undefined';
    let tempsInstructions_replace = tempsInstructions.replace(/\[|\]|/g, '');
    tempsInstructions_replace = tempsInstructions_replace.replaceAll('"', '|');
    let stepsContent = tempsInstructions_replace.split('|,');
    //console.log(tempsInstructions_replace);
    const steps = [];
    let stepContentReplaced = [];
    stepsContent.map((obj) => { steps.push(''); stepContentReplaced.push(obj.replaceAll('|', '')) })
    const [activeStep, setActiveStep] = useState(0);
    const HandleNextStep = () => { setActiveStep((prev) => prev + 1) }
    const HandleBackStep = () => { setActiveStep((prev) => prev - 1) }
    const HandleResetStep = () => { setActiveStep(0) }

    const onChangeEvent = (event, newValue) => {
        setValueTab(newValue);
    }
    useEffect(() => {
        setActiveStep(0)
    }, [])
    return (
        <Modal sx={{
            position: 'fixed',
            width: '90%',
            maxWidth: '100%'
        }} open={props.open} onClose={props.onClose} BackdropProps={{
            onClick: (e) => e.stopPropagation()
        }}>

            <Box sx={{
                bgcolor: 'background.paper',
                position: 'fixed',
                width: 'auto',
                maxWidth: 'fit-content',
                top: '50%',
                transition: "margin .3s ease",
                left: '50%',
                transform: 'translate(-50%,-50%)',
                boxShadow: 24,
                p: '2%',
            }}
            >
                <Box>
                    <TabContext value={valueTab}>
                        <Box sx={{ borderColor: 'divider' }}>
                            <TabList onChange={onChangeEvent} aria-label='proceso-recetas'>
                                <Tab label='Informacion General' value='1'></Tab>
                                <Tab label='Instrucciónes' value='2'></Tab>
                            </TabList>
                        </Box>
                        <TabPanel value='1'>

                            <Stack direction='column'>
                                <Typography variant="h5" >{props.row?._nombre}</Typography>
                                <Typography variant='subtitle2' sx={{ color: '#204c8dff', fontWeight: 700, fontStyle: 'normal' }} >Ingredientes
                                </Typography>
                                <Stack direction="column" spacing={1} alignItems="flex-start" sx={{ mb: 2 }}>
                                    {props.row?._ingredientes && Object.keys(JSON.parse(props.row?._ingredientes)).map((obj) => {
                                        return (
                                            <Typography variant="body1" key={obj} sx={{ display: 'flex', alignItems: 'center' }}>
                                                <CheckCircleIcon sx={{ color: '#0a811aec', mr: 1 }} />
                                                {`${JSON.parse(props.row?._ingredientes)[obj]}.`}
                                            </Typography>
                                        );
                                    })}
                                </Stack>
                            </Stack>

                        </TabPanel>
                        <TabPanel value='2'>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length ? (
                                <Box>
                                    <Typography sx={{ color: '#204c8dff', fontWeight: 700, fontStyle: 'normal' }} variant='body2'>Paso Final</Typography>
                                    <Alert variant='outlined' severity="info">

                                        <Typography variant="body2">Disfruta tu Receta</Typography>
                                    </Alert>
                                    <Button sx={{ width: '100%' }} color='black' onClick={HandleResetStep}>Inicio</Button>
                                </Box>
                            ) : (
                                <Box sx={{ justifyContent: 'space-between', margin: 1 }}>
                                    <Typography sx={{ color: '#204c8dff', fontWeight: 700, fontStyle: 'normal' }} variant='body2'>Paso</Typography>
                                    {/*<Typography variant='body2'></Typography>*/}
                                    <Alert variant='outlined' severity="success">
                                        <Typography variant="body2">{stepContentReplaced[activeStep]}</Typography>
                                    </Alert>
                                    <Box sx={{ mt: 2 }}>
                                        <ButtonGroup sx={{ width: '100%' }}>
                                            <Button variant='outlined' color='black' sx={{ width: '100%' }} disabled={activeStep === 0} onClick={HandleBackStep} >Atrás</Button>
                                            <Button variant='outlined' color='black' sx={{ width: '100%' }} onClick={HandleNextStep}>
                                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                            </Button>
                                        </ButtonGroup>
                                    </Box>
                                </Box>
                            )}

                        </TabPanel>
                    </TabContext>
                </Box>
                <Stack direction='column' spacing={1}>
                    {/*<ButtonComponent variant='contained' sx={{ bgcolor: '#75dbbcff', width: '100%' }} onClick={props.onClose} text='Indicaciónes' />*/}
                    <ButtonComponent variant='contained' sx={{ bgcolor: '#db7875ff', width: '100%' }} onClick={props.onClose} text='Cerrar' />
                </Stack>
            </Box>

        </Modal>
    );
}
export default viewSingleRecetas;

/*{Object.keys(props.row._ingredientes).map((obj)=>{
                           return(<Typography>{props.row._ingredientes[obj]}</Typography>)
                       })}*/

