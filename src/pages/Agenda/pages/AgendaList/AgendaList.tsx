import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { eventsService } from '@/services/events/events.service'
import type { Event } from '@/types/event'

interface Appointment {
  id: string
  title: string
  date: string
  time: string
  location: string
}

interface AppointmentGroup {
  date: string
  dayOfWeek: string
  appointments: Appointment[]
}


interface AppointmentGroup {
  date: string
  dayOfWeek: string
  appointments: Appointment[]
}

// Helper function to group events by date
const groupEventsByDate = (events: Event[]): AppointmentGroup[] => {
  const groups: { [key: string]: Event[] } = {}
  
  events.forEach((event) => {
    const eventDate = new Date(event.date)
    const dateKey = eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(event)
  })
  
  return Object.entries(groups)
    .sort(([dateA], [dateB]) => {
      const [dayA, monthA, yearA] = dateA.split('/').map(Number)
      const [dayB, monthB, yearB] = dateB.split('/').map(Number)
      return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime()
    })
    .map(([date, events]) => {
      const eventDate = new Date(events[0].date)
      const dayOfWeek = eventDate.toLocaleDateString('pt-BR', { weekday: 'long' })
      const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
      
      const appointments: Appointment[] = events.map((event) => {
        const eventDate = new Date(event.date)
        const dateStr = eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
        const timeStr = eventDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        
        return {
          id: event.id.toString(),
          title: event.title,
          date: dateStr,
          time: timeStr,
          location: event.location || 'Local não informado',
        }
      })
      
      return {
        date,
        dayOfWeek: capitalizedDayOfWeek,
        appointments,
      }
    })
}

export const AgendaList = () => {
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const eventsData = await eventsService.findAll()
        setEvents(eventsData)
      } catch (err) {
        console.error('Error fetching events:', err)
        setError('Erro ao carregar eventos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Filter events based on tab (scheduled vs history)
  const filteredEvents = events.filter((event) => {
    const isScheduled = event.status === 'SCHEDULED'
    const matchesTab = tabValue === 0 ? isScheduled : !isScheduled
    
    // Apply search filter
    const matchesSearch = searchQuery
      ? event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    
    return matchesTab && matchesSearch
  })

  const groupedAppointments = groupEventsByDate(filteredEvents)

  return (
    <Box sx={{ pb: 2 }}>
      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 2,
          '& .MuiTabs-indicator': {
            backgroundColor: '#456CE8',
            height: 3,
          },
        }}
      >
        <Tab
          label="Marcados"
          sx={{
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: tabValue === 0 ? 600 : 400,
            color: tabValue === 0 ? '#456CE8' : '#9E9E9E',
            '&.Mui-selected': {
              color: '#456CE8',
            },
          }}
        />
        <Tab
          label="Histórico"
          sx={{
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: tabValue === 1 ? 600 : 400,
            color: tabValue === 1 ? '#456CE8' : '#9E9E9E',
            '&.Mui-selected': {
              color: '#456CE8',
            },
          }}
        />
      </Tabs>

      {/* Search Bar + Add Button */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          placeholder="Pesquisar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          fullWidth
          InputProps={{
             endAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#9E9E9E' }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "33px",
              bgcolor: 'white',
              paddingRight: "0",
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => navigate('/agenda/novo')}
          sx={{
            bgcolor: '#456CE8',
            textTransform: 'none',
            borderRadius: 2,
            px: 3,
            whiteSpace: 'nowrap',
            '&:hover': {
              bgcolor: '#3557c9',
            },
            fontSize: "10px"
          }}
        >
          Adicionar novo
        </Button>
      </Box>

      {/* Appointments Timeline */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Typography sx={{ color: '#d32f2f', fontSize: '14px' }}>{error}</Typography>
        </Box>
      ) : groupedAppointments.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Typography sx={{ color: '#666', fontSize: '14px' }}>
            {searchQuery ? 'Nenhum evento encontrado com esse filtro' : 'Nenhum evento encontrado'}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ position: 'relative' }}>
          {/* Continuous vertical line for entire timeline */}
          <Box
            sx={{
              position: 'absolute',
              left: 8,
              top: 28,
              bottom: 0,
              width: 2,
              borderLeft: '2px dashed #456CE8',
              opacity: 0.3,
            }}
          />
          
          {groupedAppointments.map((group, groupIndex) => (
            <Box key={group.date} sx={{ position: 'relative', mb: groupIndex < groupedAppointments.length - 1 ? 4 : 0 }}>
              {/* Date Header */}
              <Typography
                variant="body2"
                sx={{
                  color: '#456CE8',
                  fontWeight: 500,
                  mb: 1.5,
                  fontSize: '0.9rem',
                }}
              >
                {group.date} ({group.dayOfWeek})
              </Typography>

              {/* Appointments */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {group.appointments.map((appointment) => (
                  <Box
                    key={appointment.id}
                    sx={{ position: 'relative', pl: 2.5 }}
                  >
                    {/* Timeline dot */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        border: '3px solid #456CE8',
                        bgcolor: 'white',
                      }}
                    />

                    {/* Appointment Card */}
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        ml: 2
                      }}
                    >
                      <CardActionArea
                        onClick={() => navigate(`/agenda/${appointment.id}`)}
                        sx={{
                          p: 2,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 500, mb: 0.5 }}
                          >
                            {appointment.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: '#757575', fontSize: '0.8rem' }}
                          >
                            {appointment.date} - {appointment.time} -{' '}
                            {appointment.location}
                          </Typography>
                        </Box>
                        <ChevronRightIcon sx={{ color: '#9E9E9E' }} />
                      </CardActionArea>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}