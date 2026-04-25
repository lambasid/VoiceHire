"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Candidate {
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
  job_name?: string;
  /** Job description (legacy field name kept for API compatibility). */
  descirption?: string;
}

interface FirstScreenFormModalProps {
  candidate: Candidate;
  onClose: () => void;
}

export function FirstScreenFormModal({ candidate, onClose }: FirstScreenFormModalProps) {
  const [form, setForm] = useState({
    candidateId: "",
    candidate_name: "",
    job_id: "",
    job_name: "",
    job_description: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    setForm({
      candidateId: candidate.id || "",
      candidate_name: candidate.name || "",
      job_id: candidate.job_name || "",
      job_name: candidate.job_name || "",
      job_description: candidate.descirption || "",
      phone_number: candidate.phone || "",
    });
  }, [candidate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);
    const res = await fetch("/api/perplexity/first-screening", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    setResponse(data.message || data.error);
    setLoading(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start First Screening</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label>Candidate Name</Label>
            <Input 
              name="candidate_name" 
              value={form.candidate_name} 
              onChange={handleChange}
              placeholder="Enter candidate name"
            />
          </div>
          <div>
            <Label>Candidate ID</Label>
            <Input 
              name="candidateId" 
              value={form.candidateId} 
              onChange={handleChange}
              placeholder="Enter candidate ID"
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input 
              name="phone_number" 
              value={form.phone_number} 
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <Label>Job Title</Label>
            <Input 
              name="job_name" 
              value={form.job_name} 
              onChange={handleChange}
              placeholder="Enter job title"
            />
          </div>
          {/* <div>
            <Label>Job ID</Label>
            <Input 
              name="job_id" 
              value={form.job_id} 
              onChange={handleChange}
              placeholder="Enter job ID"
            />
          </div> */}
          <div>
            <Label>Job Description</Label>
            <Textarea 
              name="job_description" 
              value={form.job_description} 
              onChange={handleChange}
              placeholder="Enter job description"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>

        {response && <p className="text-sm text-center text-gray-300 mt-2">{response}</p>}
      </DialogContent>
    </Dialog>
  );
}
