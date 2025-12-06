import React from 'react'
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
} from '@mui/material'

export interface ModalConfirmationProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  showConfirmButton?: boolean
  showCancelButton?: boolean
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  open,
  onClose,
  title,
  subtitle,
  showConfirmButton = true,
  showCancelButton = true,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          p: 2.5,
          maxWidth: 400,
          width: '100%',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '1rem',
              color: '#456CE8',
              mb: subtitle ? 0.5 : 0,
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                fontSize: '0.875rem',
                color: '#456CE8',
                mb: 1.5,
              }}
            >
              {subtitle}
            </Typography>
          )}

          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              justifyContent: 'flex-start',
              mt: 0.5,
            }}
          >
            {showConfirmButton && (
              <Button
                variant="contained"
                onClick={handleConfirm}
                sx={{
                  bgcolor: '#456CE8',
                  color: '#FFFFFF',
                  fontWeight: 500,
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2.5,
                  py: 0.75,
                  fontSize: '0.875rem',
                  '&:hover': {
                    bgcolor: '#3a5bd4',
                  },
                }}
              >
                {confirmLabel}
              </Button>
            )}

            {showCancelButton && (
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  borderColor: '#456CE8',
                  color: '#456CE8',
                  fontWeight: 500,
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2.5,
                  py: 0.75,
                  fontSize: '0.875rem',
                  bgcolor: 'rgba(69, 108, 232, 0.08)',
                  '&:hover': {
                    borderColor: '#3a5bd4',
                    bgcolor: 'rgba(69, 108, 232, 0.12)',
                  },
                }}
              >
                {cancelLabel}
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

