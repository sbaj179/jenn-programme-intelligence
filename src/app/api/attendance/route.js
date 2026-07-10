import { NextResponse } from 'next/server'
import { createServiceSupabaseClient } from '@/lib/supabase'

export async function POST(request) {
  const supabase = createServiceSupabaseClient()
  const body = await request.json()

  const sessionId = body.session_id
  const rows = Array.isArray(body.rows) ? body.rows : []

  if (!sessionId || rows.length === 0) {
    return NextResponse.json({ error: 'session_id and attendance rows are required.' }, { status: 400 })
  }

  const attendanceRows = rows.map((row) => ({
    session_id: sessionId,
    learner_id: row.learner_id,
    status: row.status || 'present',
    notes: row.notes || null
  }))

  if (!supabase) {
    return NextResponse.json({
      mode: 'demo',
      message: 'Supabase is not configured yet. Attendance payload validated but not saved.',
      attendanceRows
    })
  }

  const { data, error } = await supabase
    .from('attendance')
    .upsert(attendanceRows, { onConflict: 'session_id,learner_id' })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ attendance: data })
}
