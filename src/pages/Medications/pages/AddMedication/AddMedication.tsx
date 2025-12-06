import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AddIcon from '@mui/icons-material/Add'
import NotificationsIcon from '@mui/icons-material/Notifications'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useNavigate } from 'react-router'
import { TimeItem } from './components/TimeItem'

export const AddMedication: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    medication: '',
    dependent: '',
    doctor: '',
    dosage: '',
    dateUntil: '',
    continuousUse: true,
    time: '08:00',
    comments: '',
  })
  const [times, setTimes] = useState<string[]>(['08:00'])

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, continuousUse: e.target.checked })
  }

  const formatDate = (value: string): string => {
    const numbers = value.replace(/\D/g, '')

    const limitedNumbers = numbers.slice(0, 8)

    if (limitedNumbers.length <= 2) {
      return limitedNumbers
    } else if (limitedNumbers.length <= 4) {
      return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2)}`
    } else {
      return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2, 4)}/${limitedNumbers.slice(4)}`
    }
  }

  const validateDate = (value: string): boolean => {
    if (value.length !== 10) return false

    const [day, month, year] = value.split('/').map(Number)

    if (day < 1 || day > 31) return false

    if (month < 1 || month > 12) return false

    if (year < 1900 || year > 2099) return false

    const date = new Date(year, month - 1, day)
    if (
      date.getDate() !== day ||
      date.getMonth() !== month - 1 ||
      date.getFullYear() !== year
    ) {
      return false
    }

    return true
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value)
    setFormData({ ...formData, dateUntil: formatted })
  }

  const handleAddTime = () => {
    setTimes([...times, '08:00'])
  }

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...times]
    newTimes[index] = value
    setTimes(newTimes)
  }

  const handleRemoveTime = (index: number) => {
    if (times.length > 1) {
      const newTimes = times.filter((_, i) => i !== index)
      setTimes(newTimes)
    }
  }

  const handleSave = () => {
    console.log('Salvando:', { ...formData, times })
    navigate('/medications')
  }

  const handleCancel = () => {
    navigate('/medications')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Remédio
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Pesquisar Remédio"
          value={formData.medication}
          onChange={handleChange('medication')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
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
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Dependente
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={formData.dependent}
            onChange={(e) =>
              setFormData({ ...formData, dependent: e.target.value })
            }
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: '#9e9e9e' }}>Selecionar</span>
              }
              const options: { [key: string]: string } = {
                'graca-lima': 'Graça Lima',
                'joaquim-bezerra': 'Joaquim Bezerra',
                'maria-luiz': 'Maria Luiz da Silva',
              }
              return options[selected] || selected
            }}
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: 2,
              },
            }}
          >
            <MenuItem value="graca-lima">Graça Lima</MenuItem>
            <MenuItem value="joaquim-bezerra">Joaquim Bezerra</MenuItem>
            <MenuItem value="maria-luiz">Maria Luiz da Silva</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Médico
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Inserir Nome do Médico"
          value={formData.doctor}
          onChange={handleChange('doctor')}
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Dosagem
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Pesquisar a dosagem"
          value={formData.dosage}
          onChange={handleChange('dosage')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
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
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Posologia
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'flex-start',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 0.5,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  color: 'text.secondary',
                }}
              >
                Até:
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="DD/MM/YYYY"
                value={formData.dateUntil}
                onChange={handleDateChange}
                error={
                  formData.dateUntil.length > 0 &&
                  formData.dateUntil.length === 10 &&
                  !validateDate(formData.dateUntil)
                }
                helperText={
                  formData.dateUntil.length > 0 &&
                  formData.dateUntil.length === 10 &&
                  !validateDate(formData.dateUntil)
                    ? 'Data inválida'
                    : ''
                }
                inputProps={{
                  maxLength: 10,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon sx={{ color: 'text.secondary' }} />
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
            </Box>
            <Box sx={{ mt: 3.5 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.continuousUse}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    }}
                  >
                    Uso Contínuo
                  </Typography>
                }
              />
            </Box>
          </Box>

          {times.map((time, index) => (
            <TimeItem
              key={index}
              time={time}
              index={index}
              handleTimeChange={handleTimeChange}
              handleRemoveTime={handleRemoveTime}
              times={times}
            />
          ))}

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddTime}
            sx={{
              borderRadius: 2,
              py: 1,
              textTransform: 'none',
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            }}
          >
            Adicionar Outro Horário +
          </Button>

          <Button
            variant="outlined"
            startIcon={<NotificationsIcon />}
            sx={{
              borderRadius: 2,
              py: 1,
              textTransform: 'none',
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': { borderColor: 'primary.dark' },
            }}
          >
            Adicionar Lembrete
          </Button>
        </Box>
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          Comentários
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Adicione comentários ou observações"
          value={formData.comments}
          onChange={handleChange('comments')}
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mt: 2,
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          onClick={handleCancel}
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: 'none',
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.dark',
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: 'none',
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
          }}
        >
          Salvar
        </Button>
      </Box>
    </Box>
  )
}

