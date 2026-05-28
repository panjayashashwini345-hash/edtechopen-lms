// Mock Data Types
export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: { name: string; verified: boolean; avatar?: string };
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  banner: string; // gradient color
  tags: string[];
  thumbnail?: string;
  whatYouLearn?: string[];
  modules?: Module[];
  createdAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number;
  order: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  submissions?: Submission[];
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  content: string;
  submittedAt: string;
  score?: number;
  feedback?: string;
}

export interface Fee {
  id: string;
  userId: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  description: string;
  paymentDate?: string;
}

export interface Attendance {
  id: string;
  userId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface ForumPost {
  id: string;
  courseId: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  replies: ForumReply[];
  likes: number;
}

export interface ForumReply {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  grade: string;
  score: number;
  issuedDate: string;
  certificateUrl: string;
  status: 'available' | 'pending';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'assignment' | 'announcement' | 'grade' | 'message' | 'class' | 'fee';
  title: string;
  message: string;
  icon: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface LiveClass {
  id: string;
  courseId: string;
  title: string;
  instructor: { name: string; avatar?: string };
  scheduledTime: string;
  duration: number;
  roomUrl: string;
  status: 'scheduled' | 'live' | 'completed';
  students: number;
}

export interface Batch {
  id: string;
  name: string;
  courses: string[];
  students: string[];
  startDate: string;
  endDate: string;
  instructorId: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  message: string;
  timestamp: string;
  isOwn?: boolean;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'student@example.com',
    password: 'password123',
    name: 'Arjun Kumar',
    role: 'student',
    avatar: '👤',
    createdAt: '2024-01-15',
  },
  {
    id: 'user2',
    email: 'instructor@example.com',
    password: 'password123',
    name: 'Prof. Sharma',
    role: 'instructor',
    avatar: '👨‍🏫',
    createdAt: '2024-01-10',
  },
  {
    id: 'user3',
    email: 'admin@example.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin',
    avatar: '👨‍💼',
    createdAt: '2024-01-01',
  },
];

// Mock Courses - 9 Real Courses
export const mockCourses: Course[] = [
  {
    id: 'course1',
    title: 'DSA Cracker - Zero to Hero',
    description: 'Master Data Structures and Algorithms with real-world problems and interview prep',
    instructor: { name: 'Striver', verified: true, avatar: '👨‍💻' },
    category: 'DSA & Algorithms',
    price: 4999,
    originalPrice: 9999,
    rating: 4.9,
    students: 45230,
    duration: 120,
    difficulty: 'Advanced',
    banner: 'from-purple-500 to-blue-500',
    tags: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming'],
    whatYouLearn: ['Master all DSA concepts', 'Solve 200+ problems', 'Interview-ready skills', 'Time-space optimization', 'Graph algorithms', 'DP patterns', 'Competitive programming', 'Resume projects'],
    modules: [
      {
        id: 'mod1',
        courseId: 'course1',
        title: 'Arrays & Basics',
        description: 'Array concepts and basic operations',
        lessons: [
          { id: 'l1', moduleId: 'mod1', title: 'Array Fundamentals', description: 'Basics', content: 'Learn arrays', duration: 25, order: 1 },
          { id: 'l2', moduleId: 'mod1', title: '2D Arrays', description: 'Matrix operations', content: 'Matrices', duration: 30, order: 2 },
        ],
        order: 1,
      },
    ],
    createdAt: '2024-01-20',
  },
  {
    id: 'course2',
    title: 'Full Stack Web Dev Bootcamp',
    description: 'Build complete web applications from frontend to deployment with modern stack',
    instructor: { name: 'Hitesh Choudhary', verified: true, avatar: '👨‍💼' },
    category: 'Full Stack',
    price: 5999,
    originalPrice: 11999,
    rating: 4.8,
    students: 32100,
    duration: 180,
    difficulty: 'Advanced',
    banner: 'from-orange-500 to-red-500',
    tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
    whatYouLearn: ['React fundamentals & hooks', 'Node.js & Express servers', 'MongoDB & database design', 'Authentication & authorization', 'Deployment on AWS', 'REST APIs', 'Project management', 'DevOps basics'],
    createdAt: '2024-01-21',
  },
  {
    id: 'course3',
    title: 'Machine Learning with Python',
    description: 'Comprehensive ML course covering algorithms, deep learning, and NLP',
    instructor: { name: 'Data Expert', verified: true, avatar: '👨‍🔬' },
    category: 'Data Science',
    price: 4499,
    originalPrice: 8999,
    rating: 4.7,
    students: 28500,
    duration: 90,
    difficulty: 'Advanced',
    banner: 'from-green-500 to-teal-500',
    tags: ['Regression', 'CNN', 'NLP', 'Projects'],
    whatYouLearn: ['Supervised learning', 'Unsupervised learning', 'Neural networks', 'CNN for images', 'NLP basics', 'Scikit-learn', 'TensorFlow', 'Real projects'],
    createdAt: '2024-01-22',
  },
  {
    id: 'course4',
    title: 'System Design Masterclass',
    description: 'Learn to design scalable systems like Uber, Netflix, and Instagram',
    instructor: { name: 'Gaurav Sen', verified: true, avatar: '👨‍🏫' },
    category: 'System Design',
    price: 6999,
    originalPrice: 13999,
    rating: 4.9,
    students: 19800,
    duration: 60,
    difficulty: 'Advanced',
    banner: 'from-indigo-500 to-purple-500',
    tags: ['HLD', 'LLD', 'Microservices', 'Scalability'],
    whatYouLearn: ['High-level system design', 'Low-level design patterns', 'Database optimization', 'Caching strategies', 'Load balancing', 'Microservices', 'Distributed systems', 'Real-world architectures'],
    createdAt: '2024-01-23',
  },
  {
    id: 'course5',
    title: 'DevOps & Cloud Engineering',
    description: 'Master Docker, Kubernetes, AWS, and CI/CD pipelines for production deployment',
    instructor: { name: 'TechWorld', verified: true, avatar: '👨‍💻' },
    category: 'DevOps',
    price: 5499,
    originalPrice: 10999,
    rating: 4.6,
    students: 15200,
    duration: 100,
    difficulty: 'Intermediate',
    banner: 'from-blue-500 to-cyan-500',
    tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    whatYouLearn: ['Docker containerization', 'Kubernetes orchestration', 'AWS services', 'CI/CD pipelines', 'Monitoring tools', 'Infrastructure as code', 'Security practices', 'Production deployment'],
    createdAt: '2024-01-24',
  },
  {
    id: 'course6',
    title: 'Python for Data Science',
    description: 'Complete Python for data analysis, visualization, and machine learning',
    instructor: { name: 'DataPro', verified: true, avatar: '👨‍💻' },
    category: 'Python',
    price: 3999,
    originalPrice: 7999,
    rating: 4.8,
    students: 41000,
    duration: 80,
    difficulty: 'Beginner',
    banner: 'from-yellow-500 to-orange-500',
    tags: ['Pandas', 'NumPy', 'Visualization', 'ML'],
    whatYouLearn: ['Python basics', 'Pandas data manipulation', 'NumPy arrays', 'Data visualization', 'Matplotlib & Seaborn', 'Exploratory analysis', 'Statistical methods', 'ML integration'],
    createdAt: '2024-01-25',
  },
  {
    id: 'course7',
    title: 'Competitive Programming C++',
    description: 'Ace competitive programming with C++ STL, advanced algorithms, and contest strategies',
    instructor: { name: 'CP Expert', verified: true, avatar: '👨‍💻' },
    category: 'Competitive Prog',
    price: 4299,
    originalPrice: 8599,
    rating: 4.7,
    students: 22000,
    duration: 70,
    difficulty: 'Advanced',
    banner: 'from-red-500 to-pink-500',
    tags: ['STL', 'Graphs', 'DP', 'Mathematics'],
    whatYouLearn: ['C++ STL mastery', 'Graph algorithms', 'Dynamic programming', 'Number theory', 'Geometry problems', 'Optimization techniques', 'Contest strategies', 'Mock contests'],
    createdAt: '2024-01-26',
  },
  {
    id: 'course8',
    title: 'Java Spring Boot Microservices',
    description: 'Build enterprise-grade microservices with Spring Boot, Docker, and cloud deployment',
    instructor: { name: 'Java Master', verified: true, avatar: '👨‍💼' },
    category: 'Full Stack',
    price: 5999,
    originalPrice: 11999,
    rating: 4.6,
    students: 18500,
    duration: 110,
    difficulty: 'Advanced',
    banner: 'from-orange-500 to-yellow-500',
    tags: ['Spring', 'Hibernate', 'REST', 'Docker'],
    whatYouLearn: ['Spring Framework', 'Spring Boot', 'Hibernate ORM', 'REST APIs', 'Microservices', 'Docker deployment', 'MongoDB', 'Security implementation'],
    createdAt: '2024-01-27',
  },
  {
    id: 'course9',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn ethical hacking, network security, and vulnerability assessment fundamentals',
    instructor: { name: 'SecureIT', verified: true, avatar: '🔐' },
    category: 'Full Stack',
    price: 7499,
    originalPrice: 14999,
    rating: 4.8,
    students: 9800,
    duration: 65,
    difficulty: 'Intermediate',
    banner: 'from-red-700 to-orange-500',
    tags: ['Network Security', 'Ethical Hacking', 'VAPT'],
    whatYouLearn: ['Network security basics', 'Ethical hacking', 'VAPT methodology', 'Penetration testing', 'Vulnerability assessment', 'Firewalls & IDS', 'Cryptography basics', 'Security best practices'],
    createdAt: '2024-01-28',
  },
];

// Mock Live Classes
export const mockLiveClasses: LiveClass[] = [
  {
    id: 'live1',
    courseId: 'course1',
    title: 'DSA Masterclass - Trees & Recursion',
    instructor: { name: 'Striver', avatar: '👨‍💻' },
    scheduledTime: '2024-05-27T14:00:00Z',
    duration: 90,
    roomUrl: 'https://meet.example.com/dsa-class',
    status: 'live',
    students: 1250,
  },
  {
    id: 'live2',
    courseId: 'course2',
    title: 'React Hooks Deep Dive',
    instructor: { name: 'Hitesh Choudhary', avatar: '👨‍💼' },
    scheduledTime: '2024-05-27T15:30:00Z',
    duration: 60,
    roomUrl: 'https://meet.example.com/react-class',
    status: 'scheduled',
    students: 890,
  },
  {
    id: 'live3',
    courseId: 'course4',
    title: 'System Design - Database Sharding',
    instructor: { name: 'Gaurav Sen', avatar: '👨‍🏫' },
    scheduledTime: '2024-05-26T16:00:00Z',
    duration: 120,
    roomUrl: 'https://meet.example.com/system-design',
    status: 'completed',
    students: 2100,
  },
];

// Mock Certificates
export const mockCertificates: Certificate[] = [
  {
    id: 'cert1',
    userId: 'user1',
    courseId: 'course6',
    courseName: 'JavaScript Essentials',
    grade: 'A',
    score: 95,
    issuedDate: '2024-03-15',
    certificateUrl: '#',
    status: 'available',
  },
  {
    id: 'cert2',
    userId: 'user1',
    courseId: 'course2',
    courseName: 'React Fundamentals',
    grade: 'A+',
    score: 98,
    issuedDate: '2024-04-10',
    certificateUrl: '#',
    status: 'available',
  },
  {
    id: 'cert3',
    userId: 'user1',
    courseId: 'course6',
    courseName: 'Python Basics',
    grade: 'B+',
    score: 87,
    issuedDate: '2024-02-20',
    certificateUrl: '#',
    status: 'available',
  },
  {
    id: 'cert4',
    userId: 'user1',
    courseId: 'course1',
    courseName: 'Advanced React',
    grade: 'Pending',
    score: 0,
    issuedDate: '',
    certificateUrl: '#',
    status: 'pending',
  },
  {
    id: 'cert5',
    userId: 'user1',
    courseId: 'course3',
    courseName: 'Data Science',
    grade: 'Pending',
    score: 0,
    issuedDate: '',
    certificateUrl: '#',
    status: 'pending',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'user1',
    type: 'assignment',
    icon: '📚',
    title: 'New Assignment',
    message: 'React Component Architecture posted',
    read: false,
    createdAt: '2024-05-27T10:00:00Z',
  },
  {
    id: 'notif2',
    userId: 'user1',
    type: 'fee',
    icon: '₹',
    title: 'Fee Reminder',
    message: '₹15,000 due in 3 days',
    read: false,
    createdAt: '2024-05-26T09:00:00Z',
  },
  {
    id: 'notif3',
    userId: 'user1',
    type: 'announcement',
    icon: '✅',
    title: 'Enrollment Confirmed',
    message: 'Successfully enrolled in ML Fundamentals',
    read: true,
    createdAt: '2024-05-25T14:30:00Z',
  },
  {
    id: 'notif4',
    userId: 'user1',
    type: 'grade',
    icon: '🏆',
    title: 'Certificate Ready',
    message: 'JavaScript Essentials ready to download',
    read: true,
    createdAt: '2024-05-24T11:15:00Z',
  },
  {
    id: 'notif5',
    userId: 'user1',
    type: 'class',
    icon: '📅',
    title: 'Class Starting Soon',
    message: 'Advanced React Patterns starts in 1 hour',
    read: true,
    createdAt: '2024-05-27T13:00:00Z',
  },
];

// Mock Forum Posts
export const mockForumPosts: ForumPost[] = [
  {
    id: 'post1',
    courseId: 'course1',
    userId: 'user2',
    title: 'How to approach graph problems?',
    content: 'Can anyone share their approach for solving graph-based DSA problems?',
    createdAt: '2024-05-27T08:30:00Z',
    replies: [
      {
        id: 'reply1',
        postId: 'post1',
        userId: 'user1',
        content: 'I usually start with BFS/DFS. Try to visualize the problem first.',
        createdAt: '2024-05-27T09:15:00Z',
        likes: 12,
      },
    ],
    likes: 25,
  },
];

// Mock Chat Messages for Community
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    userId: 'user2',
    username: 'Rahul',
    avatar: '👨',
    message: 'Has anyone solved the DP assignment?',
    timestamp: '10:30',
  },
  {
    id: 'msg2',
    userId: 'user3',
    username: 'Priya',
    avatar: '👩',
    message: 'Yes! Check my approach on LeetCode - link in description',
    timestamp: '10:35',
  },
  {
    id: 'msg3',
    userId: 'user2',
    username: 'Arjun',
    avatar: '👨',
    message: 'The live class recording is uploaded on the portal',
    timestamp: '10:40',
  },
  {
    id: 'msg4',
    userId: 'user3',
    username: 'Sneha',
    avatar: '👩',
    message: 'Thanks! The instructor explained it really well',
    timestamp: '10:45',
  },
  {
    id: 'msg5',
    userId: 'user1',
    username: 'You',
    avatar: '👤',
    message: 'I will check it out tonight',
    timestamp: '10:50',
    isOwn: true,
  },
];

