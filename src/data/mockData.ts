import { 
  UserProfile, 
  Student, 
  EarlyWarningAlert, 
  Intervention, 
  DepartmentMetric, 
  WeeklyAttendance,
  SubjectAssessment,
  AssignmentItem,
  SkillItem,
  CareerReadiness,
  TimelineEvent,
  StudentGoal
} from '../types';

export const DEMO_USERS: Record<string, UserProfile> = {
  student: {
    id: 'user-stu-01',
    name: 'Maya Lin',
    email: 'maya.lin@student.edupulse.edu',
    role: 'student',
    designation: 'Undergraduate Scholar (Year 3)',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    institution: 'Apex Institute of Technology & Science',
    badge: 'Class Representative',
  },
  staff: {
    id: 'user-fac-01',
    name: 'Prof. David Vance, Ph.D.',
    email: 'd.vance@faculty.edupulse.edu',
    role: 'staff',
    designation: 'Associate Professor & Senior Mentor',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    institution: 'Apex Institute of Technology & Science',
    badge: 'Mentor Lead — Cohort 2024-28',
  },
  principal: {
    id: 'user-adm-01',
    name: 'Dr. Eleanor Sterling',
    email: 'e.sterling@admin.edupulse.edu',
    role: 'principal',
    designation: 'Dean of Academic Affairs & Vice Principal',
    department: 'Institutional Governance',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    institution: 'Apex Institute of Technology & Science',
    badge: 'Executive Council Chair',
  },
  authority: {
    id: 'user-coun-01',
    name: 'Sarah Jenkins, LPC',
    email: 's.jenkins@welfare.edupulse.edu',
    role: 'authority',
    designation: 'Chief Academic Counselor & Student Welfare Officer',
    department: 'Center for Student Wellbeing & Counseling',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    institution: 'Apex Institute of Technology & Science',
    badge: 'Licensed Counselor',
  },
};

// Weekly template helper
const generateWeeklyAttendance = (base: number, trend: 'declining' | 'improving' | 'stable' | 'erratic'): WeeklyAttendance[] => {
  const weeks: WeeklyAttendance[] = [];
  let current = base;
  for (let w = 1; w <= 8; w++) {
    if (trend === 'declining' && w >= 3) {
      current = Math.max(45, current - Math.floor(Math.random() * 8 + 5));
    } else if (trend === 'improving' && w >= 4) {
      current = Math.min(98, current + Math.floor(Math.random() * 6 + 6));
    } else if (trend === 'erratic') {
      current = Math.min(95, Math.max(50, base + (w % 2 === 0 ? 12 : -18)));
    } else {
      current = Math.min(98, Math.max(75, base + (Math.random() * 6 - 3)));
    }
    weeks.push({
      week: w,
      attendance: Math.round(current),
      studyHours: Math.round(18 + (current / 100) * 12),
      date: `Week ${w} (Semester 4)`,
    });
  }
  return weeks;
};

