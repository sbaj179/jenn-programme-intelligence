import Link from 'next/link'
import AppShell from '@/components/AppShell'
import { demoProgramme, demoSessions } from '@/lib/demo-data'
import { getProgrammeSummary } from '@/lib/metrics'

export default function ProgrammesPage() {
  const summary = getProgrammeSummary()

  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">Programmes</p>
          <h1>Intervention programme control</h1>
          <p className="lead">
            Create and manage Grade 12 intervention periods, attach sessions and monitor delivery across subjects.
          </p>
        </div>
        <Link className="btn primary" href="/programmes/new">New programme</Link>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>{demoProgramme.name}</h2>
            <p>Grade {demoProgramme.grade} · Term {demoProgramme.term} · {demoProgramme.start_date} to {demoProgramme.end_date}</p>
          </div>
          <span className={`status ${demoProgramme.status}`}>{demoProgramme.status}</span>
        </div>

        <div className="grid-3">
          <article className="stat-panel kpi-card">
            <span>Registered learners</span>
            <strong>{summary.registeredLearners}</strong>
            <small>Active learner base for this programme.</small>
          </article>
          <article className="stat-panel kpi-card">
            <span>Sessions</span>
            <strong>{summary.totalSessions}</strong>
            <small>{summary.completedSessions} completed and {summary.totalSessions - summary.completedSessions} still scheduled.</small>
          </article>
          <article className="stat-panel kpi-card">
            <span>Attendance rate</span>
            <strong>{summary.attendanceRate}%</strong>
            <small>Current captured attendance strength.</small>
          </article>
        </div>

        <div className="button-row" style={{ marginTop: 18 }}>
          <Link className="btn primary" href={`/programmes/${demoProgramme.id}`}>Open programme</Link>
          <Link className="btn secondary" href={`/reports/programme/${demoProgramme.id}`}>View report</Link>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Session map</h2>
            <p>Subjects and topics attached to the active programme.</p>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Session</th>
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
                  <td>{session.session_number}</td>
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
