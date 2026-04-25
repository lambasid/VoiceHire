import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart, PieChart } from "recharts";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Dashboard() {
  return (
    <div className="flex h-screen min-h-screen bg-background text-foreground">

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        
        {/* Top Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Job Postings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
              <Button className="mt-2">Manage Jobs</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Candidates in Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">35</p>
              <Button className="mt-2">View Candidates</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
              <Button className="mt-2">View Schedule</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <PieChart width={400} height={300} data={[]} /> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Candidate Experience Levels</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <BarChart width={400} height={300} data={[]} /> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
