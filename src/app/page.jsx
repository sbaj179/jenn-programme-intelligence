import AppShell from '@/components/AppShell'
import KpiCard from '@/components/KpiCard'
import { demoSessionNotes, demoSessions } from '@/lib/demo-data'
import { getAttendanceBySchool, getAttendanceBySubject, getProgrammeSummary } from '@/lib/metrics'

export default function DashboardPage() {
  const summary = getProgrammeSummary()
  const subjectRows = getAttendanceBySubject()
  const schoolRows = getAttendanceBySchool()

  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">Programme command centre</p>
          <h1>Grade 12 intervention intelligence</h1>
          <p className="lead">
            Monitor learner registration, daily sessions, subject coverage, attendance and facilitator feedback from one official dashboard.
          </p>
        </div>
        <span className="badge">Demo mode until Supabase is connected</span>
      </header>

      <section className="kpi-grid" aria-label="Programme metrics">
        <KpiCard label="Registered learners" value={summary.registeredLearners} note="Learners captured for the active programme" />
        <KpiCard label="Sessions scheduled" value={summary.totalSessions} note={`${summary.completedSessions} completed so far`} />
        <KpiCard label="Attendance rate" value={`${summary.attendanceRate}%`} note="Present records across captured sessions" />
        <KpiCard label="Facilitator notes" value={summary.facilitatorNotes} note="Completed session summaries" />
      </section>

      <section className="grid-2">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Subject performance snapshot</h2>
              <p>Quick view of session coverage and attendance strength per subject.</p>
            </div>
          </div>
          <div className="metric-list">
            {subjectRows.map((row) => (
              <div key={`${row.subject}-${row.topic}`} className="metric-row">
                <div>
                  <strong>{row.subject}</strong>
                  <div className="progress"><span style={{ width: `${row.rate}%` }} /></div>
                </div>
                <strong>{row.rate}%</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>School contribution</h2>
              <p>Where registered learners are coming from.</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>School</th>
                  <th>Learners</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {schoolRows.map((row) => (
                  <tr key={row.school}>
                    <td>{row.school}</td>
                    <td>{row.learners}</td>
                    <td>{row.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="grid-2">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Today’s session control</h2>
              <p>Operational view of what is happening across the intervention day.</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Subject</th>
                  <th>Topic</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {demoSessions.slice(0, 4).map((session) => (
                  <tr key={session.id}>
                    <td>{session.start_time}–{session.end_time}</td>
                    <td>{session.subject_name}</td>
                    <td>{session.topic}</td>
                    <td><span className={`status ${session.status}`}>{session.status.replace('_', ' ')}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Facilitator intelligence</h2>
              <p>Notes that turn teaching activity into useful programme insight.</p>
            </div>
          </div>
          {demoSessionNotes.map((note) => (
            <div key={note.id} className="sidebar-note" style={{ marginTop: 0, marginBottom: 12, background: '#f6f9fd', color: '#203047', borderColor: '#d9e2ec' }}>
              <strong>{note.topic_covered}</strong>
              <br />
              {note.summary}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  )
}
