import { useDocuments } from '@/services/documents'
import DescriptionIcon from '@mui/icons-material/Description'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  CircularProgress,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
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

const formatUpdatedAt = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Atualizado Hoje'
  if (diffDays === 1) return 'Atualizado Ontem'

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  return `Criado ${date.getDate()} ${months[date.getMonth()]}`
}

export const DocumentList = () => {
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const { data: documents, isLoading, error } = useDocuments()

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const getFilteredDocuments = () => {
    if (!documents) return []

    let filtered = documents

    if (tabValue === 1) {
      filtered = filtered.filter((doc) => doc.type === DocumentType.PRESCRIPTION)
    } else if (tabValue === 2) {
      filtered = filtered.filter((doc) => doc.type === DocumentType.REPORT)
    } else if (tabValue === 3) {
      filtered = filtered.filter((doc) => doc.type === DocumentType.EXAM)
    } else if (tabValue === 4) {
      filtered = filtered.filter((doc) => doc.type === DocumentType.OTHER)
    }

    if (searchQuery) {
      filtered = filtered.filter((doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }

  const filteredDocuments = getFilteredDocuments()

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#456CE8' }} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" sx={{ color: '#d32f2f', mb: 2 }}>
          Erro ao carregar documentos
        </Typography>
        <Button
          variant="outlined"
          onClick={() => window.location.reload()}
          sx={{ color: '#456CE8', borderColor: '#456CE8' }}
        >
          Tentar novamente
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ pb: 2 }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 2,
          '& .MuiTabs-indicator': {
            backgroundColor: '#456CE8',
            height: 3,
          },
        }}
      >
        <Tab
          label="Todos"
          sx={{
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: tabValue === 0 ? 600 : 400,
            color: tabValue === 0 ? '#456CE8' : '#9E9E9E',
            '&.Mui-selected': {
              color: '#456CE8',
            },
          }}
        />
        <Tab
          label="Receitas"
          sx={{
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: tabValue === 1 ? 600 : 400,
            color: tabValue === 1 ? '#456CE8' : '#9E9E9E',
            '&.Mui-selected': {
              color: '#456CE8',
            },
          }}
        />
        <Tab
          label="Laudos"
          sx={{
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: tabValue === 2 ? 600 : 400,
            color: tabValue === 2 ? '#456CE8' : '#9E9E9E',
            '&.Mui-selected': {
              color: '#456CE8',
            },
          }}
        />
        <Tab
          label="Exames"
          sx={{
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: tabValue === 3 ? 600 : 400,
            color: tabValue === 3 ? '#456CE8' : '#9E9E9E',
            '&.Mui-selected': {
              color: '#456CE8',
            },
          }}
        />
        <Tab
          label="Outros"
          sx={{
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: tabValue === 4 ? 600 : 400,
            color: tabValue === 4 ? '#456CE8' : '#9E9E9E',
            '&.Mui-selected': {
              color: '#456CE8',
            },
          }}
        />
      </Tabs>

      {/* Search Bar + Add Button */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          placeholder="Pesquisar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: '#9E9E9E' }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '33px',
              bgcolor: 'white',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => navigate('/documentos/novo')}
          sx={{
            bgcolor: '#456CE8',
            textTransform: 'none',
            borderRadius: 2,
            px: 3,
            whiteSpace: 'nowrap',
            '&:hover': {
              bgcolor: '#3557c9',
            },
            fontSize: '10px',
          }}
        >
          Adicionar Novo
        </Button>
      </Box>

      {/* Documents Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }}
      >
        {filteredDocuments.map((document) => (
          <Card
            key={document.id}
            sx={{
              borderRadius: 3,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #E0E0E0',
            }}
          >
            <CardActionArea
              onClick={() => navigate(`/documentos/${document.id}`)}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minHeight: 140,
              }}
            >
              {/* Badge do Tipo */}
              <Chip
                label={getDocumentTypeLabel(document.type)}
                size="small"
                sx={{
                  mb: 2,
                  bgcolor: getDocumentTypeColor(document.type),
                  color: getDocumentTypeTextColor(document.type),
                  fontWeight: 500,
                  fontSize: '0.7rem',
                }}
              />

              {/* Ícone do Documento */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: '#FF6B6B',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <DescriptionIcon sx={{ color: 'white', fontSize: 28 }} />
              </Box>

              {/* Título */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  fontSize: '0.9rem',
                }}
              >
                {document.title}
              </Typography>

              {/* Data */}
              <Typography
                variant="caption"
                sx={{
                  color: '#757575',
                  fontSize: '0.75rem',
                }}
              >
                {formatUpdatedAt(document.updatedAt)}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {/* Mensagem quando não há documentos */}
      {filteredDocuments.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
          }}
        >
          <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
            Nenhum documento encontrado
          </Typography>
        </Box>
      )}
    </Box>
  )
}
