import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Filter, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  Users,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { DepartmentMetric, Student, EarlyWarningAlert, Intervention } from '../types';
import { DEPARTMENT_METRICS } from '../data/mockData';

interface InstitutionalReportsViewProps {
  students: Student[];
  alerts: EarlyWarningAlert[];
  interventions: Intervention[];
}

export const InstitutionalReportsView: React.FC<InstitutionalReportsViewProps> = ({
  students,
  alerts,
  interventions,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('4');
  const [reportType, setReportType] = useState<'executive' | 'interventions' | 'at_risk'>('executive');

  const filteredStudents = students.filter(s => {
    if (selectedDept !== 'all' && s.department !== selectedDept) return false;
    if (selectedSemester !== 'all' && s.semester !== parseInt(selectedSemester, 10)) return false;
    return true;
  });

  const total = filteredStudents.length;
  const avgAttendance = (filteredStudents.reduce((acc, s) => acc + s.attendanceRate, 0) / (total || 1)).toFixed(1);
  const avgCgpa = (filteredStudents.reduce((acc, s) => acc + s.cgpa, 0) / (total || 1)).toFixed(2);
  const avgAssignment = (filteredStudents.reduce((acc, s) => acc + s.assignmentRate, 0) / (total || 1)).toFixed(1);
  const highRiskCount = filteredStudents.filter(s => s.supportPriority === 'high').length;
  const modRiskCount = filteredStudents.filter(s => s.supportPriority === 'moderate').length;
  const onTrackCount = filteredStudents.filter(s => s.supportPriority === 'low').length;

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Roll Number', 'Name', 'Department', 'Semester', 'CGPA', 'Attendance Rate (%)', 'Assignment Completion (%)', 'Support Priority', 'Mentor'];
    const rows = filteredStudents.map(s => [
      s.rollNumber,
      `"${s.name}"`,
      `"${s.department}"`,
      s.semester,
      s.cgpa,
      s.attendanceRate,
      s.assignmentRate,
      s.supportPriority,
      `"${s.mentorName}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EduPulse_Institutional_Report_${selectedDept}_Sem${selectedSemester}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-white">Automated Institutional Reports</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Generate formal academic governance reports for Deans, Academic Councils, and Accreditation bodies. Includes attendance trajectories, intervention outcomes, and risk radar.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-indigo-300 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Dataset</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <Printer className="w-4 h-4" />
            <span>Printable Official PDF</span>
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs print:hidden">
        <div className="flex items-center gap-2">
          <label className="text-slate-400">Department:</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none"
          >
            <option value="all">All Departments</option>
            {DEPARTMENT_METRICS.map(d => (
              <option key={d.code} value={d.department}>{d.code}</option>
            ))}
          </select>

          <label className="text-slate-400 ml-2">Semester:</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none"
          >
            <option value="all">All Semesters</option>
            <option value="2">Semester 2</option>
            <option value="4">Semester 4 (Active Cohort)</option>
            <option value="6">Semester 6</option>
          </select>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl border border-slate-700/60">
          {[
            { id: 'executive', label: 'Executive Academic Summary' },
            { id: 'at_risk', label: 'High Priority Triage Audit' },
            { id: 'interventions', label: 'Intervention Outcomes' },
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setReportType(r.id as any)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                reportType === r.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* PRINTABLE REPORT DOCUMENT CANVAS */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-slate-100 space-y-8 print:bg-white print:text-black print:border-none print:p-0">
        
        {/* Formal Institutional Letterhead */}
        <div className="border-b border-slate-800 pb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl sm:text-2xl font-black text-white print:text-black">APEX INSTITUTE OF TECHNOLOGY & SCIENCE</span>
            </div>
            <p className="text-xs text-slate-400 print:text-slate-600">
              Office of the Dean of Academic Affairs · Student Success & Governance Cell
            </p>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Report Ref: EDU-REP-2026-F4 · Generated on: {new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 print:bg-slate-100 print:text-black print:border-slate-300">
              Official Institutional Audit
            </span>
            <p className="text-[11px] text-slate-400 mt-1">Status: Certified Active</p>
          </div>
        </div>

        {/* Executive Summary Metrics */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 print:text-slate-700">
            1. Executive Institutional Metrics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 print:bg-slate-50 print:border-slate-300">
              <span className="text-[11px] text-slate-400 block mb-1">Enrolled Cohort</span>
              <span className="text-2xl font-black text-white print:text-black">{total}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Students Audited</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 print:bg-slate-50 print:border-slate-300">
              <span className="text-[11px] text-slate-400 block mb-1">Mean Attendance</span>
              <span className="text-2xl font-black text-emerald-400 print:text-emerald-700">{avgAttendance}%</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Threshold: 75%</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 print:bg-slate-50 print:border-slate-300">
              <span className="text-[11px] text-slate-400 block mb-1">Mean Academic CGPA</span>
              <span className="text-2xl font-black text-indigo-400 print:text-indigo-700">{avgCgpa}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">/ 10.0 scale</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 print:bg-slate-50 print:border-slate-300">
              <span className="text-[11px] text-slate-400 block mb-1">Support Triage</span>
              <span className="text-2xl font-black text-rose-400 print:text-rose-700">{highRiskCount}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">High Priority Mentees</span>
            </div>
          </div>
        </div>

        {/* Department Distribution Breakdown */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 print:text-slate-700">
            2. Departmental Academic Distribution
          </h2>
          <div className="rounded-2xl border border-slate-800 overflow-hidden print:border-slate-300">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-850 text-slate-400 uppercase font-semibold border-b border-slate-800 print:bg-slate-100 print:text-black">
                <tr>
                  <th className="p-3">Department</th>
                  <th className="p-3">Cohort Size</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3">CGPA</th>
                  <th className="p-3">High Priority</th>
                  <th className="p-3">Moderate Watch</th>
                  <th className="p-3">On Track</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 print:divide-slate-200 print:text-black">
                {DEPARTMENT_METRICS.map(dept => (
                  <tr key={dept.code}>
                    <td className="p-3 font-bold text-white print:text-black">{dept.department}</td>
                    <td className="p-3 font-mono">{dept.studentCount}</td>
                    <td className="p-3 font-mono">{dept.avgAttendance}%</td>
                    <td className="p-3 font-mono">{dept.avgCgpa}</td>
                    <td className="p-3 font-mono font-bold text-rose-400 print:text-rose-700">{dept.highPriorityCount}</td>
                    <td className="p-3 font-mono font-bold text-amber-400 print:text-amber-700">{dept.moderatePriorityCount}</td>
                    <td className="p-3 font-mono text-emerald-400 print:text-emerald-700">{dept.studentCount - dept.highPriorityCount - dept.moderatePriorityCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* High Priority Follow-up Actions */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 print:text-slate-700">
            3. Students Requiring Mandated Follow-up (High Support Priority)
          </h2>
          <div className="space-y-3">
            {filteredStudents.filter(s => s.supportPriority === 'high').map(student => (
              <div key={student.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-800 print:bg-slate-50 print:border-slate-300 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white print:text-black">{student.name}</span>
                    <span className="font-mono text-slate-400">({student.rollNumber})</span>
                    <span className="text-slate-500">· {student.department}</span>
                  </div>
                  <span className="font-bold text-rose-400 print:text-rose-700">
                    Attendance: {student.attendanceRate}% · CGPA: {student.cgpa}
                  </span>
                </div>
                <p className="text-slate-400 print:text-slate-600">
                  Assigned Mentor: <strong className="text-slate-300 print:text-black">{student.mentorName}</strong> · Learning Gaps: {student.learningGaps.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Signatures Footer */}
        <div className="pt-8 border-t border-slate-800 grid grid-cols-2 gap-8 text-xs text-slate-400 print:text-slate-600">
          <div>
            <div className="h-10 border-b border-slate-700 border-dashed w-48 mb-2" />
            <p className="font-bold text-white print:text-black">Dr. Eleanor Sterling</p>
            <p>Dean of Academic Affairs</p>
          </div>
          <div className="text-right">
            <div className="h-10 border-b border-slate-700 border-dashed w-48 mb-2 ml-auto" />
            <p className="font-bold text-white print:text-black">Prof. David Vance, Ph.D.</p>
            <p>Chair, Student Success Taskforce</p>
          </div>
        </div>

      </div>

    </div>
  );
};
