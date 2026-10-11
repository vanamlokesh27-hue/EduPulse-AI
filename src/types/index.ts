export type UserRole = 'student' | 'staff' | 'principal' | 'authority';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  department?: string;
  avatar: string;
  institution: string;
  badge?: string;
}

export interface WeeklyAttendance {
  week: number;
  attendance: number; // percentage 0-100
  studyHours: number;
  date: string;
}

export interface SubjectAssessment {
  code: string;
  name: string;
  credits: number;
  internal1: number; // /100
  internal2: number; // /100
  predictedGrade: string;
  status: 'critical' | 'watch' | 'strong';
  assignmentCompletion: number; // %
}

export interface AssignmentItem {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  dueDate: string;
  submittedDate?: string;
  status: 'submitted' | 'late' | 'missing' | 'pending';
  score?: number;
  maxScore: number;
}

export interface SkillItem {
  name: string;
  category: 'core_technical' | 'emerging_tech' | 'professional' | 'tools';
  progress: number; // 0-100
  verified: boolean;
  level: 'Foundational' | 'Intermediate' | 'Proficient' | 'Advanced';
}

export interface CareerReadiness {
  placementIndex: number; // 0-100
  targetRole: string;
  resumeStatus: 'needs_update' | 'in_review' | 'verified_ready';
  mockInterviewScore: number; // /100
  certificationsCount: number;
  certifications: string[];
  internships: string[];
  recommendedPaths: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  semester: number;
  category: 'academic' | 'attendance' | 'assignment' | 'intervention' | 'career_milestone' | 'milestone';
  title: string;
  description: string;
  metric?: string;
  impact?: 'positive' | 'neutral' | 'negative' | 'critical';
}

export interface InterventionNote {
  id: string;
  author: string;
  date: string;
  content: string;
  isConfidential?: boolean;
}

export interface Intervention {
  id: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  department: string;
  type: 'academic_tutoring' | 'attendance_support' | 'counseling_welfare' | 'skill_remedial' | 'workload_review';
  title: string;
  description: string;
  reason: string;
  suggestedBy: string;
  assignedMentor: string;
  assignedDate: string;
  targetDate: string;
  status: 'suggested' | 'assigned' | 'in_progress' | 'completed' | 'dismissed';
  metricsBefore: {
    attendance: number;
    assessmentScore: number;
    missingAssignments: number;
  };
  metricsAfter?: {
    attendance: number;
    assessmentScore: number;
    missingAssignments: number;
  };
  improvementGoals: string[];
  notes: InterventionNote[];
}

export interface EarlyWarningAlert {
  id: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  studentAvatar: string;
  department: string;
  semester: number;
  priority: 'low' | 'moderate' | 'high';
  observedPattern: string;
  supportingData: string;
  rootCauseAnalysis: string;
  recommendedAction: string;
  generatedDate: string;
  status: 'open' | 'acknowledged' | 'plan_created' | 'dismissed';
  assignedMentor: string;
  subsequentProgress?: string;
  confidenceScore: number; // e.g., 94%
}

export interface StudentGoal {
  id: string;
  title: string;
  category: 'academic' | 'attendance' | 'skill' | 'career';
  targetValue: string;
  currentValue: string;
  deadline: string;
  completed: boolean;
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  avatar: string;
  gender: string;
  department: string;
  semester: number;
  batch: string;
  cgpa: number;
  attendanceRate: number; // overall %
  assignmentRate: number; // %
  assessmentAvg: number; // %
  supportPriority: 'low' | 'moderate' | 'high';
  mentorName: string;
  mentorEmail: string;
  counselorName?: string;
  
  // Detailed modules
  weeklyAttendance: WeeklyAttendance[];
  assessments: SubjectAssessment[];
  assignments: AssignmentItem[];
  skills: SkillItem[];
  careerReadiness: CareerReadiness;
  timeline: TimelineEvent[];
  interventions: Intervention[];
  strengths: string[];
  learningGaps: string[];
  goals: StudentGoal[];
  learningHoursThisMonth: number;
  activeModulesCompleted: number;
  totalCourseModules: number;
}

export interface DepartmentMetric {
  department: string;
  code: string;
  studentCount: number;
  avgAttendance: number;
  avgCgpa: number;
  assignmentCompletion: number;
  highPriorityCount: number;
  moderatePriorityCount: number;
  placementReadiness: number;
}