// Specialized Scenario Students
export const SCENARIO_A_STUDENT: Student = {
  id: 'STU-104',
  rollNumber: '2024-CSE-084',
  name: 'Arjun Mehta',
  email: 'arjun.mehta@student.edupulse.edu',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  gender: 'Male',
  department: 'Computer Science & Engineering',
  semester: 4,
  batch: '2024-2028',
  cgpa: 6.82,
  attendanceRate: 61.2,
  assignmentRate: 58.0,
  assessmentAvg: 51.5,
  supportPriority: 'high',
  mentorName: 'Prof. David Vance, Ph.D.',
  mentorEmail: 'd.vance@faculty.edupulse.edu',
  counselorName: 'Sarah Jenkins, LPC',
  learningHoursThisMonth: 14.5,
  activeModulesCompleted: 6,
  totalCourseModules: 18,
  strengths: ['Algorithmic Logic (Sem 1-2)', 'Database Design Basics', 'Collaborative Group Projects'],
  learningGaps: ['Advanced Data Structures (CS402)', 'Operating System Kernel Threads', 'Late Lab Submissions'],
  weeklyAttendance: [
    { week: 1, attendance: 88, studyHours: 24, date: 'Week 1' },
    { week: 2, attendance: 85, studyHours: 22, date: 'Week 2' },
    { week: 3, attendance: 76, studyHours: 19, date: 'Week 3' },
    { week: 4, attendance: 69, studyHours: 16, date: 'Week 4' },
    { week: 5, attendance: 63, studyHours: 14, date: 'Week 5' },
    { week: 6, attendance: 58, studyHours: 12, date: 'Week 6' },
    { week: 7, attendance: 60, studyHours: 13, date: 'Week 7' },
    { week: 8, attendance: 61, studyHours: 14, date: 'Week 8' },
  ],
  assessments: [
    { code: 'CS401', name: 'Design & Analysis of Algorithms', credits: 4, internal1: 72, internal2: 54, predictedGrade: 'C+', status: 'critical', assignmentCompletion: 60 },
    { code: 'CS402', name: 'Advanced Data Structures & Trees', credits: 4, internal1: 68, internal2: 44, predictedGrade: 'D', status: 'critical', assignmentCompletion: 40 },
    { code: 'CS403', name: 'Computer Architecture & Microprocessors', credits: 3, internal1: 78, internal2: 65, predictedGrade: 'B', status: 'watch', assignmentCompletion: 75 },
    { code: 'CS404', name: 'Discrete Computational Mathematics', credits: 3, internal1: 80, internal2: 68, predictedGrade: 'B', status: 'watch', assignmentCompletion: 80 },
    { code: 'CS405L', name: 'Data Structures Laboratory', credits: 2, internal1: 74, internal2: 48, predictedGrade: 'D', status: 'critical', assignmentCompletion: 45 },
  ],
  assignments: [
    { id: 'asg-01', title: 'Red-Black Tree Self-Balancing Implementation', subjectCode: 'CS402', subjectName: 'Advanced Data Structures', dueDate: 'Oct 02, 2026', status: 'missing', maxScore: 50 },
    { id: 'asg-02', title: 'Dynamic Programming Knapsack Benchmark', subjectCode: 'CS401', subjectName: 'Algorithms', dueDate: 'Sep 28, 2026', status: 'late', submittedDate: 'Oct 01, 2026', score: 28, maxScore: 50 },
    { id: 'asg-03', title: 'B+ Tree Disk Page Split Simulation', subjectCode: 'CS402', subjectName: 'Advanced Data Structures', dueDate: 'Sep 20, 2026', status: 'missing', maxScore: 50 },
    { id: 'asg-04', title: 'Cache Memory Mapping Simulation', subjectCode: 'CS403', subjectName: 'Computer Architecture', dueDate: 'Sep 15, 2026', status: 'submitted', submittedDate: 'Sep 14, 2026', score: 42, maxScore: 50 },
  ],
  skills: [
    { name: 'C++ Programming', category: 'core_technical', progress: 75, verified: true, level: 'Proficient' },
    { name: 'Data Structures (Trees & Graphs)', category: 'core_technical', progress: 42, verified: false, level: 'Foundational' },
    { name: 'SQL & Database Modeling', category: 'core_technical', progress: 68, verified: true, level: 'Intermediate' },
    { name: 'Git & Version Control', category: 'tools', progress: 80, verified: true, level: 'Proficient' },
    { name: 'Technical Problem Solving', category: 'professional', progress: 55, verified: false, level: 'Intermediate' },
  ],
  careerReadiness: {
    placementIndex: 58,
    targetRole: 'Software Development Engineer (Backend)',
    resumeStatus: 'needs_update',
    mockInterviewScore: 52,
    certificationsCount: 1,
    certifications: ['HackerRank Problem Solving (Basic)'],
    internships: [],
    recommendedPaths: ['Intensive Tree & Graph Mastery', 'Mock Technical Diagnostic #2', 'Time Management Coaching'],
  },
  timeline: [
    { id: 'tm-01', date: 'Oct 08, 2026', semester: 4, category: 'attendance', title: 'Attendance Breach Alert', description: 'Bi-weekly attendance dipped below 62% institutional threshold.', metric: '61.2% Attendance', impact: 'critical' },
    { id: 'tm-02', date: 'Oct 04, 2026', semester: 4, category: 'assignment', title: 'Consecutive Missed Assignment', description: 'Missed CS402 Red-Black Tree milestone. Second missing submission in 14 days.', metric: '2 Missed Labs', impact: 'negative' },
    { id: 'tm-03', date: 'Sep 25, 2026', semester: 4, category: 'academic', title: 'Internal Assessment 2 Score Drop', description: 'Scored 44/100 in CS402 exam (-24 points vs Test 1).', metric: '44% Internal Score', impact: 'critical' },
    { id: 'tm-04', date: 'Aug 18, 2026', semester: 4, category: 'milestone', title: 'Commenced Semester 4', description: 'Enrolled in 5 core theory courses and 2 laboratory sections.', impact: 'neutral' },
    { id: 'tm-05', date: 'Jun 12, 2026', semester: 3, category: 'academic', title: 'Semester 3 Completed', description: 'Successfully completed Semester 3 with SGPA 7.4.', metric: 'SGPA 7.4', impact: 'positive' },
  ],
  interventions: [],
  goals: [
    { id: 'g-01', title: 'Raise bi-weekly attendance back to ≥ 75%', category: 'attendance', targetValue: '75%', currentValue: '61.2%', deadline: 'Nov 01, 2026', completed: false },
    { id: 'g-02', title: 'Complete overdue CS402 Red-Black tree remedial code', category: 'academic', targetValue: '100% Submission', currentValue: 'Pending', deadline: 'Oct 15, 2026', completed: false },
  ],
};

