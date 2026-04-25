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
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          borderColor: "rgba(59, 130, 246, 1)",
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
          color: "#ccc",
          font: { size: 16 },
        },
      },
      scales: {
        x: { ticks: { color: "#aaa" } },
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

  const lineChartOptions = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#ccc",
          },
        },
        title: {
          display: true,
          text: "Candidate Confidence Trend (Simulated)",
          color: "#ccc",
          font: { size: 16 },
        },
      },
      scales: {
        x: {
          ticks: { color: "#aaa" },
          grid: { color: "#333" },
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
    <div className="max-w-4xl mx-auto p-8 text-gray-200 bg-gray-900 rounded-xl shadow-lg mt-10 border border-gray-700">
      <h1 className="text-3xl font-bold mb-4 text-blue-400">AI Screening Report</h1>
      <p className="text-sm text-gray-500 mb-6">
        Candidate ID: {candidateId ?? "—"}
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Candidate: {mockAnalysis.candidate_name}</h2>
        <p className="text-gray-300">{mockAnalysis.candidate_summary}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Evaluation Chart</h3>
        <Bar data={chartData} options={chartOptions} />
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Web Chart</h3>
        <Line data={lineChartData} options={lineChartOptions} />
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-1">Strengths</h3>
        <p className="text-green-400">{mockAnalysis.strengths}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-1">Weaknesses</h3>
        <p className="text-yellow-400">{mockAnalysis.weaknesses}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-1">Sentiment & Confidence</h3>
        <p className="text-gray-400">{mockAnalysis.sentiment_confidence_analysis}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-300 mb-1">AI Recommendation</h3>
        <p className="text-red-400">{mockAnalysis.ai_recommendation}</p>
      </section>
    </div>
  );
}
