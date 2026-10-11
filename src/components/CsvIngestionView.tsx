import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Database, 
  Sparkles, 
  RotateCcw,
  Download,
  Info,
  Check
} from 'lucide-react';
import { Student } from '../types';

interface CsvIngestionViewProps {
  onImportStudents: (students: Partial<Student>[]) => void;
  onTriggerScenario: (scenario: 'A' | 'B' | 'C') => void;
  onResetData: () => void;
  totalStudents: number;
}

export const CsvIngestionView: React.FC<CsvIngestionViewProps> = ({
  onImportStudents,
  onTriggerScenario,
  onResetData,
  totalStudents,
}) => {
  const [csvText, setCsvText] = useState('');
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  const sampleCsvTemplate = `rollNumber,name,email,department,semester,cgpa,attendanceRate,assignmentRate,supportPriority,mentorName
2024-CSE-201,Aditya Sharma,aditya.s@student.edupulse.edu,Computer Science & Engineering,4,8.45,86.0,92.0,low,Prof. David Vance
2024-DSAI-202,Kavita Rao,kavita.r@student.edupulse.edu,Data Science & Artificial Intelligence,4,6.20,62.5,58.0,high,Prof. Sunita Rao
2024-IT-203,Siddharth Verma,siddharth.v@student.edupulse.edu,Information Technology,4,7.80,74.0,76.0,moderate,Sarah Jenkins`;

  const handleParseCsv = (rawText: string) => {
    setValidationErrors([]);
    setSuccessMessage('');
    const lines = rawText.trim().split('\n').filter(Boolean);
    if (lines.length < 2) {
      setValidationErrors(['CSV must contain a header row and at least one student data row.']);
      setParsedRows([]);
      return;
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const requiredCols = ['rollNumber', 'name', 'department', 'cgpa', 'attendanceRate', 'supportPriority'];
    const missing = requiredCols.filter(col => !headers.includes(col));
    if (missing.length > 0) {
      setValidationErrors([`Missing required columns: ${missing.join(', ')}`]);
      setParsedRows([]);
      return;
    }

    const rows: any[] = [];
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length !== headers.length) {
        errors.push(`Row ${i + 1} has ${values.length} columns (expected ${headers.length})`);
        continue;
      }
      const obj: any = {};
      headers.forEach((h, idx) => {
        obj[h] = values[idx];
      });

      // Parse types
      obj.cgpa = parseFloat(obj.cgpa) || 7.0;
      obj.attendanceRate = parseFloat(obj.attendanceRate) || 80.0;
      obj.assignmentRate = parseFloat(obj.assignmentRate) || 80.0;
      obj.semester = parseInt(obj.semester, 10) || 4;

      if (!['low', 'moderate', 'high'].includes(obj.supportPriority)) {
        obj.supportPriority = 'low';
      }

      rows.push(obj);
    }

    setValidationErrors(errors);
    setParsedRows(rows);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCsvText(content);
      handleParseCsv(content);
    };
    reader.readAsText(file);
  };

  const handleCommitImport = () => {
    if (parsedRows.length === 0) return;
    onImportStudents(parsedRows);
    setSuccessMessage(`Successfully ingested ${parsedRows.length} student records into EduPulse Core!`);
    setParsedRows([]);
    setCsvText('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-white">Data Ingestion & Demo Scenarios</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Batch import student records with schema validation, test edge case scenarios, or reset active institutional cohorts.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onResetData}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Dataset (210 Students)</span>
          </button>
        </div>
      </div>

      {/* DEMO SCENARIO PRESETS (A, B, C) */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Curated Demonstration Scenarios</span>
          </h3>
          <p className="text-xs text-slate-400">1-click jump to verified end-to-end evaluation journeys</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Scenario A */}
          <div className="p-5 rounded-2xl bg-slate-850 border border-rose-900/40 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  Scenario A
                </span>
                <span className="text-xs font-mono text-rose-400 font-bold">STU-104</span>
              </div>
              <h4 className="text-sm font-bold text-white">Early Detection & Triage</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                <strong>Arjun Mehta</strong>: 4-week attendance decline from 88% down to 61%, 3 missed CS402 Data Structures labs, internal test score dropped -24 points.
              </p>
            </div>

            <button
              onClick={() => onTriggerScenario('A')}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors"
            >
              Launch Scenario A
            </button>
          </div>

          {/* Scenario B */}
          <div className="p-5 rounded-2xl bg-slate-850 border border-amber-900/40 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Scenario B
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold">DS403 Course</span>
              </div>
              <h4 className="text-sm font-bold text-white">Curricular Course Bottleneck</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                <strong>Advanced Database Systems</strong>: 38.5% non-completion rate on B+ tree index module identified across 2nd-year Data Science cohort.
              </p>
            </div>

            <button
              onClick={() => onTriggerScenario('B')}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors"
            >
              Launch Scenario B
            </button>
          </div>

          {/* Scenario C */}
          <div className="p-5 rounded-2xl bg-slate-850 border border-emerald-900/40 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Scenario C
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">STU-108</span>
              </div>
              <h4 className="text-sm font-bold text-white">Support Recovery & Positive Outcome</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                <strong>Priya Sharma</strong>: Peer-assisted mentoring elevated attendance from 64% to 89% and assessment score from 54% to 78%.
              </p>
            </div>

            <button
              onClick={() => onTriggerScenario('C')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
            >
              Launch Scenario C
            </button>
          </div>
        </div>
      </div>

      {/* CSV UPLOADER SECTION */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div>
          <h3 className="text-base font-bold text-white">Batch CSV Data Ingestion</h3>
          <p className="text-xs text-slate-400">
            Upload institutional CSV files to append student profiles, attendance metrics, and risk tags.
          </p>
        </div>

        {/* Drag & Drop or Paste */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-6 text-center transition-colors">
              <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <label className="text-xs font-bold text-white block cursor-pointer">
                <span>Upload CSV File</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-slate-500 mt-1">Drag and drop .csv file here</p>
            </div>

            <button
              onClick={() => {
                setCsvText(sampleCsvTemplate);
                handleParseCsv(sampleCsvTemplate);
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Load Sample Template Data
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Or Paste CSV Raw Text
            </label>
            <textarea
              rows={6}
              value={csvText}
              onChange={(e) => {
                setCsvText(e.target.value);
                handleParseCsv(e.target.value);
              }}
              placeholder="Paste comma-separated rows with header..."
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/60 text-xs text-rose-300 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Validation Issues Detected:</span>
            </div>
            {validationErrors.map((err, i) => (
              <p key={i} className="pl-6">• {err}</p>
            ))}
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/60 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Parsed Preview Table */}
        {parsedRows.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Preview Ingest Records ({parsedRows.length} Validated Rows)
              </h4>
              <button
                onClick={handleCommitImport}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Commit & Ingest Records</span>
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-850 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Roll Number</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Attendance</th>
                    <th className="p-3">CGPA</th>
                    <th className="p-3">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {parsedRows.map((r, i) => (
                    <tr key={i}>
                      <td className="p-3 font-mono">{r.rollNumber}</td>
                      <td className="p-3 font-bold text-white">{r.name}</td>
                      <td className="p-3">{r.department}</td>
                      <td className="p-3 font-mono">{r.attendanceRate}%</td>
                      <td className="p-3 font-mono">{r.cgpa}</td>
                      <td className="p-3 font-bold capitalize">{r.supportPriority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
