import { eventsService } from '@/services/events/events.service'
import type { Event } from '@/types/event'
import { mountCalendarEvents, type AppointmentGroup, type CalendarEvent } from '@/utils/agenda'
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
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

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

  // Converter Event[] para CalendarEvent[] e usar mountCalendarEvents
  const groupedAppointments = useMemo<AppointmentGroup[]>(() => {
    // Converter Event para CalendarEvent
    const calendarEvents: CalendarEvent[] = events.map((event) => {
      const eventDate = new Date(event.date)
      const hours = eventDate.getHours().toString().padStart(2, '0')
      const minutes = eventDate.getMinutes().toString().padStart(2, '0')
      
      return {
        id: event.id.toString(),
        title: event.title,
        date: event.date, // Formato ISO
        time: `${hours}:${minutes}`,
        location: event.location,
      }
    })

    return mountCalendarEvents(calendarEvents, searchQuery, tabValue)
  }, [events, searchQuery, tabValue])

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