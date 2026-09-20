// Clinical vocabulary — all code-to-label mappings
// Single source of truth for all clinical strings
// No hardcoded clinical labels in components

import * as t from './types';

export const conditionLabels = {
  [t.ConditionCode.HYPERTENSION]: 'Hypertension',
  [t.ConditionCode.DIABETES]: 'Diabetes',
  [t.ConditionCode.PRIOR_MI]: 'Previous MI',
  [t.ConditionCode.PRIOR_STROKE]: 'Previous stroke',
  [t.ConditionCode.HEART_FAILURE]: 'Heart failure',
  [t.ConditionCode.DYSLIPIDAEMIA]: 'Dyslipidaemia',
  [t.ConditionCode.RHEUMATIC_HEART_DISEASE]: 'Rheumatic heart disease',
  [t.ConditionCode.ATRIAL_FIBRILLATION]: 'Atrial fibrillation'
};

export const symptomLabels = {
  [t.SymptomCode.CHEST_DISCOMFORT]: 'Chest discomfort',
  [t.SymptomCode.SOB]: 'Shortness of breath',
  [t.SymptomCode.PALPITATIONS]: 'Palpitations',
  [t.SymptomCode.DIZZINESS]: 'Dizziness',
  [t.SymptomCode.FATIGUE]: 'Fatigue',
  [t.SymptomCode.SWELLING]: 'Swelling',
  [t.SymptomCode.SYNCOPE]: 'Syncope',
  [t.SymptomCode.OTHER]: 'Other'
};

export const severityLabels = {
  [t.SeverityLevel.MILD]: 'Mild',
  [t.SeverityLevel.MODERATE]: 'Moderate',
  [t.SeverityLevel.SEVERE]: 'Severe'
};

export const smokingLabels = {
  [t.SmokingStatus.NEVER]: 'Never smoked',
  [t.SmokingStatus.FORMER]: 'Former smoker',
  [t.SmokingStatus.CURRENT]: 'Current smoker'
};

export const ecgInterpretationLabels = {
  [t.EcgInterpretation.NO_ABNORMALITY]: 'No abnormality flagged',
  [t.EcgInterpretation.POSSIBLE_ABNORMALITY]: 'Possible abnormality',
  [t.EcgInterpretation.URGENT_PATTERN]: 'Urgent pattern flagged',
  [t.EcgInterpretation.UNINTERPRETABLE]: 'Uninterpretable'
};

export const confidenceLabels = {
  [t.ConfidenceLevel.HIGH]: 'High',
  [t.ConfidenceLevel.MODERATE]: 'Moderate',
  [t.ConfidenceLevel.LOW]: 'Low'
};

export const confidenceDescriptions = {
  [t.ConfidenceLevel.HIGH]: 'The model is confident in this interpretation',
  [t.ConfidenceLevel.MODERATE]: 'The model is moderately confident in this interpretation',
  [t.ConfidenceLevel.LOW]: 'The model has low confidence in this interpretation'
};

export const likelihoodLabels = {
  [t.FindingLikelihood.LIKELY]: 'Likely',
  [t.FindingLikelihood.POSSIBLE]: 'Possible'
};

export const ecgReviewActionLabels = {
  [t.EcgReviewAction.AGREE]: 'Agree with AI',
  [t.EcgReviewAction.MODIFY]: 'Modify interpretation',
  [t.EcgReviewAction.REJECT]: 'Reject AI finding',
  [t.EcgReviewAction.UNABLE]: 'Unable to assess'
};

export const rejectReasonLabels = {
  [t.RejectReasonCode.ARTIFACT]: 'Artifact or poor quality',
  [t.RejectReasonCode.MODEL_MISSED]: 'Model missed a finding',
  [t.RejectReasonCode.MODEL_OVERCALLED]: 'Model overcalled',
  [t.RejectReasonCode.CLINICAL_CONTEXT]: 'Clinical context differs',
  [t.RejectReasonCode.LEAD_PLACEMENT]: 'Lead placement issue',
  [t.RejectReasonCode.OTHER]: 'Other reason'
};

export const urgencyLabels = {
  [t.Urgency.ROUTINE]: 'Routine',
  [t.Urgency.SOON]: 'Within 48h',
  [t.Urgency.URGENT]: 'Urgent'
};