// Mock Attendance
export const mockAttendance: Attendance[] = Array.from({ length: 45 }, (_, i) => ({
  id: `attend${i}`,
  userId: 'user1',
  courseId: 'course1',
  date: new Date(2024, 4, 1 + i).toISOString().split('T')[0],
  status: Math.random() > 0.15 ? 'present' : 'absent',
}));

// Mock Fees
export const mockFees: Fee[] = [
  {
    id: 'fee1',
    userId: 'user1',
    amount: 5000,
    dueDate: '2024-06-15',
    status: 'pending',
    description: 'June Month Fee',
  },
  {
    id: 'fee2',
    userId: 'user1',
    amount: 15000,
    dueDate: '2024-06-30',
    status: 'pending',
    description: 'Quarterly Fee',
  },
  {
    id: 'fee3',
    userId: 'user1',
    amount: 5000,
    dueDate: '2024-05-15',
    status: 'paid',
    description: 'May Month Fee',
    paymentDate: '2024-05-14',
  },
];

// Mock Batches
export const mockBatches: Batch[] = [
  {
    id: 'batch1',
    name: 'Batch 2024-A',
    courses: ['course1', 'course2'],
    students: ['user1'],
    startDate: '2024-01-15',
    endDate: '2024-06-15',
    instructorId: 'user2',
    status: 'active',
  },
  {
    id: 'batch2',
    name: 'Full Stack Cohort',
    courses: ['course2', 'course5'],
    students: ['user1'],
    startDate: '2024-02-01',
    endDate: '2024-07-01',
    instructorId: 'user2',
    status: 'active',
  },
  {
    id: 'batch3',
    name: 'ML Study Group',
    courses: ['course3', 'course6'],
    students: ['user1'],
    startDate: '2024-03-01',
    endDate: '2024-08-01',
    instructorId: 'user2',
    status: 'upcoming',
  },
];

// Mock Assignments
export const mockAssignments: Assignment[] = [
  {
    id: 'assign1',
    courseId: 'course1',
    title: 'Array Problems Batch 1',
    description: 'Solve 10 array manipulation problems',
    dueDate: '2024-05-30',
    maxScore: 100,
  },
  {
    id: 'assign2',
    courseId: 'course2',
    title: 'Build a React Todo App',
    description: 'Create a functional todo application with hooks',
    dueDate: '2024-06-05',
    maxScore: 100,
  },
];
