import * as t from '../../domain/types';

// Assessments
export const seedAssessments = [
  {
    id: 'ASS-00201',
    patientId: 'CTK-00101', // Amina Uwase
    clinicianId: 'cli-001',
    facilityId: 'fac-001',
    status: t.AssessmentStatus.SIGNED,
    amendsAssessmentId: null,
    signedBy: 'cli-001',
    signedAt: new Date('2024-09-18T10:30:00'),
    symptoms: [
      { code: t.SymptomCode.SOB, durationDays: 5, severity: t.SeverityLevel.MODERATE },
      { code: t.SymptomCode.FATIGUE, durationDays: 7, severity: t.SeverityLevel.MILD }
    ],
    vitals: {
      systolic: 145,
      diastolic: 92,
      heartRate: 78,
      respRate: 18,
      spo2: 97,
      tempC: 36.6,
      weightKg: 72,
      heightCm: 165
    },
    historyFlags: [t.ConditionCode.HYPERTENSION, t.ConditionCode.DIABETES],
    medications: [
      { name: 'Enalapril', dose: '10mg', frequency: 'once daily' },
      { name: 'Metformin', dose: '500mg', frequency: 'twice daily' }
    ],
    notes: 'Patient reports increased dyspnea on exertion. BP elevated. Recommends ECG and investigations.',
    createdAt: new Date('2024-09-18T10:15:00'),
    updatedAt: new Date('2024-09-18T10:30:00')
  },
  {
    id: 'ASS-00202',
    patientId: 'CTK-00103', // Chinedu Okafor
    clinicianId: 'cli-002',
    facilityId: 'fac-002',
    status: t.AssessmentStatus.SIGNED,
    amendsAssessmentId: null,
    signedBy: 'cli-002',
    signedAt: new Date('2024-09-16T14:20:00'),
    symptoms: [
      { code: t.SymptomCode.CHEST_DISCOMFORT, durationDays: 2, severity: t.SeverityLevel.MODERATE }
    ],
    vitals: {
      systolic: 138,
      diastolic: 88,
      heartRate: 85,
      respRate: 16,
      spo2: 98,
      tempC: 36.7,
      weightKg: 78,
      heightCm: 175
    },
    historyFlags: [t.ConditionCode.PRIOR_MI],
    medications: [
      { name: 'Aspirin', dose: '75mg', frequency: 'once daily' },
      { name: 'Metoprolol', dose: '25mg', frequency: 'twice daily' }
    ],
    notes: 'Post-MI patient with recurrent chest discomfort. ECG indicated for comparison with baseline.',
    createdAt: new Date('2024-09-16T14:05:00'),
    updatedAt: new Date('2024-09-16T14:20:00')
  },
  {
    id: 'ASS-00203',
    patientId: 'CTK-00105', // Samuel Kato
    clinicianId: 'cli-001',
    facilityId: 'fac-001',
    status: t.AssessmentStatus.DRAFT,
    amendsAssessmentId: null,
    signedBy: null,
    signedAt: null,
    symptoms: [
      { code: t.SymptomCode.SOB, durationDays: 10, severity: t.SeverityLevel.SEVERE },
      { code: t.SymptomCode.SWELLING, durationDays: 14, severity: t.SeverityLevel.MODERATE }
    ],
    vitals: {
      systolic: 155,
      diastolic: 98,
      heartRate: 92,
      respRate: 22,
      spo2: 94,
      tempC: 36.9,
      weightKg: 85,
      heightCm: 172
    },
    historyFlags: [t.ConditionCode.HYPERTENSION, t.ConditionCode.HEART_FAILURE],
    medications: [
      { name: 'Furosemide', dose: '40mg', frequency: 'once daily' },
      { name: 'Enalapril', dose: '10mg', frequency: 'once daily' }
    ],
    notes: 'Heart failure exacerbation. Significant dyspnea and peripheral edema. Pending clinician review and signing.',
    createdAt: new Date('2024-09-18T09:45:00'),
    updatedAt: new Date('2024-09-18T11:00:00')
  }
];