export const SCENARIO_C_STUDENT: Student = {
  id: 'STU-108',
  rollNumber: '2024-IT-042',
  name: 'Priya Sharma',
  email: 'priya.sharma@student.edupulse.edu',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  gender: 'Female',
  department: 'Information Technology',
  semester: 4,
  batch: '2024-2028',
  cgpa: 8.35,
  attendanceRate: 88.6,
  assignmentRate: 94.0,
  assessmentAvg: 79.5,
  supportPriority: 'low',
  mentorName: 'Prof. Sarah Jenkins, LPC',
  mentorEmail: 's.jenkins@welfare.edupulse.edu',
  learningHoursThisMonth: 34.0,
  activeModulesCompleted: 15,
  totalCourseModules: 18,
  strengths: ['Rapid Recovery & Receptiveness to Mentoring', 'Full-Stack JavaScript', 'Consistent Attendance (Weeks 5-8)'],
  learningGaps: ['Distributed System Synchronization (Resolved)'],
  weeklyAttendance: [
    { week: 1, attendance: 78, studyHours: 20, date: 'Week 1' },
    { week: 2, attendance: 72, studyHours: 18, date: 'Week 2' },
    { week: 3, attendance: 64, studyHours: 15, date: 'Week 3 (Alert Triggered)' },
    { week: 4, attendance: 70, studyHours: 20, date: 'Week 4 (Support Plan Started)' },
    { week: 5, attendance: 81, studyHours: 28, date: 'Week 5' },
    { week: 6, attendance: 86, studyHours: 32, date: 'Week 6' },
    { week: 7, attendance: 88, studyHours: 34, date: 'Week 7' },
    { week: 8, attendance: 89, studyHours: 35, date: 'Week 8 (Target Achieved)' },
  ],
  assessments: [
    { code: 'IT401', name: 'Operating Systems & Concurrency', credits: 4, internal1: 54, internal2: 78, predictedGrade: 'A', status: 'strong', assignmentCompletion: 95 },
    { code: 'IT402', name: 'Computer Networks & Sockets', credits: 4, internal1: 68, internal2: 82, predictedGrade: 'A', status: 'strong', assignmentCompletion: 100 },
    { code: 'IT403', name: 'Web Architecture & Cloud Services', credits: 3, internal1: 76, internal2: 88, predictedGrade: 'A+', status: 'strong', assignmentCompletion: 100 },
    { code: 'IT404', name: 'Software Engineering & Agile Testing', credits: 3, internal1: 70, internal2: 84, predictedGrade: 'A', status: 'strong', assignmentCompletion: 90 },
  ],
  assignments: [
    { id: 'asg-11', title: 'Multithreaded Banker Algorithm Simulation', subjectCode: 'IT401', subjectName: 'Operating Systems', dueDate: 'Oct 04, 2026', status: 'submitted', submittedDate: 'Oct 03, 2026', score: 48, maxScore: 50 },
    { id: 'asg-12', title: 'HTTP/3 Socket Server in Node.js', subjectCode: 'IT402', subjectName: 'Computer Networks', dueDate: 'Sep 27, 2026', status: 'submitted', submittedDate: 'Sep 26, 2026', score: 49, maxScore: 50 },
    { id: 'asg-13', title: 'Deadlock Detection in Linux Kernels', subjectCode: 'IT401', subjectName: 'Operating Systems', dueDate: 'Sep 12, 2026', status: 'submitted', submittedDate: 'Sep 18, 2026', score: 40, maxScore: 50 },
  ],
  skills: [
    { name: 'Node.js & Express API', category: 'core_technical', progress: 90, verified: true, level: 'Advanced' },
    { name: 'Operating System Internals', category: 'core_technical', progress: 78, verified: true, level: 'Proficient' },
    { name: 'Docker & Microservices', category: 'emerging_tech', progress: 70, verified: true, level: 'Intermediate' },
    { name: 'Agile & Peer Collaboration', category: 'professional', progress: 88, verified: true, level: 'Advanced' },
  ],
  careerReadiness: {
    placementIndex: 86,
    targetRole: 'Cloud Solutions Engineer',
    resumeStatus: 'verified_ready',
    mockInterviewScore: 84,
    certificationsCount: 2,
    certifications: ['AWS Certified Cloud Practitioner', 'Postman API Fundamentals Student Expert'],
    internships: ['Summer DevOps Intern — CloudNest Inc.'],
    recommendedPaths: ['Kubernetes CKAD Preparation', 'System Design Whiteboard Practice'],
  },
  timeline: [
    { id: 'tm-11', date: 'Oct 08, 2026', semester: 4, category: 'intervention', title: 'Support Plan Marked Completed: Positive Outcome', description: 'Attendance normalized to 89% and assessment scores rose +24% across subjects.', metric: '+25% Attendance / +24% Marks', impact: 'positive' },
    { id: 'tm-12', date: 'Sep 22, 2026', semester: 4, category: 'academic', title: 'Internal Assessment 2 Recovery', description: 'Scored 78/100 in IT401, demonstrating exceptional conceptual turnaround.', metric: '78% Score', impact: 'positive' },
    { id: 'tm-13', date: 'Sep 15, 2026', semester: 4, category: 'intervention', title: 'Peer-Assisted Support Plan Initiated', description: 'Counselor Sarah Jenkins and Mentor paired Priya with Senior Teaching Fellow.', impact: 'positive' },
    { id: 'tm-14', date: 'Sep 10, 2026', semester: 4, category: 'attendance', title: 'Week 3 Attendance Dip Flagged', description: 'System detected temporary decline to 64% due to medical recovery.', metric: '64% Attendance', impact: 'negative' },
  ],
  interventions: [
    {
      id: 'int-001',
      studentId: 'STU-108',
      studentName: 'Priya Sharma',
      studentRoll: '2024-IT-042',
      department: 'Information Technology',
      type: 'academic_tutoring',
      title: 'Peer-Assisted Operating Systems & Lab Recovery',
      description: 'Structured 3-week study plan with Teaching Fellow Rahul V. focusing on process synchronization and laboratory assignments.',
      reason: 'Temporary medical absence in Week 2-3 created conceptual deficit in IT401 and missed laboratory submissions.',
      suggestedBy: 'AI Early Warning Engine & Staff Review',
      assignedMentor: 'Sarah Jenkins, LPC',
      assignedDate: 'Sep 15, 2026',
      targetDate: 'Oct 06, 2026',
      status: 'completed',
      metricsBefore: { attendance: 64, assessmentScore: 54, missingAssignments: 2 },
      metricsAfter: { attendance: 89, assessmentScore: 78, missingAssignments: 0 },
      improvementGoals: [
        'Restore cumulative attendance to ≥ 85%',
        'Clear 2 backlogged IT401 laboratory simulations',
        'Achieve ≥ 75% in Mid-term Exam 2',
      ],
      notes: [
        { id: 'n-01', author: 'Sarah Jenkins, LPC', date: 'Sep 15, 2026', content: 'Met with Priya. Confirmed absence was due to severe flu. Highly motivated to catch up with structured roadmap.' },
        { id: 'n-02', author: 'Prof. David Vance', date: 'Sep 28, 2026', content: 'Priya attended all scheduled tutorial sessions. Lab submissions completed ahead of schedule.' },
        { id: 'n-03', author: 'Sarah Jenkins, LPC', date: 'Oct 06, 2026', content: 'Final review completed. Verified attendance at 89% and test 2 score at 78%. Formal intervention successfully closed.' },
      ],
    },
  ],
  goals: [
    { id: 'g-11', title: 'Maintain attendance above 85% until end of semester', category: 'attendance', targetValue: '85%', currentValue: '88.6%', deadline: 'Dec 05, 2026', completed: true },
    { id: 'g-12', title: 'Complete AWS Certified Developer Associate milestone', category: 'career', targetValue: 'Certified', currentValue: 'In Progress (80%)', deadline: 'Nov 15, 2026', completed: false },
  ],
};

