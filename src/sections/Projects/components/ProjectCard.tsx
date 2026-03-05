import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  title: string
  image: string
  previewUrl: string
  detailsUrl: string
  description?: string
  techStack?: string[]
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  image,
  previewUrl,
  detailsUrl,
  description,
  techStack
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-primary-light/10 rounded-2xl overflow-hidden shadow-xl border border-primary-light/20 hover:shadow-2xl transition-all duration-300"
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group">
        {/* 项目图片 */}
        <motion.div
          className="relative h-56 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            initial={{ filter: 'blur(10px)', scale: 1.1 }}
            animate={{ filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* 悬停时的渐变遮罩 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* 悬停时显示的项目描述 */}
          {description && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: isHovered ? 0 : 20, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.4, delay: isHovered ? 0.1 : 0 }}
            >
              <p className="text-sm text-text-primary leading-relaxed line-clamp-3">{description}</p>
            </motion.div>
          )}
          
          {/* 悬停时显示的按钮 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1 : 0.8, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0 }}
          >
            <div className="flex gap-4">
              {/* 预览按钮 */}
              <motion.a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-primary text-primary-dark px-6 py-3 rounded-xl shadow-lg hover:bg-accent-primary/90 transition-all duration-300 font-medium flex items-center gap-2"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 10px 25px rgba(16, 185, 129, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">👁️</span>
                预览
              </motion.a>
              
              {/* 详情按钮 */}
              <motion.a
                href={detailsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-light/90 text-text-primary px-6 py-3 rounded-xl shadow-lg hover:bg-primary-light transition-all duration-300 font-medium flex items-center gap-2"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 10px 25px rgba(255, 255, 255, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">📄</span>
                详情
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* 卡片底部内容 */}
      <div className="p-6">
        {/* 项目标题 */}
        <h3 className="text-xl font-bold text-text-primary mb-3">{title}</h3>
        
        {/* 技术栈标签 */}
        {techStack && techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech, index) => (
              <motion.span
                key={index}
                className="bg-accent-primary/20 text-accent-primary px-3 py-1 rounded-full text-xs font-medium border border-accent-primary/30"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(16, 185, 129, 0.3)'
                }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
        
        {/* 移动端显示的按钮 */}
        <div className="flex gap-3 md:hidden">
          <motion.a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-accent-primary text-primary-dark font-medium py-3 px-4 rounded-xl text-center hover:bg-accent-primary/90 transition-colors duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-base">👁️</span>
            预览
          </motion.a>
          
          <motion.a
            href={detailsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-primary-light/20 text-text-primary font-medium py-3 px-4 rounded-xl text-center hover:bg-primary-light/40 transition-colors duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-base">📄</span>
            详情
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// 卡片动画变体
const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 30,
    scale: 0.9
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      duration: 0.6
    }
  }
}

export default ProjectCard
