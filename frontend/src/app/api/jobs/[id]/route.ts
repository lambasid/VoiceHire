import { NextRequest } from "next/server";
import pool from "@/actions/db";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: jobId } = await context.params;

  try {
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [jobId]);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Failed to fetch job:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
