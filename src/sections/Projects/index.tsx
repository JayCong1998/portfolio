import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '../../data/personalData'
import ProjectCarousel from './components/ProjectCarousel'

interface Project {
  id: number
  title: string
  image: string
  previewUrl: string
  detailsUrl: string
  description?: string
  techStack?: string[]
}

const Projects: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // 当组件进入视口时触发动画
    if (isInView) {
      setHasAnimated(true)
    }
  }, [isInView])



  return (
    <section ref={ref} className="section-container">
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* 标题 */}
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary text-center mt-16 md:mt-24 mb-16 md:mb-20"
          variants={titleVariants}
        >
          项目展示
        </motion.h2>

        {/* 滑动窗口轮播布局 */}
        <motion.div
          variants={carouselVariants}
        >
          <ProjectCarousel projects={projects} />
        </motion.div>
      </motion.div>
    </section>
  )
}

// 容器动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

// 标题动画变体
const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    }
  }
}

// 滑动卡片动画变体
const carouselVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      duration: 0.8
    }
  }
}

export default Projects
