import React, { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useNavigate, useParams } from 'react-router'
import { ModalConfirmation } from '@/components/common/ModalConfirmation'
import { MedicationTimeItem } from './components/MedicationTimeItem'
import { medicationService } from '@/services/medications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const ViewMedication: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const open = Boolean(anchorEl)

  type MappedMedication = {
    name: string
    dosage: string
    person: string
    personAge?: number
    doctor: string
    comments: string
    continuousUse: boolean
    times: { time: string; day: string }[]
  }

  const { data: prescription, isLoading, isError, refetch } = useQuery({
    queryKey: ['prescriptions', id],
    queryFn: () => medicationService.getPrescriptionDetails(id || ''),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    console.log('refetching prescription', id)

    if (id) {
      console.log('refetching prescription', id)
      refetch()
    }
  }, [id, refetch])

  const medication = useMemo<MappedMedication | null>(() => {
    if (!prescription) return null

    return {
      name: prescription.medication?.name ?? 'Medicamento',
      dosage: prescription.dosage ?? 'Sem dosagem',
      person: prescription.dependent?.name ?? 'Paciente',
      personAge: prescription.dependent?.age ?? undefined,
      doctor: prescription.doctorName ?? 'Profissional de saúde',
      comments: prescription.notes ?? 'Sem comentários',
      continuousUse: prescription.type === 'CONTINUOUS',
      times:
        prescription.schedules?.map((item) => ({
          time: item.time,
          day: '', // API não fornece dia específico; exibimos somente o horário
        })) ?? [],
    }
  }, [prescription])

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    handleMenuClose()
    navigate(`/medications/edit/${id}`)
  }

  const handleShare = () => {
    handleMenuClose()

    if (!medication) return

    if (navigator.share) {
      navigator.share({
        title: medication.name,
        text: `Medicamento: ${medication.name} - ${medication.dosage}`,
      }).catch(() => {})
    }
  }

  const handleDelete = () => {
    handleMenuClose()
    setIsDeleteModalOpen(true)
  }

  const { mutate: deletePrescription } = useMutation({
    mutationFn: () => medicationService.removePrescription(id || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] })
      queryClient.removeQueries({ queryKey: ['prescriptions', id] })
      navigate('/medications')
    },
    onError: (error) => {
      console.error('Erro ao excluir remédio', error)
    },
    onSettled: () => {
      setIsDeleteModalOpen(false)
    },
  })

  const handleConfirmDelete = () => {
    if (!id) {
      console.error('ID do remédio não encontrado para exclusão')
      setIsDeleteModalOpen(false)
      return
    }

    deletePrescription()
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
  }

  const handlePersonClick = () => {
    // Navegar para detalhes da pessoa
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
        <Typography variant="body1" color="text.secondary">
          Carregando prescrição...
        </Typography>
      </Box>
    )
  }

  if (isError || !medication) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
        <Typography variant="body1" color="error.main">
          Não foi possível carregar os dados da prescrição.
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          flex: 1,
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
          pb: { xs: 10, sm: 10 },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              color: 'text.primary',
            }}
          >
            {medication.name}
          </Typography>
          <IconButton
            onClick={handleMenuClick}
            sx={{ color: 'text.primary' }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              borderRadius: 2,
              minWidth: 180,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            Editar
            <EditIcon sx={{ ml: 'auto', fontSize: '1.2rem', color: 'primary.main' }} />
          </MenuItem>
          <MenuItem onClick={handleShare}>
            Compartilhar
            <ShareIcon sx={{ ml: 'auto', fontSize: '1.2rem', color: 'primary.main' }} />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            Excluir
            <DeleteIcon sx={{ ml: 'auto', fontSize: '1.2rem', color: 'error.main' }} />
          </MenuItem>
        </Menu>

        <Card
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            },
          }}
          onClick={handlePersonClick}
        >
          <CardContent
            sx={{
              py: 2,
              px: 2.5,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                bgcolor: 'primary.main',
              }}
            >
              {medication.person.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  color: 'text.primary',
                }}
              >
                {medication.person}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                  color: 'text.secondary',
                }}
              >
                {medication.personAge} anos
              </Typography>
            </Box>
            <ChevronRightIcon color="primary" />
          </CardContent>
        </Card>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                color: 'text.secondary',
              }}
            >
              Médico
            </Typography>

            <Tooltip title={medication.doctor} placement="top">
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  color: 'primary.main',
                  maxWidth: 200,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {medication.doctor}
              </Typography>
            </Tooltip>
          </Box>

          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                color: 'text.secondary',
              }}
            >
              Dosagem
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.95rem', sm: '1rem' },
                color: 'primary.main',
                fontWeight: 500,
              }}
            >
              {medication.dosage}
            </Typography>
          </Box>
        </div>

        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 0.5,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              color: 'text.secondary',
            }}
          >
            Comentários
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              color: 'primary.main',
            }}
          >
            {medication.comments}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 0.5,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              color: 'text.secondary',
            }}
          >
            Até Dia
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              color: 'primary.main',
            }}
          >
            {medication.continuousUse ? 'Uso Contínuo' : 'Data específica'}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 1.5,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              color: 'text.secondary',
            }}
          >
            Horários
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              maxWidth: '60%',
              gap: 1,
            }}
          >
            {medication.times.map((item: { time: string; day: string }, index: number) => (
              <MedicationTimeItem key={index} time={item.time} day={item.day} />
            ))}
          </Box>
        </Box>
      </Box>

      <ModalConfirmation
        open={isDeleteModalOpen}
        onClose={handleCancelDelete}
        title="Você tem certeza que deseja excluir esse remédio?"
        subtitle="Essa ação não poderá ser desfeita."
        confirmLabel="Confirmar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  )
}

