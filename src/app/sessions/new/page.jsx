import AppShell from '@/components/AppShell'
import { demoSubjects } from '@/lib/demo-data'

export default function NewSessionPage() {
  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">New session</p>
          <h1>Schedule a teaching session</h1>
          <p className="lead">
            Create a subject session for the intervention timetable. This will later drive attendance capture and facilitator notes.
          </p>
        </div>
        <span className="badge">Workflow shell</span>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Session details</h2>
            <p>Capture the exact teaching block learners will attend.</p>
          </div>
        </div>
        <form className="form-grid">
          <div className="field">
            <label>Subject</label>
            <select defaultValue="Mathematics">
              {demoSubjects.map((subject) => (
                <option key={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Session date</label>
            <input type="date" />
          </div>
          <div className="field">
            <label>Start time</label>
            <input type="time" />
          </div>
          <div className="field">
            <label>End time</label>
            <input type="time" />
          </div>
          <div className="field full">
            <label>Topic</label>
            <input placeholder="Example: Trigonometry identities and exam questions" />
          </div>
          <div className="field">
            <label>Venue</label>
            <input placeholder="Main Hall / Room 12" />
          </div>
          <div className="field">
            <label>Session number</label>
            <input type="number" placeholder="1" />
          </div>
          <div className="button-row full">
            <button type="button" className="btn primary">Save session</button>
            <button type="button" className="btn secondary">Cancel</button>
          </div>
        </form>
      </section>
    </AppShell>
  )
}
