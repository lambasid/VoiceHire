export interface MockJob {
  id: string;
  title: string;
  description: string;
  field: string;
}

export interface MockCandidate {
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

export const briefSampleJobs: MockJob[] = [
  {
    id: "101",
    title: "Senior Frontend Engineer",
    description: "Build performant user-facing workflows for recruiting automation products.",
    field: "Engineering",
  },
  {
    id: "102",
    title: "Product Designer",
    description: "Design intuitive candidate pipelines with strong UX research and prototyping.",
    field: "Design",
  },
  {
    id: "103",
    title: "Talent Operations Lead",
    description: "Scale interview operations, reporting, and stakeholder communication.",
    field: "Operations",
  },
];

export const sampleCandidates: MockCandidate[] = [
  {
    id: "c-201",
    name: "Maya Johnson",
    email: "maya.johnson@example.com",
    phone: "+1 555-140-9231",
    status: "pending",
    applied_at: "2026-04-20T09:00:00.000Z",
    experience_years: 5,
    current_job_title: "Frontend Engineer",
    current_company: "Nimbus Labs",
    location: "New York, NY",
    ai_skill_match_score: 89,
    ai_experience_match_score: 84,
  },
  {
    id: "c-202",
    name: "Daniel Lee",
    email: "daniel.lee@example.com",
    phone: "+1 555-140-9232",
    status: "interviewed",
    applied_at: "2026-04-18T14:30:00.000Z",
    experience_years: 7,
    current_job_title: "Senior UI Engineer",
    current_company: "Northwind",
    location: "Austin, TX",
    ai_skill_match_score: 92,
    ai_experience_match_score: 88,
  },
  {
    id: "c-203",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+1 555-140-9233",
    status: "hired",
    applied_at: "2026-04-10T11:15:00.000Z",
    experience_years: 6,
    current_job_title: "Product Designer",
    current_company: "KiteWorks",
    location: "San Francisco, CA",
    ai_skill_match_score: 95,
    ai_experience_match_score: 90,
  },
  {
    id: "c-204",
    name: "Lucas Green",
    email: "lucas.green@example.com",
    phone: "+1 555-140-9234",
    status: "pending",
    applied_at: "2026-04-22T16:45:00.000Z",
    experience_years: 4,
    current_job_title: "Full Stack Developer",
    current_company: "Orbit Commerce",
    location: "Chicago, IL",
    ai_skill_match_score: 85,
    ai_experience_match_score: 80,
  },
];
