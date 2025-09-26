import { Typography, Box } from "@mui/material";

const BoxCustom = (props) => {
    let backgroundColor_, borderColor, textColor;

    if (props.valueA <= 25) {
        backgroundColor_ = 'rgba(245, 196, 196, 0.3)';
        borderColor = '1px solid rgba(200, 0, 0, 0.7)';
        textColor = 'rgba(200, 0, 0, 0.7)';
    } else if (props.valueA > 25 && props.valueA < 51) {
        backgroundColor_ = 'rgba(245, 242, 196, 0.3)';
        borderColor = '1px solid rgba(200, 170, 0, 0.7)';
        textColor = 'rgba(200, 170, 0, 0.7)';
    } else if (props.valueA >= 50 && props.valueA < 76) {
        backgroundColor_ = 'rgba(202, 245, 196, 0.3)';
        borderColor = '1px solid rgba(63, 200, 0, 0.7)';
        textColor = 'rgba(63, 200, 0, 0.7)';
    } else if (props.valueA >= 75) {
        backgroundColor_ = 'rgba(196, 225, 245, 0.3)';
        borderColor = '1px solid rgba(0, 103, 200, 0.7)';
        textColor = 'rgba(0, 103, 200, 0.7)';
    }

    return (
        <Box
            sx={{
                display: "inline-block",
                backgroundColor: backgroundColor_,
                border: borderColor,
                borderRadius: "8px",
                px: 2,
                py: 1,
                textAlign: "center",
            }}
        >
            <Typography
                variant="subtitle1"
                sx={{ color: textColor, fontWeight: 600 }}
            >
                {props.text}
            </Typography>
        </Box>
    );
}

export default BoxCustom;
