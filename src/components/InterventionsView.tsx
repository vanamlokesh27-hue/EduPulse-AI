import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  FileText,
  User,
  Sparkles,
  Lock,
  ChevronRight
} from 'lucide-react';
import { Intervention, Student } from '../types';

interface InterventionsViewProps {
  interventions: Intervention[];
  students: Student[];
  onOpenCreateModal: () => void;
  onUpdateStatus: (interventionId: string, status: Intervention['status']) => void;
  onAddNote: (interventionId: string, noteContent: string, isConfidential?: boolean) => void;
  onSelectStudentById: (studentId: string) => void;
}

export const InterventionsView: React.FC<InterventionsViewProps> = ({
  interventions,
  students,
  onOpenCreateModal,
  onUpdateStatus,
  onAddNote,
  onSelectStudentById,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'assigned' | 'in_progress' | 'completed'>('all');
  const [activeNoteModalIntId, setActiveNoteModalIntId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isConfidentialNote, setIsConfidentialNote] = useState(false);

  const filteredInterventions = interventions.filter(int => {
    if (statusFilter !== 'all' && int.status !== statusFilter) return false;
    return true;
  });

  const completedCount = interventions.filter(i => i.status === 'completed').length;
  const activeCount = interventions.filter(i => i.status === 'assigned' || i.status === 'in_progress').length;

  const handleSaveNote = () => {
    if (!activeNoteModalIntId || !newNoteText.trim()) return;
    onAddNote(activeNoteModalIntId, newNoteText.trim(), isConfidentialNote);
    setNewNoteText('');
    setIsConfidentialNote(false);
    setActiveNoteModalIntId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-white">Intervention & Outcome Tracking Engine</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Connecting identified academic deficits with measurable, proactive support. Track before-and-after metrics, session notes, and longitudinal student progress.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">Recovery Success Rate</span>
            <span className="text-xl font-black text-emerald-300">82.4%</span>
          </div>
          <button
            onClick={onOpenCreateModal}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Support Plan</span>
          </button>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl border border-slate-700/60">
          {[
            { id: 'all', label: `All Plans (${interventions.length})` },
            { id: 'assigned', label: 'Assigned' },
            { id: 'in_progress', label: 'In Progress' },
            { id: 'completed', label: `Completed & Recovered (${completedCount})` },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setStatusFilter(btn.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                statusFilter === btn.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <span className="text-slate-400">
          {activeCount} active plans under faculty monitoring
        </span>
      </div>

      {/* INTERVENTIONS CARDS */}
      <div className="space-y-4">
        {filteredInterventions.map((int) => {
          const isCompleted = int.status === 'completed';
          const isScenarioC = int.studentId === 'STU-108';

          return (
            <div 
              key={int.id}
              className={`p-6 rounded-3xl bg-slate-900 border transition-all ${
                isCompleted 
                  ? 'border-emerald-900/60 hover:border-emerald-700/80' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-indigo-400">{int.id}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">{int.type.replace('_', ' ')}</span>
                    {isScenarioC && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold uppercase">
                        Scenario C Success Showcase
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-extrabold text-white">{int.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span>Target Student:</span>
                    <button
                      onClick={() => onSelectStudentById(int.studentId)}
                      className="text-white hover:text-indigo-300 font-bold underline decoration-dotted"
                    >
                      {int.studentName} ({int.studentRoll})
                    </button>
                    <span>·</span>
                    <span>Mentor: <strong className="text-slate-300">{int.assignedMentor}</strong></span>
                    <span>·</span>
                    <span>Deadline: {int.targetDate}</span>
                  </div>
                </div>

                {/* Status Switcher */}
                <div className="flex items-center gap-2">
                  <select
                    value={int.status}
                    onChange={(e) => onUpdateStatus(int.id, e.target.value as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize border focus:outline-none ${
                      isCompleted 
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                        : 'bg-slate-800 text-indigo-300 border-slate-700'
                    }`}
                  >
                    <option value="assigned">Assigned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed & Verified</option>
                    <option value="dismissed">Dismissed</option>
                  </select>
                </div>
              </div>

              {/* Description & Root Reason */}
              <div className="py-4 space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Underlying Concern: </span>
                  <span className="text-slate-300">{int.reason}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Support Plan: </span>
                  <span className="text-slate-200">{int.description}</span>
                </div>
              </div>

              {/* BEFORE & AFTER METRICS VISUALIZER */}
              <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Measurable Outcome Verification (Pre vs Post Support Delta)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  {/* Attendance Delta */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1 text-[11px]">Attendance Rate</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-slate-400 line-through text-xs font-mono">{int.metricsBefore.attendance}%</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      <span className={`text-base font-black font-mono ${
                        int.metricsAfter && int.metricsAfter.attendance > int.metricsBefore.attendance ? 'text-emerald-400' : 'text-slate-300'
                      }`}>
                        {int.metricsAfter ? `${int.metricsAfter.attendance}%` : 'Monitoring...'}
                      </span>
                      {int.metricsAfter && (
                        <span className="text-[10px] text-emerald-400 font-bold">
                          (+{int.metricsAfter.attendance - int.metricsBefore.attendance}%)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Midterm Score Delta */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1 text-[11px]">Assessment Score</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-slate-400 line-through text-xs font-mono">{int.metricsBefore.assessmentScore}%</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      <span className={`text-base font-black font-mono ${
                        int.metricsAfter && int.metricsAfter.assessmentScore > int.metricsBefore.assessmentScore ? 'text-emerald-400' : 'text-slate-300'
                      }`}>
                        {int.metricsAfter ? `${int.metricsAfter.assessmentScore}%` : 'In Progress'}
                      </span>
                      {int.metricsAfter && (
                        <span className="text-[10px] text-emerald-400 font-bold">
                          (+{int.metricsAfter.assessmentScore - int.metricsBefore.assessmentScore} pts)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Backlogged Submissions */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1 text-[11px]">Missing Assignments</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-slate-400 line-through text-xs font-mono">{int.metricsBefore.missingAssignments}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      <span className={`text-base font-black font-mono ${
                        int.metricsAfter && int.metricsAfter.missingAssignments === 0 ? 'text-emerald-400' : 'text-slate-300'
                      }`}>
                        {int.metricsAfter ? `${int.metricsAfter.missingAssignments} remaining` : `${int.metricsBefore.missingAssignments} pending`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Improvement Goals Checklist */}
              {int.improvementGoals && int.improvementGoals.length > 0 && (
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Milestone Objectives
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {int.improvementGoals.map((g, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-850 text-slate-300">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
                        <span>{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Session Meeting Logs */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Meeting Notes ({int.notes.length})</span>
                  <button
                    onClick={() => setActiveNoteModalIntId(int.id)}
                    className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-750 text-indigo-300 font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log Meeting Note</span>
                  </button>
                </div>

                <button
                  onClick={() => onSelectStudentById(int.studentId)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>View Student Journey</span>
                </button>
              </div>

              {/* Render Existing Notes */}
              {int.notes && int.notes.length > 0 && (
                <div className="mt-3 space-y-2 pt-2 border-t border-slate-800/60">
                  {int.notes.map((note) => (
                    <div key={note.id} className="p-3 rounded-2xl bg-slate-850 text-xs text-slate-300">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-200">
                          <span>{note.author}</span>
                          {note.isConfidential && (
                            <span className="flex items-center gap-1 px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px]">
                              <Lock className="w-3 h-3" /> Confidential
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[10px]">{note.date}</span>
                      </div>
                      <p className="leading-relaxed">{note.content}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* QUICK LOG NOTE MODAL */}
      {activeNoteModalIntId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Log Follow-up Consultation Note</h3>
            <p className="text-xs text-slate-400">Record mentoring discussion outcomes, observed student mindset, and agreed next steps.</p>
            
            <textarea
              rows={4}
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="e.g., Met with student in office. Verified progress on lab assignments; student demonstrated clear understanding of pointer logic..."
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isConfidentialNote}
                onChange={(e) => setIsConfidentialNote(e.target.checked)}
                className="rounded border-slate-700 text-purple-600 focus:ring-purple-500 bg-slate-800"
              />
              <span>Mark as Confidential (Welfare & Counseling access only)</span>
            </label>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800 text-xs">
              <button
                onClick={() => setActiveNoteModalIntId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
              >
                Save Meeting Note
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
