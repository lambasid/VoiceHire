import { NextRequest } from "next/server";
import pool from "@/actions/db";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: jobId } = await context.params;

  try {
    const result = await pool.query(
      // `SELECT * FROM job_applications WHERE job_id = $1`,
      `SELECT c.id, c.name, c.email, c.phone, ja.status
      FROM job_applications ja
      JOIN candidates c ON ja.candidate_id = c.id
      WHERE ja.job_id = $1
      ORDER BY ja.applied_at DESC`,
      [jobId]
    );

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Failed to fetch candidates for job:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500
    });
  }
}
