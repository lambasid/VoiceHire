"use client";

import { useEffect, useState } from "react";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  resume: string;
  experience_years: number;
  current_job_title: string;
  current_company: string;
  location: string;
  linkedin_url: string;
  portfolio_url: string;
  skills: string[];
  certifications: string[];
  education: string;
  status: string;
  notes: string;
  ai_skill_match_score: number;
  ai_experience_match_score: number;
  ai_summary: { summary: string };
}

export default function CandidateProfile({ candidateId }: { candidateId: string }) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/candidates/${candidateId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch candidate details");
        return res.json();
      })
      .then((data) => setCandidate(data))
      .catch((err) => setError(err.message));
  }, [candidateId]);

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!candidate) return <p className="text-slate-500 text-center">Loading candidate profile...</p>;

  return (
    <div className="bg-white/80 backdrop-blur-sm text-slate-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto border border-violet-200">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">{candidate.name}</h1>
      <p className="text-slate-500 mb-1">{candidate.current_job_title} at {candidate.current_company}</p>
      <p className="text-slate-500 mb-4">{candidate.location}</p>

      <div className="grid grid-cols-2 gap-4 border-t border-violet-200 pt-4">
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>Phone:</strong> {candidate.phone}</p>
        <p><strong>Experience:</strong> {candidate.experience_years} years</p>
        <p><strong>Status:</strong> {candidate.status}</p>
        <p><strong>Resume:</strong> <a className="text-sky-600" href={candidate.resume} target="_blank">View</a></p>
        <p><strong>LinkedIn:</strong> <a className="text-sky-600" href={candidate.linkedin_url} target="_blank">Profile</a></p>
        {candidate.portfolio_url && (
          <p><strong>Portfolio:</strong> <a className="text-sky-600" href={candidate.portfolio_url} target="_blank">Website</a></p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg text-slate-700 mb-1">Skills</h3>
        <p className="text-slate-500">{candidate.skills.join(", ")}</p>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-lg text-slate-700 mb-1">Certifications</h3>
        <p className="text-slate-500">{candidate.certifications.join(", ")}</p>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-lg text-slate-700 mb-1">Education</h3>
        <p className="text-slate-500">{candidate.education}</p>
      </div>

      <div className="mt-6 border-t border-violet-200 pt-4">
        <h3 className="font-semibold text-lg text-slate-700 mb-1">AI Summary</h3>
        <p className="text-slate-500">{candidate.ai_summary?.summary}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <p><strong>Skill Match Score:</strong> {candidate.ai_skill_match_score}%</p>
        <p><strong>Experience Score:</strong> {candidate.ai_experience_match_score}%</p>
      </div>

      {candidate.notes && (
        <div className="mt-6 border-t border-violet-200 pt-4">
          <h3 className="font-semibold text-lg text-slate-700 mb-1">Recruiter Notes</h3>
          <p className="text-slate-500">{candidate.notes}</p>
        </div>
      )}
    </div>
  );
}