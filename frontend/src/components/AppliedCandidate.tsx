"use client";

import { useEffect, useState } from "react";
import Loader from "./ui/loader";
import Link from "next/link";
import { FirstScreenFormModal } from "./FirstScreenModal";
import { CalendarDays, Inbox } from "lucide-react";
import { sampleCandidates } from "@/lib/mock-data";
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

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  applied_at: string;
  experience_years: number;
  current_job_title: string;
  current_company: string;
  location: string;
  ai_skill_match_score: number;
  ai_experience_match_score: number;
}

export default function AppliedCandidatesTable({ jobId }: { jobId: string }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingSampleData, setIsUsingSampleData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

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

    const fetchData = async () => {
      try {
        const [jobResponse, candidatesResponse] = await Promise.all([
          fetch(`/api/jobs/${jobId}`),
          fetch(`/api/jobs/${jobId}/all-candidates`),
        ]);

        const resolvedJob = jobResponse.ok ? await jobResponse.json() : fallbackJob;
        const resolvedCandidates = candidatesResponse.ok ? await candidatesResponse.json() : sampleCandidates;

        setJob(resolvedJob);
        if (Array.isArray(resolvedCandidates) && resolvedCandidates.length > 0) {
          setCandidates(resolvedCandidates);
          setIsUsingSampleData(false);
          return;
        }

        setCandidates(sampleCandidates);
        setIsUsingSampleData(true);
      } catch {
        setJob(fallbackJob);
        setCandidates(sampleCandidates);
        setIsUsingSampleData(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  if (isLoading || !job) return (<Loader />);

  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6">
      {showModal && selectedCandidate && job && (
        <FirstScreenFormModal 
          candidate={{
            id: selectedCandidate.id,
            name: selectedCandidate.name,
            email: selectedCandidate.email,
            phone: selectedCandidate.phone,
            status: selectedCandidate.status,
            applied_at: selectedCandidate.applied_at,
            experience_years: selectedCandidate.experience_years,
            current_job_title: selectedCandidate.current_job_title,
            current_company: selectedCandidate.current_company,
            location: selectedCandidate.location,
            ai_skill_match_score: selectedCandidate.ai_skill_match_score,
            ai_experience_match_score: selectedCandidate.ai_experience_match_score,
            job_name: job.title,
            descirption: job.description || job.requirements
          }}
          onClose={() => {
            setShowModal(false);
            setSelectedCandidate(null);
          }}
        />
      )}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-100">Applied candidates</h2>
        {isUsingSampleData && (
          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
            Showing sample candidate data
          </span>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-slate-200">
            <tr>
              <th className="p-3">Candidate</th>
              <th className="p-3">Current role</th>
              <th className="p-3">Match</th>
              <th className="p-3">Status</th>
              <th className="p-3">Applied</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-950/40">
            {candidates.map((c) => (
              <tr key={c.id} className="hover:bg-slate-900/70 transition-colors duration-150">
                <td className="p-3">
                  <Link href={`/create/jobs/${jobId}/candidate/${c.id}`} className="font-medium text-blue-300 hover:text-blue-200">
                    {c.name}
                  </Link>
                  <div className="text-xs text-slate-400">{c.email}</div>
                </td>
                <td className="p-3">
                  <div className="text-slate-200">{c.current_job_title}</div>
                  <div className="text-xs text-slate-400">{c.current_company} - {c.location}</div>
                </td>
                <td className="p-3 text-xs">
                  <div className="text-green-300">Skill {c.ai_skill_match_score}%</div>
                  <div className="text-blue-300">Experience {c.ai_experience_match_score}%</div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    c.status === 'pending' ? 'bg-amber-500/20 text-amber-300' :
                    c.status === 'interviewed' ? 'bg-blue-500/20 text-blue-300' :
                    c.status === 'hired' ? 'bg-emerald-500/20 text-emerald-300' :
                    'bg-slate-500/20 text-slate-300'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-3 text-slate-400">{new Date(c.applied_at).toLocaleDateString()}</td>
                <td className="p-3">
                  <div className="flex flex-wrap justify-end gap-2">
                    <button
                      className="rounded-md border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs text-blue-200 hover:bg-blue-500/20 transition-colors"
                      onClick={() => {
                        setSelectedCandidate(c);
                        setShowModal(true);
                      }}
                    >
                      First screening
                    </button>
                    <Link href={`/create/analysis/${c.id}`} className="rounded-md border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-200 hover:bg-fuchsia-500/20 transition-colors">
                      Analysis
                    </Link>
                    <Link href={`/interview/${c.id}`} className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-500/20 transition-colors inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Schedule
                    </Link>
                    <button
                      className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-slate-200 hover:bg-slate-700 transition-colors"
                      onClick={() => alert(`Feedback sent to ${c.name}`)}
                      aria-label={`Send feedback to ${c.name}`}
                    >
                      <Inbox className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