export const DEFAULT_STUDENT_USER: Student = {
  id: 'STU-101',
  rollNumber: '2024-CSE-002',
  name: 'Maya Lin',
  email: 'maya.lin@student.edupulse.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  gender: 'Female',
  department: 'Computer Science & Engineering',
  semester: 4,
  batch: '2024-2028',
  cgpa: 9.15,
  attendanceRate: 94.2,
  assignmentRate: 98.0,
  assessmentAvg: 91.0,
  supportPriority: 'low',
  mentorName: 'Prof. David Vance, Ph.D.',
  mentorEmail: 'd.vance@faculty.edupulse.edu',
  learningHoursThisMonth: 42.5,
  activeModulesCompleted: 17,
  totalCourseModules: 18,
  strengths: ['Algorithmic Efficiency & Big-O Analysis', 'System Architecture', 'Peer Mentoring Assistance', 'High Consistency'],
  learningGaps: ['Advanced GPU CUDA Programming (Optional Elective)'],
  weeklyAttendance: [
    { week: 1, attendance: 95, studyHours: 35, date: 'Week 1' },
    { week: 2, attendance: 94, studyHours: 36, date: 'Week 2' },
    { week: 3, attendance: 96, studyHours: 38, date: 'Week 3' },
    { week: 4, attendance: 92, studyHours: 34, date: 'Week 4' },
    { week: 5, attendance: 95, studyHours: 37, date: 'Week 5' },
    { week: 6, attendance: 96, studyHours: 39, date: 'Week 6' },
    { week: 7, attendance: 93, studyHours: 36, date: 'Week 7' },
    { week: 8, attendance: 95, studyHours: 38, date: 'Week 8' },
  ],
  assessments: [
    { code: 'CS401', name: 'Design & Analysis of Algorithms', credits: 4, internal1: 94, internal2: 96, predictedGrade: 'A+', status: 'strong', assignmentCompletion: 100 },
    { code: 'CS402', name: 'Advanced Data Structures & Trees', credits: 4, internal1: 90, internal2: 92, predictedGrade: 'A+', status: 'strong', assignmentCompletion: 100 },
    { code: 'CS403', name: 'Computer Architecture & Microprocessors', credits: 3, internal1: 88, internal2: 91, predictedGrade: 'A', status: 'strong', assignmentCompletion: 95 },
    { code: 'CS404', name: 'Discrete Computational Mathematics', credits: 3, internal1: 92, internal2: 95, predictedGrade: 'A+', status: 'strong', assignmentCompletion: 100 },
  ],
  assignments: [
    { id: 'asg-m1', title: 'Red-Black Tree Self-Balancing Implementation', subjectCode: 'CS402', subjectName: 'Advanced Data Structures', dueDate: 'Oct 02, 2026', status: 'submitted', submittedDate: 'Sep 30, 2026', score: 50, maxScore: 50 },
    { id: 'asg-m2', title: 'Dynamic Programming Knapsack Benchmark', subjectCode: 'CS401', subjectName: 'Algorithms', dueDate: 'Sep 28, 2026', status: 'submitted', submittedDate: 'Sep 27, 2026', score: 49, maxScore: 50 },
    { id: 'asg-m3', title: 'RISC-V Pipelining Hazard Simulation', subjectCode: 'CS403', subjectName: 'Computer Architecture', dueDate: 'Sep 18, 2026', status: 'submitted', submittedDate: 'Sep 17, 2026', score: 48, maxScore: 50 },
  ],
  skills: [
    { name: 'TypeScript & React', category: 'core_technical', progress: 95, verified: true, level: 'Advanced' },
    { name: 'Advanced Data Structures (C++)', category: 'core_technical', progress: 92, verified: true, level: 'Advanced' },
    { name: 'Distributed Systems & Docker', category: 'emerging_tech', progress: 84, verified: true, level: 'Proficient' },
    { name: 'Technical Leadership', category: 'professional', progress: 90, verified: true, level: 'Advanced' },
  ],
  careerReadiness: {
    placementIndex: 94,
    targetRole: 'Principal Software Engineer / Systems Architect',
    resumeStatus: 'verified_ready',
    mockInterviewScore: 92,
    certificationsCount: 3,
    certifications: ['AWS Certified Solutions Architect Associate', 'Google Cloud Digital Leader', 'Meta Frontend Developer Professional'],
    internships: ['Software Engineering Intern — Google Cloud (Summer 2026)'],
    recommendedPaths: ['Research Paper Submission on Distributed Consensus', 'Campus Hackathon Mentoring'],
  },
  timeline: [
    { id: 'tm-m1', date: 'Oct 06, 2026', semester: 4, category: 'career_milestone', title: 'Top 1% Class Rank Confirmed', description: 'Maintained highest cumulative score across computer science 4th semester cohort.', metric: 'CGPA 9.15', impact: 'positive' },
    { id: 'tm-m2', date: 'Sep 29, 2026', semester: 4, category: 'academic', title: 'Internal Exam 2 Outstanding Score', description: 'Scored 96/100 in Algorithms and 92/100 in Advanced Data Structures.', metric: '94% Avg', impact: 'positive' },
    { id: 'tm-m3', date: 'Aug 20, 2026', semester: 4, category: 'milestone', title: 'Selected as Peer Learning Anchor', description: 'Appointed as student guide for second-year laboratory workshops.', impact: 'positive' },
  ],
  interventions: [],
  goals: [
    { id: 'g-m1', title: 'Publish IEEE Conference paper on Distributed Cache Prefetching', category: 'academic', targetValue: 'Draft Submitted', currentValue: '70% Done', deadline: 'Dec 15, 2026', completed: false },
    { id: 'g-m2', title: 'Maintain 90%+ in remaining two semester assessments', category: 'academic', targetValue: '90%', currentValue: '91.0%', deadline: 'Nov 30, 2026', completed: false },
  ],
};

