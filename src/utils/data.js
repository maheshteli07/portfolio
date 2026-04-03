// Skills data - EXACT from resume
export const SKILLS = {
  'Programming Languages': [
    { name: 'C', level: 80 },
    { name: 'C++', level: 85 },
    { name: 'Python', level: 85 },
    { name: 'JavaScript', level: 85 },
    { name: 'Java', level: 75 },
  ],
  'Core Concepts': [
    { name: 'OOP', level: 85 },
    { name: 'Data Structures', level: 90 },
    { name: 'Operating Systems', level: 80 },
  ],
  'Web Development': [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'ReactJS', level: 85 },
    { name: 'NodeJS', level: 80 },
    { name: 'ExpressJS', level: 80 },
  ],
  'Databases & Tools': [
    { name: 'MongoDB', level: 80 },
    { name: 'SQL', level: 80 },
    { name: 'Git', level: 85 },
    { name: 'GitHub', level: 85 },
    { name: 'VS Code', level: 90 },
  ],
  'Libraries & Frameworks': [
    { name: 'NumPy', level: 75 },
    { name: 'Pandas', level: 75 },
    { name: 'Matplotlib', level: 75 },
    { name: 'Seaborn', level: 75 },
    { name: 'Scikit-learn', level: 75 },
    { name: 'PyTorch', level: 70 },
  ],
}

// Projects - EXACT from resume (2 projects only)
export const PROJECTS = [
  {
    id: 1,
    title: 'QR-Based Smart Retail Checkout & Exit Verification System',
    description: 'A comprehensive retail solution with QR code-based digital cart, secure payment gateway, and theft prevention through exit verification.',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Razorpay API', 'QR Libraries'],
    features: [
      'QR code scanning for item addition to digital cart',
      'Secure digital payment system integration',
      'Exit QR generation for shopkeeper verification',
      'Theft prevention mechanism'
    ],
    featured: true,
  },
  {
    id: 2,
    title: 'Hospital OPD Management System',
    description: 'A complete patient and appointment management system with secure authentication and REST API backend.',
    tech: ['React.js', 'Tailwind CSS', 'Spring Boot', 'MongoDB','Node.js'],
    features: [
      'Patient record management',
      'Doctor profile management',
      'Appointment scheduling',
      'Secure admin authentication',
      'REST API implementation'
    ],
    featured: true,
  },
]

// Education data
export const EDUCATION = {
  institution: 'Siddaganga Institute Of Technology, Tumkur',
  degree: 'Bachelor of Engineering',
  field: 'Computer Science & Engineering (Specialization: AIML)',
  cgpa: '9.42',
  duration: 'Oct 2024 – Present',
  location: 'India',
}

// Technical Contributions
export const TECHNICAL_CONTRIBUTIONS = [
  {
  id: 1,
  title: 'WIE CODE 2K25-26',
  organization: 'IEEE SIT Student Branch Website',
  role: 'Frontend Developer',
  description: 'Developed a responsive website to promote IEEE WIE CODE events and initiatives.',
  contributions: [
    'Designed and implemented responsive UI using ReactJS and CSS.',
    'Collaborated with team members to enhance user experience.',
    
  ],
  tech: ['ReactJS', 'HTML', 'CSS'],
},
{
  id: 2,
  title: 'IDEEEas 2K25-26',
  organization: 'IEEE SIT Student Branch Website',
  role: 'Frontend Developer',
  description: 'Built an event promotion website for IEEE IDEEEas using modern frontend technologies.',
  contributions: [
    'Developed responsive landing pages using ReactJS,Tailwind CSS.',
    'Integrated event details, speaker info, and registration flow.',
    
  ],
  tech: ['ReactJS', 'Tailwind CSS', 'JavaScript'],
}
]

// Achievements - EXACT from resume (2 items only)
export const ACHIEVEMENTS = [
  {
    id: 1,
    year: '2022',
    title: 'Ranked 7th at the State Level in SSLC board examinations',
    detail: 'Achieved 7th rank at state level in Secondary School Leaving Certificate examination with 99.04% score.',
    score: '99.04%',
    icon: '🏆',
    color: '#FFD700',
  },
  {
    id: 2,
    year: '2025',
    title: 'Top 10 Teams in Thinkathon Hackathon',
    detail: 'Secured position in top 10 teams at Thinkathon Hackathon project competition.',
    icon: '🚀',
    color: '#00d4ff',
  },
  {
    id: 3,
    year: '2025',
    title: '150+ DSA Problems Solved on LeetCode',
    detail: 'Solved 150+ Data Structures and Algorithms problems on LeetCode, strengthening problem-solving skills and algorithmic thinking.',
    icon: '💻',
    color: '#FFA500',
  },
]

// Positions & Leadership
export const POSITIONS = [
  {
    id: 1,
    position: 'Board Member',
    organization: 'SIGMA – Newsletter Club',
    duration: 'Current',
    description: 'Active member of SIGMA newsletter club, contributing to content creation and community engagement.',
    icon: '📰',
  },
  {
    id: 2,
    position: 'Board Member',
    organization: 'IEEE SIT Student Branch',
    duration: 'Current',
    description: 'Board member responsible for organizing events and technical workshops at IEEE SIT student branch.',
    icon: '⚡',
  },
]

// Contact information
export const CONTACT_INFO = {
  email: 'maheshteli729@gmail.com',
  phone: '+91 9620714943',
  location: 'India',
  socials: [
    { type: 'GitHub', url: 'https://github.com/maheshteli07', label: 'github.com/maheshteli07' },
    { type: 'LinkedIn', url: 'https://linkedin.com/in/mahesh-teli-328b28332/', label: 'linkedin.com/in/mahesh-teli-328b28332' },
    { type: 'LeetCode', url: 'https://leetcode.com/u/maheshteli07/', label: 'leetcode.com/u/maheshteli07' },
    { type: 'CodeChef', url: 'https://codechef.com/users/maheshteli07', label: 'codechef.com/users/maheshteli07' },
  ],
}
