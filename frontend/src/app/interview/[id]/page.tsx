"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";

const MOCK = {
  profileAnalysis:
    "This is a placeholder AI summary. Set NEXT_PUBLIC_BACKEND_URL and a reachable analyze API to load live data.",
  questions: [
    "How would you approach the main technical challenge for this role?",
    "Describe a time you had to learn something quickly for a project.",
  ],
} as const;

type AnalysisShape = {
  profileAnalysis: string;
  questions: string[];
};

function pickString(data: unknown, keys: string[]): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const o = data as Record<string, unknown>;
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "string" && v.length) return v;
  }
  return undefined;
}

function pickQuestions(data: unknown): string[] | undefined {
  if (!data || typeof data !== "object") return undefined;
  const o = data as Record<string, unknown>;
  const q = o.questions;
  if (!Array.isArray(q)) return undefined;
  return q.filter((x): x is string => typeof x === "string");
}

function normalizeAnalysis(data: unknown): AnalysisShape {
  return {
    profileAnalysis:
      pickString(data, [
        "profileAnalysis",
        "profile_analysis",
        "summary",
        "message",
      ]) ?? MOCK.profileAnalysis,
    questions: pickQuestions(data) ?? [...MOCK.questions],
  };
}

function paramId(raw: string | string[] | undefined): string {
  if (raw === undefined) return "";
  return Array.isArray(raw) ? raw[0] ?? "" : raw;
}

export default function InterviewPage() {
  const params = useParams();
  const candidateId = useMemo(
    () => paramId(params?.id as string | string[] | undefined),
    [params]
  );

  const [analysis, setAnalysis] = useState<AnalysisShape | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!candidateId) {
        setAnalysis(normalizeAnalysis(null));
        setUsingMock(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/perplexity/analyze?candidate_id=${encodeURIComponent(candidateId)}`,
          { method: "GET", cache: "no-store" }
        );
        const data = await response.json().catch(() => null);
        if (cancelled) return;

        if (!response.ok) {
          setAnalysis(normalizeAnalysis(data));
          setUsingMock(true);
        } else {
          setAnalysis(normalizeAnalysis(data));
          setUsingMock(false);
        }
      } catch {
        if (cancelled) return;
        setAnalysis(normalizeAnalysis(null));
        setUsingMock(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [candidateId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-2 border-b-2 border-indigo-500 border-t-transparent" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Analyzing candidate profile…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md dark:border dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-2 text-2xl font-bold">AI interview analysis</h1>
        {usingMock && (
          <p className="mb-4 text-sm text-amber-600 dark:text-amber-500">
            Demo / fallback content — no live response available for this
            request.
          </p>
        )}
        {analysis && (
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <h2 className="mb-2 font-semibold">Profile analysis</h2>
              <p className="text-gray-700 dark:text-gray-300">
                {analysis.profileAnalysis}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <h2 className="mb-2 font-semibold">Suggested questions</h2>
              <ul className="list-inside list-disc space-y-2">
                {analysis.questions.map((q, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
