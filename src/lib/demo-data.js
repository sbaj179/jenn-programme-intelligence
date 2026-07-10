export const demoInstitution = {
  id: 'demo-jenn',
  name: 'JENN Grade 12 Intervention Programme',
  type: 'education_intervention'
}

export const demoProgramme = {
  id: 'term-2-grade-12-intervention',
  name: 'Term 2 Grade 12 Intervention',
  grade: 12,
  term: 2,
  start_date: '2026-07-01',
  end_date: '2026-07-05',
  status: 'active'
}

export const demoSubjects = [
  { id: 'mathematics', name: 'Mathematics', grade: 12 },
  { id: 'physical-sciences', name: 'Physical Sciences', grade: 12 },
  { id: 'life-sciences', name: 'Life Sciences', grade: 12 },
  { id: 'accounting', name: 'Accounting', grade: 12 },
  { id: 'business-studies', name: 'Business Studies', grade: 12 },
  { id: 'mathematical-literacy', name: 'Mathematical Literacy', grade: 12 }
]

export const demoLearners = [
  { id: 'l-001', first_name: 'Akhona', last_name: 'M.', school_name: 'Bisho High School', grade: 12 },
  { id: 'l-002', first_name: 'Liyema', last_name: 'N.', school_name: 'Dale College', grade: 12 },
  { id: 'l-003', first_name: 'Sinazo', last_name: 'K.', school_name: 'Qonce Secondary', grade: 12 },
  { id: 'l-004', first_name: 'Lwandile', last_name: 'T.', school_name: 'Bisho High School', grade: 12 },
  { id: 'l-005', first_name: 'Asemahle', last_name: 'P.', school_name: 'Moscow High School', grade: 12 },
  { id: 'l-006', first_name: 'Siyamthanda', last_name: 'R.', school_name: 'Qonce Secondary', grade: 12 },
  { id: 'l-007', first_name: 'Olwethu', last_name: 'B.', school_name: 'Zwelitsha High School', grade: 12 },
  { id: 'l-008', first_name: 'Anathi', last_name: 'G.', school_name: 'Bisho High School', grade: 12 }
]

export const demoSessions = [
  {
    id: 's-001',
    programme_id: demoProgramme.id,
    subject_id: 'mathematics',
    subject_name: 'Mathematics',
    session_date: '2026-07-01',
    start_time: '08:00',
    end_time: '10:00',
    topic: 'Functions and graphs: parabola interpretation',
    venue: 'Main Hall',
    session_number: 1,
    status: 'completed',
    attendance_rate: 92
  },
  {
    id: 's-002',
    programme_id: demoProgramme.id,
    subject_id: 'physical-sciences',
    subject_name: 'Physical Sciences',
    session_date: '2026-07-01',
    start_time: '10:30',
    end_time: '12:30',
    topic: 'Newton’s laws and exam-style force diagrams',
    venue: 'Science Lab',
    session_number: 2,
    status: 'completed',
    attendance_rate: 88
  },
  {
    id: 's-003',
    programme_id: demoProgramme.id,
    subject_id: 'life-sciences',
    subject_name: 'Life Sciences',
    session_date: '2026-07-01',
    start_time: '13:15',
    end_time: '15:00',
    topic: 'Human evolution: evidence and terminology',
    venue: 'Room 12',
    session_number: 3,
    status: 'completed',
    attendance_rate: 84
  },
  {
    id: 's-004',
    programme_id: demoProgramme.id,
    subject_id: 'accounting',
    subject_name: 'Accounting',
    session_date: '2026-07-02',
    start_time: '08:00',
    end_time: '10:00',
    topic: 'Companies: financial statements and adjustments',
    venue: 'Room 8',
    session_number: 1,
    status: 'scheduled',
    attendance_rate: null
  },
  {
    id: 's-005',
    programme_id: demoProgramme.id,
    subject_id: 'business-studies',
    subject_name: 'Business Studies',
    session_date: '2026-07-02',
    start_time: '10:30',
    end_time: '12:30',
    topic: 'Business environments and strategy responses',
    venue: 'Room 10',
    session_number: 2,
    status: 'scheduled',
    attendance_rate: null
  }
]

export const demoAttendance = [
  { session_id: 's-001', learner_id: 'l-001', status: 'present' },
  { session_id: 's-001', learner_id: 'l-002', status: 'present' },
  { session_id: 's-001', learner_id: 'l-003', status: 'late' },
  { session_id: 's-001', learner_id: 'l-004', status: 'present' },
  { session_id: 's-001', learner_id: 'l-005', status: 'present' },
  { session_id: 's-001', learner_id: 'l-006', status: 'absent' },
  { session_id: 's-001', learner_id: 'l-007', status: 'present' },
  { session_id: 's-001', learner_id: 'l-008', status: 'present' },
  { session_id: 's-002', learner_id: 'l-001', status: 'present' },
  { session_id: 's-002', learner_id: 'l-002', status: 'present' },
  { session_id: 's-002', learner_id: 'l-003', status: 'absent' },
  { session_id: 's-002', learner_id: 'l-004', status: 'present' },
  { session_id: 's-002', learner_id: 'l-005', status: 'late' },
  { session_id: 's-002', learner_id: 'l-006', status: 'present' },
  { session_id: 's-002', learner_id: 'l-007', status: 'present' },
  { session_id: 's-002', learner_id: 'l-008', status: 'present' }
]

export const demoSessionNotes = [
  {
    id: 'n-001',
    session_id: 's-001',
    topic_covered: 'Parabola interpretation, turning points, intercepts and exam questions',
    summary: 'Learners handled basic graph reading well, but struggled to link equations to transformations. Follow-up should focus on identifying a, p and q from graph features.',
    learner_challenges: 'Equation-to-graph translation; identifying turning point from standard form.',
    recommended_follow_up: 'Daily 20-minute graph interpretation practice for three days.'
  },
  {
    id: 'n-002',
    session_id: 's-002',
    topic_covered: 'Newton’s laws, force diagrams, normal force and friction',
    summary: 'Most learners understood the law statements but struggled with applying them to inclined plane and friction problems.',
    learner_challenges: 'Drawing accurate force diagrams and selecting the correct equation direction.',
    recommended_follow_up: 'Short diagnostic on force diagrams before the next Physical Sciences session.'
  }
]
