import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'

export const Settings: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Meus Ajustes</Typography>

      <TextField fullWidth label="Nome" size="small" />
      <TextField fullWidth label="Telefone" size="small" />
      <TextField fullWidth label="E-mail" size="small" />

      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <Button fullWidth variant="outlined">
          Cancelar
        </Button>
        <Button fullWidth variant="contained">
          Salvar
        </Button>
      </Box>
    </Box>
  )
}
