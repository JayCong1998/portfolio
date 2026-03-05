// 个人信息数据配置文件
// 所有个人相关的数据都在这里集中管理，方便修改

export interface PersonalInfo {
  name: string
  bio: string
  photo: string
  aboutPhoto1: string
  aboutPhoto2: string
}

export interface PersonalDetail {
  category: string
  content: string
}

export interface SkillCategory {
  title: string
  skills: string[]
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red'
}

export interface SkillProgress {
  name: string
  level: number
}

export interface Project {
  id: number
  title: string
  image: string
  previewUrl: string
  detailsUrl: string
  description: string
  techStack: string[]
}

export interface ContactInfo {
  id: number
  icon: string
  title: string
  content: string
  link?: string
  qrCode?: string
}

export interface SocialMedia {
  name: string
  icon: string
  link: string
}

// 个人信息数据
export const personalInfo: PersonalInfo = {
  name: "JayCong",
  bio: "全栈工程师 | 篮球爱好者 | DOTA2爱好者 | 台球爱好者",
  photo: "/images/avatar.jpg",
  aboutPhoto1: "/images/about-photo1.jpg",
  aboutPhoto2: "/images/about-photo2.jpg"
}


// 个人详细信息
export const personalDetails: PersonalDetail[] = [
  {
    category: "工作经验",
    content: " Google Company | 全栈开发工程师 | 2020-至今 | 专注于Java、数据库开发、前端技术"
  },
  {
    category: "个人偶像",
    content: "LeBron James、Kobe Bryant、T-MAC | JayChou | Ronnie O'Sullivan | YaphetS | Roger Federer | Cristiano Ronaldo"
  },
  {
    category: "个人荣誉",
    content: "2014-2016三连马尾村ba总冠军 | 2015马尾船政足球杯季军 | 2016马尾自由人网吧杯dota组冠军 | 2020西江月杯编程大赛冠军 | 2023水印城杯台球锦标赛亚军 | 2024华府大道杯篮球百分大战冠军"
  },
  {
    category: "职业目标",
    content: "成为优秀的软件技术专家 | 成为优秀的篮球选手 | 成为优秀的台球选手 | 成为顶尖的Dota2大神"
  }
]

// 项目数据
export const projects: Project[] = [
  {
    id: 1,
    title: "项目一",
    image: "/images/project1.png",
    previewUrl: "#",
    detailsUrl: "#",
    description: "这是一个基于React和Node.js的全栈项目",
    techStack: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "项目二",
    image: "/images/project1.png",
    previewUrl: "#",
    detailsUrl: "#",
    description: "使用Vue3和TypeScript构建的现代化应用",
    techStack: ["Vue3", "TypeScript", "Vite"]
  },
  {
    id: 3,
    title: "项目三",
    image: "/images/project1.png",
    previewUrl: "#",
    detailsUrl: "#",
    description: "移动端响应式设计，支持多平台",
    techStack: ["React Native", "Redux", "Firebase"]
  },
  {
    id: 4,
    title: "项目四",
    image: "/images/project1.png",
    previewUrl: "#",
    detailsUrl: "#",
    description: "数据可视化仪表板，实时数据分析",
    techStack: ["D3.js", "Python", "Flask"]
  },
  {
    id: 5,
    title: "项目五",
    image: "/images/project1.png",
    previewUrl: "#",
    detailsUrl: "#",
    description: "电商网站，完整的购物车和支付功能",
    techStack: ["Next.js", "Stripe", "PostgreSQL"]
  },
  {
    id: 6,
    title: "项目六",
    image: "/images/project1.png",
    previewUrl: "#",
    detailsUrl: "#",
    description: "社交媒体平台，实时消息和动态",
    techStack: ["React", "Socket.io", "Redis"]
  }
]

// 联系方式数据
export const contactInfo: ContactInfo[] = [
  {
    id: 1,
    icon: "📧",
    title: "邮箱",
    content: "jaycong1998@gmail.com",
    link: "mailto:jaycong1998@gmail.com"
  },
  {
    id: 2,
    icon: "🐱",
    title: "GitHub",
    content: "github.com/JayCong1998",
    link: "https://github.com/JayCong1998"
  },
  {
    id: 3,
    icon: "💬",
    title: "微信",
    content: "your-wechat",
    qrCode: "/images/wechat-qr.jpg"
  },
  {
    id: 4,
    icon: "💰",
    title: "支付宝",
    content: "your-alipay",
    qrCode: "/images/alipay-qr.jpg"
  }
]

// 社交媒体数据
export const socialMedia: SocialMedia[] = [
  {
    name: "LinkedIn",
    icon: "💼",
    link: "https://linkedin.com/in/username"
  },
  {
    name: "Twitter",
    icon: "🐦",
    link: "https://twitter.com/username"
  },
  {
    name: "Instagram",
    icon: "📷",
    link: "https://instagram.com/username"
  },
  {
    name: "Blog",
    icon: "📝",
    link: "https://blog.username.com"
  }
]

// 关于我页面介绍文本
export const aboutDescription = "一名充满热情的全栈开发工程师，致力于创造优秀的用户体验和高效的技术解决方案同时也是一名热血的篮球爱好者、台球爱好者和DOTA2爱好者。"

// 导出所有数据
export default {
  personalInfo,
  personalDetails,
  projects,
  contactInfo,
  socialMedia,
  aboutDescription
}