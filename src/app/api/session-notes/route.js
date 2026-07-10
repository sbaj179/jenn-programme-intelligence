import { NextResponse } from 'next/server'
import { createServiceSupabaseClient } from '@/lib/supabase'

export async function POST(request) {
  const supabase = createServiceSupabaseClient()
  const body = await request.json()

  if (!body.session_id || !body.topic_covered) {
    return NextResponse.json({ error: 'session_id and topic_covered are required.' }, { status: 400 })
  }

  const payload = {
    session_id: body.session_id,
    topic_covered: body.topic_covered,
    summary: body.summary || null,
    learner_challenges: body.learner_challenges || null,
    recommended_follow_up: body.recommended_follow_up || null
  }

  if (!supabase) {
    return NextResponse.json({
      mode: 'demo',
      message: 'Supabase is not configured yet. Session note validated but not saved.',
      note: payload
    })
  }

  const { data, error } = await supabase
    .from('session_notes')
    .upsert(payload, { onConflict: 'session_id' })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ note: data })
}
