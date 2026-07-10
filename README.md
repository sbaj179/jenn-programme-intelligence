# JENN Programme Intelligence System

A high-level institutional programme-management and reporting system for Grade 12 intervention programmes.

## Purpose

JENN teaches focused Grade 12 intervention sessions. This system captures the operational data behind those programmes and turns it into simple dashboards and department-ready summaries.

It is designed to show:

- who registered
- who attended
- what subjects were taught
- what topics were covered
- which schools learners came from
- which sessions happened per day
- what facilitators captured after lessons
- what officials need to monitor quickly

## Core modules

- Programme dashboard
- Learner registration
- Session scheduling
- Attendance capture
- Facilitator session notes
- Department summary reports
- Export-ready report views

## Local setup

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Supabase

Copy `.env.example` to `.env.local` and add your Supabase keys.

Run the SQL in `supabase/schema.sql` when your Supabase project is ready.

Until Supabase keys are added, the app runs with demo data so the system can still be reviewed.

## Product positioning

JENN teaches. This system tracks, organises, summarises, and reports what happened.
