import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { contactInfo, socialMedia } from '../../data/personalData'

const Contact: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [hoveredContact, setHoveredContact] = useState<string | null>(null)

  useEffect(() => {
    // 当组件进入视口时触发动画
    if (isInView) {
      setHasAnimated(true)
    }
  }, [isInView])



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="section-container">
      <motion.div
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8"
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* 标题 */}
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary text-center mb-8 md:mb-12"
          variants={titleVariants}
        >
          保持联系
        </motion.h2>

        {/* 联系信息卡片 - 水平布局 */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-8"
          variants={contactVariants}
        >
          {contactInfo.map((contact, index) => (
            <motion.div
              key={contact.id}
              className="relative"
              variants={cardVariants}
              custom={index}
              onMouseEnter={() => setHoveredContact(contact.title)}
              onMouseLeave={() => setHoveredContact(null)}
            >
              <motion.div
                className="bg-primary-light/10 rounded-lg p-3 text-center border border-primary-light/20 shadow-sm min-w-[120px]"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 5px 10px -3px rgba(0, 0, 0, 0.2)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div 
                  className="cursor-pointer"
                  onClick={() => contact.link && window.open(contact.link, '_blank', 'noopener,noreferrer')}
                >
                  {/* 图标 */}
                  <div className="text-xl mb-1 text-accent-primary">
                    {contact.icon}
                  </div>

                  {/* 标题 */}
                  <h3 className="text-sm font-semibold text-text-primary mb-1">{contact.title}</h3>

                  {/* 内容 */}
                  <p className="text-xs text-text-secondary">{contact.content}</p>
                </div>
              </motion.div>

              {/* 二维码预览 */}
              {contact.qrCode && hoveredContact === contact.title && (
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-4 rounded-lg shadow-lg z-10 min-w-[140px]"
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={contact.qrCode} 
                    alt={`${contact.title}二维码`} 
                    className="w-32 h-32 object-contain"
                  />
                  <p className="text-xs text-gray-600 mt-2 text-center">扫描二维码</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* 社交媒体图标 */}
        <motion.div
          className="flex justify-center space-x-3 md:space-x-4 mb-6 md:mb-8"
          variants={socialVariants}
        >
          {socialMedia.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-text-secondary hover:text-accent-primary transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              custom={index}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* 回到顶部按钮 */}
        <motion.div
          className="text-center"
          variants={buttonVariants}
        >
          <motion.button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 bg-accent-primary text-primary-dark font-medium py-1 px-3 rounded-lg hover:bg-accent-primary/80 transition-colors duration-300 text-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ↑ 回到顶部
          </motion.button>
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
      delayChildren: 0.2
    }
  }
}

// 标题动画变体
const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
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

// 联系方式容器动画变体
const contactVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// 卡片动画变体
const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: index * 0.1
    }
  })
}

// 社交媒体动画变体
const socialVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

// 按钮动画变体
const buttonVariants = {
  hidden: { 
    opacity: 0,
    y: 10
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.4,
      delay: 0.6
    }
  }
}

export default Contact