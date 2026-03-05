import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingTextProps {
  text: string
  className?: string
  typingSpeed?: number
  delay?: number
}

const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  className = '', 
  typingSpeed = 50, 
  delay = 1000 
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isTyping || currentIndex >= text.length) return

    const timer = setTimeout(() => {
      setDisplayedText(prev => prev + text[currentIndex])
      setCurrentIndex(prev => prev + 1)
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [currentIndex, isTyping, text, typingSpeed])

  return (
    <motion.p
      className={`${className} font-medium`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 + 0.3, duration: 0.8 }}
    >
      {displayedText}
      
      {/* 打字光标 */}
      {isTyping && currentIndex < text.length && (
        <motion.span
          className="ml-1 inline-block w-0.5 h-6 bg-accent-primary"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      )}
      
      {/* 完成后的闪烁效果 */}
      {currentIndex >= text.length && (
        <motion.span
          className="ml-1 inline-block w-0.5 h-6 bg-accent-green"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: 1, 
            repeat: 3, 
            ease: "easeInOut" 
          }}
        />
      )}
    </motion.p>
  )
}

export default TypingText