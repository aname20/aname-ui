import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Card,
  CardContent
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useNavigate } from 'react-router'

const medications = [
  { name: 'Clonazepam', dosage: '500mg', person: 'Graça Lima' },
  { name: 'Prostaline', dosage: '1000mg', person: 'Joaquim Bezerra' },
  { name: 'Diamicron', dosage: '60mg', person: 'Maria Luiz da Silva' },
  { name: 'Stanglit', dosage: '30mg', person: 'Graça Lima' },
  { name: 'Vitamina B12', dosage: '20ml', person: 'Graça Lima' },
  { name: 'Loratadina', dosage: '50mg', person: 'Graça Lima' },
]

export const Medications: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMedications = medications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >

      <Box
        sx={{
          flex: 1,
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
          pb: { xs: 10, sm: 10 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <TextField
            size="small"
            fullWidth
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/medications/add')}
            sx={{
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
              py: 1,
              whiteSpace: 'nowrap',
              minWidth: { xs: '100%', sm: 'auto' },
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            }}
          >
            Adicionar Novo
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {filteredMedications.map((med) => {
            const medicationId = med.name.toLowerCase().replace(/\s+/g, '-')
            return (
              <Card
                key={med.name}
                onClick={() => navigate(`/medications/view/${medicationId}`)}
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    py: { xs: 1.5, sm: 2 },
                    px: { xs: 2, sm: 2.5 },
                    '&:last-child': { pb: { xs: 1.5, sm: 2 } },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        mb: 0.5,
                        color: 'text.primary',
                      }}
                    >
                      {med.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        color: 'text.secondary',
                      }}
                    >
                      {med.dosage} - {med.person}
                    </Typography>
                  </Box>
                  <ChevronRightIcon
                    color="primary"
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    }}
                  />
                </CardContent>
              </Card>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
