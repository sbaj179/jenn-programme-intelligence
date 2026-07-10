import AppShell from '@/components/AppShell'
import KpiCard from '@/components/KpiCard'
import { demoProgramme, demoSessionNotes, demoSessions } from '@/lib/demo-data'
import { getAttendanceBySchool, getAttendanceBySubject, getProgrammeSummary } from '@/lib/metrics'

export default function ProgrammeReportPage() {
  const summary = getProgrammeSummary()
  const subjectRows = getAttendanceBySubject()
  const schoolRows = getAttendanceBySchool()

  return (
    <AppShell>
      <section className="report-cover">
        <p className="eyebrow" style={{ color: '#8fb5ff' }}>Department-ready summary</p>
        <h1>{demoProgramme.name}</h1>
        <p>
          This report summarises learner registration, attendance, subject coverage, session delivery and facilitator observations for monitoring by JENN leadership and relevant department officials.
        </p>
      </section>

      <div className="button-row no-print" style={{ marginBottom: 18 }}>
        <span className="badge">Use browser print to save as PDF</span>
        <button className="btn secondary" type="button">Export CSV later</button>
      </div>

      <section className="kpi-grid">
        <KpiCard label="Registered learners" value={summary.registeredLearners} note="Total learners captured for the programme" />
        <KpiCard label="Sessions scheduled" value={summary.totalSessions} note={`${summary.completedSessions} completed`} />
        <KpiCard label="Attendance rate" value={`${summary.attendanceRate}%`} note="Based on captured attendance records" />
        <KpiCard label="Absent records" value={summary.absentCount} note="Requires follow-up attention" />
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Executive summary</h2>
            <p>Plain-language summary for non-technical stakeholders.</p>
          </div>
        </div>
        <p className="lead">
          The programme registered {summary.registeredLearners} Grade 12 learners and scheduled {summary.totalSessions} subject sessions across the intervention period. Attendance currently stands at {summary.attendanceRate}%, with {summary.absentCount} absent records and {summary.lateCount} late records captured. Facilitator notes indicate that learners benefited from focused teaching, but require continued follow-up in selected topic areas after the intervention period.
        </p>
      </section>

      <section className="grid-2">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Attendance by subject</h2>
              <p>Subject-level monitoring for intervention delivery.</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Topic</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {subjectRows.map((row) => (
                  <tr key={`${row.subject}-${row.topic}`}>
                    <td>{row.subject}</td>
                    <td>{row.topic}</td>
                    <td>{row.present}</td>
                    <td>{row.absent}</td>
                    <td>{row.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Attendance by school</h2>
              <p>School participation and attendance patterns.</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>School</th>
                  <th>Learners</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {schoolRows.map((row) => (
                  <tr key={row.school}>
                    <td>{row.school}</td>
                    <td>{row.learners}</td>
                    <td>{row.present}</td>
                    <td>{row.absent}</td>
                    <td>{row.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Topics covered</h2>
            <p>Teaching coverage evidence captured from the session schedule.</p>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Topic</th>
                <th>Venue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {demoSessions.map((session) => (
                <tr key={session.id}>
                  <td>{session.session_date}</td>
                  <td>{session.subject_name}</td>
                  <td>{session.topic}</td>
                  <td>{session.venue}</td>
                  <td><span className={`status ${session.status}`}>{session.status.replace('_', ' ')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Facilitator observations</h2>
            <p>Instructional feedback that can guide follow-up support after the intervention.</p>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Topic</th>
                <th>Observation</th>
                <th>Recommended follow-up</th>
              </tr>
            </thead>
            <tbody>
              {demoSessionNotes.map((note) => (
                <tr key={note.id}>
                  <td>{note.topic_covered}</td>
                  <td>{note.learner_challenges}</td>
                  <td>{note.recommended_follow_up}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="print-note">
        Note: this demo report uses sample data. Once Supabase is connected, this report will be generated from live programme, learner, session, attendance and facilitator-note records.
      </p>
    </AppShell>
  )
}
