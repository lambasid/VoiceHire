'use client';

import { useState } from 'react';

interface Interview {
  id: number;
  candidateName: string;
  jobTitle: string;
  datetime: string;
  type: 'AI';
  status: 'Scheduled' | 'Completed' | 'Pending';
}

export default function SchedulePage() {
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: 1,
      candidateName: 'Emily Carter',
      jobTitle: 'Machine Learning Engineer',
      datetime: '2025-04-01T10:00',
      type: 'AI',
      status: 'Scheduled',
    },
    {
      id: 2,
      candidateName: 'Ravi Shah',
      jobTitle: 'Data Scientist',
      datetime: '2025-04-02T14:30',
      type: 'AI',
      status: 'Scheduled',
    },
    {
      id: 3,
      candidateName: 'Ava Thompson',
      jobTitle: 'AI Research Intern',
      datetime: '2025-04-04T09:00',
      type: 'AI',
      status: 'Pending',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    candidateName: '',
    jobTitle: '',
    datetime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddInterview = () => {
    const newInterview: Interview = {
      id: Date.now(),
      candidateName: form.candidateName,
      jobTitle: form.jobTitle,
      datetime: form.datetime,
      type: 'AI',
      status: 'Scheduled',
    };
    setInterviews([...interviews, newInterview]);
    setForm({ candidateName: '', jobTitle: '', datetime: '' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-6 py-6 sm:py-10 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">AI interview scheduling</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-violet-500 to-sky-500 hover:from-violet-600 hover:to-sky-600 shadow shadow-violet-300/30 px-4 py-2 rounded text-white text-sm"
          >
            + New Interview
          </button>
        </div>

        {interviews.length === 0 ? (
          <p className="text-slate-500">No interviews scheduled.</p>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-white/80 backdrop-blur-sm border border-violet-200/60 rounded p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold">{interview.candidateName}</h2>
                  <p className="text-sm text-slate-500">{interview.jobTitle}</p>
                  <p className="text-sm text-slate-400">
                    {new Date(interview.datetime).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end sm:gap-1">
                  <span className="text-xs text-sky-700 bg-sky-100 px-2 py-1 rounded">
                    {interview.type} Interview
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      interview.status === 'Scheduled'
                        ? 'bg-emerald-100 text-emerald-700'
                        : interview.status === 'Pending'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {interview.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded w-full max-w-md border border-violet-200">
              <h2 className="text-lg font-bold mb-4">Schedule AI Interview</h2>
              <input
                type="text"
                name="candidateName"
                value={form.candidateName}
                onChange={handleChange}
                placeholder="Candidate Name"
                className="w-full mb-3 px-3 py-2 bg-white border border-violet-200 rounded text-slate-800 placeholder:text-slate-400"
              />
              <input
                type="text"
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="Job Title"
                className="w-full mb-3 px-3 py-2 bg-white border border-violet-200 rounded text-slate-800 placeholder:text-slate-400"
              />
              <input
                type="datetime-local"
                name="datetime"
                value={form.datetime}
                onChange={handleChange}
                className="w-full mb-4 px-3 py-2 bg-white border border-violet-200 rounded text-slate-800 placeholder:text-slate-400"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddInterview}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-violet-500 to-sky-500 hover:from-violet-600 hover:to-sky-600 shadow shadow-violet-300/30 text-white rounded"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
