import './globals.css'

export const metadata = {
  title: 'JENN Programme Intelligence',
  description: 'Programme monitoring, attendance intelligence and department-ready reporting for Grade 12 interventions.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