// Generate 210 Synthetic Students across 5 Departments
const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Data Science & Artificial Intelligence',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical & Automation',
];

const FIRST_NAMES = [
  'Aarav', 'Ananya', 'Rohan', 'Aditi', 'Vikram', 'Sneha', 'Kabir', 'Tanvi', 'Ishaan', 'Diya',
  'Dev', 'Kavya', 'Reyansh', 'Meera', 'Dhruv', 'Saanvi', 'Aryan', 'Pooja', 'Rishi', 'Zoya',
  'Aditya', 'Riya', 'Karthik', 'Nisha', 'Varun', 'Shreya', 'Siddharth', 'Tara', 'Samarth', 'Neha'
];

const LAST_NAMES = [
  'Verma', 'Nair', 'Kulkarni', 'Iyer', 'Reddy', 'Patel', 'Deshmukh', 'Chopra', 'Banerjee', 'Rao',
  'Bhat', 'Singhania', 'Menon', 'Joshi', 'Kapoor', 'Pillai', 'Sethi', 'Malhotra', 'Gupta', 'Saxena'
];

export const generateSyntheticStudents = (): Student[] => {
  const students: Student[] = [DEFAULT_STUDENT_USER, SCENARIO_A_STUDENT, SCENARIO_C_STUDENT];
  
  let idCounter = 110;
  
  for (let i = 0; i < 207; i++) {
    const dept = DEPARTMENTS[i % DEPARTMENTS.length];
    const sem = (i % 3 === 0) ? 6 : (i % 2 === 0 ? 4 : 2);
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(i * 3) % LAST_NAMES.length];
    const name = `${firstName} ${lastName}`;
    const gender = (i % 2 === 0) ? 'Female' : 'Male';
    const rollNumber = `2024-${dept.split(' ')[0]}-${String(i + 15).padStart(3, '0')}`;
    const id = `STU-${idCounter++}`;
    
    // Deterministic distribution of risk priorities
    let priority: 'low' | 'moderate' | 'high' = 'low';
    let attendanceRate = 82 + (Math.sin(i) * 12);
    let cgpa = 7.5 + (Math.cos(i) * 1.6);
    let assignmentRate = 85 + (Math.sin(i * 2) * 12);
    let assessmentAvg = 78 + (Math.cos(i * 1.5) * 14);

    // Seed ~14 high priority and ~32 moderate priority students
    if (i % 15 === 0) {
      priority = 'high';
      attendanceRate = Math.min(68, Math.max(52, 60 + Math.sin(i) * 8));
      cgpa = Math.min(6.5, Math.max(4.8, 5.8 + Math.cos(i) * 0.7));
      assignmentRate = Math.min(62, Math.max(45, 55 + Math.sin(i) * 8));
      assessmentAvg = Math.min(58, Math.max(42, 50 + Math.cos(i) * 8));
    } else if (i % 6 === 0) {
      priority = 'moderate';
      attendanceRate = Math.min(76, Math.max(70, 73 + Math.sin(i) * 3));
      assignmentRate = Math.min(75, Math.max(68, 71 + Math.sin(i) * 4));
      assessmentAvg = Math.min(72, Math.max(64, 68 + Math.cos(i) * 4));
    } else {
      attendanceRate = Math.min(98, Math.max(80, attendanceRate));
      cgpa = Math.min(9.8, Math.max(7.2, cgpa));
      assignmentRate = Math.min(100, Math.max(82, assignmentRate));
      assessmentAvg = Math.min(96, Math.max(76, assessmentAvg));
    }

    const weeklyTrend = priority === 'high' ? 'declining' : (priority === 'moderate' ? 'erratic' : 'stable');

    students.push({
      id,
      rollNumber,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.edupulse.edu`,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + (i * 271828) % 10000000}?auto=format&fit=crop&q=80&w=200`,
      gender,
      department: dept,
      semester: sem,
      batch: '2024-2028',
      cgpa: Math.round(cgpa * 100) / 100,
      attendanceRate: Math.round(attendanceRate * 10) / 10,
      assignmentRate: Math.round(assignmentRate * 10) / 10,
      assessmentAvg: Math.round(assessmentAvg * 10) / 10,
      supportPriority: priority,
      mentorName: (i % 2 === 0) ? 'Prof. David Vance, Ph.D.' : 'Prof. Sunita Rao, M.Tech',
      mentorEmail: (i % 2 === 0) ? 'd.vance@faculty.edupulse.edu' : 's.rao@faculty.edupulse.edu',
      counselorName: priority === 'high' ? 'Sarah Jenkins, LPC' : undefined,
      learningHoursThisMonth: Math.round(20 + (attendanceRate / 100) * 20),
      activeModulesCompleted: Math.round(8 + (assignmentRate / 100) * 9),
      totalCourseModules: 18,
      strengths: [
        `${dept.split(' ')[0]} Foundations`,
        priority === 'low' ? 'High Lab Consistency' : 'Conceptual Adaptability',
        'Team Collaboration'
      ],
      learningGaps: priority === 'high' ? ['Mid-term Revision', 'Laboratory Timeliness'] : ['Elective Deep-Dive'],
      weeklyAttendance: generateWeeklyAttendance(attendanceRate, weeklyTrend),
      assessments: [
        { code: `${dept.slice(0, 2).toUpperCase()}401`, name: `${dept} Core I`, credits: 4, internal1: Math.round(assessmentAvg + 4), internal2: Math.round(assessmentAvg - 2), predictedGrade: assessmentAvg > 80 ? 'A' : (assessmentAvg > 65 ? 'B' : 'C'), status: assessmentAvg > 75 ? 'strong' : (assessmentAvg > 60 ? 'watch' : 'critical'), assignmentCompletion: Math.round(assignmentRate) },
        { code: `${dept.slice(0, 2).toUpperCase()}402`, name: `${dept} Analytics II`, credits: 4, internal1: Math.round(assessmentAvg), internal2: Math.round(assessmentAvg - 5), predictedGrade: assessmentAvg > 80 ? 'A' : (assessmentAvg > 65 ? 'B' : 'D'), status: assessmentAvg > 75 ? 'strong' : (assessmentAvg > 60 ? 'watch' : 'critical'), assignmentCompletion: Math.round(assignmentRate - 5) },
      ],
      assignments: [
        { id: `asg-${id}-1`, title: 'Mid-term Practical Portfolio', subjectCode: `${dept.slice(0, 2).toUpperCase()}401`, subjectName: 'Core Lab', dueDate: 'Oct 05, 2026', status: priority === 'high' ? 'missing' : 'submitted', maxScore: 50 },
      ],
      skills: [
        { name: 'Core Problem Solving', category: 'core_technical', progress: Math.round(assessmentAvg), verified: true, level: assessmentAvg > 80 ? 'Proficient' : 'Intermediate' },
        { name: 'Modern Tooling & Workflow', category: 'tools', progress: Math.round(assignmentRate), verified: true, level: assignmentRate > 85 ? 'Proficient' : 'Intermediate' },
      ],
      careerReadiness: {
        placementIndex: Math.round((cgpa / 10) * 60 + (assignmentRate / 100) * 40),
        targetRole: `${dept.split(' ')[0]} Engineering Specialist`,
        resumeStatus: priority === 'high' ? 'needs_update' : 'verified_ready',
        mockInterviewScore: Math.round(assessmentAvg * 0.9),
        certificationsCount: priority === 'low' ? 2 : 1,
        certifications: ['Industry Foundations Credential'],
        internships: priority === 'low' ? ['Summer Industrial Training'] : [],
        recommendedPaths: ['Diagnostic Practice', 'Departmental Mentoring Session'],
      },
      timeline: [
        { id: `tm-${id}-1`, date: 'Oct 01, 2026', semester: sem, category: 'academic', title: 'Monthly Progress Evaluation', description: `Recorded cumulative attendance at ${attendanceRate.toFixed(1)}% and assignment completion at ${assignmentRate.toFixed(1)}%.`, impact: priority === 'high' ? 'critical' : 'positive' }
      ],
      interventions: [],
      goals: [
        { id: `g-${id}-1`, title: 'Achieve ≥ 80% attendance milestone', category: 'attendance', targetValue: '80%', currentValue: `${attendanceRate.toFixed(0)}%`, deadline: 'Nov 10, 2026', completed: attendanceRate >= 80 }
      ]
    });
  }

  return students;
};