// ECG Studies
export const seedEcgStudies = [
  {
    id: 'ECG-00301',
    patientId: 'CTK-00101', // Amina Uwase — URGENT PATTERN
    assessmentId: 'ASS-00201',
    capturedBy: 'cli-001',
    capturedAt: new Date('2024-09-18T10:35:00'),
    facilityId: 'fac-001',
    source: t.EcgSource.DIGITAL_FILE,
    quality: {
      usable: true,
      issues: [],
      leadsDetected: ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6']
    },
    calibration: { speedMmPerSec: 25, gainMmPerMv: 10 },
    status: t.EcgStatus.AWAITING_REVIEW
  },
  {
    id: 'ECG-00302',
    patientId: 'CTK-00103', // Chinedu Okafor
    assessmentId: 'ASS-00202',
    capturedBy: 'cli-002',
    capturedAt: new Date('2024-09-16T14:25:00'),
    facilityId: 'fac-002',
    source: t.EcgSource.PAPER_PHOTO,
    quality: {
      usable: true,
      issues: [],
      leadsDetected: ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6']
    },
    calibration: { speedMmPerSec: 25, gainMmPerMv: 10 },
    status: t.EcgStatus.REVIEWED
  },
  {
    id: 'ECG-00303',
    patientId: 'CTK-00105', // Samuel Kato
    assessmentId: null,
    capturedBy: 'cli-001',
    capturedAt: new Date('2024-09-15T13:10:00'),
    facilityId: 'fac-001',
    source: t.EcgSource.PAPER_PHOTO,
    quality: {
      usable: false,
      issues: [t.QualityIssue.GLARE, t.QualityIssue.SKEW],
      leadsDetected: ['I', 'II', 'III', 'aVR', 'aVL', 'V1', 'V2', 'V3', 'V4', 'V5'] // some leads cut off
    },
    calibration: { speedMmPerSec: 25, gainMmPerMv: 10 },
    status: t.EcgStatus.QUALITY_CHECK
  },
  {
    id: 'ECG-00304',
    patientId: 'CTK-00105', // Samuel Kato — retake after quality failure
    assessmentId: null,
    capturedBy: 'cli-001',
    capturedAt: new Date('2024-09-15T13:25:00'),
    facilityId: 'fac-001',
    source: t.EcgSource.PAPER_PHOTO,
    quality: {
      usable: true,
      issues: [],
      leadsDetected: ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6']
    },
    calibration: { speedMmPerSec: 25, gainMmPerMv: 10 },
    status: t.EcgStatus.ANALYZING
  },
  {
    id: 'ECG-00305',
    patientId: 'CTK-00109', // Kofi Mensah — UNINTERPRETABLE
    assessmentId: null,
    capturedBy: 'cli-003',
    capturedAt: new Date('2024-09-17T15:40:00'),
    facilityId: 'fac-002',
    source: t.EcgSource.PAPER_PHOTO,
    quality: {
      usable: true,
      issues: [t.QualityIssue.BASELINE_WANDER],
      leadsDetected: ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6']
    },
    calibration: { speedMmPerSec: 25, gainMmPerMv: 10 },
    status: t.EcgStatus.AWAITING_REVIEW
  },
  {
    id: 'ECG-00306',
    patientId: 'CTK-00102', // Daniel Mensah — REVIEWED, CLINICIAN REJECTED
    assessmentId: null,
    capturedBy: 'cli-002',
    capturedAt: new Date('2024-09-14T11:20:00'),
    facilityId: 'fac-002',
    source: t.EcgSource.DIGITAL_FILE,
    quality: {
      usable: true,
      issues: [],
      leadsDetected: ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6']
    },
    calibration: { speedMmPerSec: 25, gainMmPerMv: 10 },
    status: t.EcgStatus.REVIEWED
  }
];

