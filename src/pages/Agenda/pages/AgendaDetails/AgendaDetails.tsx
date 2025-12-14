import { useEvent } from '@/services/agenda/agenda.hooks'
import type { AgendaEvent } from '@/services/agenda/agenda.service'
import { formatDate } from '@/utils/agenda'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export const AgendaDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const { data: event, isLoading, isError } = useEvent(id)

  const appointment = useMemo(() => {
    if (!event) return null

    const eventData = event as AgendaEvent
    
    // Extrair data e hora do formato ISO
    const eventDate = new Date(eventData.date)
    const { date: formattedDate, dayOfWeek } = formatDate(eventData.date)
    const dateParts = formattedDate.split('/')
    const shortDate = `${dateParts[0]}/${dateParts[1]}`
    
    // Extrair hora no formato HH:mm
    const hours = eventDate.getHours().toString().padStart(2, '0')
    const minutes = eventDate.getMinutes().toString().padStart(2, '0')
    const time = `${hours}:${minutes}`

    // Tratar doctor como objeto ou string
    const doctorData = typeof eventData.doctor === 'object' && eventData.doctor !== null
      ? eventData.doctor
      : null
    const doctorName = doctorData?.name || (typeof eventData.doctor === 'string' ? eventData.doctor : 'Não informado')
    const doctorSpecialty = doctorData?.specialty || 'Não informado'

    return {
      id: eventData.id,
      title: eventData.title || 'Sem título',
      description: eventData.description || '',
      date: shortDate,
      dayOfWeek: dayOfWeek.substring(0, 5), // Primeiras 5 letras (ex: "Quinta")
      time,
      doctor: {
        name: doctorName,
        specialty: doctorSpecialty,
      },
      dependent: {
        id: eventData.dependentId || eventData.dependent?.id || '',
        name: eventData.dependent?.name || 'Não informado',
        age: eventData.dependent?.age,
        avatar: eventData.dependent?.avatar,
      },
      location: {
        name: eventData.location || 'Não informado',
        address: '',
        rating: 0,
        reviews: 0,
        mapImage: '',
      },
      comments: eventData.comments || 'Sem comentários',
      diagnosis: eventData.diagnosis || 'Aguardando diagnóstico',
    }
  }, [event])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    navigate(`/agenda/${id}/editar`)
    handleMenuClose()
  }

  const handleDelete = () => {
    // TODO: Implementar lógica de exclusão
    console.log('Excluir agendamento:', id)
    handleMenuClose()
  }

  const handleRelateDiagnostic = () => {
    navigate(`/agenda/${id}/editar`)
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <Typography variant="body1" color="text.secondary">
          Carregando evento...
        </Typography>
      </Box>
    )
  }

  if (isError || !appointment) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <Typography variant="body1" color="error.main">
          Não foi possível carregar os dados do evento.
        </Typography>
      </Box>
    )
  }

  const handleDependentClick = () => {
    if (appointment.dependent.id) {
      navigate(`/dependentes/${appointment.dependent.id}`)
    }
  }

  return (
    <Box sx={{ pb: 2 }}>
      {/* Título e Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 0.5 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ color: '#0033DA', fontWeight: 700, mb: 0.5 }}>
            {appointment.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575', mb: 2 }}>
            {appointment.description}
          </Typography>
        </Box>
        <IconButton
          onClick={handleMenuOpen}
          size="small"
          sx={{ color: '#0033DA' }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Menu de Opções */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Excluir</ListItemText>
        </MenuItem>
      </Menu>

      {/* Data e Dependente */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {/* Data e Hora */}
        <Box
          sx={{
            border: '2px solid #0033DA',
            borderRadius: 3,
            p: 2,
            minWidth: 80,
            textAlign: 'center',
            bgcolor: 'white',
          }}
        >
          <Typography variant="h4" sx={{ color: '#0033DA', fontWeight: 700, lineHeight: 1 }}>
            {appointment.date}
          </Typography>
          <Typography variant="body2" sx={{ color: '#0033DA', fontWeight: 600 }}>
            {appointment.dayOfWeek}
          </Typography>
          <Typography variant="body2" sx={{ color: '#0033DA' }}>
            {appointment.time}
          </Typography>
        </Box>

        {/* Informações do Dependente */}
        <Box
          onClick={handleDependentClick}
          sx={{
            border: '1px solid #E0E0E0',
            borderRadius: 3,
            p: 2,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            bgcolor: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: '#0033DA',
              bgcolor: '#F8F9FF',
            },
          }}
        >
          <Avatar
            src={appointment.dependent.avatar}
            alt={appointment.dependent.name}
            sx={{ width: 56, height: 56 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
              {appointment.dependent.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              {appointment.dependent.age ? `${appointment.dependent.age} anos` : ''}
            </Typography>
          </Box>
          <Typography sx={{ color: '#0033DA', fontSize: '2rem', lineHeight: 1 }}>›</Typography>
        </Box>
      </Box>

      {/* Médico e Especialidade */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {/* Médico */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
            Médico
          </Typography>
          <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
            {appointment.doctor.name}
          </Typography>
        </Box>

        {/* Especialidade */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
            Especialidade
          </Typography>
          <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
            {appointment.doctor.specialty}
          </Typography>
        </Box>
      </Box>

      {/* Comentários */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          Comentários
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {appointment.comments}
        </Typography>
      </Box>

      {/* Diagnóstico */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          Diagnóstico
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {appointment.diagnosis}
        </Typography>
      </Box>

      {/* Botão Relatar Diagnóstico */}
      <Button
        fullWidth
        variant="contained"
        onClick={handleRelateDiagnostic}
        sx={{
          bgcolor: '#456CE8',
          textTransform: 'none',
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 500,
          borderRadius: 2,
          '&:hover': {
            bgcolor: '#3557c9',
          },
        }}
      >
        Relatar Diagnóstico
      </Button>
    </Box>
  )
}

