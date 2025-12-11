import { TextField, type TextFieldProps } from '@mui/material'
import React from 'react'

export const PrimaryInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '16px',
          '& fieldset': {
            borderColor: '#0033DA',
          },
          '&:hover fieldset': {
            borderColor: '#0033DA',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#0033DA',
          },
          '& input::placeholder': {
            color: '#456CE8',
            opacity: 1,
          },
          '& textarea::placeholder': {
            color: '#456CE8',
            opacity: 1,
          },
        },
        '& .MuiInputLabel-root': {
          color: '#456CE8',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#456CE8',
        },
        ...props.sx,
      }}
    />
  )
}

