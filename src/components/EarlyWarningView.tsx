import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Filter, 
  Plus, 
  Search, 
  ChevronRight, 
  Info, 
  ShieldCheck, 
  User, 
  ArrowUpRight, 
  FileCheck, 
  ExternalLink 
} from 'lucide-react';
import { EarlyWarningAlert, Student } from '../types';

interface EarlyWarningViewProps {
  alerts: EarlyWarningAlert[];
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onCreateIntervention: (student: Student, alert?: EarlyWarningAlert) => void;
  onAcknowledgeAlert: (alertId: string) => void;
  onDismissAlert: (alertId: string) => void;
}

export const EarlyWarningView: React.FC<EarlyWarningViewProps> = ({
  alerts,
  students,
  onSelectStudent,
  onCreateIntervention,
  onAcknowledgeAlert,
  onDismissAlert,
}) => {
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'moderate' | 'low'>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter(alert => {
    if (priorityFilter !== 'all' && alert.priority !== priorityFilter) return false;
    if (departmentFilter !== 'all' && alert.department !== departmentFilter) return false;
    if (searchQuery && !alert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) && !alert.studentRoll.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const highPriorityCount = alerts.filter(a => a.priority === 'high').length;
  const modPriorityCount = alerts.filter(a => a.priority === 'moderate').length;

  return (
    <div className="space-y-6">
      
      {/* Title & Philosophy Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-white">AI Early Warning & Triage Engine</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Multi-signal predictive anomaly detection examining attendance decline, missed lab milestones, assessment score delta, and LMS activity velocity. All alerts are 100% explainable decision-support signals.
          </p>
        </div>

        {/* Priority Counts */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-right">
            <span className="text-[10px] uppercase font-bold text-rose-400 block">High Priority</span>
            <span className="text-xl font-black text-rose-300">{highPriorityCount}</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-right">
            <span className="text-[10px] uppercase font-bold text-amber-400 block">Moderate Watch</span>
            <span className="text-xl font-black text-amber-300">{modPriorityCount}</span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Priority Segmented buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl border border-slate-700/60">
          {[
            { id: 'all', label: 'All Alerts' },
            { id: 'high', label: 'High Support Priority' },
            { id: 'moderate', label: 'Moderate Watch' },
            { id: 'low', label: 'Resolved / Low' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setPriorityFilter(p.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                priorityFilter === p.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student in alerts..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* ALERT CARDS LIST */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-400">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-white mb-1">No Alerts Matching Selected Filters</h3>
            <p className="text-xs">All monitored cohorts are operating within healthy support thresholds.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const studentObj = students.find(s => s.id === alert.studentId);
            const isHigh = alert.priority === 'high';
            const isMod = alert.priority === 'moderate';

            return (
              <div 
                key={alert.id}
                className={`p-6 rounded-3xl bg-slate-900 border transition-all ${
                  isHigh 
                    ? 'border-rose-900/60 hover:border-rose-700/80 shadow-lg shadow-rose-950/20' 
                    : isMod
                    ? 'border-amber-900/60 hover:border-amber-700/80'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Top Banner with Student Info & Priority */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={alert.studentAvatar}
                      alt={alert.studentName}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-700 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-white">{alert.studentName}</h3>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {alert.studentRoll}
                        </span>
                        <span className="text-xs text-slate-400">· {alert.department} (Sem {alert.semester})</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>Assigned Mentor: <strong className="text-slate-300">{alert.assignedMentor}</strong></span>
                        <span>·</span>
                        <span>Generated: {alert.generatedDate}</span>
                        <span>·</span>
                        <span className="text-indigo-400 font-mono">Confidence: {alert.confidenceScore}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Priority Tag & Status */}
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      isHigh
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : isMod
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {isHigh ? <AlertTriangle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      <span className="capitalize">{alert.priority} Support Priority</span>
                    </span>

                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 uppercase">
                      {alert.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* EXPLAINABILITY GRID (6 Required Dimensions) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-xs">
                  
                  {/* 1. Observed Pattern */}
                  <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      1. Observed Pattern / Anomaly Signal
                    </span>
                    <p className="text-slate-200 font-medium leading-relaxed">
                      {alert.observedPattern}
                    </p>
                  </div>

                  {/* 2. Supporting Data Evidence */}
                  <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      2. Supporting Data & Metrics
                    </span>
                    <p className="text-slate-300 font-mono leading-relaxed">
                      {alert.supportingData}
                    </p>
                  </div>

                  {/* 3. Root Cause Analysis */}
                  <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      3. Why Pattern Requires Attention (Root Cause)
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {alert.rootCauseAnalysis}
                    </p>
                  </div>

                  {/* 4. Recommended Next Step */}
                  <div className="p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-900/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                      4. Recommended Proactive Next Step
                    </span>
                    <p className="text-indigo-200 leading-relaxed font-medium">
                      {alert.recommendedAction}
                    </p>
                  </div>
                </div>

                {/* 5. Subsequent Progress if recorded */}
                {alert.subsequentProgress && (
                  <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800 text-xs text-slate-300 mb-4 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Subsequent Progress:</strong> {alert.subsequentProgress}</span>
                  </div>
                )}

                {/* ACTION BAR */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert.status !== 'acknowledged' && onAcknowledgeAlert(alert.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold transition-colors"
                    >
                      Acknowledge Alert
                    </button>
                    <button
                      onClick={() => onDismissAlert(alert.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      Dismiss with Note
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {studentObj && (
                      <button
                        onClick={() => onSelectStudent(studentObj)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        <span>View Journey Timeline</span>
                      </button>
                    )}

                    {studentObj && (
                      <button
                        onClick={() => onCreateIntervention(studentObj, alert)}
                        className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create Support Plan</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
