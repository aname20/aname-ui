import moment from 'moment'

export interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  location?: string
  [key: string]: unknown
}

export interface Appointment {
  id: string
  title: string
  date: string
  time: string
  location: string
}

export interface AppointmentGroup {
  date: string
  dayOfWeek: string
  appointments: Appointment[]
}

const DAYS_OF_WEEK = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export const formatDate = (dateString: string): { date: string; dayOfWeek: string } => {
  const date = moment(dateString)
  const day = date.format('DD')
  const month = date.format('MM')
  const year = date.format('YYYY')
  const dayOfWeek = DAYS_OF_WEEK[date.day()]

  return {
    date: `${day}/${month}/${year}`,
    dayOfWeek,
  }
}

export const filterEventsBySearch = (
  events: CalendarEvent[],
  searchQuery: string
): CalendarEvent[] => {
  if (!searchQuery) return events

  const query = searchQuery.toLowerCase()
  return events.filter(
    (event) =>
      event.title?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query)
  )
}

export const filterEventsByTab = (
  events: CalendarEvent[],
  tabValue: number
): CalendarEvent[] => {
  const todayStart = moment().startOf('day')

  return events.filter((event) => {
    const eventDate = moment(event.date)

    const isMarkedTab = tabValue === 0

    if (isMarkedTab) {
      return eventDate.isSameOrAfter(todayStart, 'day')
    }

    return eventDate.isBefore(todayStart, 'day')
  })
}

export const groupEventsByDate = (events: CalendarEvent[]): AppointmentGroup[] => {
  if (!events || events.length === 0) return []

  const grouped = events.reduce((acc: Record<string, Appointment[]>, event) => {
    const { date } = formatDate(event.date)
    const dateKey = date

    if (!acc[dateKey]) {
      acc[dateKey] = []
    }

    acc[dateKey].push({
      id: event.id,
      title: event.title || 'Sem título',
      date,
      time: event.time || '',
      location: event.location || 'Local não informado',
    })

    return acc
  }, {})

  return Object.entries(grouped)
    .map(([date, appointments]) => {
      const dateISO = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
      const { dayOfWeek } = formatDate(dateISO)

      return {
        date,
        dayOfWeek,
        appointments: appointments.sort((a: Appointment, b: Appointment) => {
          const timeA = a.time || '00:00'
          const timeB = b.time || '00:00'
          return timeA.localeCompare(timeB)
        }),
      }
    })
    .sort((a, b) => {
      const dateA = moment(a.date, 'DD/MM/YYYY')
      const dateB = moment(b.date, 'DD/MM/YYYY')

      return dateA.valueOf() - dateB.valueOf()
    })
}

export const mountCalendarEvents = (
  events: CalendarEvent[],
  searchQuery: string,
  tabValue: number
): AppointmentGroup[] => {
  const filteredBySearch = filterEventsBySearch(events, searchQuery)
  const filteredByTab = filterEventsByTab(filteredBySearch, tabValue)

  return groupEventsByDate(filteredByTab)
}