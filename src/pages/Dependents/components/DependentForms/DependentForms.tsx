import { useAvailableCaregivers } from '@/services/caregivers'
import type { Caregiver } from '@/types/medication'
import AddIcon from '@mui/icons-material/Add'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { Avatar, Box, Button, Chip, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Controller, useFieldArray, useWatch, type Control, type FieldErrors, type UseFormSetValue } from 'react-hook-form'

interface EmergencyContact {
  name: string
  phone: string
  kinship?: string
}

interface DependentFormData {
  name: string
  age: number
  susCode?: string
  avatar?: File | null
  conditions?: string[]
  allergies?: string[]
  caregiverIds?: string[]
  emergencyContacts: EmergencyContact[]
}

interface DependentFormsProps {
  control: Control<DependentFormData>
  errors: FieldErrors<DependentFormData>
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  onCancel: () => void
  setValue: UseFormSetValue<DependentFormData>
  submitLabel?: string
  isSubmitting?: boolean
  // Valores iniciais para edição
  initialConditions?: string[]
  initialAllergies?: string[]
  initialCaregivers?: Caregiver[]
}

// Função para formatar telefone
const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '')
  const limited = numbers.slice(0, 11)
  
  if (limited.length <= 10) {
    return limited
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  } else {
    return limited
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
  }
}

