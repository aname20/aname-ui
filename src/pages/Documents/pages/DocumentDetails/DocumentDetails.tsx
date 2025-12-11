import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Avatar,
  Box,
  Button,
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
import { DocumentType, getDocumentTypeLabel } from '../../types/DocumentType'

// Mock data - substituir por chamada à API
const mockDocument = {
  id: '1',
  title: 'Laboratório Vivaz',
  type: DocumentType.PRESCRIPTION,
  date: '25/01',
  dayOfWeek: 'Sábado',
  year: '2025',
  dependent: {
    id: '1',
    name: 'Graça Lima',
    age: 35,
    avatar: '/avatars/graca-lima.jpg',
  },
  location: 'Clínica Amor Saúde',
  comments: 'Manual sobre de consulta paga Dr. Bruna',
  fileUrl: '/documents/laboratorio-vivaz.pdf',
  fileName: 'laboratorio-vivaz.pdf',
}

const getDocumentTypeColor = (type: DocumentType): string => {
  const colors = {
    [DocumentType.PRESCRIPTION]: '#E3F2FD',
    [DocumentType.REPORT]: '#F3E5F5',
    [DocumentType.EXAM]: '#E8EAF6',
    [DocumentType.OTHER]: '#FFF3E0',
  }
  return colors[type]
}

const getDocumentTypeTextColor = (type: DocumentType): string => {
  const colors = {
    [DocumentType.PRESCRIPTION]: '#1976D2',
    [DocumentType.REPORT]: '#7B1FA2',
    [DocumentType.EXAM]: '#3F51B5',
    [DocumentType.OTHER]: '#F57C00',
  }
  return colors[type]
}

export const DocumentDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  // TODO: Buscar dados reais da API usando o id
  const document = mockDocument

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    navigate(`/documentos/${id}/editar`)
    handleMenuClose()
  }

  const handleDelete = () => {
    // TODO: Implementar lógica de exclusão
    console.log('Excluir documento:', id)
    handleMenuClose()
  }

  const handleDependentClick = () => {
    navigate(`/dependentes/${document.dependent.id}`)
  }

  const handleDownloadDocument = () => {
    const link = window.document.createElement('a')
    link.href = document.fileUrl
    link.download = document.fileName
    link.target = '_blank'
    
    window.document.body.appendChild(link)
    link.click()
    window.document.body.removeChild(link)
  }

  return (
    <Box sx={{ pb: 2 }}>
      {/* Título e Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 0.5 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ color: '#0033DA', fontWeight: 700, mb: 0.5 }}>
            {document.title}
          </Typography>
          <Chip
            label={getDocumentTypeLabel(document.type)}
            size="small"
            sx={{
              bgcolor: getDocumentTypeColor(document.type),
              color: getDocumentTypeTextColor(document.type),
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
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

      {/* Data e Dependente */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, mt: 2 }}>
        {/* Data */}
        <Box
          sx={{
            border: '2px solid #0033DA',
            borderRadius: 3,
            p: 2,
            minWidth: 80,
            textAlign: 'center',
            bgcolor: 'white',
          }}
        >
          <Typography variant="h4" sx={{ color: '#0033DA', fontWeight: 700, lineHeight: 1 }}>
            {document.date}
          </Typography>
          <Typography variant="body2" sx={{ color: '#0033DA', fontWeight: 600 }}>
            {document.dayOfWeek}
          </Typography>
          <Typography variant="body2" sx={{ color: '#0033DA', fontSize: '0.75rem' }}>
            {document.year}
          </Typography>
        </Box>

        {/* Informações do Dependente */}
        <Box
          onClick={handleDependentClick}
          sx={{
            border: '1px solid #E0E0E0',
            borderRadius: 3,
            p: 2,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            bgcolor: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: '#0033DA',
              bgcolor: '#F8F9FF',
            },
          }}
        >
          <Avatar
            src={document.dependent.avatar}
            alt={document.dependent.name}
            sx={{ width: 56, height: 56 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
              {document.dependent.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              {document.dependent.age} anos
            </Typography>
          </Box>
          <Typography sx={{ color: '#0033DA', fontSize: '2rem', lineHeight: 1 }}>›</Typography>
        </Box>
      </Box>

      {/* Local */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          Local
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {document.location}
        </Typography>
      </Box>

      {/* Comentários */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
          Comentários Adicionais
        </Typography>
        <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
          {document.comments}
        </Typography>
      </Box>

      {/* Botões de Ação */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* <Button
          fullWidth
          variant="outlined"
          onClick={handleViewDocument}
          startIcon={<VisibilityIcon />}
          sx={{
            borderColor: '#456CE8',
            color: '#456CE8',
            textTransform: 'none',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 500,
            borderRadius: 2,
            '&:hover': {
              borderColor: '#3557c9',
              bgcolor: '#F8F9FF',
            },
          }}
        >
          Visualizar
        </Button> */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleDownloadDocument}
          startIcon={<DownloadIcon />}
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
          Download
        </Button>
      </Box>
    </Box>
  )
}
