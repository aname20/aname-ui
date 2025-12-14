import { eventsService } from '@/services/events/events.service'
import { prescriptionsService } from '@/services/prescriptions/prescriptions.service'
import { ArrowForward, Folder, People, PersonAdd } from '@mui/icons-material'
import { Box, Button, Card, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Banner } from '../../components/Banner'
import { Carousel } from '../../components/Carousel'

interface MedicationCard {
  id: string
  name: string
  dosage: string
  frequency: string
  times: string
  person: string
}

interface EventCard {
  id: string
  title: string
  date: string
  time: string
  person: string
}

{/* mock simulador de dados */}
export const Home: React.FC = () => {
  const navigate = useNavigate()
  const [medications, setMedications] = useState<MedicationCard[]>([])
  const [events, setEvents] = useState<EventCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingEvents, setIsLoadingEvents] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [eventsError, setEventsError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const prescriptions = await prescriptionsService.findAll()
        
        const medicationCards: MedicationCard[] = prescriptions.map((prescription) => {
          const times = prescription.schedules?.map(s => s.time).join(' | ') || ''
          const frequency = prescription.schedules?.length 
            ? `${prescription.schedules.length}x ao dia` 
            : 'Não especificado'
          
          return {
            id: prescription.id.toString(),
            name: prescription.medication?.name || 'Medicamento',
            dosage: prescription.dosage || '',
            frequency,
            times,
            person: prescription.dependent?.name || 'Dependente',
          }
        })
        
        setMedications(medicationCards)
      } catch (err) {
        console.error('Error fetching prescriptions:', err)
        setError('Erro ao carregar medicamentos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrescriptions()
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoadingEvents(true)
        setEventsError(null)
        const eventsData = await eventsService.findAll()
        
        const eventCards: EventCard[] = eventsData.map((event) => {
          const eventDate = new Date(event.date)
          const dateStr = eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
          const timeStr = eventDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          
          return {
            id: event.id.toString(),
            title: event.title,
            date: dateStr,
            time: timeStr,
            person: event.dependent?.name || 'Dependente',
          }
        })
        
        setEvents(eventCards)
      } catch (err) {
        console.error('Error fetching events:', err)
        setEventsError('Erro ao carregar eventos')
      } finally {
        setIsLoadingEvents(false)
      }
    }

    fetchEvents()
  }, [])

  const cadastros: MedicationCard[] = [
    {
      id: "1",
      name: "Novo Dependente",
      dosage: "",
      frequency: "",
      times: "",
      person: "",
    },
    {
      id: "2",
      name: "Novo Documento",
      dosage: "",
      frequency: "",
      times: "",
      person: "",
    },
    {
      id: "3",
      name: "Novo Evento",
      dosage: "",
      frequency: "",
      times: "",
      person: "",
    },
  ]

  const suaArea: EventCard[] = [
    {
      id: "1",
      title: "Dependentes",
      date: "",
      time: "",
      person: "",
    },
    {
      id: "2",
      title: "Documentos",
      date: "",
      time: "",
      person: "",
    },

    {
      id: "3",
      title: "Agenda",
      date: "",
      time: "",
      person: "",
    },
  ]

  const medicationItems = medications.map((med) => ({
    id: med.id,
    content: (
      <Card
        sx={{
          bgcolor: 'white',
          border: '1px solid #e5e5e5',
          borderRadius: 2.5,
          p: 2.5,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
          width: '100%',
          maxWidth: '320px',
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
            borderColor: '#3375f5',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#1a1a1a',
              flex: 1,
              lineHeight: 1.3,
            }}
          >
            {med.name}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#000',
              bgcolor: '#f0f0f0',
              px: 1.25,
              py: 0.5,
              borderRadius: 1,
              whiteSpace: 'nowrap',
              ml: 1.5,
            }}
          >
            {med.dosage}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontSize: '14px', color: '#555', mb: 1, fontWeight: 500 }}>
          {med.frequency}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '13px', color: '#777', mb: 0 }}>
          {med.times}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontSize: '11px',
            color: '#999',
            mt: 1.5,
            pt: 1.5,
            borderTop: '1px solid #f0f0f0',
            display: 'block',
          }}
        >
          {med.person}
        </Typography>
      </Card>
    ),
  }))

  const eventItems = events.map((evt) => ({
    id: evt.id,
    content: (
      <Card
        onClick={() => navigate(`/agenda/${evt.id}`)}
        sx={{
          bgcolor: 'white',
          border: '1px solid #e5e5e5',
          borderRadius: 2.5,
          p: 2.5,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
          width: '100%',
          maxWidth: '320px',
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
            borderColor: '#3375f5',
          },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#1a1a1a',
              lineHeight: 1.3,
            }}
          >
            {evt.title}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontSize: '14px', color: '#555', mb: 1, fontWeight: 500 }}>
          {evt.date}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '13px', color: '#777' }}>
          {evt.time}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontSize: '11px',
            color: '#999',
            mt: 1.5,
            pt: 1.5,
            borderTop: '1px solid #f0f0f0',
            display: 'block',
          }}
        >
          {evt.person}
        </Typography>
      </Card>
    ),
  }))

  const getCadastroRoute = (name: string) => {
    switch (name) {
      case 'Novo Dependente':
        return '/dependentes/novo'
      case 'Novo Documento':
        return '/documentos/novo'
      case 'Novo Evento':
        return '/agenda/novo'
      default:
        return '/'
    }
  }

  const cadastroItems = cadastros.map((cad) => ({
    id: cad.id,
    content: (
      <Card
        onClick={() => navigate(getCadastroRoute(cad.name))}
        sx={{
          bgcolor: 'white',
          border: '1px solid #e5e5e5',
          borderRadius: 2.5,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          cursor: 'pointer',
          transition: 'all 0.2s',
          width: '100%',
          maxWidth: '320px',
          height: '100%',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
            borderColor: '#3375f5',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexDirection: 'column' }}>
          <PersonAdd sx={{ fontSize: '36px', color: '#3375f5' }} />
          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', textAlign: 'center' }}>
            {cad.name}
          </Typography>
        </Box>
      </Card>
    ),
  }))

  const getAreaRoute = (title: string) => {
    switch (title) {
      case 'Dependentes':
        return '/dependentes'
      case 'Documentos':
        return '/documentos'
      case 'Agenda':
        return '/agenda'
      default:
        return '/'
    }
  }

  const suaAreaItems = suaArea.map((area) => ({
    id: area.id,
    content: (
      <Card
        onClick={() => navigate(getAreaRoute(area.title))}
        sx={{
          bgcolor: 'white',
          border: '1px solid #e5e5e5',
          borderRadius: 2.5,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          cursor: 'pointer',
          transition: 'all 0.2s',
          width: '100%',
          maxWidth: '320px',
          height: '100%',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
            borderColor: '#3375f5',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexDirection: 'column' }}>
          {area.title === 'Dependentes' ? (
            <People sx={{ fontSize: '36px', color: '#3375f5' }} />
          ) : (
            <Folder sx={{ fontSize: '36px', color: '#3375f5' }} />
          )}
          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', textAlign: 'center' }}>
            {area.title}
          </Typography>
        </Box>
      </Card>
    ),
  }))

  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        px: 2,
        py: 2,
        m: '0 auto',
        maxWidth: '1200px',
      }}
    >
      {/* Próximos Remédios */}
      <Box
        component="section"
        sx={{
          mb: 3,
          borderBottom: '1px solid #e5e5e5',
          pb: 2.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1.25,
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, m: 0, color: '#1a1a1a' }}>
            Próximos Remédios
          </Typography>
          <Button
            onClick={() => navigate('/remedios')}
            endIcon={<ArrowForward sx={{ fontSize: '16px' }} />}
            sx={{
              bgcolor: '#3375f5',
              color: '#fff',
              px: 2,
              py: 0.75,
              borderRadius: 2,
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#2563eb',
                boxShadow: '0 2px 8px rgba(51, 117, 245, 0.3)',
              },
            }}
          >
            Ver Mais
          </Button>
        </Box>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography sx={{ color: '#d32f2f', fontSize: '14px' }}>{error}</Typography>
          </Box>
        ) : medications.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography sx={{ color: '#666', fontSize: '14px' }}>Nenhum medicamento encontrado</Typography>
          </Box>
        ) : (
          <Carousel items={medicationItems} showDots={true} />
        )}
      </Box>

      {/* Próximos Eventos */}
      <Box
        component="section"
        sx={{
          mb: 3,
          borderBottom: '1px solid #e5e5e5',
          pb: 2.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1.25,
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, m: 0, color: '#1a1a1a' }}>
            Próximos Eventos
          </Typography>
          <Button
            onClick={() => navigate('/agenda')}
            endIcon={<ArrowForward sx={{ fontSize: '16px' }} />}
            sx={{
              bgcolor: '#3375f5',
              color: '#fff',
              px: 2,
              py: 0.75,
              borderRadius: 2,
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#2563eb',
                boxShadow: '0 2px 8px rgba(51, 117, 245, 0.3)',
              },
            }}
          >
            Ver Mais
          </Button>
        </Box>
        {isLoadingEvents ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : eventsError ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography sx={{ color: '#d32f2f', fontSize: '14px' }}>{eventsError}</Typography>
          </Box>
        ) : events.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography sx={{ color: '#666', fontSize: '14px' }}>Nenhum evento encontrado</Typography>
          </Box>
        ) : (
          <Carousel items={eventItems} showDots={true} />
        )}
      </Box>

      {/* Cadastros */}
      <Box
        component="section"
        sx={{
          mb: 3,
          borderBottom: '1px solid #e5e5e5',
          pb: 2.5,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, m: 0, color: '#1a1a1a', mb: 1.25 }}>
          Cadastros
        </Typography>
        <Carousel items={cadastroItems} showDots={true} />
      </Box>

      {/* Sua Área */}
      <Box
        component="section"
        sx={{
          mb: 3,
          borderBottom: '1px solid #e5e5e5',
          pb: 2.5,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, m: 0, color: '#1a1a1a', mb: 1.25 }}>
          Sua Área
        </Typography>
        <Carousel items={suaAreaItems} showDots={true} />
      </Box>

      <Box component="section" sx={{ mb: 3 }}>
        <Banner />
      </Box>
    </Box>
  )
}

