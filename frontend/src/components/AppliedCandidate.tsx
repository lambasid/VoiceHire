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
    <section className="mt-6 rounded-2xl border border-violet-200/60 bg-white/80 backdrop-blur-sm p-4 sm:p-6">
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
        <h2 className="text-xl font-semibold text-slate-800">Applied candidates</h2>
        {isUsingSampleData && (
          <span className="rounded-full border border-sky-300/60 bg-sky-100 px-3 py-1 text-xs text-sky-700">
            Showing sample candidate data
          </span>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-violet-200/60">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-white/80 backdrop-blur-sm text-slate-800">
            <tr>
              <th className="p-3">Candidate</th>
              <th className="p-3">Current role</th>
              <th className="p-3">Match</th>
              <th className="p-3">Status</th>
              <th className="p-3">Applied</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-violet-200/60 bg-white/60">
            {candidates.map((c) => (
              <tr key={c.id} className="hover:bg-violet-50/60 transition-colors duration-150">
                <td className="p-3">
                  <Link href={`/create/jobs/${jobId}/candidate/${c.id}`} className="font-medium text-sky-700 hover:text-sky-900">
                    {c.name}
                  </Link>
                  <div className="text-xs text-slate-500">{c.email}</div>
                </td>
                <td className="p-3">
                  <div className="text-slate-800">{c.current_job_title}</div>
                  <div className="text-xs text-slate-500">{c.current_company} - {c.location}</div>
                </td>
                <td className="p-3 text-xs">
                  <div className="text-emerald-600 font-medium">Skill {c.ai_skill_match_score}%</div>
                  <div className="text-sky-700 font-medium">Experience {c.ai_experience_match_score}%</div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    c.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    c.status === 'interviewed' ? 'bg-sky-100 text-sky-700' :
                    c.status === 'hired' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-3 text-slate-500">{new Date(c.applied_at).toLocaleDateString()}</td>
                <td className="p-3">
                  <div className="flex flex-wrap justify-end gap-2">
                    <button
                      className="rounded-md bg-gradient-to-r from-violet-500 to-sky-500 px-3 py-1 text-xs font-medium text-white shadow-sm shadow-violet-300/40 hover:from-violet-600 hover:to-sky-600 transition-colors"
                      onClick={() => {
                        setSelectedCandidate(c);
                        setShowModal(true);
                      }}
                    >
                      First screening
                    </button>
                    <Link href={`/create/analysis/${c.id}`} className="rounded-md bg-gradient-to-r from-fuchsia-500 to-pink-500 px-3 py-1 text-xs font-medium text-white shadow-sm shadow-pink-300/40 hover:from-fuchsia-600 hover:to-pink-600 transition-colors">
                      Analysis
                    </Link>
                    <Link href={`/interview/${c.id}`} className="rounded-md bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-xs font-medium text-white shadow-sm shadow-emerald-300/40 hover:from-emerald-600 hover:to-teal-600 transition-colors inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Schedule
                    </Link>
                    <button
                      className="rounded-md border border-violet-200 bg-white/80 px-2 py-1 text-slate-700 hover:bg-violet-50 transition-colors"
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
