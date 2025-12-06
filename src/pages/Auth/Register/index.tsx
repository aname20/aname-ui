import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

export const Register: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 400,
        width: '100%',
        mx: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Cadastro
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Página de cadastro - implementar formulário
        </Typography>
      </Box>
    </Paper>
  )
}

