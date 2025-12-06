import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

export const Home: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 600,
          color: '#000000',
        }}
      >
        Olá, cuidador(a)!
      </Typography>

      <Paper
        elevation={2}
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: 2,
          borderColor: '#456CE8',
          borderWidth: '1px',
          borderStyle: 'solid',
          px: 2,
          py: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: '0.95rem',
            fontWeight: 600,
          }}
        >
          Próximos remédios
        </Typography>
        <Typography
          sx={{
            mt: 0.5,
            fontSize: '0.8rem',
          }}
        >
          Exemplo de card de resumo.
        </Typography>
      </Paper>
    </Box>
  )
}

