import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  School, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Mail, 
  KeyRound,
  CheckCircle2,
  Building2,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface DynamicLoginProps {
  onLogin: (user: UserProfile) => void;
}

const ROLE_DATA = {
  student: {
    id: 'student' as UserRole,
    title: 'Student Portal',
    roleLabel: 'Student',
    subtitle: 'Undergraduate & Postgraduate Scholars',
    description: 'Track your personal academic journey, attendance trends, verified technical skills, and tailored AI learning pathways.',
    icon: GraduationCap,
    themeColor: 'from-blue-600 to-indigo-700',
    primaryBg: 'bg-blue-600 hover:bg-blue-700',
    accentText: 'text-blue-600',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Your academic potential, visualized.',
    demoUser: DEMO_USERS.student,
    stats: '2,140+ Active Scholars',
    keyFeatures: ['Personal Journey Timeline', 'Attendance Tracking', 'Skill Badges & Career Roadmap'],
  },
  staff: {
    id: 'staff' as UserRole,
    title: 'Faculty & Mentors',
    roleLabel: 'Faculty Member',
    subtitle: 'Course Instructors & Student Mentors',
    description: 'Monitor assigned cohorts, receive explainable early warnings, assign personalized support plans, and track follow-up progress.',
    icon: Users,
    themeColor: 'from-emerald-600 to-teal-800',
    primaryBg: 'bg-emerald-600 hover:bg-emerald-700',
    accentText: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    heroImage: 'https://images.unsplash.com/photo-1544717297-fa154da09f5b?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Proactive support starts with early signals.',
    demoUser: DEMO_USERS.staff,
    stats: '142 Faculty Mentors Active',
    keyFeatures: ['Explainable Risk Signals', 'Intervention Roadmaps', 'Cohort Submissions Monitor'],
  },
  principal: {
    id: 'principal' as UserRole,
    title: 'Institutional Leadership',
    roleLabel: 'Dean & Principal',
    subtitle: 'Principals, Deans & Department Heads',
    description: 'Access institution-wide metrics, cross-department trends, predictive retention analytics, and automated governance reports.',
    icon: School,
    themeColor: 'from-indigo-700 to-slate-900',
    primaryBg: 'bg-indigo-700 hover:bg-indigo-800',
    accentText: 'text-indigo-700',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Data-driven institutional excellence.',
    demoUser: DEMO_USERS.principal,
    stats: '5 Departments Monitored',
    keyFeatures: ['Institution-Wide Analytics', 'Grounded AI Analyst', 'Executive PDF/CSV Reports'],
  },
  authority: {
    id: 'authority' as UserRole,
    title: 'Counselors & Welfare',
    roleLabel: 'Academic Counselor',
    subtitle: 'Wellbeing Officers & Academic Counselors',
    description: 'Review referred cases with confidentiality controls, record structured counseling notes, and measure longitudinal recovery.',
    icon: ShieldCheck,
    themeColor: 'from-purple-700 to-violet-900',
    primaryBg: 'bg-purple-700 hover:bg-purple-800',
    accentText: 'text-purple-700',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    heroImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Ensuring every student thrives.',
    demoUser: DEMO_USERS.authority,
    stats: '82% Intervention Recovery Rate',
    keyFeatures: ['Confidential Notes Engine', 'Outcome Delta Tracking', 'Attendance Recovery Plans'],
  },
};

export const DynamicLogin: React.FC<DynamicLoginProps> = ({ onLogin }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('principal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const currentRole = ROLE_DATA[activeRole];

  // Quick fill demo user credentials
  const handleQuickFill = (role: UserRole) => {
    setActiveRole(role);
    const demo = ROLE_DATA[role].demoUser;
    setEmail(demo.email);
    setPassword('EduPulse@2026!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In our live app, log in as the selected persona
    const userToLogin = {
      ...currentRole.demoUser,
      email: email || currentRole.demoUser.email,
    };
    onLogin(userToLogin);
  };

  const handleInstantDemoLogin = () => {
    onLogin(currentRole.demoUser);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-3 sm:p-6 selection:bg-indigo-500 selection:text-white">
      {/* Background subtle radial gradient */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.25),rgba(255,255,255,0))]" />

      <div className="relative max-w-6xl w-full min-h-[720px] grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
        
        {/* LEFT HERO PANEL (Dynamic per role) */}
        <div className={`relative lg:col-span-6 flex flex-col justify-between p-8 sm:p-12 text-white bg-gradient-to-br ${currentRole.themeColor} overflow-hidden transition-all duration-700`}>
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={currentRole.heroImage} 
              alt={currentRole.title}
              className="w-full h-full object-cover mix-blend-overlay opacity-30 scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          </div>

          {/* Top Branding */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  EduPulse AI
                  <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-full bg-white/20 text-white/90">v2.4</span>
                </span>
                <p className="text-xs text-white/70">Student Journey Intelligence Platform</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium text-white/95 mb-4 border border-white/15">
              <currentRole.icon className="w-3.5 h-3.5" />
              <span>{currentRole.subtitle}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-white">
              {currentRole.tagline}
            </h1>

            <p className="text-white/80 text-base leading-relaxed max-w-lg mb-6">
              {currentRole.description}
            </p>

            {/* Feature list */}
            <div className="space-y-2 mb-8">
              {currentRole.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Social Proof / Institution info */}
          <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white/90">{currentRole.stats}</p>
              <p className="text-[11px] text-white/60">Apex Institute of Technology & Science</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md text-xs text-white/90 border border-white/10">
              <Building2 className="w-3.5 h-3.5 text-indigo-300" />
              <span>Accredited NAAC A++</span>
            </div>
          </div>
        </div>

        {/* RIGHT LOGIN FORM PANEL */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-slate-900 text-slate-100">
          
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
              Select Your Portal
            </h2>
            <p className="text-slate-400 text-sm">
              Role-based dynamic authentication with pre-configured personas.
            </p>
          </div>

          {/* DYNAMIC ROLE SELECTOR TABS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/60 mb-6">
            {(Object.keys(ROLE_DATA) as UserRole[]).map((roleKey) => {
              const roleItem = ROLE_DATA[roleKey];
              const Icon = roleItem.icon;
              const isActive = activeRole === roleKey;
              return (
                <button
                  key={roleKey}
                  type="button"
                  onClick={() => {
                    setActiveRole(roleKey);
                    setEmail('');
                    setPassword('');
                  }}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 gap-1 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-md scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? currentRole.accentText : 'text-slate-400'}`} />
                  <span className="capitalize">{roleItem.roleLabel.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Quick-fill Persona Preview Card */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/70 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img 
                src={currentRole.demoUser.avatar} 
                alt={currentRole.demoUser.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-slate-600 shrink-0" 
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white truncate">{currentRole.demoUser.name}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                    Demo
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate">{currentRole.demoUser.designation}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleQuickFill(activeRole)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 text-xs font-semibold transition-colors"
              title="Auto-fill test credentials"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Fill Credentials</span>
            </button>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={`name@${activeRole}.edupulse.edu`}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => handleQuickFill(activeRole)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Use test password
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 py-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800 w-4 h-4"
                />
                <span>Remember institutional session</span>
              </label>
              <span className="text-slate-500">SSO Protected</span>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-[0.99] ${currentRole.primaryBg}`}
            >
              <span>Sign In as {currentRole.roleLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Instant Demo Launch */}
          <div className="mt-5 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>Skip typing? Launch immediately:</span>
            <button
              type="button"
              onClick={handleInstantDemoLogin}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-indigo-300 font-semibold border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Instant Demo Access</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
