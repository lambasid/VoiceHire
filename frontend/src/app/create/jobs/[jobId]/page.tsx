'use client'
import { use } from 'react';
import JobDetails from "@/components/JobDetails";
import AppliedCandidatesTable from '@/components/AppliedCandidate';
// import AppliedCandidatesTable from '@/components/AllCandidates';

export default function JobPostingPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  
  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-sm text-slate-800 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
      <JobDetails jobId={jobId} />
      <AppliedCandidatesTable jobId={jobId} />
      </div>
    </div>
  );
}
