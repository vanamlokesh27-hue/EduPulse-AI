import React from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  School, 
  GraduationCap, 
  BarChart3, 
  ChevronRight,
  User
} from 'lucide-react';
import { UserProfile, Student, EarlyWarningAlert, Intervention } from '../types';
import { DEPARTMENT_METRICS } from '../data/mockData';

interface OverviewDashboardProps {
  currentUser: UserProfile;
  students: Student[];
  alerts: EarlyWarningAlert[];
  interventions: Intervention[];
  onSelectStudent: (student: Student) => void;
  onNavigateTab: (tab: string) => void;
  onCreateIntervention: (student: Student, alert?: EarlyWarningAlert) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  currentUser,
  students,
  alerts,
  interventions,
  onSelectStudent,
  onNavigateTab,
  onCreateIntervention,
}) => {
  const total = students.length;
  const avgAttendance = (students.reduce((acc, s) => acc + s.attendanceRate, 0) / total).toFixed(1);
  const avgCgpa = (students.reduce((acc, s) => acc + s.cgpa, 0) / total).toFixed(2);
  const avgAssignment = (students.reduce((acc, s) => acc + s.assignmentRate, 0) / total).toFixed(1);

  const highPriorityAlerts = alerts.filter(a => a.priority === 'high');
  const modPriorityAlerts = alerts.filter(a => a.priority === 'moderate');
  const thrivingCount = students.filter(s => s.supportPriority === 'low').length;

  const pendingInterventions = interventions.filter(i => i.status === 'assigned' || i.status === 'in_progress');

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Institutional Intelligence Overview
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {currentUser.role === 'principal' 
              ? 'Monitoring cross-departmental success metrics, predictive risk signals, and longitudinal intervention recovery for Fall 2026.'
              : currentUser.role === 'staff'
              ? 'Tracking assigned student mentees, continuous lab submissions, and early warning flags for Computer Science cohorts.'
              : 'Managing academic welfare referrals, counseling check-ins, and student recovery tracking with verified access controls.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab('ai-insights')}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI Analyst</span>
          </button>
        </div>
      </div>

      {/* 6 TOP EXECUTIVE METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Total Students */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">Enrolled Cohort</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-white">{total}</span>
            <span className="text-[10px] text-slate-500">Students</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold block mt-1">5 Departments Active</span>
        </div>

        {/* Avg Attendance */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">Mean Attendance</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-emerald-400">{avgAttendance}%</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Target ≥ 80%</span>
        </div>

        {/* Avg CGPA */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">Cohort Mean CGPA</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-indigo-400">{avgCgpa}</span>
            <span className="text-[10px] text-slate-400">/ 10.0</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Passing: 100%</span>
        </div>

        {/* Assignment Completion */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">Assignment Rate</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-purple-400">{avgAssignment}%</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Portfolio Completion</span>
        </div>

        {/* High Support Priority */}
        <div 
          onClick={() => onNavigateTab('warnings')}
          className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/60 cursor-pointer hover:border-rose-700 transition-all"
        >
          <span className="text-[11px] text-rose-300 block mb-1">High Support Need</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-rose-400">{highPriorityAlerts.length}</span>
            <span className="text-[10px] text-rose-300">Alerts</span>
          </div>
          <span className="text-[10px] text-rose-400 font-bold block mt-1">Immediate Triage</span>
        </div>

        {/* On Track & Thriving */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/60">
          <span className="text-[11px] text-emerald-300 block mb-1">On Track / Thriving</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-emerald-400">{thrivingCount}</span>
            <span className="text-[10px] text-emerald-300">({((thrivingCount / total) * 100).toFixed(0)}%)</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Low Support Needed</span>
        </div>

      </div>

      {/* TWO COLUMN GRID: HIGH RISK ALERTS & RECENT AI INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: URGENT EARLY WARNING ALERTS */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>High-Priority Support Triage</span>
                </h3>
                <p className="text-xs text-slate-400">Explainable signals requiring mentor consultation</p>
              </div>

              <button
                onClick={() => onNavigateTab('warnings')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
              >
                <span>View All ({alerts.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {highPriorityAlerts.slice(0, 3).map(alert => {
                const stu = students.find(s => s.id === alert.studentId);
                return (
                  <div key={alert.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={alert.studentAvatar}
                          alt={alert.studentName}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{alert.studentName}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {alert.studentRoll}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">{alert.department}</p>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                        High Priority
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <span className="text-slate-400 font-medium">Observed: </span>
                      <span>{alert.observedPattern}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-indigo-300 font-medium">
                        Next: {alert.recommendedAction.slice(0, 50)}...
                      </span>

                      <div className="flex items-center gap-2">
                        {stu && (
                          <button
                            onClick={() => onSelectStudent(stu)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                          >
                            Timeline
                          </button>
                        )}
                        {stu && (
                          <button
                            onClick={() => onCreateIntervention(stu, alert)}
                            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                          >
                            Support Plan
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Department Breakdown Bar Preview */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Departmental Attendance & CGPA Index</h3>
                <p className="text-xs text-slate-400">Cross-department comparison</p>
              </div>

              <button
                onClick={() => onNavigateTab('cohort-analytics')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
              >
                <span>Cohort Analytics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {DEPARTMENT_METRICS.map(dept => (
                <div key={dept.code} className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-bold">{dept.department}</span>
                    <span className="font-mono text-slate-400">Att: {dept.avgAttendance}% · CGPA: {dept.avgCgpa}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${dept.avgAttendance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: RECENT AI INSIGHTS & INTERVENTIONS OUTCOMES */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AI Insights Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Synthesized AI Insights</span>
                </h3>
                <p className="text-xs text-slate-400">Continuous institutional patterns</p>
              </div>

              <button
                onClick={() => onNavigateTab('ai-insights')}
                className="text-xs text-indigo-400 font-bold hover:underline"
              >
                Open Analyst
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-rose-400 block">Anomaly Detected</span>
                <h4 className="font-bold text-white">Course Friction in DS403</h4>
                <p className="text-slate-300 leading-relaxed">
                  38.5% of students in 2nd-year Data Science missed Assignment #3 on B+ tree index optimization. Organizing a 90-minute hands-on query lab recommended.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">Intervention Impact</span>
                <h4 className="font-bold text-white">82% Recovery on 14-Day Interventions</h4>
                <p className="text-slate-300 leading-relaxed">
                  Support plans assigned within two weeks of attendance decline achieved an 82% recovery rate, compared to 34% when delayed past mid-term examinations.
                </p>
              </div>
            </div>
          </div>

          {/* Pending Interventions & Positive Outcome */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Intervention Outcomes</span>
                </h3>
                <p className="text-xs text-slate-400">Measurable turnaround cases</p>
              </div>

              <button
                onClick={() => onNavigateTab('interventions')}
                className="text-xs text-indigo-400 font-bold hover:underline"
              >
                Manage All
              </button>
            </div>

            <div className="space-y-3">
              {interventions.slice(0, 2).map(int => (
                <div key={int.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white block">{int.title}</span>
                      <span className="text-slate-400 text-[11px]">{int.studentName} · Assigned to: {int.assignedMentor}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      int.status === 'completed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                    }`}>
                      {int.status.replace('_', ' ')}
                    </span>
                  </div>

                  {int.metricsAfter && (
                    <div className="p-2 rounded-xl bg-slate-900 text-[11px] text-emerald-300 flex items-center justify-between">
                      <span>Attendance: {int.metricsBefore.attendance}% → {int.metricsAfter.attendance}%</span>
                      <span>Score: {int.metricsBefore.assessmentScore}% → {int.metricsAfter.assessmentScore}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
