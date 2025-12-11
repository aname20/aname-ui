import { Box, IconButton } from '@mui/material'
import type { ReactNode } from 'react'
import React, { useEffect, useState } from 'react'

interface CarouselItem {
  id: string | number
  content: ReactNode
}

interface CarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  height?: number | string
  className?: string
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  height = "auto",
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 1 // Mostrar 1 item por vez para melhor espaçamento
  const maxIndex = Math.max(0, items.length - itemsPerPage)

  useEffect(() => {
    if (!autoPlay || items.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, items.length, maxIndex])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  if (items.length === 0) {
    return (
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5, overflow: 'hidden', height }}>
        No items to display
      </Box>
    )
  }

  return (
    <Box
      className={className}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        overflow: 'hidden',
        height,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          px: '40px',
        }}
      >
        <Box
          sx={{
            pt: 1,
            display: 'flex',
            gap: 2,
            transition: 'transform 0.4s ease-in-out',
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {items.map((item) => (
            <Box
              key={item.id}
              sx={{
                flexShrink: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {item.content}
            </Box>
          ))}
        </Box>

        {items.length > itemsPerPage && (
          <>
            <IconButton
              onClick={goToPrev}
              aria-label="Previous slide"
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                color: '#3375f5',
                fontSize: '24px',
                width: 36,
                height: 36,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e5e5',
                zIndex: 10,
                '&:hover': {
                  bgcolor: '#3375f5',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(51, 117, 245, 0.3)',
                },
              }}
            >
              ‹
            </IconButton>
            <IconButton
              onClick={goToNext}
              aria-label="Next slide"
              sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                color: '#3375f5',
                fontSize: '24px',
                width: 36,
                height: 36,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e5e5',
                zIndex: 10,
                '&:hover': {
                  bgcolor: '#3375f5',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(51, 117, 245, 0.3)',
                },
              }}
            >
              ›
            </IconButton>
          </>
        )}
      </Box>

      {showDots && items.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, pt: 2 }}>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => {
            const isActive = index === currentIndex
            return (
              <Box
                component="button"
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                sx={{
                  width: isActive ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: isActive ? '#3375f5' : '#d0d0d0',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: isActive ? '#3375f5' : '#999',
                  },
                }}
              />
            )
          })}
        </Box>
      )}
    </Box>
  )
}

