import { ModalConfirmation } from '@/components/common/ModalConfirmation'
import { useDeleteDocument, useDocumentById } from '@/services/documents'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { DocumentType, getDocumentTypeLabel } from '../../types/DocumentType'

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const dayOfWeek = daysOfWeek[date.getDay()]

  return {
    dayMonth: `${day}/${month}`,
    dayOfWeek,
    year: year.toString(),
  }
}

export const DocumentDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const menuOpen = Boolean(anchorEl)

  const { data: document, isLoading, error: fetchError } = useDocumentById(Number(id))
  const deleteDocument = useDeleteDocument()

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

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
    handleMenuClose()
  }

  const handleConfirmDelete = async () => {
    try {
      await deleteDocument.mutateAsync(Number(id))
      navigate('/documentos')
    } catch {
      setError('Erro ao excluir documento. Tente novamente.')
    }
  }

  const handleDependentClick = () => {
    if (document?.dependent) {
      navigate(`/dependentes/${document.dependent.id}`)
    }
  }

  const handleDownloadDocument = () => {
    if (!document?.fileUrl) return

    const link = window.document.createElement('a')
    link.href = document.fileUrl
    link.download = document.fileUrl.split('/').pop() || 'documento'
    link.target = '_blank'
    
    window.document.body.appendChild(link)
    link.click()
    window.document.body.removeChild(link)
  }

  const handleCloseError = () => {
    setError(null)
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#456CE8' }} />
      </Box>
    )
  }

  if (fetchError || !document) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" sx={{ color: '#d32f2f', mb: 2 }}>
          Documento não encontrado
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/documentos')}
          sx={{ color: '#456CE8', borderColor: '#456CE8' }}
        >
          Voltar para lista
        </Button>
      </Box>
    )
  }

  const dateInfo = formatDate(document.date)

  return (
    <Box sx={{ pb: 2 }}>
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
        <MenuItem onClick={handleDeleteClick}>
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
            {dateInfo.dayMonth}
          </Typography>
          <Typography variant="body2" sx={{ color: '#0033DA', fontWeight: 600 }}>
            {dateInfo.dayOfWeek}
          </Typography>
          <Typography variant="body2" sx={{ color: '#0033DA', fontSize: '0.75rem' }}>
            {dateInfo.year}
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
            alt={document.dependent.name}
            sx={{ width: 56, height: 56, bgcolor: '#456CE8' }}
          >
            {document.dependent.name.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
              {document.dependent.name}
            </Typography>
          </Box>
          <Typography sx={{ color: '#0033DA', fontSize: '2rem', lineHeight: 1 }}>›</Typography>
        </Box>
      </Box>

      {/* Comentários */}
      {document.comments && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#000', fontWeight: 400, fontStyle: 'italic', mb: 0.5 }}>
            Comentários Adicionais
          </Typography>
          <Typography variant="body1" sx={{ color: '#0033DA', fontWeight: 400 }}>
            {document.comments}
          </Typography>
        </Box>
      )}

      {/* Botão de Download */}
      <Box sx={{ display: 'flex', gap: 2 }}>
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

      {/* Modal de Confirmação de Exclusão */}
      <ModalConfirmation
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Documento"
        subtitle="Tem certeza que deseja excluir este documento? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        loading={deleteDocument.isPending}
      />

      {/* Snackbar de erro */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}
