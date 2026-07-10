import Link from 'next/link'

const navItems = [
  { href: '/', label: 'Command dashboard' },
  { href: '/programmes', label: 'Programmes' },
  { href: '/learners/register', label: 'Learner registration' },
  { href: '/sessions', label: 'Sessions' },
  { href: '/reports/programme/term-2-grade-12-intervention', label: 'Department report' }
]

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">J</div>
          <div>
            <strong>JENN Intelligence</strong>
            <span>Grade 12 programme monitoring</span>
          </div>
        </div>

        <nav className="nav-stack" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} className="nav-link" href={item.href}>
              <span>{item.label}</span>
              <span>›</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-note">
          <strong>Purpose:</strong> register learners, track sessions, capture attendance and turn intervention data into official summaries.
        </div>
      </aside>

      <main className="main">{children}</main>
    </div>
  )
}
