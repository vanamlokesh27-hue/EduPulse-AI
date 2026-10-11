import React, { useState } from 'react';
import { 
  Briefcase, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  FileText, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Target,
  Code,
  Layers,
  Compass,
  UserCheck
} from 'lucide-react';
import { Student } from '../types';

interface CareerReadinessViewProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

export const CareerReadinessView: React.FC<CareerReadinessViewProps> = ({
  students,
  onSelectStudent,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [readinessFilter, setReadinessFilter] = useState<'all' | 'high' | 'moderate' | 'needs_prep'>('all');

  const filteredStudents = students.filter(s => {
    if (selectedDept !== 'all' && s.department !== selectedDept) return false;
    if (readinessFilter === 'high' && s.careerReadiness.placementIndex < 80) return false;
    if (readinessFilter === 'moderate' && (s.careerReadiness.placementIndex < 60 || s.careerReadiness.placementIndex >= 80)) return false;
    if (readinessFilter === 'needs_prep' && s.careerReadiness.placementIndex >= 60) return false;
    return true;
  });

  const avgReadiness = (filteredStudents.reduce((acc, s) => acc + s.careerReadiness.placementIndex, 0) / (filteredStudents.length || 1)).toFixed(1);

  // Industry skill benchmarks
  const skillBenchmarks = [
    { name: 'Full-Stack Web & Cloud Systems', progress: 78, studentsProficient: 164, demandRating: 'Very High' },
    { name: 'Data Structures & Algorithms (LeetCode/Codeforces)', progress: 68, studentsProficient: 142, demandRating: 'Critical' },
    { name: 'Cloud Infrastructure & Docker / Kubernetes', progress: 52, studentsProficient: 109, demandRating: 'High Growth Gap' },
    { name: 'Relational Database Optimization & SQL Profiling', progress: 64, studentsProficient: 134, demandRating: 'High' },
    { name: 'System Design & Distributed Concurrency', progress: 48, studentsProficient: 98, demandRating: 'Senior Benchmark' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-white">Student Growth & Career Readiness</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Holistic capability intelligence tracking practical coding milestones, industry certifications, mock interviews, and placement preparedness beyond examination marks.
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-purple-950/40 border border-purple-800/60 text-right shrink-0">
          <span className="text-[10px] uppercase font-bold text-purple-300 block">Cohort Placement Index</span>
          <div className="flex items-baseline gap-1.5 justify-end">
            <span className="text-2xl font-black text-white">{avgReadiness}</span>
            <span className="text-xs text-purple-300">/ 100</span>
          </div>
        </div>
      </div>

      {/* TOP SKILL DEMAND BENCHMARKS */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Institutional Skill Mastery Benchmarks</h3>
            <p className="text-xs text-slate-400">Technical competency distribution assessed against campus recruitment criteria</p>
          </div>
          <span className="text-xs font-mono text-purple-400">Industry Aligned</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillBenchmarks.map((sb, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-white leading-tight">{sb.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                  sb.demandRating === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                  sb.demandRating === 'High Growth Gap' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                  'bg-indigo-950 text-indigo-300 border border-indigo-800'
                }`}>
                  {sb.demandRating}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Cohort Proficiency</span>
                <span className="font-mono text-white font-bold">{sb.progress}%</span>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                  style={{ width: `${sb.progress}%` }}
                />
              </div>

              <span className="text-[10px] text-slate-500 block">
                {sb.studentsProficient} / {students.length} students reached benchmark
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STUDENT CAREER PROFILES LIST */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
        
        {/* Filters bar */}
        <div className="p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl border border-slate-700/60">
            {[
              { id: 'all', label: 'All Candidates' },
              { id: 'high', label: 'Placement Ready (≥80)' },
              { id: 'moderate', label: 'In Preparation (60–79)' },
              { id: 'needs_prep', label: 'Needs Career Coaching (<60)' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setReadinessFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  readinessFilter === f.id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <span className="text-slate-400">
            Showing {filteredStudents.length} candidates
          </span>
        </div>

        {/* Student Candidates Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-850 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Candidate</th>
                <th className="p-4">Target Career Goal</th>
                <th className="p-4">Placement Index</th>
                <th className="p-4">Resume Review</th>
                <th className="p-4">Mock Interview</th>
                <th className="p-4">Certifications</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredStudents.slice(0, 20).map((s) => {
                const isHigh = s.careerReadiness.placementIndex >= 80;
                const isLow = s.careerReadiness.placementIndex < 60;

                return (
                  <tr key={s.id} className="hover:bg-slate-800/40">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-white block">{s.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{s.rollNumber} · {s.department.split(' ')[0]}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-semibold text-slate-200">{s.careerReadiness.targetRole}</span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className={`font-mono font-black text-sm ${
                          isHigh ? 'text-purple-400' : isLow ? 'text-rose-400' : 'text-amber-400'
                        }`}>
                          {s.careerReadiness.placementIndex}
                        </span>
                        <span className="text-[10px] text-slate-500">/ 100</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        s.careerReadiness.resumeStatus === 'verified_ready'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : s.careerReadiness.resumeStatus === 'in_review'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {s.careerReadiness.resumeStatus.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-4 font-mono font-bold text-slate-300">
                      {s.careerReadiness.mockInterviewScore}/100
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[10px]">
                        {s.careerReadiness.certificationsCount} Verified
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => onSelectStudent(s)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold transition-colors flex items-center gap-1"
                      >
                        <span>Profile</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
