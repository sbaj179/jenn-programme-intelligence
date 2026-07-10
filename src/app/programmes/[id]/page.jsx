import Link from 'next/link'
import AppShell from '@/components/AppShell'
import KpiCard from '@/components/KpiCard'
import { demoProgramme, demoSessions } from '@/lib/demo-data'
import { getAttendanceBySubject, getProgrammeSummary } from '@/lib/metrics'

export default function ProgrammeDetailPage() {
  const summary = getProgrammeSummary()
  const subjectRows = getAttendanceBySubject()

  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">Programme detail</p>
          <h1>{demoProgramme.name}</h1>
          <p className="lead">
            Detailed operational view for the active intervention programme: delivery, attendance, topics, and follow-up needs.
          </p>
        </div>
        <div className="button-row">
          <Link className="btn secondary" href="/sessions">Manage sessions</Link>
          <Link className="btn primary" href={`/reports/programme/${demoProgramme.id}`}>Department report</Link>
        </div>
      </header>

      <section className="kpi-grid">
        <KpiCard label="Learners" value={summary.registeredLearners} note="Registered into this intervention" />
        <KpiCard label="Completed sessions" value={summary.completedSessions} note="Teaching sessions finished" />
        <KpiCard label="Present records" value={summary.presentCount} note="Attendance entries marked present" />
        <KpiCard label="Absent records" value={summary.absentCount} note="Learners needing follow-up" />
      </section>

      <section className="grid-2">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Subject coverage</h2>
              <p>Topic-level view of the intervention focus areas.</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Topic</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {subjectRows.map((row) => (
                  <tr key={`${row.subject}-${row.topic}`}>
                    <td>{row.subject}</td>
                    <td>{row.topic}</td>
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
              <h2>Intervention risk signals</h2>
              <p>What officials and programme leaders should watch.</p>
            </div>
          </div>
          <div className="metric-list">
            <div className="sidebar-note" style={{ marginTop: 0, background: '#f6f9fd', color: '#203047', borderColor: '#d9e2ec' }}>
              <strong>Absentee follow-up:</strong> learners with repeated absence should be flagged before the programme ends.
            </div>
            <div className="sidebar-note" style={{ marginTop: 0, background: '#f6f9fd', color: '#203047', borderColor: '#d9e2ec' }}>
              <strong>Topic weakness:</strong> facilitator notes show graph interpretation and force diagrams need follow-up work.
            </div>
            <div className="sidebar-note" style={{ marginTop: 0, background: '#f6f9fd', color: '#203047', borderColor: '#d9e2ec' }}>
              <strong>Department reporting:</strong> the current data can produce attendance, coverage and programme-impact summaries.
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Full session list</h2>
            <p>Every scheduled session linked to this programme.</p>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
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
                  <td>{session.start_time}–{session.end_time}</td>
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
    </AppShell>
  )
}
