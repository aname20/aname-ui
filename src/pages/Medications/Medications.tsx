import { usePrescriptions } from '@/services/prescriptions/prescription.hooks'
import type { Prescription } from '@/types/medication'
import SearchIcon from '@mui/icons-material/Search'
import {
    Box,
    Button,
    InputAdornment,
    TextField,
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { MedicationItem } from './components/MedicationItem'

export const Medications: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const { data: prescriptions = [], isLoading, isError } = usePrescriptions()

  const filteredMedications = useMemo(() => {
    const term = searchTerm.toLowerCase().trim()
    if (!term) return prescriptions

    return prescriptions.filter((prescription: Prescription) => {
      const medicationName = prescription.medication?.name?.toLowerCase() || ''
      const dependentName = prescription.dependent?.name?.toLowerCase() || ''
      return (
        medicationName.includes(term) ||
        dependentName.includes(term)
      )
    })
  }, [prescriptions, searchTerm])

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
        {isLoading && (
          <Box sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
            Carregando prescrições...
          </Box>
        )}

        {isError && (
          <Box sx={{ color: 'error.main', fontSize: '0.9rem' }}>
            Erro ao carregar prescrições.
          </Box>
        )}

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
            onClick={() => navigate('/remedios/novo')}
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
          {filteredMedications.map((prescription) => (
            <MedicationItem
              key={prescription.id}
              id={prescription.id}
              name={prescription.medication?.name || 'Medicamento'}
              dosage={prescription.dosage || 'Sem dosagem'}
              person={prescription.dependent?.name || 'Paciente'}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
