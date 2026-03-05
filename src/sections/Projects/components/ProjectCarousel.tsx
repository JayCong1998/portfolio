import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

interface Project {
  id: number
  title: string
  image: string
  previewUrl: string
  detailsUrl: string
  description?: string
  techStack?: string[]
}

interface ProjectCarouselProps {
  projects: Project[]
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState(3)
  
  // 滑动相关状态
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // 响应式可见卡片数量
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        // 移动端：显示1张卡片
        setVisibleCards(1)
      } else if (width < 1024) {
        // 平板端：显示2张卡片
        setVisibleCards(2)
      } else {
        // PC端：显示3张卡片
        setVisibleCards(3)
      }
    }

    // 初始设置
    handleResize()

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalCards = projects.length
  const maxIndex = Math.max(0, totalCards - visibleCards)

  // 当可见卡片数量变化时，重置当前索引到有效范围
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [visibleCards, maxIndex, currentIndex])

  // 按钮切换
  const goToPrevious = useCallback(() => {
    if (totalCards <= visibleCards) return
    
    setCurrentIndex(prev => {
      if (prev <= 0) return maxIndex // 循环到末尾
      return prev - 1
    })
  }, [totalCards, visibleCards, maxIndex])

  const goToNext = useCallback(() => {
    if (totalCards <= visibleCards) return
    
    setCurrentIndex(prev => {
      if (prev >= maxIndex) return 0 // 循环到开头
      return prev + 1
    })
  }, [totalCards, visibleCards, maxIndex])

  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    const deltaX = currentX - startX
    const swipeThreshold = 50 // 滑动阈值
    
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        // 向右滑动，显示上一张
        goToPrevious()
      } else {
        // 向左滑动，显示下一张
        goToNext()
      }
    }
    
    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }

  // 鼠标事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setCurrentX(e.clientX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    
    const deltaX = currentX - startX
    const swipeThreshold = 30 // 鼠标滑动阈值稍小
    
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        goToPrevious()
      } else {
        goToNext()
      }
    }
    
    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  // 获取当前可见的项目
  const getVisibleProjects = () => {
    const startIndex = currentIndex
    const endIndex = Math.min(startIndex + visibleCards, totalCards)
    return projects.slice(startIndex, endIndex)
  }

  // 计算卡片位置 - 响应式版本
  const getCardPosition = (index: number) => {
    const position = index
    
    // 响应式卡片宽度和间距
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
    
    const cardWidth = isMobile ? 280 : (isTablet ? 300 : 320)
    const gap = isMobile ? 20 : (isTablet ? 30 : 40)
    
    // 计算卡片水平位置（居中显示）
    const totalWidth = visibleCards * cardWidth + (visibleCards - 1) * gap
    const startX = -totalWidth / 2 + cardWidth / 2
    const x = startX + position * (cardWidth + gap)
    
    return {
      x: x,
      zIndex: visibleCards - position,
      scale: 1, // 所有卡片统一大小
      opacity: 1, // 所有卡片统一透明度
      rotateY: 0 // 移除3D旋转效果
    }
  }

  return (
    <div className="relative w-full">
      {/* 导航按钮 - 左侧 */}
      {totalCards > visibleCards && (
        <motion.button
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-primary-dark/90 backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-xl hover:bg-primary-dark transition-all duration-300 text-text-primary text-lg sm:text-xl font-bold"
          onClick={goToPrevious}
          whileHover={{ 
            scale: 1.15, 
            backgroundColor: 'rgba(30, 41, 59, 0.95)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.3,
            ease: "easeOut"
          }}
        >
          ←
        </motion.button>
      )}

      {/* 导航按钮 - 右侧 */}
      {totalCards > visibleCards && (
        <motion.button
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-primary-dark/90 backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-xl hover:bg-primary-dark transition-all duration-300 text-text-primary text-lg sm:text-xl font-bold"
          onClick={goToNext}
          whileHover={{ 
            scale: 1.15, 
            backgroundColor: 'rgba(30, 41, 59, 0.95)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.3,
            ease: "easeOut"
          }}
        >
          →
        </motion.button>
      )}

      {/* 轮播容器 */}
      <div
        ref={containerRef}
        className="relative h-96 overflow-visible flex items-center justify-center cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* 显示当前可见的卡片 */}
        {getVisibleProjects().map((project, index) => {
          const style = getCardPosition(index)
          const isMobile = window.innerWidth < 768
          const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
          const cardWidth = isMobile ? '280px' : (isTablet ? '300px' : '320px')
          
          return (
            <motion.div
              key={`${project.id}-${currentIndex}`}
              className="absolute"
              style={{
                width: cardWidth,
                zIndex: style.zIndex
              }}
              initial={{ 
                scale: 0.9, 
                opacity: 0,
                y: 20,
                x: style.x
              }}
              animate={{ 
                scale: style.scale,
                opacity: style.opacity,
                x: style.x,
                y: 0
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.6
              }}
            >
              <ProjectCard
                title={project.title}
                image={project.image}
                previewUrl={project.previewUrl}
                detailsUrl={project.detailsUrl}
                description={project.description}
                techStack={project.techStack}
              />
            </motion.div>
          )
        })}
      </div>

      {/* 指示器 */}
      {totalCards > visibleCards && (
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <motion.button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-accent-primary' 
                  : 'bg-primary-light/40 hover:bg-primary-light/60'
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ 
                scale: 1.3,
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
              }}
              whileTap={{ scale: 0.8 }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ 
                scale: index === currentIndex ? 1.3 : 1,
                opacity: 1 
              }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* 当前页码显示 */}
      {totalCards > visibleCards && (
        <motion.div 
          className="text-center mt-4 text-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.4,
            ease: "easeOut"
          }}
        >
          <span className="text-accent-primary font-semibold text-lg">{currentIndex + 1}</span>
          <span className="mx-3 text-text-primary">/</span>
          <span className="text-text-primary">{maxIndex + 1}</span>
        </motion.div>
      )}
    </div>
  )
}

export default ProjectCarousel