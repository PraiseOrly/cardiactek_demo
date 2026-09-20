// Repository pattern — all data access goes through these functions
// Simulated async with ~200ms latency
// Swapping to Supabase only requires changing these functions

import { seedPatients, seedFacilities, seedClinicians } from './seed/patients';
import { seedAssessments, seedEcgStudies, seedEcgAnalyses, seedEcgReviews } from './seed/ecgAndAssessments';
import * as eventLog from './eventLog';

const LATENCY = 200;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Patient repositories
export async function listPatients(query, facilityId = null) {
  await delay(LATENCY);
  let results = seedPatients;

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
    );
  }

  if (facilityId) {
    results = results.filter(p => p.facilityId === facilityId);
  }

  return results;
}

export async function getPatient(id) {
  await delay(LATENCY);
  return seedPatients.find(p => p.id === id) || null;
}

export async function createPatient(data) {
  await delay(LATENCY);
  const id = `CTK-${String(seedPatients.length + 1000).slice(-5)}`;
  const patient = { id, ...data, createdAt: new Date() };
  seedPatients.push(patient);
  eventLog.append({
    patientId: id,
    type: 'patient.registered',
    subjectType: 'patient',
    subjectId: id,
    summary: `Patient ${data.name} registered`,
    payload: { patientName: data.name }
  });
  return patient;
}

// Facility repositories
export async function listFacilities() {
  await delay(LATENCY);
  return seedFacilities;
}

export async function getFacility(id) {
  await delay(LATENCY);
  return seedFacilities.find(f => f.id === id) || null;
}

// Clinician repositories
export async function listClinicians(facilityId = null) {
  await delay(LATENCY);
  if (facilityId) {
    return seedClinicians.filter(c => c.facilityId === facilityId);
  }
  return seedClinicians;
}

export async function getClinician(id) {
  await delay(LATENCY);
  return seedClinicians.find(c => c.id === id) || null;
}

// Assessment repositories
export async function listAssessments(patientId = null) {
  await delay(LATENCY);
  if (patientId) {
    return seedAssessments.filter(a => a.patientId === patientId);
  }
  return seedAssessments;
}

export async function getAssessment(id) {
  await delay(LATENCY);
  return seedAssessments.find(a => a.id === id) || null;
}

export async function createAssessment(data) {
  await delay(LATENCY);
  const id = `ASS-${String(seedAssessments.length + 200).slice(-5)}`;
  const assessment = {
    id,
    ...data,
    status: 'draft',
    amendsAssessmentId: null,
    signedBy: null,
    signedAt: null,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  seedAssessments.push(assessment);
  eventLog.append({
    patientId: data.patientId,
    actorId: data.clinicianId,
    type: 'assessment.drafted',
    subjectType: 'assessment',
    subjectId: id,
    summary: 'Assessment drafted',
    payload: { assessmentId: id }
  });
  return assessment;
}

export async function signAssessment(assessmentId, clinicianId) {
  await delay(LATENCY);
  const assessment = seedAssessments.find(a => a.id === assessmentId);
  if (assessment) {
    assessment.status = 'signed';
    assessment.signedBy = clinicianId;
    assessment.signedAt = new Date();
    assessment.updatedAt = new Date();
    eventLog.append({
      patientId: assessment.patientId,
      actorId: clinicianId,
      type: 'assessment.signed',
      subjectType: 'assessment',
      subjectId: assessmentId,
      summary: 'Assessment signed',
      payload: { assessmentId, signedBy: clinicianId }
    });
  }
  return assessment;
}

// ECG Study repositories
export async function listEcgStudies(patientId = null) {
  await delay(LATENCY);
  if (patientId) {
    return seedEcgStudies.filter(e => e.patientId === patientId);
  }
  return seedEcgStudies;
}

export async function getEcgStudy(id) {
  await delay(LATENCY);
  return seedEcgStudies.find(e => e.id === id) || null;
}

export async function createEcgStudy(data) {
  await delay(LATENCY);
  const id = `ECG-${String(seedEcgStudies.length + 300).slice(-5)}`;
  const study = {
    id,
    ...data,
    capturedAt: new Date(),
    status: 'quality_check'
  };
  seedEcgStudies.push(study);
  eventLog.append({
    patientId: data.patientId,
    actorId: data.capturedBy,
    type: 'ecg.captured',
    subjectType: 'ecg_study',
    subjectId: id,
    summary: 'ECG captured',
    payload: { ecgStudyId: id, source: data.source }
  });
  return study;
}

// ECG Analysis repositories
export async function getEcgAnalysis(ecgStudyId) {
  await delay(LATENCY);
  return seedEcgAnalyses.find(a => a.ecgStudyId === ecgStudyId) || null;
}

export async function createEcgAnalysis(ecgStudyId) {
  await delay(LATENCY);
  // Simulate analysis based on study characteristics
  const study = seedEcgStudies.find(s => s.id === ecgStudyId);
  if (!study) return null;

  const analysisExists = seedEcgAnalyses.find(a => a.ecgStudyId === ecgStudyId);
  if (analysisExists) return analysisExists;

  // Create a synthetic analysis
  const id = `ANA-${String(seedEcgAnalyses.length + 400).slice(-5)}`;
  const analysis = {
    id,
    ecgStudyId,
    modelVersion: 'ctk-ecg-demo-1.0',
    producedAt: new Date(),
    interpretation: 'no_abnormality_flagged',
    confidence: 'high',
    findings: [],
    measurements: { heartRate: 72, prMs: 160, qrsMs: 90, qtcMs: 410, axisDeg: 0 },
    inputsUsed: ['12 leads', '10 seconds', '25 mm/s', '10 mm/mV'],
    limitations: [],
    notDetectable: []
  };

  seedEcgAnalyses.push(analysis);
  eventLog.append({
    patientId: study.patientId,
    actorId: 'system',
    type: 'ecg.analyzed',
    subjectType: 'ecg_analysis',
    subjectId: id,
    summary: `ECG analyzed: ${analysis.interpretation}`,
    payload: { analysisId: id, interpretation: analysis.interpretation }
  });

  return analysis;
}

// ECG Review repositories
export async function getEcgReview(ecgStudyId) {
  await delay(LATENCY);
  return seedEcgReviews.find(r => r.ecgStudyId === ecgStudyId) || null;
}

export async function createEcgReview(data) {
  await delay(LATENCY);
  const id = `REV-${String(seedEcgReviews.length + 500).slice(-5)}`;
  const review = {
    id,
    ...data,
    reviewedAt: new Date(),
    signed: false
  };
  seedEcgReviews.push(review);
  return review;
}

export async function signEcgReview(reviewId, clinicianId) {
  await delay(LATENCY);
  const review = seedEcgReviews.find(r => r.id === reviewId);
  if (review) {
    review.signed = true;
    eventLog.append({
      patientId: seedEcgStudies.find(e => e.id === review.ecgStudyId)?.patientId,
      actorId: clinicianId,
      type: 'ecg.reviewed',
      subjectType: 'ecg_review',
      subjectId: reviewId,
      summary: `ECG reviewed: ${review.action}`,
      payload: { reviewId, action: review.action, urgency: review.urgency }
    });
  }
  return review;
}

// Event log access
export async function getPatientTimeline(patientId) {
  await delay(100);
  return eventLog.listForPatient(patientId);
}

export async function getRecentActivity(limit = 20) {
  await delay(100);
  return eventLog.listRecent(limit);
}
