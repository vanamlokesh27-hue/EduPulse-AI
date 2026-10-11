import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Search, 
  ChevronDown, 
  LogOut, 
  Sparkles, 
  ShieldAlert, 
  BarChart3, 
  UserCheck, 
  GraduationCap, 
  Users, 
  School, 
  ShieldCheck,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface HeaderProps {
  currentUser: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectRole: (role: UserRole) => void;
  onLogout: () => void;
  onTriggerScenario: (scenario: 'A' | 'B' | 'C') => void;
  onResetData: () => void;
  onSearchSelectStudent: (studentId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  unreadAlertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onSelectRole,
  onLogout,
  onTriggerScenario,
  onResetData,
  searchQuery,
  setSearchQuery,
  unreadAlertCount,
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [scenarioDropdownOpen, setScenarioDropdownOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'journeys', label: 'Student Journeys' },
    { id: 'warnings', label: 'Early Warnings', badge: unreadAlertCount },
    { id: 'ai-insights', label: 'AI Analyst', icon: Sparkles },
    { id: 'cohort-analytics', label: 'Cohort Analytics' },
    { id: 'interventions', label: 'Interventions' },
    { id: 'career-readiness', label: 'Career Readiness' },
    { id: 'reports', label: 'Reports' },
    { id: 'csv-settings', label: 'Data & CSV' },
  ];

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'student': return GraduationCap;
      case 'staff': return Users;
      case 'principal': return School;
      case 'authority': return ShieldCheck;
    }
  };

  const CurrentRoleIcon = getRoleIcon(currentUser.role);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-lg">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between border-b border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <strong className="text-white font-medium">Apex Institute of Technology & Science</strong>
            <span className="hidden sm:inline text-slate-500">· Fall Semester 2026</span>
          </span>
          <span className="hidden md:inline px-2 py-0.5 rounded-full bg-slate-800 text-[11px] text-slate-300 border border-slate-700">
            Cohort 2024-28 (Sem 4) Active
          </span>
        </div>

        {/* Quick Demo Scenarios trigger */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setScenarioDropdownOpen(!scenarioDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Demo Scenarios</span>
              <ChevronDown className="w-3 h-3 text-indigo-400" />
            </button>

            {scenarioDropdownOpen && (
              <div 
                className="absolute right-0 mt-1.5 w-72 rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl p-2 z-50 text-left"
                onMouseLeave={() => setScenarioDropdownOpen(false)}
              >
                <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-700/60 mb-1">
                  1-Click Interactive Scenarios
                </div>
                
                <button
                  onClick={() => {
                    onTriggerScenario('A');
                    setScenarioDropdownOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-slate-700/60 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400 group-hover:text-rose-300">
                      Scenario A: Early Detection
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">Alert</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Arjun Mehta: Steep drop in attendance (-27%) and 3 missed DS402 labs.
                  </p>
                </button>

                <button
                  onClick={() => {
                    onTriggerScenario('B');
                    setScenarioDropdownOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-slate-700/60 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 group-hover:text-amber-300">
                      Scenario B: Course Bottleneck
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Cohort</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    DS403 Database Systems: 38.5% non-completion on B+ tree index module.
                  </p>
                </button>

                <button
                  onClick={() => {
                    onTriggerScenario('C');
                    setScenarioDropdownOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-slate-700/60 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                      Scenario C: Positive Outcome
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Success</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Priya Sharma: Peer intervention increased attendance from 64% to 89%.
                  </p>
                </button>

                <div className="pt-1 mt-1 border-t border-slate-700/60">
                  <button
                    onClick={() => {
                      onResetData();
                      setScenarioDropdownOpen(false);
                    }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-700/40 text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Baseline Synthetic Cohort</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-md">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">EduPulse AI</span>
              <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/60">
                Intelligence
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-none hidden sm:block">
              Student Journey Analytics & Intervention System
            </p>
          </div>
        </div>

        {/* Global Student Search */}
        <div className="flex-1 max-w-xs sm:max-w-sm hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student, roll number, course..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Active User Persona & Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-colors text-left"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-600"
              />
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">{currentUser.name}</span>
                  <CurrentRoleIcon className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  {currentUser.role.toUpperCase()}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {/* Persona Switcher Dropdown */}
            {roleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl p-2 z-50 text-left"
                onMouseLeave={() => setRoleDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-700/60 mb-1">
                  Switch Active Persona
                </div>

                {Object.entries(DEMO_USERS).map(([roleKey, profile]) => {
                  const Icon = getRoleIcon(roleKey as UserRole);
                  const isCurrent = currentUser.role === roleKey;
                  return (
                    <button
                      key={roleKey}
                      onClick={() => {
                        onSelectRole(roleKey as UserRole);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-2 rounded-xl transition-colors text-left ${
                        isCurrent ? 'bg-indigo-950/70 text-indigo-300 border border-indigo-800/80' : 'hover:bg-slate-700/50 text-slate-300'
                      }`}
                    >
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold truncate">{profile.name}</span>
                          <Icon className="w-3 h-3 text-indigo-400" />
                        </div>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {profile.designation}
                        </span>
                      </div>
                    </button>
                  );
                })}

                <div className="pt-1.5 mt-1.5 border-t border-slate-700/60">
                  <button
                    onClick={() => {
                      setRoleDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-colors font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out to Portal Selector</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
        <nav className="flex items-center gap-1 py-1.5 min-w-max">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-indigo-700' : 'bg-rose-600 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
