import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { eventsService } from '@/services/events/events.service'
import type { Event } from '@/types/event'



export const AgendaDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const menuOpen = Boolean(anchorEl)

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError('ID do evento não encontrado')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const eventData = await eventsService.findOne(Number(id))
        setEvent(eventData)
      } catch (err) {
        console.error('Error fetching event:', err)
        setError('Erro ao carregar evento')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [id])

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

  const handleDelete = async () => {
    if (!id) return
    
    try {
      await eventsService.remove(Number(id))
      handleMenuClose()
      navigate('/agenda')
    } catch (err) {
      console.error('Error deleting event:', err)
      // TODO: Show error toast
    }
  }

  const handleRelateDiagnostic = () => {
    navigate(`/agenda/${id}/editar`)
  }

  const handleDependentClick = () => {
    if (event?.dependentId) {
      navigate(`/dependentes/${event.dependentId}`)
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !event) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <Typography sx={{ color: '#d32f2f', fontSize: '14px' }}>
          {error || 'Evento não encontrado'}
        </Typography>
      </Box>
    )
  }

  // Format date and time
  const eventDate = new Date(event.date)
  const dateStr = eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  const dayOfWeek = eventDate.toLocaleDateString('pt-BR', { weekday: 'long' })
  const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
  const timeStr = eventDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  return (
    <Box sx={{ pb: 2 }}>
      {/* Título e Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 0.5 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ color: '#0033DA', fontWeight: 700, mb: 0.5 }}>
            {event.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575', mb: 2 }}>
            {event.description || 'Sem descrição'}
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
            {dateStr}
          </Typography>
          <Typography variant="body2" sx={{ color: '#0033DA', fontWeight: 600 }}>
            {capitalizedDayOfWeek}
          </Typography>
          <Typography variant="body2" sx={{ color: '#0033DA' }}>
            {timeStr}
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
            sx={{ width: 56, height: 56, bgcolor: '#0033DA' }}
          >
            {event.dependent?.name?.charAt(0) || 'D'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
              {event.dependent?.name || 'Dependente'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              {event.dependent?.age && `${event.dependent.age} anos`}
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
            {event.doctor?.name || 'Não informado'}
          </Typography>
        </Box>

        {/* Especialidade */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
            Especialidade
          </Typography>
          <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
            {event.doctor?.specialty || 'Não informado'}
          </Typography>
        </Box>
      </Box>

      {/* Comentários */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          Comentários
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {event.description || 'Sem comentários'}
        </Typography>
      </Box>

      {/* Diagnóstico */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          Diagnóstico
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          Aguardando diagnóstico
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

