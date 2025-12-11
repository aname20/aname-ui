import { IconButton, InputAdornment } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CloseIcon from '@mui/icons-material/Close'

import { Box, TextField } from "@mui/material"

export const TimeItem: React.FC<{
    time: string;
    index: number;
    handleTimeChange: (index: number, value: string) => void;
    handleRemoveTime: (index: number) => void;
    times: string[];
    }> = ({ time, index, handleTimeChange, handleRemoveTime, times }) => {
    return (
        <Box
            sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            }}
        >
            <TextField
            fullWidth
            size="small"
            type="time"
            value={time}
            onChange={(e) => handleTimeChange(index, e.target.value)}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <AccessTimeIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
                ),
            }}
            sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                },
            }}
            />
            {times.length > 1 && (
            <IconButton
                onClick={() => handleRemoveTime(index)}
                size="small"
                color="error"
            >
                <CloseIcon color="error" />
            </IconButton>
            )}
        </Box>
    )
}