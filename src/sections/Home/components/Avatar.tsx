import React from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../../../data/personalData'

const Avatar: React.FC = () => {
  return (
    <motion.div
      className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto"
      initial="hidden"
      animate="visible"
      variants={avatarVariants}
      whileHover="hover"
    >
      <div className="relative w-full h-full">
        {/* 头像图片 */}
        <motion.img
          src={personalInfo.photo}
          alt="个人头像"
          className="w-full h-full rounded-full object-cover border-4 border-accent-primary/30 shadow-2xl"
          variants={imageVariants}
        />
        
        {/* 头像光环效果 */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent-primary/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  )
}

// 头像容器动画变体
const avatarVariants = {
  hidden: { 
    scale: 0.8, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20,
      delay: 0.5
    }
  },
  hover: {
    scale: 1.05,
    transition: { 
      type: "spring", 
      stiffness: 400 
    }
  }
}

// 头像图片动画变体
const imageVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.5
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default Avatar