import React from 'react'
import Home from './sections/Home'
import About from './sections/About'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

function App() {
  return (
    <div className="min-h-screen bg-primary-dark text-text-primary overflow-x-hidden">
      {/* 单页滚动布局 */}
      <div className="w-full max-w-full">
        {/* Home 组件 - 全屏显示 */}
        <div className="min-h-screen w-full">
          <Home />
        </div>
        
        {/* About 组件 - 滚动触发动画 */}
        <div className="min-h-screen w-full">
          <About />
        </div>
        
        {/* Projects 组件 - 滚动触发动画 */}
        <div className="min-h-screen w-full py-8 md:py-12">
          <Projects />
        </div>
        
        {/* Contact 组件 - 滚动触发动画 */}
        <div className="min-h-screen w-full">
          <Contact />
        </div>
      </div>
    </div>
  )
}

export default App