export const INITIAL_STUDENTS: Student[] = generateSyntheticStudents();

export const INITIAL_EARLY_WARNING_ALERTS: EarlyWarningAlert[] = [
  {
    id: 'ALERT-001',
    studentId: 'STU-104',
    studentName: 'Arjun Mehta',
    studentRoll: '2024-CSE-084',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    department: 'Computer Science & Engineering',
    semester: 4,
    priority: 'high',
    observedPattern: 'Precipitous 4-week decline in attendance (-27% delta) coupled with 3 consecutive missing laboratory assignments in CS402.',
    supportingData: 'Attendance slipped from 88% (Week 1) to 61% (Week 8). Internal Assessment 2 dropped by 24 points (68% → 44%). Overdue: Red-Black Tree Implementation (Oct 02).',
    rootCauseAnalysis: 'Struggling with advanced non-linear pointer logic in Trees & Graphs course; missed labs led to conceptual compounding deficit.',
    recommendedAction: 'Schedule urgent mentor check-in with Prof. David Vance; grant 5-day structured remedial lab extension with Teaching Assistant.',
    generatedDate: 'Oct 08, 2026',
    status: 'open',
    assignedMentor: 'Prof. David Vance, Ph.D.',
    confidenceScore: 94,
    subsequentProgress: 'Awaiting scheduled mentor consultation on Friday.',
  },
  {
    id: 'ALERT-002',
    studentId: 'STU-112',
    studentName: 'Rohan Kulkarni',
    studentRoll: '2024-DSAI-019',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    department: 'Data Science & Artificial Intelligence',
    semester: 4,
    priority: 'high',
    observedPattern: 'Persistent non-submission of SQL Query Optimization assignments in DS403 and attendance plateauing at 64.5%.',
    supportingData: 'Missed 2 weekly labs. Mid-term Assessment 1: 52/100. Platform login hours declined from 18 hrs/week to 4 hrs/week.',
    rootCauseAnalysis: 'Severe engagement dip following transition from Python scripting to relational query execution planners.',
    recommendedAction: 'Coordinate joint academic counselor session and recommend interactive query profiling sandbox.',
    generatedDate: 'Oct 07, 2026',
    status: 'open',
    assignedMentor: 'Prof. Sunita Rao, M.Tech',
    confidenceScore: 91,
  },
  {
    id: 'ALERT-003',
    studentId: 'STU-125',
    studentName: 'Dev Chopra',
    studentRoll: '2024-ECE-033',
    studentAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    department: 'Electronics & Communication',
    semester: 4,
    priority: 'moderate',
    observedPattern: 'Sustained assessment volatility in Signals & Systems with missing pre-lab quizzes.',
    supportingData: 'Attendance at 73.0% (borderline institutional warning). Internal 2 score: 58/100.',
    rootCauseAnalysis: 'Mathematical prerequisites in Fourier and Laplace transforms not firmly established.',
    recommendedAction: 'Assign supplementary revision video module and peer-tutoring partner.',
    generatedDate: 'Oct 06, 2026',
    status: 'acknowledged',
    assignedMentor: 'Prof. David Vance, Ph.D.',
    confidenceScore: 84,
  },
  {
    id: 'ALERT-004',
    studentId: 'STU-140',
    studentName: 'Sneha Patel',
    studentRoll: '2024-MECH-048',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    department: 'Mechanical & Automation',
    semester: 4,
    priority: 'moderate',
    observedPattern: 'CAD simulation project delay with erratic weekly login hours.',
    supportingData: 'Attendance 74.2%, assignment completion 68%.',
    rootCauseAnalysis: 'Hardware access constraint with personal workstation rendering software.',
    recommendedAction: 'Grant scheduled priority access to high-performance campus CAD workstation cluster.',
    generatedDate: 'Oct 05, 2026',
    status: 'plan_created',
    assignedMentor: 'Prof. Sunita Rao, M.Tech',
    confidenceScore: 86,
  },
  {
    id: 'ALERT-005',
    studentId: 'STU-108',
    studentName: 'Priya Sharma',
    studentRoll: '2024-IT-042',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    department: 'Information Technology',
    semester: 4,
    priority: 'low',
    observedPattern: 'RESOLVED: Post-intervention outcome confirmed. Attendance normalized from 64% to 89% with +24% grade jump.',
    supportingData: 'All pending lab simulations cleared. Internal Assessment 2 score: 78/100.',
    rootCauseAnalysis: 'Resolved medical illness gap with peer-assisted structured milestones.',
    recommendedAction: 'Close active intervention record; maintain bi-weekly routine monitoring.',
    generatedDate: 'Sep 10, 2026 (Updated Oct 08)',
    status: 'acknowledged',
    assignedMentor: 'Sarah Jenkins, LPC',
    confidenceScore: 98,
    subsequentProgress: 'Demonstrating sustained top-quartile performance.',
  },
];

