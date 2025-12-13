import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { useState } from 'react'
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

interface EmergencyContact {
  id: string
  name: string
  phone: string
}

interface Dependent {
  id: string
  name: string
  avatar: string
}

interface ProfileData {
  id: string
  name: string
  age: number
  avatar: string
  emergencyContacts: EmergencyContact[]
  dependents: Dependent[]
}

const mockProfile: ProfileData = {
  id: '1',
  name: 'Luana Gomes',
  age: 26,
  avatar: 'https://i.pravatar.cc/150?img=47',
  emergencyContacts: [
    { id: '1', name: 'Raquel', phone: '81996778855' },
    { id: '2', name: 'João', phone: '81996778855' },
  ],
  dependents: [
    { id: '1', name: 'Cristina', avatar: 'https://i.pravatar.cc/150?img=48' },
    { id: '2', name: 'João', avatar: 'https://i.pravatar.cc/150?img=15' },
  ],
}

export const ProfileDetails = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  // TODO: Buscar dados reais da API
  const profile = mockProfile

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    // TODO: Navegar para edição de perfil
    console.log('Editar perfil')
    handleMenuClose()
  }

  const handleCallContact = (phone: string) => {
    window.open(`tel:${phone}`, '_blank')
  }

  return (
    <Box sx={{ pb: 2 }}>
      {/* Menu de 3 pontos */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={handleMenuOpen} size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Menu de Opções */}
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

      {/* Avatar e Nome (Centralizados) */}
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
          {profile.name} ({profile.age} anos)
        </Typography>
      </Box>

      {/* Contatos de Emergência dos Dependentes */}
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
          Contato de Emergência dos Dependentes:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
          {profile.emergencyContacts.map((contact) => (
            <Chip
              key={contact.id}
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
              label={`${contact.name}: ${formatPhoneNumber(contact.phone)}`}
              onClick={() => handleCallContact(contact.phone)}
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
          ))}
        </Box>
      </Box>

      {/* Meus Dependentes */}
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

          {/* Botão Adicionar Dependente */}
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
      </Box>
    </Box>
  )
}
