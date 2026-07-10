import { demoAttendance, demoLearners, demoProgramme, demoSessionNotes, demoSessions } from './demo-data'

export function getProgrammeSummary() {
  const completedSessions = demoSessions.filter((session) => session.status === 'completed')
  const presentCount = demoAttendance.filter((row) => row.status === 'present').length
  const absentCount = demoAttendance.filter((row) => row.status === 'absent').length
  const lateCount = demoAttendance.filter((row) => row.status === 'late').length
  const totalAttendanceRecords = demoAttendance.length
  const attendanceRate = totalAttendanceRecords ? Math.round((presentCount / totalAttendanceRecords) * 100) : 0

  return {
    programme: demoProgramme,
    registeredLearners: demoLearners.length,
    totalSessions: demoSessions.length,
    completedSessions: completedSessions.length,
    attendanceRecords: totalAttendanceRecords,
    presentCount,
    absentCount,
    lateCount,
    attendanceRate,
    facilitatorNotes: demoSessionNotes.length
  }
}

export function getAttendanceBySubject() {
  return demoSessions.map((session) => {
    const records = demoAttendance.filter((row) => row.session_id === session.id)
    const present = records.filter((row) => row.status === 'present').length
    const absent = records.filter((row) => row.status === 'absent').length
    const late = records.filter((row) => row.status === 'late').length
    const rate = records.length ? Math.round((present / records.length) * 100) : session.attendance_rate || 0

    return {
      subject: session.subject_name,
      topic: session.topic,
      sessions: 1,
      present,
      absent,
      late,
      rate
    }
  })
}

export function getAttendanceBySchool() {
  const schools = new Map()

  for (const learner of demoLearners) {
    if (!schools.has(learner.school_name)) {
      schools.set(learner.school_name, {
        school: learner.school_name,
        learners: 0,
        present: 0,
        absent: 0,
        late: 0,
        records: 0,
        rate: 0
      })
    }

    schools.get(learner.school_name).learners += 1
  }

  for (const record of demoAttendance) {
    const learner = demoLearners.find((item) => item.id === record.learner_id)
    if (!learner) continue

    const school = schools.get(learner.school_name)
    school.records += 1
    if (record.status === 'present') school.present += 1
    if (record.status === 'absent') school.absent += 1
    if (record.status === 'late') school.late += 1
  }

  return [...schools.values()].map((school) => ({
    ...school,
    rate: school.records ? Math.round((school.present / school.records) * 100) : 0
  }))
}

export function getLearnerAttendanceRows(sessionId = 's-001') {
  return demoLearners.map((learner) => {
    const record = demoAttendance.find((row) => row.session_id === sessionId && row.learner_id === learner.id)

    return {
      learner,
      status: record?.status || 'not_marked'
    }
  })
}
