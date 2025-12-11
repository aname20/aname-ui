import { Box, Typography, Card, CardContent } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useNavigate } from 'react-router'

type MedicationItemProps = {
  id: number | string
  name: string
  dosage: string
  person: string
}

export const MedicationItem: React.FC<MedicationItemProps> = ({ id, name, dosage, person }) => {
  const navigate = useNavigate()
  return (
    <Card
      key={name}
      onClick={() => navigate(`/medications/${id}`)}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent
        sx={{
          py: { xs: 1.5, sm: 2 },
          px: { xs: 2, sm: 2.5 },
          '&:last-child': { pb: { xs: 1.5, sm: 2 } },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '0.95rem', sm: '1rem' },
              mb: 0.5,
              color: 'text.primary',
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
              color: 'text.secondary',
            }}
          >
            {dosage} - {person}
          </Typography>
        </Box>
        <ChevronRightIcon
          color="primary"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
          }}
        />
      </CardContent>
    </Card>
  )
}