"use client";

import { use } from "react";
import AppliedCandidatesTable from "@/components/AppliedCandidate";

export default function JobPostingPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Candidates</h1>
          <p className="text-sm text-slate-400 mt-1">
            Review applicants, run first screening, and move top candidates forward.
          </p>
        </div>
      <AppliedCandidatesTable jobId={jobId} />
      </div>
    </div>
  );
}
