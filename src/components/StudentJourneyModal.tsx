import React, { useState } from 'react';
import { 
  X, 
  User, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Plus, 
  FileText, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink,
  Target
} from 'lucide-react';
import { Student, TimelineEvent } from '../types';

interface StudentJourneyModalProps {
  student: Student | null;
  onClose: () => void;
  onCreateIntervention: (student: Student) => void;
}

export const StudentJourneyModal: React.FC<StudentJourneyModalProps> = ({
  student,
  onClose,
  onCreateIntervention,
}) => {
  if (!student) return null;

  const [timelineCategory, setTimelineCategory] = useState<string>('all');
  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'academics' | 'skills' | 'interventions'>('timeline');

  const filteredTimeline = timelineCategory === 'all'
    ? student.timeline
    : student.timeline.filter(e => e.category === timelineCategory);

  const getPriorityBadge = (priority: 'low' | 'moderate' | 'high') => {
    switch (priority) {
      case 'high':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> High Support Priority</span>;
      case 'moderate':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Moderate Support Priority</span>;
      case 'low':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> On Track & Thriving</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* HEADER BAR */}
        <div className="p-6 bg-slate-850 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={student.avatar} 
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-md shrink-0" 
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">{student.name}</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {student.rollNumber}
                </span>
                {getPriorityBadge(student.supportPriority)}
              </div>
              <p className="text-xs text-slate-400">
                {student.department} · Semester {student.semester} ({student.batch}) · Mentor: {student.mentorName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onCreateIntervention(student)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Support Plan</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* METRICS SUMMARY STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900 border-b border-slate-800/80 text-xs">
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
            <span className="text-slate-400 block mb-1">Cumulative CGPA</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-white">{student.cgpa.toFixed(2)}</span>
              <span className="text-[10px] text-slate-400">/ 10.0</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
            <span className="text-slate-400 block mb-1">Attendance Rate</span>
            <div className="flex items-baseline gap-2">
              <span className={`text-xl font-black ${
                student.attendanceRate < 70 ? 'text-rose-400' : (student.attendanceRate < 80 ? 'text-amber-400' : 'text-emerald-400')
              }`}>
                {student.attendanceRate.toFixed(1)}%
              </span>
              <span className="text-[10px] text-slate-400">8-wk avg</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
            <span className="text-slate-400 block mb-1">Assignment Submissions</span>
            <div className="flex items-baseline gap-2">
              <span className={`text-xl font-black ${
                student.assignmentRate < 70 ? 'text-rose-400' : 'text-indigo-400'
              }`}>
                {student.assignmentRate.toFixed(1)}%
              </span>
              <span className="text-[10px] text-slate-400">completion</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
            <span className="text-slate-400 block mb-1">Placement Readiness</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-purple-400">
                {student.careerReadiness.placementIndex}
              </span>
              <span className="text-[10px] text-slate-400">/ 100 Index</span>
            </div>
          </div>
        </div>

        {/* SUB NAVIGATION TABS */}
        <div className="px-6 pt-3 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'timeline', label: 'Student Journey Timeline' },
            { id: 'academics', label: 'Academic Assessments & Attendance' },
            { id: 'skills', label: 'Skills & Career Readiness' },
            { id: 'interventions', label: `Interventions & Support (${student.interventions.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB BODY (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: JOURNEY TIMELINE */}
          {activeSubTab === 'timeline' && (
            <div className="space-y-6">
              
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
                  {['all', 'academic', 'attendance', 'assignment', 'intervention', 'career_milestone'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setTimelineCategory(cat)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all capitalize ${
                        timelineCategory === cat
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <span className="text-xs text-slate-400">
                  Showing {filteredTimeline.length} events across Semesters 1–{student.semester}
                </span>
              </div>

              {/* Strengths & Gaps Callout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Identified Strengths</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {student.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Active Learning Gaps / Support Needs</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {student.learningGaps.map((gap, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400">!</span>
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Vertical Interactive Timeline */}
              <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
                {filteredTimeline.map((item) => {
                  const getImpactDot = (impact?: string) => {
                    switch (impact) {
                      case 'critical': return 'bg-rose-500 ring-rose-950';
                      case 'negative': return 'bg-amber-500 ring-amber-950';
                      case 'positive': return 'bg-emerald-500 ring-emerald-950';
                      default: return 'bg-indigo-500 ring-indigo-950';
                    }
                  };

                  return (
                    <div key={item.id} className="relative group">
                      {/* Timeline Node Dot */}
                      <div className={`absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full ring-4 ${getImpactDot(item.impact)} transition-all`} />

                      <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/60 hover:border-slate-600 transition-colors">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            {item.metric && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-700 text-indigo-300 font-mono">
                                {item.metric}
                              </span>
                            )}
                            <span className="text-[11px] text-slate-400">{item.date}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 2: ACADEMICS & ATTENDANCE */}
          {activeSubTab === 'academics' && (
            <div className="space-y-6">
              
              {/* 8-Week Attendance Trend Visualizer */}
              <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">8-Week Attendance Trajectory</h3>
                    <p className="text-xs text-slate-400">Weekly recorded attendance rate vs institutional 75% threshold</p>
                  </div>
                  <span className="text-xs font-mono text-indigo-400">
                    Latest: {student.weeklyAttendance[student.weeklyAttendance.length - 1]?.attendance}%
                  </span>
                </div>

                {/* Bar chart representation */}
                <div className="grid grid-cols-8 gap-2 items-end h-40 pt-4 border-b border-slate-700/80">
                  {student.weeklyAttendance.map((w) => {
                    const isBelow = w.attendance < 75;
                    return (
                      <div key={w.week} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                        <span className="text-[10px] font-mono text-slate-400 group-hover:text-white transition-colors">
                          {w.attendance}%
                        </span>
                        <div 
                          style={{ height: `${w.attendance}%` }}
                          className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                            isBelow ? 'bg-rose-500 group-hover:bg-rose-400' : 'bg-indigo-600 group-hover:bg-indigo-500'
                          }`}
                        />
                        <span className="text-[10px] font-medium text-slate-400 mt-1">
                          W{w.week}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Subject Assessments Table */}
              <div className="rounded-2xl bg-slate-800/70 border border-slate-700/60 overflow-hidden">
                <div className="p-4 border-b border-slate-700/80">
                  <h3 className="text-sm font-bold text-white">Enrolled Course Assessments</h3>
                  <p className="text-xs text-slate-400">Continuous internal assessments and assignment completion by subject</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-850 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-700">
                      <tr>
                        <th className="p-3">Course</th>
                        <th className="p-3">Credits</th>
                        <th className="p-3">Internal Test 1</th>
                        <th className="p-3">Internal Test 2</th>
                        <th className="p-3">Lab / Assignments</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {student.assessments.map((sub) => (
                        <tr key={sub.code} className="hover:bg-slate-800/40">
                          <td className="p-3">
                            <span className="font-bold text-white block">{sub.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{sub.code}</span>
                          </td>
                          <td className="p-3">{sub.credits}</td>
                          <td className="p-3 font-mono">{sub.internal1}/100</td>
                          <td className="p-3 font-mono">{sub.internal2}/100</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${sub.assignmentCompletion < 70 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                  style={{ width: `${sub.assignmentCompletion}%` }}
                                />
                              </div>
                              <span className="font-mono">{sub.assignmentCompletion}%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            {sub.status === 'critical' ? (
                              <span className="text-rose-400 font-bold">Needs Support</span>
                            ) : sub.status === 'watch' ? (
                              <span className="text-amber-400 font-bold">Watching</span>
                            ) : (
                              <span className="text-emerald-400 font-bold">Strong</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: SKILLS & CAREER READINESS */}
          {activeSubTab === 'skills' && (
            <div className="space-y-6">
              
              {/* Placement Profile Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-800/40 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-purple-300">Target Career Goal</span>
                  <h3 className="text-lg font-black text-white">{student.careerReadiness.targetRole}</h3>
                  <p className="text-xs text-purple-200/80 mt-0.5">
                    Mock Interview Score: {student.careerReadiness.mockInterviewScore}/100 · Resume: {student.careerReadiness.resumeStatus.replace('_', ' ')}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-purple-300 block">Placement Readiness</span>
                  <span className="text-3xl font-black text-white">{student.careerReadiness.placementIndex}</span>
                  <span className="text-xs text-purple-300"> / 100</span>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {student.skills.map((skill, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{skill.name}</span>
                        {skill.verified && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Verified</span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-slate-400">{skill.progress}%</span>
                    </div>

                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mb-2">
                      <div 
                        className="bg-indigo-500 h-full rounded-full transition-all"
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">{skill.level}</span>
                  </div>
                ))}
              </div>

              {/* Recommended Career Paths */}
              <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  AI-Recommended Targeted Upskilling Pathways
                </h4>
                <div className="space-y-2">
                  {student.careerReadiness.recommendedPaths.map((path, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-850 text-xs text-slate-300">
                      <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{path}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: INTERVENTIONS */}
          {activeSubTab === 'interventions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Support Plans & Mentoring History</h3>
                  <p className="text-xs text-slate-400">Formal interventions, session logs, and measurable before/after outcomes</p>
                </div>

                <button
                  onClick={() => onCreateIntervention(student)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Plan</span>
                </button>
              </div>

              {student.interventions.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-800/40 border border-slate-800 text-slate-400">
                  <ShieldCheck className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-xs">No active or historical support interventions recorded for this student.</p>
                </div>
              ) : (
                student.interventions.map((int) => (
                  <div key={int.id} className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/60 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          {int.id} · {int.type.replace('_', ' ')}
                        </span>
                        <h4 className="text-sm font-bold text-white">{int.title}</h4>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                        int.status === 'completed'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                      }`}>
                        {int.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">{int.description}</p>

                    {/* Before vs After Outcome Metrics */}
                    {int.metricsAfter && (
                      <div className="p-3 rounded-xl bg-slate-850 border border-slate-700/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 text-[11px] block">Attendance</span>
                          <div className="flex items-center gap-1.5 font-bold">
                            <span className="text-slate-400 line-through">{int.metricsBefore.attendance}%</span>
                            <span className="text-emerald-400">→ {int.metricsAfter.attendance}%</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block">Internal Exam Score</span>
                          <div className="flex items-center gap-1.5 font-bold">
                            <span className="text-slate-400 line-through">{int.metricsBefore.assessmentScore}%</span>
                            <span className="text-emerald-400">→ {int.metricsAfter.assessmentScore}%</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block">Missing Assignments</span>
                          <div className="flex items-center gap-1.5 font-bold">
                            <span className="text-slate-400 line-through">{int.metricsBefore.missingAssignments}</span>
                            <span className="text-emerald-400">→ {int.metricsAfter.missingAssignments}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Session Notes */}
                    {int.notes && int.notes.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-700/60">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Meeting Logs</span>
                        {int.notes.map((note) => (
                          <div key={note.id} className="p-2.5 rounded-xl bg-slate-850 text-xs text-slate-300">
                            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                              <span className="font-semibold text-slate-300">{note.author}</span>
                              <span>{note.date}</span>
                            </div>
                            <p>{note.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Student ID: {student.id} · Record verified via Apex EduPulse Data Core</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
};
