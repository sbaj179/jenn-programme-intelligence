import { NextResponse } from 'next/server'
import { createServiceSupabaseClient } from '@/lib/supabase'

export async function POST(request) {
  const supabase = createServiceSupabaseClient()
  const body = await request.json()

  const learnerPayload = {
    first_name: body.first_name,
    last_name: body.last_name,
    phone: body.phone || null,
    school_name: body.school_name || null,
    grade: Number(body.grade || 12)
  }

  if (!learnerPayload.first_name || !learnerPayload.last_name) {
    return NextResponse.json({ error: 'First name and last name are required.' }, { status: 400 })
  }

  if (!supabase) {
    return NextResponse.json({
      mode: 'demo',
      message: 'Supabase is not configured yet. Learner payload validated but not saved.',
      learner: learnerPayload
    })
  }

  const { data: learner, error: learnerError } = await supabase
    .from('learners')
    .insert(learnerPayload)
    .select()
    .single()

  if (learnerError) {
    return NextResponse.json({ error: learnerError.message }, { status: 500 })
  }

  if (body.programme_id) {
    const { error: registrationError } = await supabase
      .from('learner_registrations')
      .insert({ learner_id: learner.id, programme_id: body.programme_id })

    if (registrationError) {
      return NextResponse.json({ error: registrationError.message, learner }, { status: 500 })
    }
  }

  return NextResponse.json({ learner })
}
