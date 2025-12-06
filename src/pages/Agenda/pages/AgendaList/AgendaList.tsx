import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

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

const mockData: AppointmentGroup[] = [
  {
    date: '03/04/2025',
    dayOfWeek: 'Quarta-feira',
    appointments: [
      {
        id: '1',
        title: 'Eletrocardiograma',
        date: '03/04/2025',
        time: '8:00',
        location: 'Clínica Amor Saúde',
      },
    ],
  },
  {
    date: '12/04/2025',
    dayOfWeek: 'Sábado',
    appointments: [
      {
        id: '2',
        title: 'Infiltração no joelho',
        date: '12/04/2025',
        time: '10:00',
        location: 'Clínica Amor Saúde',
      },
      {
        id: '3',
        title: 'Avaliação Neuropsicológica',
        date: '12/04/2025',
        time: '13:00',
        location: 'Clínica Amor Saúde',
      },
    ],
  },
  {
    date: '15/04/2025',
    dayOfWeek: 'Terça-feira',
    appointments: [
      {
        id: '4',
        title: 'Fisioterapia',
        date: '15/04/2025',
        time: '9:30',
        location: 'Clínica Amor Saúde',
      },
    ],
  },
  {
    date: '07/05/2025',
    dayOfWeek: 'Quarta-feira',
    appointments: [
      {
        id: '5',
        title: 'Ultrassom',
        date: '07/05/2025',
        time: '10:00',
        location: 'Clínica Amor Saúde',
      },
      {
        id: '6',
        title: 'Mamografia',
        date: '07/05/2025',
        time: '14:00',
        location: 'Clínica Amor Saúde',
      },
    ],
  },
]

export const AgendaList = () => {
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

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
        
        {mockData.map((group, groupIndex) => (
          <Box key={group.date} sx={{ position: 'relative', mb: groupIndex < mockData.length - 1 ? 4 : 0 }}>
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
    </Box>
  )
}