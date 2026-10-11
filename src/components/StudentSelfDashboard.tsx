import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Plus, 
  Sparkles, 
  Target, 
  TrendingUp, 
  UserCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Student, StudentGoal } from '../types';

interface StudentSelfDashboardProps {
  student: Student;
  onOpenJourney: () => void;
}

export const StudentSelfDashboard: React.FC<StudentSelfDashboardProps> = ({
  student,
  onOpenJourney,
}) => {
  const [goals, setGoals] = useState<StudentGoal[]>(student.goals || []);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [showAddGoal, setShowAddGoal] = useState(false);

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        const next = !g.completed;
        if (next) {
          // Trigger joyful celebration confetti
          try {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
            });
          } catch (e) {
            // ignore if not supported
          }
        }
        return { ...g, completed: next };
      }
      return g;
    }));
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    const newG: StudentGoal = {
      id: `g-${Date.now()}`,
      title: newGoalTitle.trim(),
      category: 'academic',
      targetValue: 'Target Set',
      currentValue: 'In Progress',
      deadline: 'Dec 15, 2026',
      completed: false,
    };
    setGoals(prev => [newG, ...prev]);
    setNewGoalTitle('');
    setShowAddGoal(false);
  };

  // Recommended learning resources
  const recommendedResources = [
    { title: 'Interactive Graph & Tree Visualizer', type: 'Hands-on Lab', link: 'CS402 Diagnostic Sandbox' },
    { title: 'MIT 6.006 Advanced Algorithms Lecture Series', type: 'Video Course', link: 'Week 5 Revision Module' },
    { title: 'AWS Cloud Solutions Architect Practice Exam #3', type: 'Mock Test', link: 'Certification Path' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border border-indigo-800/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/60 shadow-lg shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold">
                Student Scholar Dashboard
              </span>
              <span className="text-xs text-slate-400">Semester {student.semester}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Welcome, {student.name}!</h1>
            <p className="text-xs text-slate-300 mt-1">
              You are currently on track for academic honors. Keep up the high consistency and proactive learning rhythm.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenJourney}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all shrink-0 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>View My Journey Profile</span>
        </button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Cumulative CGPA</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{student.cgpa}</span>
            <span className="text-xs text-emerald-400 font-bold">Top 5%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Overall Attendance</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">{student.attendanceRate}%</span>
            <span className="text-xs text-slate-400">Compliant</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Assignment Submissions</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-indigo-400">{student.assignmentRate}%</span>
            <span className="text-xs text-slate-400">On Time</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Placement Readiness</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-purple-400">{student.careerReadiness.placementIndex}</span>
            <span className="text-xs text-slate-400">/ 100 Index</span>
          </div>
        </div>
      </div>

      {/* TWO COLUMNS: SUBJECT PERFORMANCE & PERSONAL GOALS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: SUBJECT PERFORMANCE & RECENT ASSIGNMENTS */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Subjects */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Subject Mastery & Continuous Evaluation</h3>
                <p className="text-xs text-slate-400">Current internal assessments and predicted grades</p>
              </div>
              <span className="text-xs font-mono text-indigo-400">Sem 4</span>
            </div>

            <div className="space-y-3">
              {student.assessments.map(sub => (
                <div key={sub.code} className="p-4 rounded-2xl bg-slate-850 border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-indigo-400 font-bold block">{sub.code}</span>
                    <h4 className="text-xs font-bold text-white">{sub.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Internal 1: {sub.internal1}/100 · Internal 2: {sub.internal2}/100
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-emerald-400 block">Grade {sub.predictedGrade}</span>
                    <span className="text-[10px] text-slate-400">{sub.assignmentCompletion}% Labs Done</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Course Assignments & Lab Deliverables</h3>
                <p className="text-xs text-slate-400">Track deadlines and review instructor feedback</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {student.assignments.map(asg => (
                <div key={asg.id} className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-white block">{asg.title}</span>
                    <span className="text-[11px] text-slate-400">{asg.subjectName} · Due: {asg.dueDate}</span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                      asg.status === 'submitted' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      asg.status === 'missing' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {asg.status}
                    </span>
                    {asg.score && (
                      <span className="text-[11px] font-mono text-slate-400 block mt-0.5">{asg.score}/{asg.maxScore} pts</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT: PERSONAL GOALS & LEARNING RECOMMENDATIONS */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Personal Goals Checklist */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">My Academic Goals</h3>
                <p className="text-xs text-slate-400">Set personal targets and check them off</p>
              </div>

              <button
                onClick={() => setShowAddGoal(!showAddGoal)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Goal</span>
              </button>
            </div>

            {showAddGoal && (
              <form onSubmit={handleAddGoal} className="p-3 rounded-2xl bg-slate-850 border border-slate-700 space-y-2 text-xs">
                <input
                  type="text"
                  required
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="e.g. Complete 3 LeetCode dynamic programming problems..."
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddGoal(false)}
                    className="px-3 py-1 rounded-lg text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold"
                  >
                    Save Target
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {goals.map(goal => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                    goal.completed
                      ? 'bg-emerald-950/20 border-emerald-900/40 text-slate-400 line-through'
                      : 'bg-slate-850 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${
                      goal.completed ? 'text-emerald-400' : 'text-slate-600'
                    }`} />
                    <span className="truncate">{goal.title}</span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                    {goal.deadline}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommended Learning Resources */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Personalized Study Recommendations</span>
              </h3>
              <p className="text-xs text-slate-400">Tailored modules curated for your strengths and career goals</p>
            </div>

            <div className="space-y-2.5">
              {recommendedResources.map((res, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-400 block">{res.type}</span>
                    <h4 className="font-bold text-white">{res.title}</h4>
                    <span className="text-[11px] text-slate-400">{res.link}</span>
                  </div>

                  <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
