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
    <div className="min-h-screen w-full text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="rounded-2xl border border-violet-200/60 bg-white/70 p-6 backdrop-blur-md shadow-sm shadow-violet-200/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-sky-500 to-rose-500 bg-clip-text text-transparent">Job postings</h1>
              <p className="mt-1 text-sm text-slate-500">Track open roles and review incoming candidates quickly.</p>
            </div>
          <Button className="bg-gradient-to-r from-violet-500 to-sky-500 text-white hover:from-violet-600 hover:to-sky-600 shadow-md shadow-violet-300/40">Create screen job</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {jobs.map((job, i) => {
            const accents = [
              { chipBg: "bg-violet-100", chipText: "text-violet-700", ring: "hover:shadow-violet-300/40 hover:border-violet-300" },
              { chipBg: "bg-sky-100", chipText: "text-sky-700", ring: "hover:shadow-sky-300/40 hover:border-sky-300" },
              { chipBg: "bg-rose-100", chipText: "text-rose-700", ring: "hover:shadow-rose-300/40 hover:border-rose-300" },
              { chipBg: "bg-emerald-100", chipText: "text-emerald-700", ring: "hover:shadow-emerald-300/40 hover:border-emerald-300" },
              { chipBg: "bg-amber-100", chipText: "text-amber-700", ring: "hover:shadow-amber-300/40 hover:border-amber-300" },
            ];
            const a = accents[i % accents.length];
            return (
              <Link href={`/create/jobs/${job.id}`} key={job.id}>
                <div className={`h-full rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5 text-slate-800 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer ${a.ring}`}>
                  <div>
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-3 ${a.chipBg} ${a.chipText}`}>
                      {job.field}
                    </span>
                    <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                    <p className="text-sm text-slate-500 line-clamp-3">{job.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
