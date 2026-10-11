import React, { useState } from 'react';
import { 
  UserProfile, 
  UserRole, 
  Student, 
  EarlyWarningAlert, 
  Intervention 
} from './types';
import { 
  DEMO_USERS, 
  INITIAL_STUDENTS, 
  INITIAL_EARLY_WARNING_ALERTS, 
  INITIAL_INTERVENTIONS,
  SCENARIO_A_STUDENT,
  SCENARIO_C_STUDENT,
  DEFAULT_STUDENT_USER
} from './data/mockData';
import { DynamicLogin } from './components/DynamicLogin';
import { Header } from './components/Header';
import { OverviewDashboard } from './components/OverviewDashboard';
import { StudentDirectoryView } from './components/StudentDirectoryView';
import { EarlyWarningView } from './components/EarlyWarningView';
import { AIAnalystView } from './components/AIAnalystView';
import { CohortAnalyticsView } from './components/CohortAnalyticsView';
import { InterventionsView } from './components/InterventionsView';
import { CareerReadinessView } from './components/CareerReadinessView';
import { InstitutionalReportsView } from './components/InstitutionalReportsView';
import { CsvIngestionView } from './components/CsvIngestionView';
import { StudentJourneyModal } from './components/StudentJourneyModal';
import { CreateInterventionModal } from './components/CreateInterventionModal';
import { StudentSelfDashboard } from './components/StudentSelfDashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEMO_USERS.principal);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Application Data Core
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [alerts, setAlerts] = useState<EarlyWarningAlert[]>(INITIAL_EARLY_WARNING_ALERTS);
  const [interventions, setInterventions] = useState<Intervention[]>(INITIAL_INTERVENTIONS);

  // Modals & Navigation State
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<Student | null>(null);
  const [interventionModalTarget, setInterventionModalTarget] = useState<{ student: Student; alert?: EarlyWarningAlert } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle Login
  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setActiveTab('overview');
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Quick Switch Active Persona
  const handleSelectRole = (role: UserRole) => {
    const nextUser = DEMO_USERS[role];
    setCurrentUser(nextUser);
    setActiveTab('overview');
  };

  // 1-Click Demo Scenarios Trigger
  const handleTriggerScenario = (scenario: 'A' | 'B' | 'C') => {
    if (scenario === 'A') {
      // Scenario A: Early detection alert for Arjun Mehta
      setActiveTab('warnings');
      const arjun = students.find(s => s.id === 'STU-104') || SCENARIO_A_STUDENT;
      setSelectedStudentForModal(arjun);
    } else if (scenario === 'B') {
      // Scenario B: Institutional Course Bottleneck (DS403)
      setActiveTab('cohort-analytics');
    } else if (scenario === 'C') {
      // Scenario C: Positive recovery outcome for Priya Sharma
      setActiveTab('interventions');
      const priya = students.find(s => s.id === 'STU-108') || SCENARIO_C_STUDENT;
      setSelectedStudentForModal(priya);
    }
  };

  // Reset Data to baseline
  const handleResetData = () => {
    setStudents(INITIAL_STUDENTS);
    setAlerts(INITIAL_EARLY_WARNING_ALERTS);
    setInterventions(INITIAL_INTERVENTIONS);
  };

  // Open Student Journey by ID (used by AI Analyst or Table)
  const handleSelectStudentById = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      setSelectedStudentForModal(student);
    }
  };

  // Early Warning Alert Actions
  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'acknowledged' } : a));
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'dismissed' } : a));
  };

  // Interventions Updates
  const handleUpdateInterventionStatus = (interventionId: string, status: Intervention['status']) => {
    setInterventions(prev => prev.map(i => i.id === interventionId ? { ...i, status } : i));
  };

  const handleAddInterventionNote = (interventionId: string, content: string, isConfidential?: boolean) => {
    const newNote = {
      id: `n-${Date.now()}`,
      author: currentUser?.name || 'Faculty Mentor',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      content,
      isConfidential,
    };

    setInterventions(prev => prev.map(i => {
      if (i.id === interventionId) {
        return { ...i, notes: [...i.notes, newNote] };
      }
      return i;
    }));
  };

  // Create Support Plan Submit
  const handleCreateSupportPlan = (newPlan: Intervention) => {
    setInterventions(prev => [newPlan, ...prev]);
    // Also attach to student's record
    setStudents(prev => prev.map(s => {
      if (s.id === newPlan.studentId) {
        return {
          ...s,
          interventions: [newPlan, ...s.interventions],
        };
      }
      return s;
    }));
    // Mark alert as plan_created if applicable
    if (interventionModalTarget?.alert) {
      const alertId = interventionModalTarget.alert.id;
      setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'plan_created' } : a));
    }
    setInterventionModalTarget(null);
    setActiveTab('interventions');
  };

  // Batch CSV Ingestion
  const handleImportStudents = (importedRows: Partial<Student>[]) => {
    const newStudents: Student[] = importedRows.map((row, idx) => ({
      id: `STU-IMP-${Date.now()}-${idx}`,
      rollNumber: row.rollNumber || `2024-CSE-${Math.floor(Math.random() * 800 + 100)}`,
      name: row.name || 'Enrolled Student',
      email: row.email || `student.${idx}@edupulse.edu`,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`,
      gender: 'Unspecified',
      department: row.department || 'Computer Science & Engineering',
      semester: row.semester || 4,
      batch: '2024-2028',
      cgpa: row.cgpa || 7.5,
      attendanceRate: row.attendanceRate || 80.0,
      assignmentRate: row.assignmentRate || 80.0,
      assessmentAvg: row.assessmentAvg || 75.0,
      supportPriority: row.supportPriority || 'low',
      mentorName: row.mentorName || 'Prof. David Vance, Ph.D.',
      mentorEmail: 'd.vance@faculty.edupulse.edu',
      learningHoursThisMonth: 25,
      activeModulesCompleted: 10,
      totalCourseModules: 18,
      strengths: ['Curricular Foundations', 'Practical Application'],
      learningGaps: ['Elective Deep-Dive'],
      weeklyAttendance: [
        { week: 1, attendance: 85, studyHours: 20, date: 'Week 1' },
        { week: 2, attendance: 82, studyHours: 20, date: 'Week 2' },
        { week: 3, attendance: row.attendanceRate || 80, studyHours: 20, date: 'Week 3' },
      ],
      assessments: [
        { code: 'CORE401', name: 'Core Foundations', credits: 4, internal1: 75, internal2: 78, predictedGrade: 'A', status: 'strong', assignmentCompletion: 85 },
      ],
      assignments: [
        { id: `asg-imp-${idx}`, title: 'Practical Milestone I', subjectCode: 'CORE401', subjectName: 'Core Lab', dueDate: 'Nov 01, 2026', status: 'submitted', maxScore: 50 },
      ],
      skills: [
        { name: 'Core Problem Solving', category: 'core_technical', progress: 75, verified: true, level: 'Proficient' },
      ],
      careerReadiness: {
        placementIndex: 75,
        targetRole: 'Engineering Associate',
        resumeStatus: 'verified_ready',
        mockInterviewScore: 75,
        certificationsCount: 1,
        certifications: ['Foundational Credential'],
        internships: [],
        recommendedPaths: ['Practice Modules'],
      },
      timeline: [
        { id: `tm-imp-${idx}`, date: 'Oct 01, 2026', semester: 4, category: 'academic', title: 'Imported Record Confirmed', description: 'Student profile verified through batch CSV ingestion.', impact: 'positive' }
      ],
      interventions: [],
      goals: [],
    }));

    setStudents(prev => [...newStudents, ...prev]);
  };

  // If not logged in, show the dynamic login UI
  if (!currentUser) {
    return <DynamicLogin onLogin={handleLogin} />;
  }

  const unreadAlertCount = alerts.filter(a => a.status === 'open').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Header & Navigation */}
      <Header
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectRole={handleSelectRole}
        onLogout={handleLogout}
        onTriggerScenario={handleTriggerScenario}
        onResetData={handleResetData}
        onSearchSelectStudent={handleSelectStudentById}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        unreadAlertCount={unreadAlertCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          currentUser.role === 'student' ? (
            <StudentSelfDashboard
              student={students.find(s => s.id === 'STU-101') || DEFAULT_STUDENT_USER}
              onOpenJourney={() => setSelectedStudentForModal(students.find(s => s.id === 'STU-101') || DEFAULT_STUDENT_USER)}
            />
          ) : (
            <OverviewDashboard
              currentUser={currentUser}
              students={students}
              alerts={alerts}
              interventions={interventions}
              onSelectStudent={(stu) => setSelectedStudentForModal(stu)}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onCreateIntervention={(stu, alert) => setInterventionModalTarget({ student: stu, alert })}
            />
          )
        )}

        {/* STUDENT JOURNEYS DIRECTORY */}
        {activeTab === 'journeys' && (
          <StudentDirectoryView
            students={students}
            onSelectStudent={(stu) => setSelectedStudentForModal(stu)}
            onCreateIntervention={(stu) => setInterventionModalTarget({ student: stu })}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* EARLY WARNING SYSTEM */}
        {activeTab === 'warnings' && (
          <EarlyWarningView
            alerts={alerts}
            students={students}
            onSelectStudent={(stu) => setSelectedStudentForModal(stu)}
            onCreateIntervention={(stu, alert) => setInterventionModalTarget({ student: stu, alert })}
            onAcknowledgeAlert={handleAcknowledgeAlert}
            onDismissAlert={handleDismissAlert}
          />
        )}

        {/* AI JOURNEY ANALYST */}
        {activeTab === 'ai-insights' && (
          <AIAnalystView
            students={students}
            onSelectStudentById={handleSelectStudentById}
          />
        )}

        {/* COHORT ANALYTICS */}
        {activeTab === 'cohort-analytics' && (
          <CohortAnalyticsView
            students={students}
            onSelectStudentById={handleSelectStudentById}
          />
        )}

        {/* INTERVENTIONS & OUTCOMES */}
        {activeTab === 'interventions' && (
          <InterventionsView
            interventions={interventions}
            students={students}
            onOpenCreateModal={() => setInterventionModalTarget({ student: students[0] })}
            onUpdateStatus={handleUpdateInterventionStatus}
            onAddNote={handleAddInterventionNote}
            onSelectStudentById={handleSelectStudentById}
          />
        )}

        {/* CAREER READINESS */}
        {activeTab === 'career-readiness' && (
          <CareerReadinessView
            students={students}
            onSelectStudent={(stu) => setSelectedStudentForModal(stu)}
          />
        )}

        {/* INSTITUTIONAL REPORTS */}
        {activeTab === 'reports' && (
          <InstitutionalReportsView
            students={students}
            alerts={alerts}
            interventions={interventions}
          />
        )}

        {/* CSV INGESTION & DATA SETTINGS */}
        {activeTab === 'csv-settings' && (
          <CsvIngestionView
            onImportStudents={handleImportStudents}
            onTriggerScenario={handleTriggerScenario}
            onResetData={handleResetData}
            totalStudents={students.length}
          />
        )}

      </main>

      {/* UNIFIED STUDENT JOURNEY PROFILE MODAL */}
      {selectedStudentForModal && (
        <StudentJourneyModal
          student={selectedStudentForModal}
          onClose={() => setSelectedStudentForModal(null)}
          onCreateIntervention={(stu) => {
            setSelectedStudentForModal(null);
            setInterventionModalTarget({ student: stu });
          }}
        />
      )}

      {/* CREATE INTERVENTION MODAL */}
      {interventionModalTarget && (
        <CreateInterventionModal
          student={interventionModalTarget.student}
          alert={interventionModalTarget.alert}
          students={students}
          onClose={() => setInterventionModalTarget(null)}
          onSubmit={handleCreateSupportPlan}
        />
      )}

    </div>
  );
}
