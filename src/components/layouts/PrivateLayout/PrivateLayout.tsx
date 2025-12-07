import { SidebarDrawer } from '@/components/common/SidebarDrawer'
import { useAuthStore } from '@/stores/authStore'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HomeIcon from '@mui/icons-material/Home'
import MedicationIcon from '@mui/icons-material/Medication'
import MenuIcon from '@mui/icons-material/Menu'
import PeopleIcon from '@mui/icons-material/People'
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'

interface PrivateLayoutProps {
  children: React.ReactNode
  title?: string;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ title, children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // URL -> índice da aba selecionada
  const currentTab = React.useMemo(() => {
    if (location.pathname.startsWith('/medications')) return 1
    if (location.pathname.startsWith('/settings')) return 2
    return 0 // "/" ou "/home"
  }, [location.pathname])

  // clique na aba -> navega para rota
  const handleChangeTab = (_: React.SyntheticEvent, value: number) => {
    if (value === 0) navigate('/home')
    if (value === 1) navigate('/medications')
    if (value === 2) navigate('/settings')
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <AppBar 
        position="fixed" 
        color="primary" 
        elevation={0} 
        sx={{ 
          maxWidth: '500px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Toolbar
          sx={{
            minHeight: 56,
            px: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
         {title?
         <>
           <IconButton
            edge="start"
            color="inherit"
            aria-label="voltar"
            size="large"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
         
          <Typography variant="body1" sx={{ fontSize: "20px" }}>
            {title}
          </Typography>
         
         </>
         
         :  <Box
            component="img"
            src="/logo.svg"
            alt="AnAme"
            sx={{
              height: 40,
              width: 'auto',
            }}
          />}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            size="large"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ height: 56 }} />

      <Box
        component="main"
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          bgcolor: '#f5f5f5',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Container sx={{ pt: 2, pb: 8 }}>{children}</Container>
      </Box>

      <Paper
        elevation={8}
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <BottomNavigation
          value={currentTab}
          onChange={handleChangeTab}
          sx={{ height: 56 }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Agenda" icon={<MedicationIcon />} />
          <BottomNavigationAction label="Dependentes" icon={<PeopleIcon />} />
        </BottomNavigation>
      </Paper>

      {/* Drawer Lateral */}
      <SidebarDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={user}
        onNavigate={navigate}
        onLogout={() => {
          logout()
          navigate('/login')
        }}
      />
    </Box>
  )
}