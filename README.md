# CardiacTEK

**Intelligent cardiovascular care, built for clinicians.**

A modern, fully functional React MVP of a clinician-facing cardiovascular care platform. CardiacTEK enables healthcare professionals to manage patient records, perform ECG analysis with AI-assisted interpretation, track investigations, and manage follow-ups.

## Quick Start

### Prerequisites
- Node.js 16+ and npm 8+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

## Features

### Dashboard
- **Summary cards** showing total patients, assessments this month, ECGs analyzed, and follow-ups due
- **Cardiovascular activity chart** showing trends over time
- **Cases requiring attention** - prioritized patient list with risk assessment
- **Recent activity feed** tracking clinical actions

### Patient Management
- **Patient list** with search, filtering by risk status
- **Detailed patient profiles** with tabs for:
  - **Overview**: Cardiovascular summary, risk factors, medications, timeline
  - **Assessments**: Clinical assessments with symptoms, vitals, and notes
  - **ECGs**: ECG analyses with AI-assisted interpretation and clinician review
  - **Investigations**: Lab results and investigations with trend visualization
  - **Follow-ups**: Scheduled follow-up appointments
  - **Notes**: Clinical notes (template ready)

### Assessment Workflow
- **New cardiovascular assessment** form with:
  - Symptom selection with duration
  - Vital signs entry (BP, HR, RR, O₂, Temperature)
  - Cardiovascular history checkboxes
  - Medication management
  - Clinical notes
  - Save and/or proceed to ECG analysis

### ECG Analysis
- **Drag-and-drop file upload** for ECG files
- **Simulated ECG preview** showing waveform visualization
- **AI-assisted analysis** with:
  - Overall interpretation
  - Confidence score
  - Potential findings list
  - Clear disclaimer about clinical decision support
- **Clinician review section** with:
  - Agreement/modification/rejection options
  - Clinical interpretation notes
  - Save functionality

### Investigations
- **Centralized investigation results** tracking
- Supports multiple investigation types:
  - Blood glucose, HbA1c
  - Cholesterol panels (total, LDL, HDL, triglycerides)
  - Echocardiogram, others
- Status indicators (Normal, High, Low)
- Reference range display

### Follow-ups
- **Follow-up appointment management** with status tracking
  - Due / Upcoming / Completed / Overdue
- Patient information, reason for follow-up
- Last visit and due date tracking
- Filterable by status

### Reports
- **Report generation interface** with patient selection
- Configurable report sections (assessments, ECGs, investigations, follow-ups)
- Professional report preview with:
  - Patient information
  - Clinical history
  - Summary
  - Proper disclaimers about AI-assisted analysis
- PDF download capability (browser print)

### Search & Notifications
- **Global search** for patients by name or ID
- **Notification system** with:
  - Follow-up reminders
  - ECG analysis ready notifications
  - Report generation alerts
  - Unread count badge

### Settings
- **Clinician profile** management
- **Notification preferences** (email alerts, follow-up reminders, ECG analysis)
- **Privacy & security** settings (two-factor authentication toggle, session timeout)

## Technology Stack

- **React 18** - UI library
- **Vite 5** - Build tool
- **React Router 6** - Navigation
- **Tailwind CSS 3** - Styling
- **Recharts 2** - Charts and data visualization
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx           # Main layout with sidebar/topbar
│   ├── Sidebar.jsx          # Navigation sidebar
│   ├── TopBar.jsx           # Top navigation bar with search/notifications
│   ├── ActivityChart.jsx    # Activity trend chart
│   ├── PatientOverview.jsx  # Patient overview tab
│   ├── PatientAssessments.jsx # Assessments tab
│   ├── PatientECGs.jsx      # ECGs tab
│   └── PatientInvestigations.jsx # Investigations tab
├── pages/
│   ├── Dashboard.jsx        # Dashboard page
│   ├── Patients.jsx         # Patient list page
│   ├── PatientProfile.jsx   # Patient detail page
│   ├── Assessment.jsx       # Create assessment form
│   ├── ECGAnalysis.jsx      # ECG upload and analysis
│   ├── Investigations.jsx   # Investigations page
│   ├── FollowUps.jsx        # Follow-ups page
│   ├── Reports.jsx          # Report generation
│   └── Settings.jsx         # Settings page
├── data/
│   └── mockData.js          # Mock patient and clinical data
├── App.jsx                  # Router configuration
├── main.jsx                 # Entry point
└── index.css                # Tailwind imports
```

## Mock Data

The application includes comprehensive mock data:
- **12 patients** with realistic African names
- **Multiple assessments** per patient
- **ECG analyses** with AI-assisted interpretations
- **Investigation results** with trending data
- **Follow-up appointments** with various statuses
- **Notifications** and recent activity feeds

All data is fictional and for demonstration purposes only.

## Key Design Principles

### AI-Assisted Analysis (Not Autonomous Diagnosis)
CardiacTEK uses careful language around AI outputs:
- **"AI-assisted analysis"** instead of diagnosis
- **"Potential finding"** instead of confirmed diagnosis
- **"Review recommended"** emphasizing clinician responsibility
- **"Confidence score"** showing model certainty, not medical certainty

### Clinician-First Interface
- Clear hierarchies and minimal visual clutter
- Professional medical appearance (not a generic dashboard)
- Fast navigation and quick access to key information
- Empty states guide users to next actions

### Professional Branding
- Deep blue primary color (#1e3a8a to #3b82f6)
- Clean white/light gray backgrounds
- Professional rounded cards and spacing
- Accessible contrast ratios

## Future Enhancements

This MVP is architected to support:
- **Real ECG AI model** integration (replace mock analysis)
- **Database backend** (PostgreSQL, Supabase)
- **Secure authentication** (OAuth, SAML)
- **Hospital/EHR integration** (HL7 FHIR)
- **Role-based access control** (clinician, admin, patient)
- **Audit logging** for compliance
- **Multi-language support**
- **Mobile-responsive design** (already implemented)

## Testing the Main User Journey

1. **Dashboard** - View overview and recent activity
2. **Patients** - Search and filter patient list
3. **Patient Profile** - Open a patient (e.g., CTK-00124)
4. **New Assessment** - Create a cardiovascular assessment
5. **ECG Analysis** - Upload/simulate ECG and review AI analysis
6. **Clinician Review** - Add clinical interpretation
7. **Report** - Generate and preview a cardiovascular report

All navigation and buttons are fully functional with mock data.

## Development Notes

- Uses **React Router** for client-side navigation (no backend routing needed)
- All data is **client-side state** (localStorage-ready for future enhancement)
- **Responsive design** works on mobile, tablet, and desktop
- **No external API calls** - fully offline capable
- **TypeScript-ready** (can be upgraded by renaming .jsx to .tsx)

## License

Fictional project for demonstration purposes.
