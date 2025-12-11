import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
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
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

// Função para formatar telefone
const formatPhoneNumber = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '')
  
  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11)
  
  if (limited.length <= 10) {
    // Formato: (00) 0000-0000
    return limited
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  } else {
    // Formato: (00) 00000-0000
    return limited
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
  }
}

// Mock data - substituir por chamada à API
const mockDependent = {
  id: '1',
  name: 'Graça Lima',
  age: 35,
  susCode: '999999999999',
  avatar: 'https://i.pravatar.cc/150?img=5',
  emergencyContacts: [
    { id: '1', name: 'Raquel', phone: '8199677-8855' },
    { id: '2', name: 'João', phone: '8199677-8855' },
  ],
  conditions: ['Artrite', 'Artrose', 'Esclerodermia', 'Aklameia', 'Padre non mea'],
  allergies: ['Pedalém', 'Niene', 'Glipema', 'Cannedel', 'Fechar de Mar', 'Pista'],
  caregivers: [
    { id: '1', name: 'Katielly', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '2', name: 'Diego', avatar: 'https://i.pravatar.cc/150?img=12' },
  ],
}

export const DependentDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  // TODO: Buscar dados reais da API usando o id
  const dependent = mockDependent

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

  const handleDelete = () => {
    // TODO: Implementar lógica de exclusão
    console.log('Excluir dependente:', id)
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
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Excluir</ListItemText>
        </MenuItem>
      </Menu>

      {/* Avatar e Informações Básicas */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar
          src={dependent.avatar}
          alt={dependent.name}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h6" sx={{ color: '#456CE8', fontWeight: 600, mb: 0.5 }}>
          {dependent.name} ({dependent.age} anos)
        </Typography>
        <Typography variant="body2" sx={{ color: '#757575', mb: 1 }}>
          SUS: {dependent.susCode}
        </Typography>

        {/* Contatos de Emergência - Links clicáveis */}
        <Typography variant="body2" sx={{ color: '#757575', fontWeight: 600, mb: 0.5 }}>
          Contatos de Emergência
        </Typography>
        {dependent.emergencyContacts.map((contact) => (
          <Box
            key={contact.id}
            onClick={() => handleCallContact(contact.phone)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
              color: '#456CE8',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            <LocalPhoneIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2">
              {contact.name}: {formatPhoneNumber(contact.phone)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Condições de Saúde */}
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
          sx={{
            fontStyle: 'italic',
            color: '#757575',
            mb: 1.5,
            fontSize: '0.85rem',
          }}
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

      {/* Alergias e Restrições Alimentares */}
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
          sx={{
            fontStyle: 'italic',
            color: '#757575',
            mb: 1.5,
            fontSize: '0.85rem',
          }}
        >
          Alergias e Restrições Alimentares
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {dependent.allergies.map((allergy, index) => (
            <Chip
              key={index}
              label={allergy}
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
          sx={{
            fontStyle: 'italic',
            color: '#757575',
            mb: 1.5,
            fontSize: '0.85rem',
          }}
        >
          Cuidadores
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          {dependent.caregivers.map((caregiver) => (
            <Box
              key={caregiver.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                src={caregiver.avatar}
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: '#456CE8',
                }}
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
          ))}
          
          {/* Botão Adicionar Cuidador */}
          <IconButton
            onClick={() => navigate(`/dependentes/${id}/editar`)}
            sx={{
              bgcolor: '#456CE8',
              color: 'white',
              width: 60,
              height: 60,
              '&:hover': {
                bgcolor: '#3557c9',
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

   
    </Box>
  )
}
