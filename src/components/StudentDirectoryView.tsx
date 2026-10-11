import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  User, 
  ChevronRight, 
  Plus, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  GraduationCap 
} from 'lucide-react';
import { Student, DepartmentMetric } from '../types';
import { DEPARTMENT_METRICS } from '../data/mockData';

interface StudentDirectoryViewProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onCreateIntervention: (student: Student) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const StudentDirectoryView: React.FC<StudentDirectoryViewProps> = ({
  students,
  onSelectStudent,
  onCreateIntervention,
  searchQuery,
  setSearchQuery,
}) => {
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredStudents = students.filter(s => {
    if (departmentFilter !== 'all' && s.department !== departmentFilter) return false;
    if (semesterFilter !== 'all' && s.semester !== parseInt(semesterFilter, 10)) return false;
    if (priorityFilter !== 'all' && s.supportPriority !== priorityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.rollNumber.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-white">Student Journey Directory</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Search and inspect complete longitudinal academic histories, continuous 8-week attendance trajectories, assignment completion rates, and active support plans for all 210 students.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
          Showing {filteredStudents.length} of {students.length} Students
        </div>
      </div>

      {/* SEARCH & FILTERS CONTROLS */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative min-w-[260px] flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student by name, roll number, or department..."
            className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Department */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none"
          >
            <option value="all">All Departments</option>
            {DEPARTMENT_METRICS.map(d => (
              <option key={d.code} value={d.department}>{d.code}</option>
            ))}
          </select>

          {/* Semester */}
          <select
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none"
          >
            <option value="all">All Semesters</option>
            <option value="2">Sem 2</option>
            <option value="4">Sem 4 (Active)</option>
            <option value="6">Sem 6</option>
          </select>

          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none"
          >
            <option value="all">All Support Priorities</option>
            <option value="high">High Priority</option>
            <option value="moderate">Moderate Watch</option>
            <option value="low">On Track</option>
          </select>
        </div>
      </div>

      {/* STUDENT DATA TABLE */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-850 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Student Profile</th>
                <th className="p-4">Department & Sem</th>
                <th className="p-4">Cumulative CGPA</th>
                <th className="p-4">Attendance Rate</th>
                <th className="p-4">Assignments</th>
                <th className="p-4">Support Priority</th>
                <th className="p-4">Assigned Mentor</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-500">
                    No student records matching current filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.slice(0, 50).map((s) => {
                  const isHigh = s.supportPriority === 'high';
                  const isMod = s.supportPriority === 'moderate';

                  return (
                    <tr 
                      key={s.id} 
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => onSelectStudent(s)}
                    >
                      {/* Name & Avatar */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.avatar}
                            alt={s.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-white group-hover:text-indigo-300 transition-colors block">
                              {s.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {s.rollNumber}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Dept */}
                      <td className="p-4">
                        <span className="font-semibold text-slate-200 block">{s.department.split(' ')[0]}</span>
                        <span className="text-[10px] text-slate-400">Semester {s.semester}</span>
                      </td>

                      {/* CGPA */}
                      <td className="p-4">
                        <span className="font-mono font-bold text-white">{s.cgpa.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-500 block">/ 10.0</span>
                      </td>

                      {/* Attendance */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold ${
                            s.attendanceRate < 70 ? 'text-rose-400' : (s.attendanceRate < 80 ? 'text-amber-400' : 'text-emerald-400')
                          }`}>
                            {s.attendanceRate.toFixed(1)}%
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500">8-wk avg</span>
                      </td>

                      {/* Assignments */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${s.assignmentRate < 70 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                              style={{ width: `${s.assignmentRate}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px]">{s.assignmentRate.toFixed(0)}%</span>
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-max ${
                          isHigh 
                            ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                            : isMod
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}>
                          {isHigh ? <AlertTriangle className="w-3 h-3" /> : isMod ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                          <span className="capitalize">{s.supportPriority}</span>
                        </span>
                      </td>

                      {/* Mentor */}
                      <td className="p-4 text-slate-400">
                        {s.mentorName.split(',')[0]}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectStudent(s)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors flex items-center gap-1"
                          >
                            <span>Journey</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onCreateIntervention(s)}
                            className="p-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-colors"
                            title="Create Support Plan"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {filteredStudents.length > 50 && (
          <div className="p-4 border-t border-slate-800 text-center text-xs text-slate-400 bg-slate-850">
            Displaying first 50 records. Use filters above to pinpoint specific cohorts.
          </div>
        )}
      </div>

    </div>
  );
};
