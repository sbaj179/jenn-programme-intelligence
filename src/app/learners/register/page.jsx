import AppShell from '@/components/AppShell'
import { demoLearners, demoProgramme } from '@/lib/demo-data'

export default function LearnerRegistrationPage() {
  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">Learner intake</p>
          <h1>Register learners into the intervention</h1>
          <p className="lead">
            Capture Grade 12 learner details and attach each learner to the active JENN intervention programme.
          </p>
        </div>
        <span className="badge">Active: {demoProgramme.name}</span>
      </header>

      <section className="grid-2">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Registration form</h2>
              <p>Keep fields minimal until JENN confirms the required official data.</p>
            </div>
          </div>
          <form className="form-grid">
            <div className="field">
              <label>First name</label>
              <input placeholder="Learner first name" />
            </div>
            <div className="field">
              <label>Last name</label>
              <input placeholder="Learner surname" />
            </div>
            <div className="field">
              <label>School</label>
              <input placeholder="School name" />
            </div>
            <div className="field">
              <label>Grade</label>
              <select defaultValue="12">
                <option value="12">Grade 12</option>
              </select>
            </div>
            <div className="field">
              <label>Phone number</label>
              <input placeholder="Optional" />
            </div>
            <div className="field">
              <label>Subject focus</label>
              <select defaultValue="Mathematics">
                <option>Mathematics</option>
                <option>Physical Sciences</option>
                <option>Life Sciences</option>
                <option>Accounting</option>
                <option>Business Studies</option>
                <option>Mathematical Literacy</option>
              </select>
            </div>
            <div className="field full">
              <label>Registration note</label>
              <textarea placeholder="Optional programme note, official reference, or support need." />
            </div>
            <div className="button-row full">
              <button type="button" className="btn primary">Register learner</button>
              <button type="button" className="btn secondary">Clear form</button>
            </div>
          </form>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Current learner register</h2>
              <p>Demo learners already captured for the active programme.</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Learner</th>
                  <th>School</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {demoLearners.map((learner) => (
                  <tr key={learner.id}>
                    <td>{learner.first_name} {learner.last_name}</td>
                    <td>{learner.school_name}</td>
                    <td>{learner.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </AppShell>
  )
}
