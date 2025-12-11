import SearchIcon from '@mui/icons-material/Search'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'

interface Dependent {
  id: string
  name: string
  age: number
  relationship: string
  avatar: string
}

const mockDependents: Dependent[] = [
  {
    id: '1',
    name: 'Graça Lima',
    age: 35,
    relationship: 'Cônjuge',
    avatar: '/avatars/graca-lima.jpg',
  },
  {
    id: '2',
    name: 'João Silva',
    age: 12,
    relationship: 'Filho',
    avatar: '/avatars/joao-silva.jpg',
  },
  {
    id: '3',
    name: 'Maria Santos',
    age: 8,
    relationship: 'Filha',
    avatar: '/avatars/maria-santos.jpg',
  },
  {
    id: '4',
    name: 'Pedro Costa',
    age: 65,
    relationship: 'Pai',
    avatar: '/avatars/pedro-costa.jpg',
  },
]

export const DependentList = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDependents = mockDependents.filter((dependent) =>
    dependent.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box sx={{ pb: 2 }}>
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
          onClick={() => navigate('/dependentes/novo')}
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

      {/* Dependents List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredDependents.map((dependent) => (
          <Card
            key={dependent.id}
            sx={{
              borderRadius: 5,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #E0E0E0',
              bgcolor: 'white',
            }}
          >
            <CardActionArea
              onClick={() => navigate(`/dependentes/${dependent.id}`)}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Avatar
                src={dependent.avatar}
                alt={dependent.name}
                sx={{ width: 48, height: 48 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    mb: 0.3,
                    fontSize: '0.95rem',
                    color: '#000',
                  }}
                >
                  {dependent.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#9E9E9E',
                    fontSize: '0.8rem',
                  }}
                >
                  {dependent.age} anos
                </Typography>
              </Box>
              <Typography sx={{ color: '#456CE8', fontSize: '1.5rem', lineHeight: 1 }}>›</Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {/* Mensagem quando não há dependentes */}
      {filteredDependents.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
          }}
        >
          <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
            Nenhum dependente encontrado
          </Typography>
        </Box>
      )}
    </Box>
  )
}

