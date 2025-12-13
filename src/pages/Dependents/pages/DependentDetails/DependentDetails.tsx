import { useDeleteDependent, useDependentById, useDependentCaregivers } from '@/services/dependents'
import { useAuthStore } from '@/stores/authStore'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export const DependentDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const user = useAuthStore((state) => state.user)
  const isFamily = user?.role === 'FAMILY'

  const { data: dependent, isLoading, isError } = useDependentById(id || '')
  
  const { data: caregivers = [] } = useDependentCaregivers(id || '')
  
  const deleteDependent = useDeleteDependent()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    navigate(`/dependentes/${id}/editar`)
    handleMenuClose()
  }

  const handleDelete = async () => {
    if (!id) return

    try {
      await deleteDependent.mutateAsync(id)
      navigate('/dependentes')
    } catch (error) {
      console.error('Erro ao excluir dependente:', error)
    }
    handleMenuClose()
  }

  const handleCallContact = (phone: string) => {
    window.open(`tel:${phone}`, '_blank')
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !dependent) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" sx={{ color: '#F44336' }}>
          Erro ao carregar dependente. Tente novamente.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ pb: 2 }}>
      {/* Menu de 3 pontos - só aparece para FAMILY */}
      {isFamily && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={handleMenuOpen} size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
      )}

      {/* Menu de Opções */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} disabled={deleteDependent.isPending}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Excluir</ListItemText>
        </MenuItem>
      </Menu>

      {/* Avatar e Informações Básicas */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar
          alt={dependent.name}
          sx={{ width: 100, height: 100, mb: 2, bgcolor: '#456CE8', fontSize: '2rem' }}
        >
          {dependent.name.charAt(0)}
        </Avatar>
        <Typography variant="h6" sx={{ color: '#456CE8', fontWeight: 600, mb: 0.5 }}>
          {dependent.name} ({dependent.age} anos)
        </Typography>
        {dependent.susCode && (
          <Typography variant="body2" sx={{ color: '#757575', mb: 1 }}>
            SUS: {dependent.susCode}
          </Typography>
        )}

        {/* Contatos de Emergência - Links clicáveis */}
        {dependent.emergencyContacts && dependent.emergencyContacts.length > 0 && (
          <>
            <Typography variant="body2" sx={{ color: '#757575', fontWeight: 600, mb: 0.5, mt: 1 }}>
              Contatos de Emergência
            </Typography>
            {dependent.emergencyContacts.map((contact, index) => (
              <Box
                key={contact.id || index}
                onClick={() => handleCallContact(contact.phone)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  cursor: 'pointer',
                  color: '#456CE8',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                <LocalPhoneIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">
                  {contact.name}{contact.kinship ? ` (${contact.kinship})` : ''}: {contact.phone}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </Box>

      {/* Condições de Saúde */}
      {dependent.conditions?.length && (
        <Box
          sx={{
            border: '1px solid #E0E0E0',
            borderRadius: 3,
            p: 2,
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontStyle: 'italic', color: '#757575', mb: 1.5, fontSize: '0.85rem' }}
          >
            Condições de Saúde
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {dependent.conditions.map((condition, index) => (
              <Chip
                key={index}
                label={condition}
                sx={{
                  bgcolor: '#E8EEF9',
                  color: '#456CE8',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  border: '1px solid #456CE8',
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Alergias e Restrições Alimentares */}
      {dependent.allergies.length && (
        <Box
          sx={{
            border: '1px solid #E0E0E0',
            borderRadius: 3,
            p: 2,
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontStyle: 'italic', color: '#757575', mb: 1.5, fontSize: '0.85rem' }}
          >
            Alergias e Restrições Alimentares
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {dependent.allergies.map((allergy, index) => (
              <Chip
                key={index}
                label={allergy}
                sx={{
                  bgcolor: '#FFEBEE',
                  color: '#D32F2F',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  border: '1px solid #D32F2F',
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Cuidadores */}
      <Box
        sx={{
          border: '1px solid #E0E0E0',
          borderRadius: 3,
          p: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontStyle: 'italic', color: '#757575', mb: 1.5, fontSize: '0.85rem' }}
        >
          Cuidadores
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          {caregivers.length > 0 ? (
            caregivers.map((caregiver) => (
              <Box
                key={caregiver.id}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Avatar
                  src={caregiver.avatar}
                  sx={{ width: 60, height: 60, bgcolor: '#456CE8' }}
                >
                  {caregiver.name.charAt(0)}
                </Avatar>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    bgcolor: '#456CE8',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {caregiver.name}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
              Nenhum cuidador cadastrado
            </Typography>
          )}

          {/* Botão Adicionar Cuidador - só aparece para FAMILY */}
          {isFamily && (
            <IconButton
              onClick={() => navigate(`/dependentes/${id}/editar`)}
              sx={{
                bgcolor: '#456CE8',
                color: 'white',
                width: 60,
                height: 60,
                '&:hover': { bgcolor: '#3557c9' },
              }}
            >
              <AddIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  )
}