// ECG Analyses
export const seedEcgAnalyses = [
  {
    id: 'ANA-00401',
    ecgStudyId: 'ECG-00301',
    modelVersion: 'ctk-ecg-demo-1.0',
    producedAt: new Date('2024-09-18T10:36:00'),
    interpretation: t.EcgInterpretation.URGENT_PATTERN, // URGENT
    confidence: t.ConfidenceLevel.HIGH,
    findings: [
      {
        code: 'st_elevation',
        label: 'ST-segment elevation',
        likelihood: t.FindingLikelihood.LIKELY,
        leads: ['II', 'III', 'aVF']
      },
      {
        code: 'reciprocal_changes',
        label: 'Reciprocal ST changes',
        likelihood: t.FindingLikelihood.LIKELY,
        leads: ['I', 'aVL']
      }
    ],
    measurements: {
      heartRate: 78,
      prMs: 160,
      qrsMs: 92,
      qtcMs: 420,
      axisDeg: 45
    },
    inputsUsed: ['12 leads', '10 seconds', '25 mm/s', '10 mm/mV'],
    limitations: ['Baseline drift in lead V1', 'Image quality moderate'],
    notDetectable: [
      'Cannot exclude acute coronary syndrome clinically without troponin',
      'Right ventricular involvement not assessable from standard 12-lead',
      'Coronary location not determined by ECG alone'
    ]
  },
  {
    id: 'ANA-00402',
    ecgStudyId: 'ECG-00302',
    modelVersion: 'ctk-ecg-demo-1.0',
    producedAt: new Date('2024-09-16T14:26:00'),
    interpretation: t.EcgInterpretation.POSSIBLE_ABNORMALITY,
    confidence: t.ConfidenceLevel.MODERATE,
    findings: [
      {
        code: 'q_waves',
        label: 'Q waves in inferior leads',
        likelihood: t.FindingLikelihood.LIKELY,
        leads: ['II', 'III', 'aVF']
      },
      {
        code: 'st_depression',
        label: 'ST-segment depression',
        likelihood: t.FindingLikelihood.POSSIBLE,
        leads: ['V2', 'V3']
      }
    ],
    measurements: {
      heartRate: 82,
      prMs: 168,
      qrsMs: 96,
      qtcMs: 430,
      axisDeg: 35
    },
    inputsUsed: ['12 leads', '10 seconds', '25 mm/s', '10 mm/mV'],
    limitations: ['Paper photograph, some glare present'],
    notDetectable: [
      'Timing of prior MI not determined',
      'Cannot assess viability of infarcted territory',
      'Ongoing ischemia not definitively ruled out'
    ]
  },
  {
    id: 'ANA-00404',
    ecgStudyId: 'ECG-00304',
    modelVersion: 'ctk-ecg-demo-1.0',
    producedAt: new Date('2024-09-15T13:28:00'),
    interpretation: t.EcgInterpretation.POSSIBLE_ABNORMALITY,
    confidence: t.ConfidenceLevel.MODERATE,
    findings: [
      {
        code: 'lvh',
        label: 'Left ventricular hypertrophy',
        likelihood: t.FindingLikelihood.LIKELY,
        leads: ['I', 'aVL', 'V1', 'V2', 'V3', 'V4']
      },
      {
        code: 'st_changes',
        label: 'ST-segment and T-wave changes',
        likelihood: t.FindingLikelihood.POSSIBLE,
        leads: ['V5', 'V6']
      }
    ],
    measurements: {
      heartRate: 92,
      prMs: 155,
      qrsMs: 110,
      qtcMs: 445,
      axisDeg: 28
    },
    inputsUsed: ['12 leads', '10 seconds', '25 mm/s', '10 mm/mV'],
    limitations: [],
    notDetectable: [
      'Acute vs chronic changes not differentiated',
      'Degree of hypertrophy not quantified',
      'Myocardial ischemia not ruled out'
    ]
  },
  {
    id: 'ANA-00405',
    ecgStudyId: 'ECG-00305',
    modelVersion: 'ctk-ecg-demo-1.0',
    producedAt: new Date('2024-09-17T15:42:00'),
    interpretation: t.EcgInterpretation.UNINTERPRETABLE, // UNINTERPRETABLE
    confidence: t.ConfidenceLevel.LOW,
    findings: [],
    measurements: {
      heartRate: null,
      prMs: null,
      qrsMs: null,
      qtcMs: null,
      axisDeg: null
    },
    inputsUsed: ['12 leads', '10 seconds', '25 mm/s', '10 mm/mV'],
    limitations: ['Severe baseline wander throughout the strip', 'Excessive muscle artifact', 'Cannot reliably assess any intervals or segments'],
    notDetectable: [
      'Rhythm interpretation not possible',
      'ST changes not assessable',
      'Any reliable ECG measurements not available'
    ]
  },
  {
    id: 'ANA-00406',
    ecgStudyId: 'ECG-00306',
    modelVersion: 'ctk-ecg-demo-1.0',
    producedAt: new Date('2024-09-14T11:22:00'),
    interpretation: t.EcgInterpretation.POSSIBLE_ABNORMALITY,
    confidence: t.ConfidenceLevel.MODERATE,
    findings: [
      {
        code: 'nonspecific_changes',
        label: 'Nonspecific ST-T changes',
        likelihood: t.FindingLikelihood.POSSIBLE,
        leads: ['V4', 'V5', 'V6']
      }
    ],
    measurements: {
      heartRate: 88,
      prMs: 164,
      qrsMs: 94,
      qtcMs: 425,
      axisDeg: 42
    },
    inputsUsed: ['12 leads', '10 seconds', '25 mm/s', '10 mm/mV'],
    limitations: [],
    notDetectable: [
      'Cannot distinguish ischemia from normal variant',
      'Troponin elevation not assessable'
    ]
  }
];

