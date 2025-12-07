import type { User } from '@/types/auth'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CloseIcon from '@mui/icons-material/Close'
import DescriptionIcon from '@mui/icons-material/Description'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MedicationIcon from '@mui/icons-material/Medication'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import React from 'react'

interface SidebarDrawerProps {
  open: boolean
  onClose: () => void
  user: User | null
  onNavigate: (path: string) => void
  onLogout: () => void
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  open,
  onClose,
  user,
  onNavigate,
  onLogout,
}) => {
  const handleNavigate = (path: string) => {
    onNavigate(path)
    onClose()
  }

  const handleLogout = () => {
    onLogout()
    onClose()
  }

  const menuItems = [
    {
      icon: DescriptionIcon,
      label: 'Documentos',
      description: 'Laudos, exames, receitas, etc',
      path: '/documentos',
    },
    {
      icon: MedicationIcon,
      label: 'Remédios',
      description: 'Remédios salvos no sistema',
      path: '/medications',
    },
    {
      icon: CalendarTodayIcon,
      label: 'Agenda',
      description: 'Consultas ou exames agendados',
      path: '/agenda',
    },
    {
      icon: PeopleIcon,
      label: 'Meus Dependentes',
      description: 'Dependentes vinculados a mim',
      path: '/dependentes',
    },
    {
      icon: AccountCircleIcon,
      label: 'Meu Perfil',
      description: 'Minhas informações',
      path: '/perfil',
    },
  ]

  const handleContact = () => {
  window.open('https://wa.me/5511999999999', '_blank')
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}  sx={{ '& .MuiDrawer-paper': { borderTopLeftRadius: '24px', borderBottomLeftRadius: '24px' } }}>
      <Box
        sx={{
          width: 350,
          paddingInline: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#456CE8',
        }}
      >
        {/* Header do Drawer */}
        <Box
          sx={{
            bgcolor: '#456CE8',
            color: '#FFFFFF',
            py: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar sx={{ width: 56, height: 56, bgcolor: '#7C5FFF' }}>
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Olá {user?.name || 'Usuário'}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Bem vindo!
            </Typography>
          </Box>
          <IconButton size="small" sx={{ color: '#FFFFFF', borderRadius: '100%', border: '2px solid #FFFFFF' }} onClick={onClose}>
            <CloseIcon sx={{ padding: "2px" }} />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: '#F5F5F5' }} />

        {/* Menu Items */}
        <List
          sx={{
            flex: 1,
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <React.Fragment key={item.path}>
                {index === 3 && (
                  <Divider sx={{ borderColor: '#F5F5F5', m: 2 }} />
                )}
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      bgcolor: '#F9FAFF',
                      borderRadius: '12px',
                      px: 2,
                      py: 1.5,
                      '&:hover': {
                        bgcolor: '#F5F5F5',
                      },
                      display: 'flex',
                      alignItems: 'start',
                      gap: 2,
                    }}
                  >
                    <Icon sx={{ color: '#0033DA' }} />
                    <ListItemText
                      sx={{ my: 0 }}
                      primary={item.label}
                      secondary={item.description}
                      primaryTypographyProps={{
                        fontSize: '1rem',
                        color: '#0033DA',
                      }}
                      secondaryTypographyProps={{
                        fontSize: '0.85rem',
                        sx: { color: '#0033DA' },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            )
          })}
        </List>


        {/* Footer Actions */}
        <Box sx={{ p: 2, display: 'flex', gap: 1.5, justifyContent: 'end', backgroundColor: '#456CE8' }}>
          <Button
            variant="outlined"
            onClick={() => handleNavigate('/settings')}
            sx={{
              width: "75px",
              height: "75px",
              borderRadius: '12px',
              borderColor: '#FFFFFF',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: "8px",
              textTransform: 'none',
              '& .MuiTypography-root': { color: '#FFFFFF' },
            }}
          >
            <SettingsIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />
            <Typography variant="caption" sx={{ fontSize: '10px' }}>
              Ajustes
            </Typography>
          </Button>

          <Button
            variant="outlined"
            onClick={handleContact}
            sx={{
              width: "75px",
              height: "75px",
              borderRadius: '12px',
              borderColor: '#FFFFFF',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: "8px",
              textTransform: 'none',
              '& .MuiTypography-root': { color: '#FFFFFF' },
            }}
          >
            <LocalPhoneIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />
            <Typography  sx={{ fontSize: '10px' }}>
              Entre em contato
            </Typography>

          </Button>

          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              width: "75px",
              height: "75px",
              borderRadius: '12px',
              borderColor: '#FFFFFF',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: "8px",
              textTransform: 'none',
              '& .MuiTypography-root': { color: '#FFFFFF' },
            }}
          >
            <ExitToAppIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />
            <Typography variant="caption" sx={{ fontSize: '10px' }}>
              Sair
            </Typography>
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

