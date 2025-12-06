import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Container,
  IconButton,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import { useLocation, useNavigate } from 'react-router'
import { AppRoutes } from './routes'

export const App: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // URL -> índice da aba selecionada
  const currentTab = React.useMemo(() => {
    if (location.pathname.startsWith('/medications')) return 1
    if (location.pathname.startsWith('/settings')) return 2
    return 0 // "/" ou "/home"
  }, [location.pathname])

  // clique na aba -> navega para rota
  const handleChangeTab = (_: React.SyntheticEvent, value: number) => {
    if (value === 0) navigate('/home')
    if (value === 2) navigate('/settings')
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppBar position="fixed" color="primary" elevation={0}>
        <Toolbar
          sx={{
            minHeight: 56,
            px: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
            AnAme
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" size="large">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ height: 56 }} />

      <Box
        component="main"
        sx={{ flex: 1, overflowY: 'auto', bgcolor: '#f5f5f5' }}
      >
        <Container sx={{ pt: 2, pb: 8 }}>
          <AppRoutes />
        </Container>
      </Box>

      <Paper
        elevation={8}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigation
          value={currentTab}
          onChange={handleChangeTab}
          sx={{ height: 56 }}
        >
          <BottomNavigationAction label="Início" icon={<HomeIcon />} />
          <BottomNavigationAction label="Deps." icon={<PeopleIcon />} />
          <BottomNavigationAction label="Ajustes" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
