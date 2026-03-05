import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { personalInfo, personalDetails, aboutDescription } from '../../../data/personalData'
import TypingAnimation from '../../../components/ui/TypingAnimation'

const PersonalInfo: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [typingComplete, setTypingComplete] = useState(false)
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
    <motion.div
      ref={ref}
      className="space-y-12 md:space-y-16 lg:space-y-20"
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      {/* 标题和个人描述 - 放在上方 */}
      <motion.div
        className="text-center space-y-6 md:space-y-8"
        variants={contentVariants}
      >
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary"
          variants={titleVariants}
        >
          关于我
        </motion.h2>
        
        <motion.div
          className="max-w-3xl mx-auto"
          variants={textVariants}
        >
          <TypingAnimation
            text={aboutDescription}
            className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
            typingSpeed={40}
            delay={hasAnimated ? 800 : 0}
            onComplete={() => setTypingComplete(true)}
          />
        </motion.div>
      </motion.div>

      {/* 主要内容区域 - 照片和个人详情并排 */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20"
        variants={contentVariants}
      >
        {/* 个人照片 - 上下两张布局 */}
        <motion.div
          className="flex flex-col items-center space-y-8 md:space-y-10 lg:space-y-12"
          variants={imageVariants}
        >
          {/* 第一张照片 - 向左摆动 */}
          <motion.div 
            className="relative"
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            animate={{
              rotate: [0, -3, 3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* 照片主体 */}
            <img
              src={personalInfo.aboutPhoto1}
              alt="个人照片1"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl object-cover shadow-2xl"
            />
          </motion.div>

          {/* 第二张照片 - 向右摆动 */}
          <motion.div 
            className="relative"
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            animate={{
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            {/* 照片主体 */}
            <img
              src={personalInfo.aboutPhoto2}
              alt="个人照片2"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl object-cover shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* 个人详情列表 */}
        <motion.div
          className="space-y-6 md:space-y-8"
          variants={listVariants}
        >
          {personalDetails.map((item, index) => (
            <motion.div
              key={item.category}
              className="bg-primary-light/10 rounded-xl p-6 md:p-8 border-l-4 border-accent-primary"
              variants={itemVariants}
              custom={index}
              initial="hidden"
              animate={typingComplete ? "visible" : "hidden"}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-accent-primary mb-3">
                {item.category}
              </h3>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                {item.content}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// 动画变体定义
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const imageVariants = {
  hidden: { 
    opacity: 0, 
    x: -50,
    rotate: -10 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    rotate: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15,
      duration: 0.8
    }
  }
}

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    }
  }
}

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      delay: 0.2,
      ease: "easeOut" 
    }
  }
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: 30,
    transition: {
      delay: index * 0.1
    }
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default PersonalInfo