export const INITIAL_INTERVENTIONS: Intervention[] = [
  {
    id: 'INT-2026-001',
    studentId: 'STU-108',
    studentName: 'Priya Sharma',
    studentRoll: '2024-IT-042',
    department: 'Information Technology',
    type: 'academic_tutoring',
    title: 'Peer-Assisted Operating Systems & Lab Recovery',
    description: 'Structured 3-week study plan with Teaching Fellow Rahul V. focusing on process synchronization and laboratory assignments.',
    reason: 'Temporary medical absence in Week 2-3 created conceptual deficit in IT401 and missed laboratory submissions.',
    suggestedBy: 'AI Early Warning Engine & Staff Review',
    assignedMentor: 'Sarah Jenkins, LPC',
    assignedDate: 'Sep 15, 2026',
    targetDate: 'Oct 06, 2026',
    status: 'completed',
    metricsBefore: { attendance: 64, assessmentScore: 54, missingAssignments: 2 },
    metricsAfter: { attendance: 89, assessmentScore: 78, missingAssignments: 0 },
    improvementGoals: [
      'Restore cumulative attendance to ≥ 85%',
      'Clear 2 backlogged IT401 laboratory simulations',
      'Achieve ≥ 75% in Mid-term Exam 2',
    ],
    notes: [
      { id: 'n-01', author: 'Sarah Jenkins, LPC', date: 'Sep 15, 2026', content: 'Met with Priya. Confirmed absence was due to severe flu. Highly motivated to catch up with structured roadmap.' },
      { id: 'n-02', author: 'Prof. David Vance', date: 'Sep 28, 2026', content: 'Priya attended all scheduled tutorial sessions. Lab submissions completed ahead of schedule.' },
      { id: 'n-03', author: 'Sarah Jenkins, LPC', date: 'Oct 06, 2026', content: 'Final review completed. Verified attendance at 89% and test 2 score at 78%. Formal intervention successfully closed.' },
    ],
  },
  {
    id: 'INT-2026-002',
    studentId: 'STU-104',
    studentName: 'Arjun Mehta',
    studentRoll: '2024-CSE-084',
    department: 'Computer Science & Engineering',
    type: 'academic_tutoring',
    title: 'Data Structures Pointer & Recursion Remedial Bootcamp',
    description: 'One-on-one diagnostic walk-through with mentor followed by supervised lab coding for balanced trees.',
    reason: 'Steep drop in attendance (61%) and failure to submit 3 consecutive programming labs.',
    suggestedBy: 'AI Early Warning Engine (ALERT-001)',
    assignedMentor: 'Prof. David Vance, Ph.D.',
    assignedDate: 'Oct 08, 2026',
    targetDate: 'Oct 24, 2026',
    status: 'assigned',
    metricsBefore: { attendance: 61, assessmentScore: 44, missingAssignments: 3 },
    improvementGoals: [
      'Submit Red-Black Tree implementation by Oct 15',
      'Attend mandatory Friday afternoon coding clinics',
      'Achieve ≥ 70% in upcoming Quiz 3',
    ],
    notes: [
      { id: 'n-04', author: 'Prof. David Vance, Ph.D.', date: 'Oct 08, 2026', content: 'Drafted support plan. Meeting scheduled for Friday 2:30 PM in Faculty Office 302.' },
    ],
  },
  {
    id: 'INT-2026-003',
    studentId: 'STU-140',
    studentName: 'Sneha Patel',
    studentRoll: '2024-MECH-048',
    department: 'Mechanical & Automation',
    type: 'workload_review',
    title: 'High-Performance Workstation Access & CAD Milestone Rescheduling',
    description: 'Provide 12 hours/week dedicated high-spec workstation slot in Lab 4 and readjust milestone timeline.',
    reason: 'Personal laptop hardware failure hindered 3D FEA rendering assignments.',
    suggestedBy: 'Department Review Committee',
    assignedMentor: 'Prof. Sunita Rao, M.Tech',
    assignedDate: 'Oct 05, 2026',
    targetDate: 'Oct 20, 2026',
    status: 'in_progress',
    metricsBefore: { attendance: 74, assessmentScore: 68, missingAssignments: 1 },
    improvementGoals: [
      'Complete Phase 1 Finite Element Analysis report',
      'Maintain 80%+ laboratory attendance',
    ],
    notes: [
      { id: 'n-05', author: 'Prof. Sunita Rao', date: 'Oct 06, 2026', content: 'Campus workstation pass issued. Sneha completed initial mesh analysis module.' },
    ],
  },
];