export const urgencyDescriptions = {
  [t.Urgency.ROUTINE]: 'Standard review timeframe',
  [t.Urgency.SOON]: 'Review needed within 48 hours',
  [t.Urgency.URGENT]: 'Immediate review recommended'
};

export const investigationTypeLabels = {
  [t.InvestigationType.FASTING_GLUCOSE]: 'Fasting glucose',
  [t.InvestigationType.HBA1C]: 'HbA1c',
  [t.InvestigationType.TOTAL_CHOLESTEROL]: 'Total cholesterol',
  [t.InvestigationType.LDL]: 'LDL cholesterol',
  [t.InvestigationType.HDL]: 'HDL cholesterol',
  [t.InvestigationType.TRIGLYCERIDES]: 'Triglycerides',
  [t.InvestigationType.CREATININE]: 'Creatinine',
  [t.InvestigationType.ECHO]: 'Echocardiogram',
  [t.InvestigationType.OTHER]: 'Other'
};

export const followUpStatusLabels = {
  [t.FollowUpStatus.SCHEDULED]: 'Scheduled',
  [t.FollowUpStatus.DUE]: 'Due',
  [t.FollowUpStatus.OVERDUE]: 'Overdue',
  [t.FollowUpStatus.COMPLETED]: 'Completed',
  [t.FollowUpStatus.MISSED]: 'Missed'
};

export const followUpChannelLabels = {
  [t.FollowUpChannel.CLINIC_VISIT]: 'Clinic visit',
  [t.FollowUpChannel.PHONE]: 'Phone',
  [t.FollowUpChannel.SMS]: 'SMS'
};

export const riskBandLabels = {
  [t.RiskBand.VERY_LOW]: '<5% risk',
  [t.RiskBand.LOW]: '5–<10% risk',
  [t.RiskBand.MODERATE]: '10–<20% risk',
  [t.RiskBand.HIGH]: '20–<30% risk',
  [t.RiskBand.VERY_HIGH]: '≥30% risk'
};

export const riskBandColors = {
  [t.RiskBand.VERY_LOW]: 'bg-green-100 text-green-700',
  [t.RiskBand.LOW]: 'bg-green-50 text-green-600',
  [t.RiskBand.MODERATE]: 'bg-amber-100 text-amber-700',
  [t.RiskBand.HIGH]: 'bg-orange-100 text-orange-700',
  [t.RiskBand.VERY_HIGH]: 'bg-red-100 text-red-700'
};

export const findingCodes = {
  SINUS_RHYTHM: { code: 'sinus_rhythm', label: 'Sinus rhythm' },
  NORMAL_INTERVALS: { code: 'normal_intervals', label: 'Normal intervals' },
  NORMAL_AXIS: { code: 'normal_axis', label: 'Normal axis' },
  ISCHEMIC_CHANGES: { code: 'ischemic_changes', label: 'Possible ischemic changes' },
  ST_DEPRESSION: { code: 'st_depression', label: 'ST-segment depression' },
  T_WAVE_CHANGES: { code: 't_wave_changes', label: 'T-wave changes' },
  LEFT_AXIS_DEVIATION: { code: 'left_axis_deviation', label: 'Left axis deviation' },
  RIGHT_AXIS_DEVIATION: { code: 'right_axis_deviation', label: 'Right axis deviation' },
  LVH: { code: 'lvh', label: 'Left ventricular hypertrophy' },
  ATRIAL_FIBRILLATION: { code: 'afib', label: 'Atrial fibrillation' },
  PREMATURE_BEATS: { code: 'premature_beats', label: 'Premature beats' },
  PROLONGED_QT: { code: 'prolonged_qt', label: 'Prolonged QT interval' },
  FIRST_DEGREE_AVB: { code: 'first_degree_avb', label: 'First-degree AV block' },
  SECOND_DEGREE_AVB: { code: 'second_degree_avb', label: 'Second-degree AV block' },
  THIRD_DEGREE_AVB: { code: 'third_degree_avb', label: 'Complete AV block' }
};

export const facilityLevelLabels = {
  [t.FacilityLevel.HEALTH_CENTRE]: 'Health Centre',
  [t.FacilityLevel.DISTRICT_HOSPITAL]: 'District Hospital',
  [t.FacilityLevel.REFERRAL_HOSPITAL]: 'Referral Hospital'
};
