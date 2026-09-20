// Domain types for CardiacTEK
// This file defines the shape of all entities in the system
// No component should invent its own type shapes

export const UserRole = {
  FRONTLINE: 'frontline',      // nurse, clinical officer, general physician
  CARDIOLOGIST: 'cardiologist', // tertiary centre reviewer
  ADMIN: 'admin'
};

export const FacilityLevel = {
  HEALTH_CENTRE: 'health_centre',
  DISTRICT_HOSPITAL: 'district_hospital',
  REFERRAL_HOSPITAL: 'referral_hospital'
};

export const ConditionCode = {
  HYPERTENSION: 'hypertension',
  DIABETES: 'diabetes',
  PRIOR_MI: 'prior_mi',
  PRIOR_STROKE: 'prior_stroke',
  HEART_FAILURE: 'heart_failure',
  DYSLIPIDAEMIA: 'dyslipidaemia',
  RHEUMATIC_HEART_DISEASE: 'rheumatic_heart_disease',
  ATRIAL_FIBRILLATION: 'atrial_fibrillation'
};

export const SymptomCode = {
  CHEST_DISCOMFORT: 'chest_discomfort',
  SOB: 'shortness_of_breath',
  PALPITATIONS: 'palpitations',
  DIZZINESS: 'dizziness',
  FATIGUE: 'fatigue',
  SWELLING: 'swelling',
  SYNCOPE: 'syncope',
  OTHER: 'other'
};

export const SeverityLevel = {
  MILD: 'mild',
  MODERATE: 'moderate',
  SEVERE: 'severe'
};

export const SmokingStatus = {
  NEVER: 'never',
  FORMER: 'former',
  CURRENT: 'current'
};

export const EcgSource = {
  PAPER_PHOTO: 'paper_photo',
  DIGITAL_FILE: 'digital_file'
};

export const EcgStatus = {
  QUALITY_CHECK: 'quality_check',
  ANALYZING: 'analyzing',
  AWAITING_REVIEW: 'awaiting_review',
  REVIEWED: 'reviewed',
  REFERRED: 'referred',
  REJECTED: 'rejected'
};

export const EcgInterpretation = {
  NO_ABNORMALITY: 'no_abnormality_flagged',
  POSSIBLE_ABNORMALITY: 'possible_abnormality',
  URGENT_PATTERN: 'urgent_pattern_flagged',
  UNINTERPRETABLE: 'uninterpretable'
};

export const ConfidenceLevel = {
  HIGH: 'high',
  MODERATE: 'moderate',
  LOW: 'low'
};

export const FindingLikelihood = {
  LIKELY: 'likely',
  POSSIBLE: 'possible'
};

export const EcgReviewAction = {
  AGREE: 'agree',
  MODIFY: 'modify',
  REJECT: 'reject',
  UNABLE: 'unable_to_assess'
};

export const RejectReasonCode = {
  ARTIFACT: 'artifact',
  MODEL_MISSED: 'model_missed_finding',
  MODEL_OVERCALLED: 'model_overcalled',
  CLINICAL_CONTEXT: 'clinical_context_differs',
  LEAD_PLACEMENT: 'lead_placement',
  OTHER: 'other'
};

export const Urgency = {
  ROUTINE: 'routine',
  SOON: 'soon',
  URGENT: 'urgent'
};

export const ReferralStatus = {
  REQUESTED: 'requested',
  ACCEPTED: 'accepted',
  REVIEWED: 'reviewed',
  CLOSED: 'closed'
};

export const AssessmentStatus = {
  DRAFT: 'draft',
  SIGNED: 'signed',
  AMENDED: 'amended'
};

export const InvestigationType = {
  FASTING_GLUCOSE: 'fasting_glucose',
  HBA1C: 'hba1c',
  TOTAL_CHOLESTEROL: 'total_cholesterol',
  LDL: 'ldl',
  HDL: 'hdl',
  TRIGLYCERIDES: 'triglycerides',
  CREATININE: 'creatinine',
  ECHO: 'echo',
  OTHER: 'other'
};

export const FollowUpStatus = {
  SCHEDULED: 'scheduled',
  DUE: 'due',
  OVERDUE: 'overdue',
  COMPLETED: 'completed',
  MISSED: 'missed'
};

export const FollowUpChannel = {
  CLINIC_VISIT: 'clinic_visit',
  PHONE: 'phone',
  SMS: 'sms'
};

export const EventType = {
  PATIENT_REGISTERED: 'patient.registered',
  ASSESSMENT_DRAFTED: 'assessment.drafted',
  ASSESSMENT_SIGNED: 'assessment.signed',
  ASSESSMENT_AMENDED: 'assessment.amended',
  ECG_CAPTURED: 'ecg.captured',
  ECG_QUALITY_FAILED: 'ecg.quality_failed',
  ECG_ANALYZED: 'ecg.analyzed',
  ECG_REVIEWED: 'ecg.reviewed',
  REFERRAL_REQUESTED: 'referral.requested',
  REFERRAL_REVIEWED: 'referral.reviewed',
  INVESTIGATION_RECORDED: 'investigation.recorded',
  FOLLOWUP_SCHEDULED: 'followup.scheduled',
  FOLLOWUP_COMPLETED: 'followup.completed',
  REPORT_GENERATED: 'report.generated'
};

export const QualityIssue = {
  GLARE: 'glare',
  BLUR: 'blur',
  SKEW: 'skew',
  LEADS_CUT_OFF: 'leads_cut_off',
  BASELINE_WANDER: 'baseline_wander',
  CALIBRATION_UNREADABLE: 'calibration_unreadable'
};

export const RiskBand = {
  VERY_LOW: 'very_low',      // <5%
  LOW: 'low',                 // 5-<10%
  MODERATE: 'moderate',       // 10-<20%
  HIGH: 'high',              // 20-<30%
  VERY_HIGH: 'very_high'     // ≥30%
};
