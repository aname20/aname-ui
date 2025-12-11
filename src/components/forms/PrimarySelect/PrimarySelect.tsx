import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  type SelectProps,
} from '@mui/material'
import React from 'react'

interface PrimarySelectProps extends Omit<SelectProps, 'error'> {
  label: string
  error?: boolean
  helperText?: string
}

export const PrimarySelect: React.FC<PrimarySelectProps> = ({
  label,
  error,
  helperText,
  children,
  sx,
  ...props
}) => {
  return (
    <FormControl
      fullWidth={props.fullWidth}
      error={error}
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
        },
        '& .MuiInputLabel-root': {
          color: '#456CE8',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#456CE8',
        },
        ...sx,
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select {...props} label={label}>
        {children}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

