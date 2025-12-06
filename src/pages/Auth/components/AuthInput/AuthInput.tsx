import { TextField, type TextFieldProps } from '@mui/material'
import React from 'react'

export const AuthInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: 2,
          color: 'white',
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
          '&.Mui-error fieldset': {
            borderColor: '#ff8a8a',
          },
        },
        '& .MuiOutlinedInput-input': {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px rgba(255, 255, 255, 0.15) inset',
            WebkitTextFillColor: 'white',
            caretColor: 'white',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.8)',
          '&.Mui-focused': {
            color: 'white',
            fontWeight: 600,
          },
          '&.Mui-error': {
            color: '#ff8a8a',
          },
        },
        '& .MuiFormHelperText-root': {
          backgroundColor: 'transparent',
          mx: 0,
          '&.Mui-error': {
            color: '#ff8a8a',
          },
        },
        ...props.sx,
      }}
    />
  )
}

