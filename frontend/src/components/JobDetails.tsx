"use client";

import { useEffect, useState } from "react";

interface Job {
  id: string;
  title: string;
  description: string;
  field: string;
  location: string;
  employment_type: string;
  salary_range: string;
  experience_level: string;
  required_skills: string[];
  preferred_skills: string[];
  company_name: string;
  company_website: string;
  application_deadline: string;
  status: string;
  requirements: string;
}

export default function JobDetails({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<Job | null>(null);
  const [isUsingSampleData, setIsUsingSampleData] = useState(false);

  useEffect(() => {
    const fallbackJob: Job = {
      id: jobId,
      title: "Product Engineer",
      description: "Build scalable hiring experiences and AI-powered candidate workflows.",
      field: "Engineering",
      location: "Remote",
      employment_type: "Full-time",
      salary_range: "$120k - $155k",
      experience_level: "Mid-Senior",
      required_skills: ["React", "TypeScript", "Next.js"],
      preferred_skills: ["PostgreSQL", "Node.js"],
      company_name: "VoiceHire",
      company_website: "https://voicehire.example.com",
      application_deadline: new Date().toISOString(),
      status: "open",
      requirements: "Strong product thinking and collaboration skills.",
    };

    fetch(`/api/jobs/${jobId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job details");
        return res.json();
      })
      .then((data) => {
        setJob(data);
        setIsUsingSampleData(false);
      })
      .catch(() => {
        setJob(fallbackJob);
        setIsUsingSampleData(true);
      });
  }, [jobId]);

  if (!job) return <p className="text-gray-400 text-center">Loading job details...</p>;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-300 mb-2">{job.title}</h1>
          <p className="text-slate-400 text-base">{job.description}</p>
        </div>
        {isUsingSampleData && (
          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
            Showing sample job details
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-4 mt-6 text-sm">
        <p><span className="font-semibold text-slate-300">Field:</span> {job.field}</p>
        <p><span className="font-semibold text-slate-300">Location:</span> {job.location}</p>
        <p><span className="font-semibold text-slate-300">Type:</span> {job.employment_type}</p>
        <p><span className="font-semibold text-slate-300">Salary:</span> {job.salary_range}</p>
        <p><span className="font-semibold text-slate-300">Experience:</span> {job.experience_level}</p>
        <p><span className="font-semibold text-slate-300">Status:</span> {job.status}</p>
      </div>
      <div className="mt-6 border-t border-slate-800 pt-4">
        <p className="font-semibold text-slate-300 mb-1">Required skills</p>
        <p className="text-slate-400 text-sm">{job.required_skills.join(", ")}</p>
      </div>
      <div className="mt-4">
        <p className="font-semibold text-slate-300 mb-1">Preferred skills</p>
        <p className="text-slate-400 text-sm">{job.preferred_skills.join(", ")}</p>
      </div>
      <div className="mt-6 border-t border-slate-800 pt-4">
        <p className="font-semibold text-slate-300 mb-1">Company</p>
        <a href={job.company_website} className="text-blue-300 hover:text-blue-200 text-sm underline">
          {job.company_name}
        </a>
      </div>
      <div className="mt-4">
        <p><span className="font-semibold text-slate-300">Deadline:</span> {new Date(job.application_deadline).toDateString()}</p>
      </div>
      <div className="mt-6 border-t border-slate-800 pt-4">
        <p className="font-semibold text-slate-300 mb-1">Additional requirements</p>
        <p className="text-slate-400 text-sm">{job.requirements}</p>
      </div>
    </section>
  );
}
