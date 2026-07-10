import Link from 'next/link'
import AppShell from '@/components/AppShell'
import { demoSessions } from '@/lib/demo-data'

export default function SessionsPage() {
  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">Session management</p>
          <h1>Daily teaching schedule</h1>
          <p className="lead">
            Track each JENN teaching block by subject, topic, facilitator, venue, attendance and post-session summary.
          </p>
        </div>
        <Link className="btn primary" href="/sessions/new">Create session</Link>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Programme sessions</h2>
            <p>Each row can become an attendance and facilitator-reporting workflow.</p>
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
                <th>Attendance</th>
                <th>Action</th>
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
                  <td>{session.attendance_rate ? `${session.attendance_rate}%` : 'Pending'}</td>
                  <td>
                    <Link className="btn secondary" href={`/sessions/${session.id}/attendance`}>Capture</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  )
}
