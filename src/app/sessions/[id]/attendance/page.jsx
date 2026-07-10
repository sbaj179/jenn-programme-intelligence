import AppShell from '@/components/AppShell'
import { demoSessions } from '@/lib/demo-data'
import { getLearnerAttendanceRows } from '@/lib/metrics'

export default async function AttendanceCapturePage({ params }) {
  const { id } = await params
  const session = demoSessions.find((item) => item.id === id) || demoSessions[0]
  const rows = getLearnerAttendanceRows(session.id)

  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">Attendance capture</p>
          <h1>{session.subject_name}</h1>
          <p className="lead">
            {session.topic} · {session.session_date} · {session.start_time}–{session.end_time} · {session.venue}
          </p>
        </div>
        <span className={`status ${session.status}`}>{session.status.replace('_', ' ')}</span>
      </header>

      <section className="grid-2">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Learner attendance register</h2>
              <p>Mark each learner as present, absent, late or excused.</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Learner</th>
                  <th>School</th>
                  <th>Current status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.learner.id}>
                    <td>{row.learner.first_name} {row.learner.last_name}</td>
                    <td>{row.learner.school_name}</td>
                    <td><span className={`status ${row.status}`}>{row.status.replace('_', ' ')}</span></td>
                    <td>
                      <select defaultValue={row.status === 'not_marked' ? 'present' : row.status}>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        <option value="late">Late</option>
                        <option value="excused">Excused</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="button-row" style={{ marginTop: 18 }}>
            <button className="btn primary" type="button">Save attendance</button>
            <button className="btn secondary" type="button">Mark all present</button>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Facilitator note</h2>
              <p>Capture what was taught and what follow-up is required.</p>
            </div>
          </div>
          <form className="form-grid">
            <div className="field full">
              <label>Topic covered</label>
              <input defaultValue={session.topic} />
            </div>
            <div className="field full">
              <label>Session summary</label>
              <textarea placeholder="Summarise what happened in the session." />
            </div>
            <div className="field full">
              <label>Learner challenges</label>
              <textarea placeholder="What did learners struggle with?" />
            </div>
            <div className="field full">
              <label>Recommended follow-up</label>
              <textarea placeholder="What should JENN or the school follow up after this session?" />
            </div>
            <div className="button-row full">
              <button type="button" className="btn primary">Save facilitator note</button>
            </div>
          </form>
        </div>
      </section>
    </AppShell>
  )
}
