import { useDependents } from '@/services/dependents/dependents.hooks'
import { useUserById } from '@/services/users/users.hooks'
import { useAuthStore } from '@/stores/authStore'
import type { Dependent } from '@/types/medication'
import AddIcon from '@mui/icons-material/Add'
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
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

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

interface DependentProfile {
  id: string
  name: string
  avatar: string
  emergencyContact: string | null
}

interface ProfileData {
  id: string
  name: string
  avatar: string
  dependents: DependentProfile[]
}

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=User&background=456CE8&color=fff&size=200'

export const ProfileDetails = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const userFromStore = useAuthStore((state) => state.user)
  const userId = userFromStore?.id

  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUserById(userId || '')

  const { data: dependents = [], isLoading: isLoadingDependents } = useDependents()

  const profile = useMemo<ProfileData | null>(() => {
    if (!user) return null

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar || DEFAULT_AVATAR,
      dependents: dependents.map((dependent) => {
        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(dependent.name)}&background=456CE8&color=fff&size=200`

        const dependentWithEmergencyContact = dependent as Dependent & { emergencyContact?: string | null }
        const emergencyContact = dependentWithEmergencyContact.emergencyContact || null

        return {
          id: dependent.id,
          name: dependent.name,
          avatar: defaultAvatar,
          emergencyContact,
        }
      }),
    }
  }, [user, dependents])

  const isLoading = isLoadingUser || isLoadingDependents
  const isError = isErrorUser

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    navigate('/perfil/editar')
    handleMenuClose()
  }

  const handleCallContact = (phone: string) => {
    window.open(`tel:${phone}`, '_blank')
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !profile) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <Typography variant="body1" color="error.main">
          Não foi possível carregar os dados do perfil.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ pb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={handleMenuOpen} size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
      </Menu>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Avatar
          src={profile.avatar}
          alt={profile.name}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h6" sx={{ color: '#456CE8', fontWeight: 600 }}>
          {profile.name}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: '#000',
            fontWeight: 400,
            mb: 1.5,
            textAlign: 'center',
          }}
        >
          Contatos de Emergência dos Dependentes:
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {profile.dependents.map((dependent) => {
            if (!dependent.emergencyContact) {
              return null
            }

            return (
              <Box key={dependent.id} sx={{ mb: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#456CE8',
                    fontWeight: 600,
                    mb: 1,
                    fontSize: '0.875rem',
                    textAlign: 'center',
                  }}
                >
                  {dependent.name}:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                  <Chip
                    icon={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <LocalPhoneIcon sx={{ fontSize: 14, color: '#456CE8' }} />
                      </Box>
                    }
                    label={formatPhoneNumber(dependent.emergencyContact)}
                    onClick={() => handleCallContact(dependent.emergencyContact!)}
                    sx={{
                      bgcolor: '#E8EEFF',
                      color: '#456CE8',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      border: '1.5px solid #456CE8',
                      cursor: 'pointer',
                      px: 1,
                      '&:hover': {
                        bgcolor: '#D6E4FF',
                      },
                    }}
                  />
                </Box>
              </Box>
            )
          })}
          {profile.dependents.every((dep) => !dep.emergencyContact) && (
            <Typography
              variant="body2"
              sx={{
                color: '#9E9E9E',
                textAlign: 'center',
                fontSize: '0.875rem',
                fontStyle: 'italic',
              }}
            >
              Nenhum contato de emergência cadastrado
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          border: '1px solid #E0E0E0',
          borderRadius: 3,
          p: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontStyle: 'italic',
            color: '#757575',
            mb: 2,
            fontSize: '0.9rem',
          }}
        >
          Meus Dependentes
        </Typography>
        {profile.dependents.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 4,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#9E9E9E',
                mb: 3,
                fontSize: '0.875rem',
                textAlign: 'center',
              }}
            >
              Nenhum dependente cadastrado
            </Typography>
            <Box
              onClick={() => navigate('/dependentes/novo')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  bgcolor: '#F3F4F6',
                  border: '3px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    bgcolor: '#E5E7EB',
                  },
                }}
              >
                <AddIcon sx={{ fontSize: 32, color: '#9E9E9E' }} />
              </Box>
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
                  fontWeight: 600,
                }}
              >
                Adicionar
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {profile.dependents.map((dependent) => (
              <Box
                key={dependent.id}
                onClick={() => navigate(`/dependentes/${dependent.id}`)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  src={dependent.avatar}
                  sx={{
                    width: 70,
                    height: 70,
                    border: '3px solid #D9D0C7',
                  }}
                >
                  {dependent.name.charAt(0)}
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
                    fontWeight: 600,
                  }}
                >
                  {dependent.name}
                </Typography>
              </Box>
            ))}

            <Box
              onClick={() => navigate('/dependentes/novo')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  bgcolor: '#F3F4F6',
                  border: '3px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    bgcolor: '#E5E7EB',
                  },
                }}
              >
                <AddIcon sx={{ fontSize: 32, color: '#9E9E9E' }} />
              </Box>
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
                  fontWeight: 600,
                }}
              >
                Adicionar
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
