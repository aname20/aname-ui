"use client"

import React, { useState, useEffect, ReactNode } from "react"

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

const styles: Record<string, React.CSSProperties> = {
  carouselContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    overflow: "hidden",
  },
  carouselWrapper: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    borderRadius: "12px",
    padding: "0 25px",
  },
  carouselSlides: {
    display: "flex",
    transition: "transform 0.4s ease-in-out",
    width: "100%",
  },
  carouselSlide: {
    minWidth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  carouselNav: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    border: "none",
    color: "#3375f5",
    fontSize: "28px",
    cursor: "pointer",
    padding: "8px",  
    borderRadius: "4px",
    transition: "background-color 0.2s",
    zIndex: 10,
  },
  carouselPrev: {
    left: "0px",  
  },
  carouselNext: {
    right: "0px", 
  },
  carouselDots: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    paddingTop: "8px",
  },
  carouselDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  carouselDotActive: {
    backgroundColor: "#3375f5",
  },
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

  useEffect(() => {
    if (!autoPlay || items.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  if (items.length === 0) {
    return (
      <div style={{ ...styles.carouselContainer, height }}>
        No items to display
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        ...styles.carouselContainer,
        height,
      }}
    >
      <div style={styles.carouselWrapper}>
        <div
          style={{
            ...styles.carouselSlides,
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {items.map((item) => (
            <div key={item.id} style={styles.carouselSlide}>
              {item.content}
            </div>
          ))}
        </div>

        {items.length > 1 && (
          <>
            <button
              style={{ ...styles.carouselNav, ...styles.carouselPrev }}
              onClick={goToPrev}
              aria-label="Previous slide"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
              }}
            >
              ‹
            </button>
            <button
              style={{ ...styles.carouselNav, ...styles.carouselNext }}
              onClick={goToNext}
              aria-label="Next slide"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {showDots && items.length > 1 && (
        <div style={styles.carouselDots}>
          {items.map((_, index) => {
            const isActive = index === currentIndex
            return (
              <button
                key={index}
                style={
                  isActive
                    ? { ...styles.carouselDot, ...styles.carouselDotActive }
                    : styles.carouselDot
                }
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#999"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isActive ? "#3375f5" : "#ddd"
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Carousel
