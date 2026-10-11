import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  User, 
  Calendar, 
  Target, 
  Plus, 
  FileText, 
  CheckCircle2 
} from 'lucide-react';
import { Student, Intervention, EarlyWarningAlert } from '../types';

interface CreateInterventionModalProps {
  student: Student | null;
  alert?: EarlyWarningAlert | null;
  students: Student[];
  onClose: () => void;
  onSubmit: (intervention: Intervention) => void;
}

export const CreateInterventionModal: React.FC<CreateInterventionModalProps> = ({
  student: initialStudent,
  alert,
  students,
  onClose,
  onSubmit,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    initialStudent ? initialStudent.id : (students[0]?.id || '')
  );

  const selectedStudent = students.find(s => s.id === selectedStudentId) || initialStudent || students[0];

  const [type, setType] = useState<Intervention['type']>(
    alert ? (alert.observedPattern.includes('attendance') ? 'attendance_support' : 'academic_tutoring') : 'academic_tutoring'
  );
  const [title, setTitle] = useState(
    alert ? `Remedial Plan for ${alert.studentName}` : `Academic & Attendance Support Plan`
  );
  const [description, setDescription] = useState(
    alert ? alert.recommendedAction : 'Weekly 1-on-1 diagnostic review sessions and structured milestones to overcome current coursework obstacles.'
  );
  const [reason, setReason] = useState(
    alert ? alert.rootCauseAnalysis : 'Observed decline in attendance or laboratory submissions requiring proactive support.'
  );
  const [assignedMentor, setAssignedMentor] = useState(
    selectedStudent?.mentorName || 'Prof. David Vance, Ph.D.'
  );
  const [targetDate, setTargetDate] = useState('2026-10-31');
  const [goal1, setGoal1] = useState('Raise cumulative attendance to ≥ 75%');
  const [goal2, setGoal2] = useState('Submit all pending laboratory code exercises');
  const [noteContent, setNoteContent] = useState('Initial plan created. Scheduled kickoff meeting with mentee.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const newIntervention: Intervention = {
      id: `INT-2026-${Math.floor(Math.random() * 900 + 100)}`,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      studentRoll: selectedStudent.rollNumber,
      department: selectedStudent.department,
      type,
      title,
      description,
      reason,
      suggestedBy: 'AI Early Warning & Faculty Triage',
      assignedMentor,
      assignedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      targetDate,
      status: 'assigned',
      metricsBefore: {
        attendance: Math.round(selectedStudent.attendanceRate),
        assessmentScore: Math.round(selectedStudent.assessmentAvg),
        missingAssignments: selectedStudent.assignments.filter(a => a.status === 'missing').length || 2,
      },
      improvementGoals: [goal1, goal2].filter(Boolean),
      notes: [
        {
          id: `n-${Date.now()}`,
          author: assignedMentor,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          content: noteContent,
        },
      ],
    };

    onSubmit(newIntervention);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Create Proactive Support Plan</h2>
              <p className="text-xs text-slate-400">Assign structured intervention with measurable improvement milestones</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Student Selector */}
          <div>
            <label className="block font-medium text-slate-300 mb-1">
              Select Target Student
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.rollNumber}) — {s.department} (Att: {s.attendanceRate}%, Risk: {s.supportPriority})
                </option>
              ))}
            </select>
          </div>

          {/* Intervention Type & Target Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">
                Intervention Strategy Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="academic_tutoring">Academic Tutoring & Remedial Sessions</option>
                <option value="attendance_support">Attendance Counseling & Monitoring</option>
                <option value="workload_review">Workload Review & Deadline Adjustment</option>
                <option value="skill_remedial">Skill Gap Coaching / Lab Sandbox</option>
                <option value="counseling_welfare">Wellbeing & Academic Counseling</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">
                Target Resolution Date
              </label>
              <input
                type="date"
                required
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium text-slate-300 mb-1">
              Support Plan Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Observed Reason & Action Description */}
          <div>
            <label className="block font-medium text-slate-300 mb-1">
              Observed Deficit & Supporting Evidence
            </label>
            <textarea
              rows={2}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">
              Prescribed Action & Remedial Steps
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Improvement Goals */}
          <div className="space-y-2">
            <label className="block font-medium text-slate-300">
              Measurable Improvement Goals
            </label>
            <input
              type="text"
              value={goal1}
              onChange={(e) => setGoal1(e.target.value)}
              placeholder="Goal 1: e.g., Restore attendance to ≥ 75%"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500"
            />
            <input
              type="text"
              value={goal2}
              onChange={(e) => setGoal2(e.target.value)}
              placeholder="Goal 2: e.g., Clear 2 backlogged programming exercises"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500"
            />
          </div>

          {/* Initial Meeting Note */}
          <div>
            <label className="block font-medium text-slate-300 mb-1">
              Initial Note / Meeting Log
            </label>
            <input
              type="text"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md shadow-indigo-600/20"
            >
              Assign Support Plan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
