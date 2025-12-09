import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json([
    { tool_name: 'ExampleTool', core_pain: 'Manual work', final_score: 80, verdict: 'BUILD' }
  ]);
}