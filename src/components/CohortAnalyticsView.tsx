import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  Compass, 
  Info,
  Calendar,
  Building2,
  Users
} from 'lucide-react';
import { DepartmentMetric, Student } from '../types';
import { DEPARTMENT_METRICS } from '../data/mockData';

interface CohortAnalyticsViewProps {
  students: Student[];
  onSelectStudentById: (studentId: string) => void;
}

export const CohortAnalyticsView: React.FC<CohortAnalyticsViewProps> = ({
  students,
  onSelectStudentById,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('4');

  // Filter students
  const filteredStudents = students.filter(s => {
    if (selectedDept !== 'all' && s.department !== selectedDept) return false;
    if (selectedSemester !== 'all' && s.semester !== parseInt(selectedSemester, 10)) return false;
    return true;
  });

  // Calculate cohort stats
  const totalInCohort = filteredStudents.length;
  const avgAttendance = (filteredStudents.reduce((acc, s) => acc + s.attendanceRate, 0) / (totalInCohort || 1)).toFixed(1);
  const avgCgpa = (filteredStudents.reduce((acc, s) => acc + s.cgpa, 0) / (totalInCohort || 1)).toFixed(2);
  const avgAssignmentRate = (filteredStudents.reduce((acc, s) => acc + s.assignmentRate, 0) / (totalInCohort || 1)).toFixed(1);

  // Subject bottleneck data
  const subjectBottlenecks = [
    {
      code: 'DS403',
      name: 'Advanced Database Systems & Query Optimization',
      department: 'Data Science & Artificial Intelligence',
      nonCompletionRate: 38.5,
      avgMidtermScore: 52,
      criticalTopic: 'B+ Tree Indexing & Query Execution Plans',
      status: 'High Friction',
      recommendedRemedial: '90-min Visual Query Profiling Lab',
    },
    {
      code: 'CS402',
      name: 'Advanced Data Structures & Trees',
      department: 'Computer Science & Engineering',
      nonCompletionRate: 28.0,
      avgMidtermScore: 58,
      criticalTopic: 'Red-Black Tree Balancing & Pointer Logic',
      status: 'Moderate Friction',
      recommendedRemedial: 'Supervised Clinic with Teaching Fellows',
    },
    {
      code: 'EC401',
      name: 'Signals & Systems Analysis',
      department: 'Electronics & Communication',
      nonCompletionRate: 22.4,
      avgMidtermScore: 61,
      criticalTopic: 'Fourier & Laplace Transform Applications',
      status: 'Moderate Friction',
      recommendedRemedial: 'Interactive MATLAB Simulation Module',
    },
    {
      code: 'ME403',
      name: 'Finite Element Analysis (FEA)',
      department: 'Mechanical & Automation',
      nonCompletionRate: 20.8,
      avgMidtermScore: 64,
      criticalTopic: 'Non-linear Mesh Discretization',
      status: 'Watch',
      recommendedRemedial: 'Workstation Access Extension',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-white">Student Pattern & Trend Discovery</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Multi-departmental cross-sectional analytics identifying course friction points, attendance-performance elasticity, and systemic curricular bottlenecks before semester examinations.
          </p>
        </div>

        {/* Global Cohort Selectors */}
        <div className="flex items-center gap-2 shrink-0 text-xs">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All 5 Departments</option>
            {DEPARTMENT_METRICS.map(d => (
              <option key={d.code} value={d.department}>{d.code} ({d.department})</option>
            ))}
          </select>

          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Semesters</option>
            <option value="2">Semester 2</option>
            <option value="4">Semester 4 (Active)</option>
            <option value="6">Semester 6</option>
          </select>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Filtered Cohort Size</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{totalInCohort}</span>
            <span className="text-xs text-slate-500">students</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Cohort Mean Attendance</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">{avgAttendance}%</span>
            <span className="text-xs text-slate-500">threshold ≥ 75%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Mean Academic CGPA</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-indigo-400">{avgCgpa}</span>
            <span className="text-xs text-slate-500">/ 10.0 scale</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Assignment Completion</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-purple-400">{avgAssignmentRate}%</span>
            <span className="text-xs text-slate-500">portfolio rate</span>
          </div>
        </div>
      </div>

      {/* TWO COLUMN: CORRELATION MATRIX & COURSE BOTTLENECK HOTSPOTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: ATTENDANCE VS ASSESSMENT CORRELATION SCATTER */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Attendance vs Examination Score Correlation</h3>
              <p className="text-xs text-slate-400">Statistical correlation coefficient: <strong className="text-indigo-400 font-mono">r = +0.78 (Strong Positive)</strong></p>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
              Regression Line
            </span>
          </div>

          {/* Scatter Chart Representation */}
          <div className="relative h-64 bg-slate-850 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-rows-4 divide-y divide-slate-800/60 pointer-events-none" />

            {/* Regression trendline graphic */}
            <div className="absolute inset-x-8 bottom-8 top-8 pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="10" y1="90" x2="95" y2="15" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Scatter dots */}
            <div className="relative w-full h-full">
              {filteredStudents.slice(0, 48).map((s, idx) => {
                // Map attendance (50-100) to X (0-100%) and CGPA (5-10) to Y (0-100%)
                const xPercent = Math.min(95, Math.max(5, ((s.attendanceRate - 50) / 50) * 90 + 5));
                const yPercent = Math.min(95, Math.max(5, 100 - ((s.cgpa - 5) / 5) * 85));

                const isSpecial = s.id === 'STU-104' || s.id === 'STU-108';

                return (
                  <button
                    key={s.id}
                    onClick={() => onSelectStudentById(s.id)}
                    style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                    className={`absolute w-3.5 h-3.5 -ml-1.5 -mt-1.5 rounded-full transition-transform hover:scale-150 group z-10 ${
                      s.supportPriority === 'high'
                        ? 'bg-rose-500 ring-2 ring-rose-950'
                        : s.supportPriority === 'moderate'
                        ? 'bg-amber-500 ring-2 ring-amber-950'
                        : 'bg-emerald-500 ring-2 ring-emerald-950'
                    }`}
                    title={`${s.name} (${s.rollNumber}): Att: ${s.attendanceRate}%, CGPA: ${s.cgpa}`}
                  >
                    {isSpecial && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/80 text-white whitespace-nowrap">
                        {s.name.split(' ')[0]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Axes Labels */}
            <div className="flex justify-between text-[10px] text-slate-500 pt-2 z-10 font-mono">
              <span>50% Attendance</span>
              <span>75% Minimum Threshold</span>
              <span>100% Attendance</span>
            </div>
          </div>

          {/* Statistical Disclaimer as required by brief */}
          <div className="p-3.5 rounded-2xl bg-slate-850/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed text-slate-400">
              <strong className="text-slate-200">Correlation vs. Causation Principle:</strong> Strong statistical association between attendance and exam marks does not definitively prove causation. Unmeasured factors such as illness, part-time work, or prerequisite gaps frequently drive both signals.
            </p>
          </div>
        </div>

        {/* RIGHT: COURSE BOTTLENECK HOTSPOTS (Scenario B highlighted) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Curricular Friction Bottlenecks</h3>
              <p className="text-xs text-slate-400">Courses with elevated non-completion rates</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">
              Anomaly Radar
            </span>
          </div>

          <div className="space-y-3">
            {subjectBottlenecks.map((sub) => {
              const isTop = sub.code === 'DS403';
              return (
                <div 
                  key={sub.code} 
                  className={`p-4 rounded-2xl border transition-all ${
                    isTop 
                      ? 'bg-amber-950/20 border-amber-800/80 shadow-md shadow-amber-950/20' 
                      : 'bg-slate-850 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-indigo-400">{sub.code}</span>
                        {isTop && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase">
                            Scenario B Hotspot
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-white">{sub.name}</h4>
                      <p className="text-[10px] text-slate-400">{sub.department}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-rose-400 block">
                        {sub.nonCompletionRate}% Missing
                      </span>
                      <span className="text-[10px] text-slate-400">Mean: {sub.avgMidtermScore}%</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                    <span className="text-slate-400">Friction Root: </span>
                    <strong className="text-slate-200">{sub.criticalTopic}</strong>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-indigo-300">
                      <span>Action: {sub.recommendedRemedial}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* DEPARTMENT COMPARISON TABLE */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Cross-Department Performance Benchmark</h3>
            <p className="text-xs text-slate-400">Comparative metrics across all 5 engineering departments</p>
          </div>
          <span className="text-xs text-slate-400">5 Monitored Departments</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-850 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Department</th>
                <th className="p-4">Enrolled Students</th>
                <th className="p-4">Mean Attendance</th>
                <th className="p-4">Mean CGPA</th>
                <th className="p-4">Assignment Completion</th>
                <th className="p-4">High Risk Alerts</th>
                <th className="p-4">Placement Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {DEPARTMENT_METRICS.map(dept => (
                <tr key={dept.code} className="hover:bg-slate-800/40">
                  <td className="p-4">
                    <span className="font-bold text-white block">{dept.department}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Code: {dept.code}</span>
                  </td>
                  <td className="p-4 font-mono">{dept.studentCount}</td>
                  <td className="p-4">
                    <span className={`font-mono font-bold ${
                      dept.avgAttendance < 82 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {dept.avgAttendance}%
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-white">{dept.avgCgpa}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${dept.assignmentCompletion < 82 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                          style={{ width: `${dept.assignmentCompletion}%` }}
                        />
                      </div>
                      <span className="font-mono">{dept.assignmentCompletion}%</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono">
                    <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                      {dept.highPriorityCount} students
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-purple-400">
                    {dept.placementReadiness} / 100
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
