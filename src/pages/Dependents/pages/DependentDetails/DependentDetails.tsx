import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
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
import { useNavigate, useParams } from 'react-router'

// Mock data - substituir por chamada à API
const mockDependent = {
  id: '1',
  name: 'Graça Lima',
  age: 35,
  birthDate: '15/05/1990',
  cpf: '123.456.789-00',
  relationship: 'Cônjuge',
  gender: 'Feminino',
  phone: '(11) 98765-4321',
  email: 'graca.lima@email.com',
  address: 'Rua das Flores, 123, Centro, São Paulo',
  healthInsurance: 'Unimed',
  observations: 'Alergia a dipirona',
  avatar: '/avatars/graca-lima.jpg',
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

  return (
    <Box sx={{ pb: 2 }}>
      {/* Avatar e Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          <Avatar
            src={dependent.avatar}
            alt={dependent.name}
            sx={{ width: 80, height: 80 }}
          />
          <Box>
            <Typography variant="h5" sx={{ color: '#0033DA', fontWeight: 700, mb: 0.5 }}>
              {dependent.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575', mb: 1 }}>
              {dependent.age} anos
            </Typography>
            <Chip
              label={dependent.relationship}
              size="small"
              sx={{
                bgcolor: '#E3F2FD',
                color: '#1976D2',
                fontWeight: 500,
                fontSize: '0.75rem',
              }}
            />
          </Box>
        </Box>
        <IconButton
          onClick={handleMenuOpen}
          size="small"
          sx={{ color: '#0033DA' }}
        >
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

      {/* Informações Pessoais */}
      <Typography variant="h6" sx={{ color: '#0033DA', fontWeight: 600, mb: 2 }}>
        Informações Pessoais
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          Data de Nascimento
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {dependent.birthDate}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          CPF
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {dependent.cpf}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          Gênero
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {dependent.gender}
        </Typography>
      </Box>

      {/* Contato */}
      <Typography variant="h6" sx={{ color: '#0033DA', fontWeight: 600, mb: 2, mt: 3 }}>
        Contato
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          Telefone
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {dependent.phone}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          E-mail
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {dependent.email}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          Endereço
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {dependent.address}
        </Typography>
      </Box>

      {/* Saúde */}
      <Typography variant="h6" sx={{ color: '#0033DA', fontWeight: 600, mb: 2, mt: 3 }}>
        Informações de Saúde
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          Plano de Saúde
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {dependent.healthInsurance}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          Observações
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {dependent.observations}
        </Typography>
      </Box>
    </Box>
  )
}

