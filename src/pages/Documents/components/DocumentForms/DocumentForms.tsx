import { PrimaryInput } from '@/components/forms/PrimaryInput'
import { PrimarySelect } from '@/components/forms/PrimarySelect'
import CloseIcon from '@mui/icons-material/Close'
import DescriptionIcon from '@mui/icons-material/Description'
import { Box, Button, IconButton, MenuItem, Typography } from '@mui/material'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { DocumentType } from '../../types/DocumentType'

interface DocumentFormData {
  title: string
  dependentId: string
  type: DocumentType
  date: string
  media?: File
  comments?: string
}

interface DocumentFormsProps {
  control: Control<DocumentFormData>
  errors: FieldErrors<DocumentFormData>
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  onCancel: () => void
  submitLabel?: string
}

export const DocumentForms: React.FC<DocumentFormsProps> = ({
  control,
  errors,
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
}) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ pb: 2, pt: 2 }}>
      {/* Título */}
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="Título"
            placeholder="Inserir Título"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={{ mb: 2 }}
          />
        )}
      />

      {/* Dependente */}
      <Controller
        name="dependentId"
        control={control}
        render={({ field }) => (
          <PrimarySelect
            {...field}
            label="Dependente"
            fullWidth
            error={!!errors.dependentId}
            helperText={errors.dependentId?.message}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Selecionar</MenuItem>
            <MenuItem value="1">João Silva</MenuItem>
            <MenuItem value="2">Maria Santos</MenuItem>
            <MenuItem value="3">Pedro Costa</MenuItem>
          </PrimarySelect>
        )}
      />

      {/* Tipo */}
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <PrimarySelect
            {...field}
            label="Tipo"
            fullWidth
            error={!!errors.type}
            helperText={errors.type?.message}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Selecionar</MenuItem>
            <MenuItem value={DocumentType.PRESCRIPTION}>Receita</MenuItem>
            <MenuItem value={DocumentType.REPORT}>Laudo</MenuItem>
            <MenuItem value={DocumentType.EXAM}>Exame</MenuItem>
            <MenuItem value={DocumentType.OTHER}>Outros</MenuItem>
          </PrimarySelect>
        )}
      />

      {/* Data */}
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="Data"
            type="date"
            fullWidth
            error={!!errors.date}
            helperText={errors.date?.message}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 3 }}
          />
        )}
      />

      {/* Adicionar Mídia */}
      <Box
        sx={{
          mb: 3,
          p: 4,
          border: errors.media ? '2px solid #d32f2f' : '2px solid #E8EBF5',
          borderRadius: 3,
          bgcolor: '#CFD8F952',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Controller
          name="media"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <>
              <Box
                sx={{
                  display: 'flex',
                  p: 4,
                  borderRadius: '50%',
                  border: '3px dashed #456CE8',
                  bgcolor: '#E8EEF9',
                  mb: 3,
                }}
              >
                <DescriptionIcon sx={{ fontSize: 48, color: '#456CE8' }} />
              </Box>
              
              <input
                {...field}
                type="file"
                id="media-upload"
                accept="image/*,application/pdf"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  onChange(file)
                }}
              />
              {!value ? (
                <label htmlFor="media-upload">
                  <Button
                    component="span"
                    variant="contained"
                    sx={{
                      bgcolor: '#456CE8',
                      textTransform: 'none',
                      px: 4,
                      py: 1.2,
                      borderRadius: 2,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      '&:hover': {
                        bgcolor: '#3557c9',
                      },
                    }}
                  >
                    Adicionar Novo
                  </Button>
                </label>
              ) : (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: '#F5F5F5',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    width: '100%',
                    maxWidth: 400,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#757575',
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {(value as File).name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => onChange(null)}
                    sx={{
                      color: '#757575',
                      '&:hover': {
                        bgcolor: '#E0E0E0',
                        color: '#FF5252',
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </>
          )}
        />
        {errors.media && (
          <Typography
            variant="caption"
            sx={{
              color: '#d32f2f',
              mt: 1,
              display: 'block',
              fontSize: '0.75rem',
            }}
          >
            {errors.media.message}
          </Typography>
        )}
      </Box>

      {/* Comentários Adicionais */}
      <Controller
        name="comments"
        control={control}
        render={({ field }) => (
          <PrimaryInput
            {...field}
            label="Comentários Adicionais"
            placeholder="Manual sobre de consulta paga Dr. Bruna"
            fullWidth
            multiline
            rows={3}
            error={!!errors.comments}
            helperText={errors.comments?.message}
            sx={{ mb: 3 }}
          />
        )}
      />

      {/* Botões */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
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
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={onCancel}
          sx={{
            borderColor: '#E0E0E0',
            color: '#757575',
            textTransform: 'none',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 500,
            borderRadius: 2,
            bgcolor: '#F5F5F5',
            '&:hover': {
              bgcolor: '#EEEEEE',
              borderColor: '#E0E0E0',
            },
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}

