import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingAnimationProps {
  text: string
  className?: string
  typingSpeed?: number
  delay?: number
  onComplete?: () => void
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ 
  text, 
  className = '', 
  typingSpeed = 30, 
  delay = 500,
  onComplete
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
    if (!isTyping || currentIndex >= text.length) {
      if (currentIndex >= text.length && onComplete) {
        onComplete()
      }
      return
    }

    const timer = setTimeout(() => {
      setDisplayedText(prev => prev + text[currentIndex])
      setCurrentIndex(prev => prev + 1)
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [currentIndex, isTyping, text, typingSpeed, onComplete])

  return (
    <motion.div
      className={`${className} inline`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
    >
      {displayedText}
      
      {/* 打字光标 */}
      {isTyping && currentIndex < text.length && (
        <motion.span
          className="ml-1 inline-block w-0.5 h-6 bg-accent-primary"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.div>
  )
}

export default TypingAnimation