import { NextRequest } from 'next/server';
import pool from '@/actions/db'; // Ensure this is your shared PostgreSQL client

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ candidateId: string }> }
) {
  const { candidateId } = await params;

  try {
    const result = await pool.query('SELECT * FROM candidates WHERE id = $1', [candidateId]);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Candidate not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
