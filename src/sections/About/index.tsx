import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import PersonalInfo from './components/PersonalInfo'

const About: React.FC = () => {
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
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* 个人照片和介绍部分 */}
        <PersonalInfo />
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
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
}

export default About