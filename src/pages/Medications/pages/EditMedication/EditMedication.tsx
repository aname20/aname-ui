import React from 'react'
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
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AddIcon from '@mui/icons-material/Add'
import NotificationsIcon from '@mui/icons-material/Notifications'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate, useParams } from 'react-router'
import { useForm, Controller, useFieldArray, useWatch, type Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  editMedicationSchema,
  type EditMedicationFormData,
} from './schema/schema'
import { formatDate } from '@/utils/date'
import { medicationData } from './constants'


export const EditMedication: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const initialData = medicationData[id || 'clonazepam'] || {
    medication: '',
    dependent: '',
    doctor: '',
    dosage: '',
    dateUntil: '',
    continuousUse: true,
    times: ['08:00'],
    comments: '',
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditMedicationFormData>({

    resolver: yupResolver(editMedicationSchema) as unknown as Resolver<EditMedicationFormData, unknown, EditMedicationFormData>,
    defaultValues: {
      medication: initialData.medication,
      dependent: initialData.dependent,
      doctor: initialData.doctor,
      dosage: initialData.dosage,
      dateUntil: initialData.dateUntil || undefined,
      continuousUse: initialData.continuousUse,
      times: initialData.times || ['08:00'],
      comments: initialData.comments || undefined,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error - React Hook Form type inference issue with Yup
    name: 'times',
  })

  const continuousUse = useWatch({
    control,
    name: 'continuousUse',
    defaultValue: initialData.continuousUse,
  })

  const onSubmit = async (data: EditMedicationFormData) => {
    console.log('Atualizando:', data)

    navigate(`/medications/${id}`)
  }

  const handleCancel = () => {
    navigate(`/medications/${id}`)
  }

  const handleAddTime = () => {
    append('08:00')
  }

  const handleRemoveTime = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
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
        <Controller
          name="medication"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              placeholder="Pesquisar Remédio"
              error={!!errors.medication}
              helperText={errors.medication?.message}
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
          )}
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
        <Controller
          name="dependent"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth size="small" error={!!errors.dependent}>
              <Select
                {...field}
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
              {errors.dependent && (
                <Typography
                  variant="caption"
                  sx={{ color: 'error.main', mt: 0.5, ml: 1.75 }}
                >
                  {errors.dependent.message}
                </Typography>
              )}
            </FormControl>
          )}
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
          Médico
        </Typography>
        <Controller
          name="doctor"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              placeholder="Inserir Nome do Médico"
              error={!!errors.doctor}
              helperText={errors.doctor?.message}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          )}
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
        <Controller
          name="dosage"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              placeholder="Pesquisar a dosagem"
              error={!!errors.dosage}
              helperText={errors.dosage?.message}
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
          )}
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
              <Controller
                name="dateUntil"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    placeholder="DD/MM/YYYY"
                    disabled={continuousUse}
                    error={!!errors.dateUntil}
                    helperText={errors.dateUntil?.message}
                    value={field.value || ''}
                    onChange={(e) => {
                      const formatted = formatDate(e.target.value)
                      field.onChange(formatted)
                    }}
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
                )}
              />
            </Box>
            <Box sx={{ mt: 3.5 }}>
              <Controller
                name="continuousUse"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
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
                )}
              />
            </Box>
          </Box>

          {fields.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <Controller
                name={`times.${index}`}
                control={control}
                render={({ field: timeField }) => (
                  <TextField
                    {...timeField}
                    fullWidth
                    size="small"
                    type="time"
                    error={!!errors.times?.[index]}
                    helperText={errors.times?.[index]?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <AccessTimeIcon sx={{ color: 'text.secondary' }} />
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
                )}
              />
              {fields.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveTime(index)}
                  size="small"
                  color="error"
                  type="button"
                >
                  <CloseIcon color="error" />
                </IconButton>
              )}
            </Box>
          ))}
          {errors.times && typeof errors.times.message === 'string' && (
            <Typography
              variant="caption"
              sx={{ color: 'error.main', mt: -1 }}
            >
              {errors.times.message}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddTime}
            type="button"
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
        <Controller
          name="comments"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={4}
              placeholder="Adicione comentários ou observações"
              error={!!errors.comments}
              helperText={errors.comments?.message}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          )}
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
          type="button"
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
          type="submit"
          disabled={isSubmitting}
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: 'none',
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
          }}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </Box>
    </Box>
  )
}

