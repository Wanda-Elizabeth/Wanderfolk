import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return NextResponse.json({
    supabaseUrl: supabaseUrl ? '✓ Set' : '✗ Missing',
    supabaseAnonKey: supabaseAnonKey ? `✓ Set (${supabaseAnonKey.substring(0, 20)}...)` : '✗ Missing',
    serviceRoleKey: serviceRoleKey ? `✓ Set (${serviceRoleKey.substring(0, 20)}...)` : '✗ Missing',
    allPresent: !!(supabaseUrl && supabaseAnonKey && serviceRoleKey),
  });
}
