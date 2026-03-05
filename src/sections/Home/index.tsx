import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import TypingText from './components/TypingText'
import Avatar from './components/Avatar'
import { personalInfo } from '../../data/personalData'

const Home: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const isInitialMount = useRef(true)

  useEffect(() => {
    // 组件首次挂载时立即显示内容
    if (isInitialMount.current) {
      setHasAnimated(true)
      isInitialMount.current = false
    }
  }, [])

  useEffect(() => {
    // 当组件进入视口时触发动画
    if (isInView && !isInitialMount.current) {
      setHasAnimated(true)
    }
  }, [isInView])

  return (
    <section ref={ref} className="section-container">
      <motion.div
        className="text-center space-y-6 md:space-y-8 lg:space-y-10 px-4 sm:px-6 md:px-8 lg:px-12"
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* 大标题 */}
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight"
          variants={titleVariants}
        >
          Hi, I'm <span className="text-accent-primary">{personalInfo.name}</span>
        </motion.h1>

        {/* 头像 */}
        <Avatar />

        {/* 个人简介 - 打字机效果 */}
        <TypingText 
          text={personalInfo.bio}
          className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          delay={hasAnimated ? 1000 : 0}
        />


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
      staggerChildren: 0.2,
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

export default Home