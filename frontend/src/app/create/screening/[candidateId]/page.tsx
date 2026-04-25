"use client";

import { use } from "react";

export default function ScreeningCandidatePage({
  params,
}: {
  params: Promise<{ candidateId: string }>;
}) {
  const { candidateId } = use(params);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-2xl font-semibold">Screening</h1>
      <p className="mt-2 text-muted-foreground">Candidate ID: {candidateId}</p>
    </div>
  );
}