// ECG Reviews (only for reviewed studies)
export const seedEcgReviews = [
  {
    id: 'REV-00501',
    ecgStudyId: 'ECG-00301',
    analysisId: 'ANA-00401',
    reviewerId: 'cli-004', // Cardiologist
    reviewerRole: t.UserRole.CARDIOLOGIST,
    action: t.EcgReviewAction.AGREE,
    reasonCode: null,
    clinicianInterpretation: 'Acute inferior STEMI. Patient requires immediate revascularization. Recommend transfer to interventional cardiology center urgently.',
    urgency: t.Urgency.URGENT,
    reviewedAt: new Date('2024-09-18T10:52:00'),
    signed: true
  },
  {
    id: 'REV-00502',
    ecgStudyId: 'ECG-00302',
    analysisId: 'ANA-00402',
    reviewerId: 'cli-002',
    reviewerRole: t.UserRole.FRONTLINE,
    action: t.EcgReviewAction.REJECT,
    reasonCode: t.RejectReasonCode.MODEL_OVERCALLED,
    clinicianInterpretation: 'Model flagged possible abnormality but patient is stable post-MI baseline. Q waves are known from prior inferior MI in 2018. ST changes are chronic repolarization changes, not acute ischemia. No acute features present.',
    urgency: t.Urgency.ROUTINE,
    reviewedAt: new Date('2024-09-16T14:40:00'),
    signed: true
  },
  {
    id: 'REV-00503',
    ecgStudyId: 'ECG-00306',
    analysisId: 'ANA-00406',
    reviewerId: 'cli-002',
    reviewerRole: t.UserRole.FRONTLINE,
    action: t.EcgReviewAction.MODIFY,
    reasonCode: t.RejectReasonCode.CLINICAL_CONTEXT,
    clinicianInterpretation: "Model detected nonspecific ST-T changes. In context of this patient's multiple risk factors (smoking, hypertension, dyslipidemia) and age 56, these changes warrant clinical correlation. Recommend follow-up ECG in 3 months and consider stress testing if symptoms develop.",
    urgency: t.Urgency.ROUTINE,
    reviewedAt: new Date('2024-09-14T11:35:00'),
    signed: true
  }
];