export const DependentForms: React.FC<DependentFormsProps> = ({
  control,
  errors,
  onSubmit,
  onCancel,
  setValue,
  submitLabel = 'Salvar',
  isSubmitting = false,
  initialConditions = [],
  initialAllergies = [],
  initialCaregivers = [],
}) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [conditionInput, setConditionInput] = useState('')
  const [allergyInput, setAllergyInput] = useState('')
  const [selectedCaregivers, setSelectedCaregivers] = useState<Caregiver[]>(initialCaregivers)
  const [showCaregiverList, setShowCaregiverList] = useState(false)
  const [caregiverSearchQuery, setCaregiverSearchQuery] = useState('')
  const caregiverRef = useRef<HTMLDivElement>(null)

  // Busca cuidadores disponíveis da API
  const { data: availableCaregivers = [], isLoading: isLoadingCaregivers } = useAvailableCaregivers()

  // Watch conditions e allergies do react-hook-form
  const watchedConditions = useWatch({ control, name: 'conditions' }) || []
  const watchedAllergies = useWatch({ control, name: 'allergies' }) || []

  // Inicializa os valores quando os props mudam (edição)
  useEffect(() => {
    if (initialConditions.length > 0) {
      setValue('conditions', initialConditions)
    }
    if (initialAllergies.length > 0) {
      setValue('allergies', initialAllergies)
    }
    if (initialCaregivers.length > 0) {
      setSelectedCaregivers(initialCaregivers)
      setValue('caregiverIds', initialCaregivers.map(c => c.id))
    }
  }, [initialConditions, initialAllergies, initialCaregivers, setValue])

  useEffect(() => {
    const ids = selectedCaregivers.map(c => c.id)
    setValue('caregiverIds', ids)
  }, [selectedCaregivers, setValue])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'emergencyContacts',
  })

  // Fechar lista ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (caregiverRef.current && !caregiverRef.current.contains(event.target as Node)) {
        setShowCaregiverList(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleAddCondition = () => {
    const trimmedCondition = conditionInput.trim()
    if (trimmedCondition && !watchedConditions.includes(trimmedCondition)) {
      setValue('conditions', [...watchedConditions, trimmedCondition])
      setConditionInput('')
    }
  }

  const handleRemoveCondition = (condition: string) => {
    setValue('conditions', watchedConditions.filter((c) => c !== condition))
  }

  const handleAddAllergy = () => {
    const trimmedAllergy = allergyInput.trim()
    if (trimmedAllergy && !watchedAllergies.includes(trimmedAllergy)) {
      setValue('allergies', [...watchedAllergies, trimmedAllergy])
      setAllergyInput('')
    }
  }

  const handleRemoveAllergy = (allergy: string) => {
    setValue('allergies', watchedAllergies.filter((a) => a !== allergy))
  }

  const handleRemoveCaregiver = (caregiverId: string) => {
    setSelectedCaregivers(selectedCaregivers.filter((c) => c.id !== caregiverId))
  }

  // Filtra cuidadores disponíveis (remove os já selecionados e aplica busca)
  const filteredCaregivers = availableCaregivers
    .filter((c) => !selectedCaregivers.find((sc) => sc.id === c.id))
    .filter((c) => 
      c.name.toLowerCase().includes(caregiverSearchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(caregiverSearchQuery.toLowerCase())
    )

  // Estilo comum para inputs
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      '& fieldset': { borderColor: '#456CE8' },
      '&:hover fieldset': { borderColor: '#456CE8' },
      '&.Mui-focused fieldset': { borderColor: '#456CE8' },
    },
    '& .MuiInputBase-input': { color: '#000', fontSize: '0.95rem' },
    '& .MuiInputBase-input::placeholder': { color: '#456CE8', opacity: 0.7 },
  }

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ pb: 2, pt: 2 }}>
      {/* Avatar Upload */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Controller
          name="avatar"
          control={control}
          render={({ field: { onChange, onBlur, name, ref } }) => (
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={avatarPreview || undefined}
                sx={{ width: 100, height: 100, bgcolor: '#E0E0E0', cursor: 'pointer' }}
              >
                {!avatarPreview && <CameraAltIcon sx={{ fontSize: 40, color: '#9E9E9E' }} />}
              </Avatar>
              <input
                ref={ref}
                name={name}
                onBlur={onBlur}
                type="file"
                id="avatar-upload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    onChange(file)
                    const reader = new FileReader()
                    reader.onloadend = () => setAvatarPreview(reader.result as string)
                    reader.readAsDataURL(file)
                  }
                }}
              />
              
              {!avatarPreview ? (
                <label htmlFor="avatar-upload">
                  <IconButton
                    component="span"
                    sx={{
                      position: 'absolute', bottom: 0, right: 0,
                      bgcolor: '#456CE8', width: 32, height: 32,
                      '&:hover': { bgcolor: '#3557c9' },
                    }}
                  >
                    <CameraAltIcon sx={{ fontSize: 18, color: 'white' }} />
                  </IconButton>
                </label>
              ) : (
                <IconButton
                  onClick={() => { setAvatarPreview(null); onChange(null) }}
                  sx={{
                    position: 'absolute', bottom: 0, right: 0,
                    bgcolor: '#FF5252', width: 32, height: 32,
                    '&:hover': { bgcolor: '#D32F2F' },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 18, color: 'white' }} />
                </IconButton>
              )}
            </Box>
          )}
        />
      </Box>

      {/* Nome e Idade */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ color: '#9E9E9E', fontStyle: 'italic', fontSize: '0.75rem', mb: 0.5, display: 'block' }}>
                Nome
              </Typography>
              <TextField
                {...field}
                placeholder="Maria Luiz da Silva"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={inputSx}
              />
            </Box>
          )}
        />
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <Box sx={{ maxWidth: 100 }}>
              <Typography variant="caption" sx={{ color: '#9E9E9E', fontStyle: 'italic', fontSize: '0.75rem', mb: 0.5, display: 'block' }}>
                Idade
              </Typography>
              <TextField
                {...field}
                value={field.value || ''}
                placeholder="82"
                type="number"
                error={!!errors.age}
                helperText={errors.age?.message}
                onChange={(e) => {
                  const value = e.target.value
                  field.onChange(value === '' ? '' : parseInt(value) || 0)
                }}
                sx={inputSx}
              />
            </Box>
          )}
        />
      </Box>

      {/* SUS */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: '#9E9E9E', fontStyle: 'italic', fontSize: '0.75rem', mb: 0.5, display: 'block' }}>
          SUS
        </Typography>
        <Controller
          name="susCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="SUS: 343701209487223"
              fullWidth
              error={!!errors.susCode}
              helperText={errors.susCode?.message}
              sx={inputSx}
            />
          )}
        />
      </Box>

      {/* Condições de Saúde */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: '#9E9E9E', fontStyle: 'italic', fontSize: '0.75rem', mb: 0.5, display: 'block' }}>
          Condições de Saúde
        </Typography>
        <TextField
          value={conditionInput}
          onChange={(e) => setConditionInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleAddCondition()
            }
          }}
          placeholder="Digite uma condição e pressione Enter"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAddCondition} edge="end">
                  <SearchIcon sx={{ color: '#456CE8' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={inputSx}
        />
        {watchedConditions.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
            {watchedConditions.map((condition) => (
              <Chip
                key={condition}
                label={condition}
                onDelete={() => handleRemoveCondition(condition)}
                deleteIcon={<CloseIcon />}
                sx={{
                  bgcolor: 'white', border: '2px solid #456CE8', color: '#456CE8', fontWeight: 500,
                  '& .MuiChip-deleteIcon': { color: '#456CE8', '&:hover': { color: '#FF5252' } },
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Alergias e Restrições Alimentares */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: '#9E9E9E', fontStyle: 'italic', fontSize: '0.75rem', mb: 0.5, display: 'block' }}>
          Alergias e Restrições Alimentares
        </Typography>
        <TextField
          value={allergyInput}
          onChange={(e) => setAllergyInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleAddAllergy()
            }
          }}
          placeholder="Digite uma alergia e pressione Enter"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAddAllergy} edge="end">
                  <SearchIcon sx={{ color: '#456CE8' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={inputSx}
        />
        {watchedAllergies.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
            {watchedAllergies.map((allergy) => (
              <Chip
                key={allergy}
                label={allergy}
                onDelete={() => handleRemoveAllergy(allergy)}
                deleteIcon={<CloseIcon />}
                sx={{
                  bgcolor: 'white', border: '2px solid #456CE8', color: '#456CE8', fontWeight: 500,
                  '& .MuiChip-deleteIcon': { color: '#456CE8', '&:hover': { color: '#FF5252' } },
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Cuidadores */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ color: '#9E9E9E', fontStyle: 'italic', fontSize: '0.75rem', mb: 0.5, display: 'block' }}>
          Cuidadores
        </Typography>
        <Box ref={caregiverRef} sx={{ position: 'relative' }}>
          <TextField
            value={caregiverSearchQuery}
            onChange={(e) => setCaregiverSearchQuery(e.target.value)}
            placeholder="Pesquisar cuidador"
            fullWidth
            onFocus={() => setShowCaregiverList(true)}
            sx={inputSx}
          />
          
          {showCaregiverList && (
            <Box
              sx={{
                position: 'absolute', top: '100%', left: 0, right: 0, mt: 0.5,
                bgcolor: 'white', border: '1px solid #E0E0E0', borderRadius: 2,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxHeight: 200, overflowY: 'auto', zIndex: 1000,
              }}
            >
              {isLoadingCaregivers ? (
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={24} />
                </Box>
              ) : filteredCaregivers.length > 0 ? (
                filteredCaregivers.map((caregiver) => (
                  <Box
                    key={caregiver.id}
                    onClick={() => {
                      setSelectedCaregivers([...selectedCaregivers, caregiver])
                      setShowCaregiverList(false)
                      setCaregiverSearchQuery('')
                    }}
                    sx={{
                      p: 1.5, display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer',
                      '&:hover': { bgcolor: '#F5F5F5' },
                    }}
                  >
                    <Avatar src={caregiver.avatar} sx={{ width: 40, height: 40, bgcolor: '#456CE8' }}>
                      {caregiver.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography sx={{ color: '#000', fontSize: '0.9rem' }}>{caregiver.name}</Typography>
                      <Typography sx={{ color: '#9E9E9E', fontSize: '0.75rem' }}>{caregiver.email}</Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography sx={{ color: '#9E9E9E', fontSize: '0.85rem' }}>
                    Nenhum cuidador encontrado
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
        
        {selectedCaregivers.length > 0 && (
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            {selectedCaregivers.map((caregiver) => (
              <Box
                key={caregiver.id}
                sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Avatar src={caregiver.avatar} sx={{ width: 60, height: 60, bgcolor: '#456CE8' }}>
                  {caregiver.name.charAt(0)}
                </Avatar>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5, bgcolor: '#456CE8', color: 'white', px: 1.5, py: 0.5,
                    borderRadius: 2, fontSize: '0.75rem', fontWeight: 500,
                  }}
                >
                  {caregiver.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleRemoveCaregiver(caregiver.id)}
                  sx={{
                    position: 'absolute', top: -8, right: -8,
                    bgcolor: 'white', border: '2px solid #FF5252', width: 24, height: 24,
                    '&:hover': { bgcolor: '#FFF3F3' },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 16, color: '#FF5252' }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Contatos de Emergência */}
      <Box sx={{ border: '2px solid #E0E0E0', borderRadius: 4, p: 2, mb: 3 }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#9E9E9E', mb: 2, fontSize: '0.9rem' }}>
          Contatos de Emergência
        </Typography>

        {fields.map((field, index) => (
          <Box key={field.id} sx={{ mb: 3, position: 'relative' }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ color: '#9E9E9E', fontStyle: 'italic', fontSize: '0.7rem', mb: 0.5, display: 'block' }}>
                  Nome
                </Typography>
                <Controller
                  name={`emergencyContacts.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="João Silva"
                      fullWidth
                      error={!!errors.emergencyContacts?.[index]?.name}
                      helperText={errors.emergencyContacts?.[index]?.name?.message}
                      sx={inputSx}
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ color: '#9E9E9E', fontStyle: 'italic', fontSize: '0.7rem', mb: 0.5, display: 'block' }}>
                  Telefone
                </Typography>
                <Controller
                  name={`emergencyContacts.${index}.phone`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value)
                        field.onChange(formatted)
                      }}
                      placeholder="(11) 99999-9999"
                      fullWidth
                      error={!!errors.emergencyContacts?.[index]?.phone}
                      helperText={errors.emergencyContacts?.[index]?.phone?.message}
                      sx={inputSx}
                    />
                  )}
                />
              </Box>
            </Box>

            {/* Campo Parentesco */}
            <Box>
              <Typography variant="caption" sx={{ color: '#9E9E9E', fontStyle: 'italic', fontSize: '0.7rem', mb: 0.5, display: 'block' }}>
                Parentesco (opcional)
              </Typography>
              <Controller
                name={`emergencyContacts.${index}.kinship`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ''}
                    placeholder="Filho, Cônjuge, etc."
                    fullWidth
                    sx={inputSx}
                  />
                )}
              />
            </Box>

            {fields.length > 0 && (
              <IconButton
                size="small"
                onClick={() => remove(index)}
                sx={{
                  position: 'absolute', top: -12, right: -12,
                  bgcolor: 'white', border: '2px solid #FF5252', width: 28, height: 28,
                  '&:hover': { bgcolor: '#FFF3F3' },
                }}
              >
                <CloseIcon sx={{ fontSize: 18, color: '#FF5252' }} />
              </IconButton>
            )}
          </Box>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <IconButton
            onClick={() => append({ name: '', phone: '', kinship: '' })}
            sx={{ bgcolor: '#456CE8', width: 40, height: 40, '&:hover': { bgcolor: '#3557c9' } }}
          >
            <AddIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Box>

      {/* Botões */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{
            bgcolor: '#456CE8', textTransform: 'none', py: 1.5, fontSize: '1rem', fontWeight: 500, borderRadius: 2,
            '&:hover': { bgcolor: '#3557c9' },
            '&:disabled': { bgcolor: '#9E9E9E' },
          }}
        >
          {isSubmitting ? 'Salvando...' : submitLabel}
        </Button>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={onCancel}
          sx={{
            borderColor: '#E0E0E0', color: '#757575', textTransform: 'none', py: 1.5,
            fontSize: '1rem', fontWeight: 500, borderRadius: 2, bgcolor: '#F5F5F5',
            '&:hover': { bgcolor: '#EEEEEE', borderColor: '#E0E0E0' },
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}
