import React from 'react'
import {
  Box,
  Typography,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material'

const medications = [
  { name: 'Clonazepam', info: '0,5 mg - Noite' },
  { name: 'Prolazine', info: '10 mg - Manhã' },
  { name: 'Vitamina B12', info: '1x ao dia' },
]

export const Medications: React.FC = () => {
  const theme = useTheme()
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography
        variant="h6"
        sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
      >
        Remédios
      </Typography>

      <TextField
        size="small"
        fullWidth
        placeholder="Buscar remédio"
        sx={{
          bgcolor: 'background.paper',
        }}
      />

      <List
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}
      >
        {medications.map((med) => (
          <ListItemButton
            key={med.name}
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              py: { xs: 1, sm: 1.5 },
            }}
          >
            <ListItemText
              primary={med.name}
              secondary={med.info}
              primaryTypographyProps={{
                fontSize: { xs: '0.95rem', sm: '1rem' },
              }}
              secondaryTypographyProps={{
                fontSize: { xs: '0.8rem', sm: '0.85rem' },
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {isSmUp && (
        <Typography variant="body2" color="text.secondary">
          Em telas maiores você pode dividir em 2 colunas (lista + detalhes).
        </Typography>
      )}
    </Box>
  )
}

