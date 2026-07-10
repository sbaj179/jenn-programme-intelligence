import AppShell from '@/components/AppShell'

export default function NewProgrammePage() {
  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">New programme</p>
          <h1>Create intervention programme</h1>
          <p className="lead">
            Set up a new JENN intervention period. Once Supabase is connected, this form will create live programme records.
          </p>
        </div>
        <span className="badge">Prepared for Supabase wiring</span>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Programme details</h2>
            <p>Capture the intervention name, term, grade and date range.</p>
          </div>
        </div>
        <form className="form-grid">
          <div className="field full">
            <label>Programme name</label>
            <input placeholder="Example: Term 3 Grade 12 Spring Intervention" />
          </div>
          <div className="field">
            <label>Grade</label>
            <select defaultValue="12">
              <option value="12">Grade 12</option>
              <option value="11">Grade 11</option>
              <option value="10">Grade 10</option>
            </select>
          </div>
          <div className="field">
            <label>Term</label>
            <select defaultValue="3">
              <option value="1">Term 1</option>
              <option value="2">Term 2</option>
              <option value="3">Term 3</option>
              <option value="4">Term 4</option>
            </select>
          </div>
          <div className="field">
            <label>Start date</label>
            <input type="date" />
          </div>
          <div className="field">
            <label>End date</label>
            <input type="date" />
          </div>
          <div className="field full">
            <label>Programme objective</label>
            <textarea placeholder="Describe the academic intervention purpose and official reporting objective." />
          </div>
          <div className="button-row full">
            <button className="btn primary" type="button">Save programme draft</button>
            <button className="btn secondary" type="button">Cancel</button>
          </div>
        </form>
      </section>
    </AppShell>
  )
}
