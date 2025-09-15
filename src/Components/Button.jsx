
import {Button} from "@mui/material";

const ButtonComponent = (props)=>{
    return (
        <Button color={props.color} variant={props.variant} size={props.size} sx={props.sx} onClick={props.onClick} onSubmit={props.onSubmit}>{props.text}</Button>
);
}

export default ButtonComponent;