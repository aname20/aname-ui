import React, { useState } from 'react'
import {
  Box,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router'
import { MedicationItem } from './components/MedicationItem'

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
              <MedicationItem key={medicationId} name={med.name} dosage={med.dosage} person={med.person} />
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