export const DEPARTMENT_METRICS: DepartmentMetric[] = [
  {
    department: 'Computer Science & Engineering',
    code: 'CSE',
    studentCount: 68,
    avgAttendance: 85.4,
    avgCgpa: 8.24,
    assignmentCompletion: 87.2,
    highPriorityCount: 4,
    moderatePriorityCount: 9,
    placementReadiness: 83.5,
  },
  {
    department: 'Data Science & Artificial Intelligence',
    code: 'DSAI',
    studentCount: 45,
    avgAttendance: 83.1,
    avgCgpa: 8.12,
    assignmentCompletion: 81.4, // Bottleneck in DS403
    highPriorityCount: 4,
    moderatePriorityCount: 8,
    placementReadiness: 81.0,
  },
  {
    department: 'Information Technology',
    code: 'IT',
    studentCount: 42,
    avgAttendance: 86.2,
    avgCgpa: 8.08,
    assignmentCompletion: 88.6,
    highPriorityCount: 2,
    moderatePriorityCount: 6,
    placementReadiness: 79.8,
  },
  {
    department: 'Electronics & Communication',
    code: 'ECE',
    studentCount: 32,
    avgAttendance: 81.8,
    avgCgpa: 7.74,
    assignmentCompletion: 80.5,
    highPriorityCount: 2,
    moderatePriorityCount: 5,
    placementReadiness: 73.2,
  },
  {
    department: 'Mechanical & Automation',
    code: 'MECH',
    studentCount: 23,
    avgAttendance: 82.5,
    avgCgpa: 7.62,
    assignmentCompletion: 79.1,
    highPriorityCount: 2,
    moderatePriorityCount: 4,
    placementReadiness: 69.5,
  },
];
