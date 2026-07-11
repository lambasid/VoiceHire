"use client";

import { useParams } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const mockAnalysis = {
  candidate_name: "Patel Parth",
  candidate_summary:
    "Patel Parth is a data professional with experience working at multiple companies and familiarity with Python libraries. He has worked on SQL projects involving large datasets and has experience in networking-related data analysis.",
  criteria_scores: {
    "Communication Skills": 2,
    "Relevant Experience": 3,
    "Technical Knowledge": 2,
    "Cultural Fit": 2,
    "Enthusiasm / Motivation": 2,
    "English Fluency": 3,
  },
  strengths: "Experience with SQL and large datasets, some networking project experience",
  weaknesses: "Difficulty articulating machine learning concepts, discomfort with technical questions, limited enthusiasm",
  sentiment_confidence_analysis:
    "The candidate seemed hesitant and lacked confidence when asked about machine learning. His responses were often brief and he appeared uncomfortable with some technical questions.",
  ai_recommendation:
    "🚩 Weak Fit. While the candidate has some relevant experience, he struggled to articulate his skills clearly and showed reluctance to discuss technical aspects. His lack of enthusiasm suggests he may not be well-suited for the role.",
};

export default function CandidateAnalysisReport() {
  const params = useParams();
  const raw = params.candidateId;
  const candidateId = Array.isArray(raw) ? raw[0] : raw;

  const chartData = useMemo(() => {
    const labels = Object.keys(mockAnalysis.criteria_scores);
    const scores = Object.values(mockAnalysis.criteria_scores);

    return {
      labels,
      datasets: [
        {
          label: "Score (/5)",
          data: scores,
          backgroundColor: "rgba(139, 92, 246, 0.5)",
          borderColor: "rgba(139, 92, 246, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, []);

  const lineChartData = useMemo(() => {
    const labels = Object.keys(mockAnalysis.criteria_scores);
    const scores = Object.values(mockAnalysis.criteria_scores);

    return {
      labels,
      datasets: [
        {
          label: "Performance Over Time",
          data: scores.map((score, idx) => score + (Math.random() * 0.5 - 0.25)),
          fill: false,
          borderColor: "rgba(34,197,94,1)",
          backgroundColor: "rgba(34,197,94,0.2)",
          tension: 0.4,
        },
      ],
    };
  }, []);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Candidate Evaluation Criteria",
          color: "#334155",
          font: { size: 16 },
        },
      },
      scales: {
        x: { ticks: { color: "#64748b" } },
        y: {
          beginAtZero: true,
          max: 5,
          ticks: { stepSize: 1, color: "#64748b" },
          grid: { color: "#e2e8f0" },
        },
      },
    }),
    []
  );

  const lineChartOptions = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#334155",
          },
        },
        title: {
          display: true,
          text: "Candidate Confidence Trend (Simulated)",
          color: "#334155",
          font: { size: 16 },
        },
      },
      scales: {
        x: {
          ticks: { color: "#64748b" },
          grid: { color: "#e2e8f0" },
        },
        y: {
          beginAtZero: true,
          max: 5,
          ticks: { stepSize: 1, color: "#aaa" },
          grid: { color: "#333" },
        },
      },
    }),
    []
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 text-slate-800 bg-white/80 backdrop-blur-md rounded-xl shadow-lg shadow-violet-200/30 mt-4 sm:mt-10 border border-violet-200/60 overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-sky-500 to-rose-500 bg-clip-text text-transparent">AI Screening Report</h1>
      <p className="text-sm text-slate-500 mb-6">
        Candidate ID: {candidateId ?? "—"}
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-slate-800">Candidate: {mockAnalysis.candidate_name}</h2>
        <p className="text-slate-600">{mockAnalysis.candidate_summary}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-violet-700 mb-4">Evaluation Chart</h3>
        <Bar data={chartData} options={chartOptions} />
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-sky-700 mb-4">Web Chart</h3>
        <Line data={lineChartData} options={lineChartOptions} />
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-emerald-700 mb-1">Strengths</h3>
        <p className="text-emerald-600">{mockAnalysis.strengths}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-amber-700 mb-1">Weaknesses</h3>
        <p className="text-amber-600">{mockAnalysis.weaknesses}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-1">Sentiment & Confidence</h3>
        <p className="text-slate-600">{mockAnalysis.sentiment_confidence_analysis}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-rose-700 mb-1">AI Recommendation</h3>
        <p className="text-rose-600">{mockAnalysis.ai_recommendation}</p>
      </section>
    </div>
  );
}
