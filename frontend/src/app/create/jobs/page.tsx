'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { briefSampleJobs } from "@/lib/mock-data";
interface JobCard {
  id: string;
  title: string;
  description: string;
  field: string;
}

// const sampleJobs: JobCard[] = [
//   {
//     id: "1",
//     title: "Senior Software Engineer",
//     description: "Join our team to build scalable web applications using modern technologies like React and Node.js",
//     field: "Software Development"
//   },
//   {
//     id: "2",
//     title: "Data Scientist",
//     description: "Work on machine learning models and data analysis to drive business insights",
//     field: "Data Science"
//   },
//   {
//     id: "3",
//     title: "Product Manager",
//     description: "Lead product development initiatives and work closely with engineering teams",
//     field: "Product Management"
//   },
//   {
//     id: "4",
//     title: "UX Designer",
//     description: "Create beautiful and intuitive user interfaces for our digital products",
//     field: "Design"
//   },
//   {
//     id: "5",
//     title: "Business Analyst",
//     description: "Analyze business processes and data to support strategic decision-making",
//     field: "Business Analysis"
//   },
//   {
//     id: "6",
//     title: "Sales Manager",
//     description: "Drive sales growth and manage client relationships to achieve business objectives",
//     field: "Sales"
//   },
//   {
//     id: "7",
//     title: "Marketing Manager",
//     description: "Develop and implement marketing strategies to increase brand awareness and customer engagement",
//     field: "Marketing"
//   },
//   {
//     id: "8",
//     title: "HR Manager",
//     description: "Manage human resource functions and ensure effective workforce planning and development",
//     field: "Human Resources"
//   }
// ];

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/jobs", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text();
      })
      .then((text) => {
        if (text) {
          return JSON.parse(text);
        } else {
          throw new Error('Empty response body');
        }
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
          return;
        }

        setJobs(briefSampleJobs);
      })
      .catch(() => {
        setJobs(briefSampleJobs);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader fullScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-6 backdrop-blur-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Job postings</h1>
              <p className="mt-1 text-sm text-slate-400">Track open roles and review incoming candidates quickly.</p>
            </div>
          <Button>Create screen job</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <Link href={`/create/jobs/${job.id}`} key={job.id}>
              <div className="h-full rounded-xl border border-slate-800 bg-slate-900/80 p-5 text-slate-100 shadow-sm hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-blue-900/20 hover:shadow-lg transition-all duration-200 cursor-pointer">
                <div>
                  <span className="inline-block rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-300 mb-3">
                    {job.field}
                  </span>
                  <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                  <p className="text-sm text-slate-400 line-clamp-3">{job.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
