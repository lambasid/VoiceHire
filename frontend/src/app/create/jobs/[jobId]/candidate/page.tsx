"use client";

import { use } from "react";
import AppliedCandidatesTable from "@/components/AppliedCandidate";

export default function JobPostingPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  
  return (
    <div className="min-h-screen text-slate-800 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="rounded-2xl border border-violet-200/60 bg-white/80 backdrop-blur-sm px-5 py-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Candidates</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review applicants, run first screening, and move top candidates forward.
          </p>
        </div>
      <AppliedCandidatesTable jobId={jobId} />
      </div>
    </div>
  );
}
