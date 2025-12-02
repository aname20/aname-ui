import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Divider,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useNavigate, useParams } from 'react-router'

// Mock data - em produção viria de uma API
const medicationData: { [key: string]: any } = {
  'clonazepam': {
    name: 'Clonazepam',
    dosage: '5mg',
    person: 'Graça Lima',
    personAge: 35,
    doctor: "Dr. Marco Di'Angelo",
    comments: 'Sem comentários',
    continuousUse: true,
    times: [
      { time: '08:00', day: 'Dom' },
      { time: '08:00', day: 'Seg' },
      { time: '08:00', day: 'Ter' },
      { time: '08:00', day: 'Qua' },
      { time: '08:00', day: 'Qui' },
      { time: '08:00', day: 'Sex' },
    ],
  },
}

export const ViewMedication: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // Em produção, buscar dados do remédio pelo ID
  const medication = medicationData[id || 'clonazepam'] || medicationData['clonazepam']

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    handleMenuClose()
    navigate(`/medications/edit/${id}`)
  }

  const handleShare = () => {
    handleMenuClose()
    // Lógica para compartilhar
    if (navigator.share) {
      navigator.share({
        title: medication.name,
        text: `Medicamento: ${medication.name} - ${medication.dosage}`,
      }).catch(() => {})
    }
  }

  const handleDelete = () => {
    handleMenuClose()
    if (window.confirm(`Tem certeza que deseja excluir ${medication.name}?`)) {
      // Lógica para excluir
      navigate('/medications')
    }
  }

  const handlePersonClick = () => {
    // Navegar para detalhes da pessoa
  }

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
          gap: 3,
        }}
      >
        {/* Título e Menu */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              color: 'text.primary',
            }}
          >
            {medication.name}
          </Typography>
          <IconButton
            onClick={handleMenuClick}
            sx={{ color: 'text.primary' }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Menu de Contexto */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              borderRadius: 2,
              minWidth: 180,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 1.5, fontSize: '1.2rem' }} />
            Editar
          </MenuItem>
          <MenuItem onClick={handleShare}>
            <ShareIcon sx={{ mr: 1.5, fontSize: '1.2rem' }} />
            Compartilhar
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1.5, fontSize: '1.2rem' }} />
            Excluir
          </MenuItem>
        </Menu>

        {/* Card da Pessoa */}
        <Card
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            },
          }}
          onClick={handlePersonClick}
        >
          <CardContent
            sx={{
              py: 2,
              px: 2.5,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                bgcolor: 'primary.main',
              }}
            >
              {medication.person.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  color: 'text.primary',
                }}
              >
                {medication.person}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                  color: 'text.secondary',
                }}
              >
                {medication.personAge} anos
              </Typography>
            </Box>
            <ChevronRightIcon color="primary" />
          </CardContent>
        </Card>

        {/* Detalhes do Médico */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 0.5,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              color: 'text.secondary',
            }}
          >
            Médico
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.95rem', sm: '1rem' },
              color: 'primary.main',
              fontWeight: 500,
            }}
          >
            {medication.doctor}
          </Typography>
        </Box>

        {/* Dosagem */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 0.5,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              color: 'text.secondary',
            }}
          >
            Dosagem
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.95rem', sm: '1rem' },
              color: 'primary.main',
              fontWeight: 500,
            }}
          >
            {medication.dosage}
          </Typography>
        </Box>

        {/* Comentários */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 0.5,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              color: 'text.secondary',
            }}
          >
            Comentários
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              color: 'text.secondary',
            }}
          >
            {medication.comments}
          </Typography>
        </Box>

        {/* Até Dia */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 0.5,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              color: 'text.secondary',
            }}
          >
            Até Dia
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              color: 'text.secondary',
            }}
          >
            {medication.continuousUse ? 'Uso Contínuo' : 'Data específica'}
          </Typography>
        </Box>

        {/* Horários */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 1.5,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              color: 'text.secondary',
            }}
          >
            Horários
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {medication.times.map((item: any, index: number) => (
              <Chip
                key={index}
                label={`${item.time} ${item.day}`}
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  borderRadius: 2,
                  fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                  height: { xs: 32, sm: 36 },
                  '& .MuiChip-label': {
                    px: 1.5,
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

