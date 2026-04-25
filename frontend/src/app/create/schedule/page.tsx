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
    <div className="min-h-screen bg-background text-foreground px-6 py-10 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">AI interview scheduling</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm"
          >
            + New Interview
          </button>
        </div>

        {interviews.length === 0 ? (
          <p className="text-gray-400">No interviews scheduled.</p>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-[#111] border border-gray-800 rounded p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{interview.candidateName}</h2>
                  <p className="text-sm text-gray-400">{interview.jobTitle}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(interview.datetime).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-blue-400 bg-blue-800/30 px-2 py-1 rounded mr-2">
                    {interview.type} Interview
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      interview.status === 'Scheduled'
                        ? 'bg-green-800/30 text-green-400'
                        : interview.status === 'Pending'
                        ? 'bg-yellow-800/30 text-yellow-400'
                        : 'bg-gray-700 text-gray-300'
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
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-[#111] p-6 rounded w-full max-w-md border border-gray-700">
              <h2 className="text-lg font-bold mb-4">Schedule AI Interview</h2>
              <input
                type="text"
                name="candidateName"
                value={form.candidateName}
                onChange={handleChange}
                placeholder="Candidate Name"
                className="w-full mb-3 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
              />
              <input
                type="text"
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="Job Title"
                className="w-full mb-3 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
              />
              <input
                type="datetime-local"
                name="datetime"
                value={form.datetime}
                onChange={handleChange}
                className="w-full mb-4 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddInterview}
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
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
