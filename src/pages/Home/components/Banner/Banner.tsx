import { Box, Typography } from '@mui/material'
import React from 'react'

export const Banner: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        background: '#15803d',
        borderRadius: 3,
        p: { xs: 2.5, sm: 3 },
        overflow: 'hidden',
        minHeight: { xs: '220px', sm: '250px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Background decorativo - ilustrações de farmácia */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.2,
          pointerEvents: 'none',
        }}
      >
        {/* Pílulas caindo/espalhadas */}
        {[...Array(12)].map((_, i) => {
          const positions = [
            { top: '8%', left: '12%', size: 16 },
            { top: '15%', left: '25%', size: 14 },
            { top: '25%', left: '8%', size: 12 },
            { top: '35%', left: '20%', size: 18 },
            { top: '45%', left: '15%', size: 14 },
            { top: '55%', left: '28%', size: 16 },
            { top: '20%', right: '25%', size: 14 },
            { top: '30%', right: '15%', size: 16 },
            { top: '40%', right: '22%', size: 12 },
            { top: '50%', right: '18%', size: 18 },
            { top: '60%', right: '28%', size: 14 },
            { top: '70%', left: '22%', size: 16 },
          ]
          const pos = positions[i]
          return (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                right: pos.left === undefined ? pos.top : undefined,
                width: `${pos.size}px`,
                height: `${pos.size * 0.6}px`,
                borderRadius: '50%',
                bgcolor: '#4ade80',
                transform: `rotate(${i * 30}deg)`,
              }}
            />
          )
        })}

        {/* Pill bottles */}
        <svg
          style={{
            position: 'absolute',
            top: '5%',
            left: '3%',
            width: '45px',
            height: '65px',
            opacity: 0.25,
          }}
          viewBox="0 0 40 60"
          fill="none"
        >
          <rect x="8" y="8" width="24" height="45" rx="2" stroke="#4ade80" strokeWidth="2" fill="none" />
          <rect x="14" y="0" width="12" height="8" rx="1" fill="#4ade80" />
          <ellipse cx="20" cy="30" rx="8" ry="12" fill="#4ade80" opacity="0.3" />
        </svg>

        <svg
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '8%',
            width: '40px',
            height: '60px',
            opacity: 0.25,
          }}
          viewBox="0 0 40 60"
          fill="none"
        >
          <rect x="8" y="8" width="24" height="45" rx="2" stroke="#4ade80" strokeWidth="2" fill="none" />
          <rect x="14" y="0" width="12" height="8" rx="1" fill="#4ade80" />
        </svg>

        {/* Blister packs */}
        <svg
          style={{
            position: 'absolute',
            top: '20%',
            right: '12%',
            width: '55px',
            height: '35px',
            opacity: 0.25,
          }}
          viewBox="0 0 55 35"
          fill="none"
        >
          <rect x="2" y="2" width="51" height="31" rx="3" stroke="#4ade80" strokeWidth="2" fill="none" />
          <circle cx="12" cy="17" r="4" fill="#4ade80" />
          <circle cx="27" cy="17" r="4" fill="#4ade80" />
          <circle cx="42" cy="17" r="4" fill="#4ade80" />
        </svg>

        <svg
          style={{
            position: 'absolute',
            top: '50%',
            right: '5%',
            width: '50px',
            height: '32px',
            opacity: 0.25,
          }}
          viewBox="0 0 50 32"
          fill="none"
        >
          <rect x="2" y="2" width="46" height="28" rx="3" stroke="#4ade80" strokeWidth="2" fill="none" />
          <circle cx="12" cy="16" r="3.5" fill="#4ade80" />
          <circle cx="25" cy="16" r="3.5" fill="#4ade80" />
          <circle cx="38" cy="16" r="3.5" fill="#4ade80" />
        </svg>

        {/* Ícone de pilão e gral */}
        <svg
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '20%',
            width: '35px',
            height: '35px',
            opacity: 0.25,
          }}
          viewBox="0 0 35 35"
          fill="none"
        >
          <ellipse cx="17.5" cy="28" rx="12" ry="4" fill="#4ade80" />
          <path
            d="M12 12 L12 25 Q12 28 17.5 28 Q23 28 23 25 L23 12 L17.5 8 Z"
            stroke="#4ade80"
            strokeWidth="2"
            fill="none"
          />
          <line x1="17.5" y1="8" x2="17.5" y2="22" stroke="#4ade80" strokeWidth="2" />
        </svg>

        {/* Efeitos de brilho/sparkles */}
        {[
          { top: '12%', left: '18%' },
          { top: '28%', left: '12%' },
          { top: '38%', right: '18%' },
          { top: '52%', left: '18%' },
          { top: '65%', right: '22%' },
          { top: '18%', right: '28%' },
          { top: '42%', left: '10%' },
          { top: '58%', right: '12%' },
        ].map((pos, i) => (
          <Box
            key={`sparkle-${i}`}
            sx={{
              position: 'absolute',
              top: pos.top,
              ...(pos.left ? { left: pos.left } : {}),
              ...(pos.right ? { right: pos.right } : {}),
              width: '20px',
              height: '20px',
              opacity: 0.5,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '3px',
                height: '20px',
                bgcolor: '#fff',
                borderRadius: '2px',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(90deg)',
                width: '3px',
                height: '20px',
                bgcolor: '#fff',
                borderRadius: '2px',
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                bgcolor: '#fff',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Container principal do conteúdo */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          mt: { xs: 0.5, sm: 1 },
        }}
      >
        {/* Banner "ATÉ 70% OFF!" */}
        <Box
          sx={{
            alignSelf: 'flex-start',
            transform: 'rotate(-3deg)',
            bgcolor: '#dc2626',
            borderRadius: '12px',
            px: { xs: 2, sm: 2.5, md: 3 },
            py: { xs: 1.25, sm: 1.5, md: 1.75 },
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)',
            position: 'relative',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '22px', sm: '28px', md: '34px' },
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              fontFamily: 'Arial, sans-serif',
            }}
          >
            ATÉ 70% OFF!
          </Typography>
        </Box>

        {/* Banner "Só no APP" */}
        <Box
          sx={{
            alignSelf: 'flex-start',
            transform: 'rotate(2deg)',
            bgcolor: '#f5f5f5',
            borderRadius: '10px',
            px: { xs: 1.75, sm: 2, md: 2.25 },
            py: { xs: 0.75, sm: 1, md: 1.25 },
            mt: { xs: -0.75, sm: -0.5 },
            ml: { xs: 1.5, sm: 2, md: 2.5 },
            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '13px', sm: '15px', md: '17px' },
              fontWeight: 700,
              color: '#dc2626',
              letterSpacing: '0.5px',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            Só no APP
          </Typography>
        </Box>

        {/* Banner "DO DIA 2 A 7 DE ABRIL!!" */}
        <Box
          sx={{
            alignSelf: 'flex-start',
            transform: 'rotate(-1.5deg)',
            bgcolor: '#dc2626',
            borderRadius: '8px',
            px: { xs: 1.5, sm: 1.75, md: 2 },
            py: { xs: 0.6, sm: 0.75, md: 0.9 },
            mt: { xs: -0.5, sm: -0.4 },
            boxShadow: '0 2px 6px rgba(220, 38, 38, 0.3), 0 1px 2px rgba(0, 0, 0, 0.15)',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '11px', sm: '12px', md: '13px' },
              fontWeight: 600,
              color: '#fff',
              letterSpacing: '0.5px',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            DO DIA 2 A 7 DE ABRIL!!
          </Typography>
        </Box>
      </Box>

      {/* Rodapé com logo DROGASIN */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 1,
          mt: 'auto',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '24px', sm: '32px', md: '40px' },
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          DROGASIN
        </Typography>
        {/* Logo - magneto em formato U */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '32px', sm: '40px', md: '48px' },
            height: { xs: '32px', sm: '40px', md: '48px' },
          }}
        >
          <svg
            viewBox="0 0 80 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Parte vermelha do magneto (polo esquerdo) */}
            <path
              d="M10 15 L10 45 Q10 55 20 55 L25 55 Q35 55 35 45 L35 15 Q35 5 25 5 L20 5 Q10 5 10 15 Z"
              fill="#dc2626"
            />
            {/* Parte branca/cinza do magneto (polo direito) */}
            <path
              d="M45 15 L45 45 Q45 55 55 55 L60 55 Q70 55 70 45 L70 15 Q70 5 60 5 L55 5 Q45 5 45 15 Z"
              fill="#f5f5f5"
            />
          </svg>
        </Box>
      </Box>
    </Box>
  )
}

