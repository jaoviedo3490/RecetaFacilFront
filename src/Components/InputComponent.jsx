import { TextField } from "@mui/material";

const InputComponent = (props) =>{
    return(
        <TextField label={props.label} variant={props.variant} type={props.type} onChange={props.onChange} >
        </TextField>
    );
}
export default InputComponent;