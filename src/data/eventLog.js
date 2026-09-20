// Event log — append-only source of truth for all clinical history
import * as t from '../domain/types';
import { seedAssessments, seedEcgStudies, seedEcgAnalyses, seedEcgReviews } from './seed/ecgAndAssessments';
import { seedPatients } from './seed/patients';

let events = [];

// Initialize with seed events
export function initializeEventLog() {
  events = [];

  // Patient registration events
  seedPatients.forEach(p => {
    events.push({
      id: `EVT-${Math.random().toString(36).substr(2, 9)}`,
      at: p.createdAt,
      actorId: 'system',
      patientId: p.id,
      type: t.EventType.PATIENT_REGISTERED,
      subjectType: 'patient',
      subjectId: p.id,
      summary: `Patient ${p.name} registered`,
      payload: { patientName: p.name, facilityId: p.facilityId }
    });
  });

  // Assessment events
  seedAssessments.forEach(a => {
    events.push({
      id: `EVT-${Math.random().toString(36).substr(2, 9)}`,
      at: a.createdAt,
      actorId: a.clinicianId,
      patientId: a.patientId,
      type: t.EventType.ASSESSMENT_DRAFTED,
      subjectType: 'assessment',
      subjectId: a.id,
      summary: `Assessment drafted`,
      payload: { assessmentId: a.id }
    });

    if (a.status === t.AssessmentStatus.SIGNED) {
      events.push({
        id: `EVT-${Math.random().toString(36).substr(2, 9)}`,
        at: a.signedAt,
        actorId: a.signedBy,
        patientId: a.patientId,
        type: t.EventType.ASSESSMENT_SIGNED,
        subjectType: 'assessment',
        subjectId: a.id,
        summary: `Assessment signed by ${a.signedBy}`,
        payload: { assessmentId: a.id, signedBy: a.signedBy }
      });
    }
  });

  // ECG capture events
  seedEcgStudies.forEach(ecg => {
    events.push({
      id: `EVT-${Math.random().toString(36).substr(2, 9)}`,
      at: ecg.capturedAt,
      actorId: ecg.capturedBy,
      patientId: ecg.patientId,
      type: t.EventType.ECG_CAPTURED,
      subjectType: 'ecg_study',
      subjectId: ecg.id,
      summary: `ECG captured`,
      payload: { ecgStudyId: ecg.id, source: ecg.source }
    });

    if (ecg.status === t.EcgStatus.QUALITY_CHECK && !ecg.quality.usable) {
      events.push({
        id: `EVT-${Math.random().toString(36).substr(2, 9)}`,
        at: new Date(ecg.capturedAt.getTime() + 30000),
        actorId: 'system',
        patientId: ecg.patientId,
        type: t.EventType.ECG_QUALITY_FAILED,
        subjectType: 'ecg_study',
        subjectId: ecg.id,
        summary: `ECG quality check failed`,
        payload: { ecgStudyId: ecg.id, issues: ecg.quality.issues }
      });
    }
  });

  // ECG analysis events
  seedEcgAnalyses.forEach(ana => {
    events.push({
      id: `EVT-${Math.random().toString(36).substr(2, 9)}`,
      at: ana.producedAt,
      actorId: 'system',
      patientId: seedEcgStudies.find(e => e.id === ana.ecgStudyId)?.patientId,
      type: t.EventType.ECG_ANALYZED,
      subjectType: 'ecg_analysis',
      subjectId: ana.id,
      summary: `ECG analyzed: ${ana.interpretation}`,
      payload: { analysisId: ana.id, interpretation: ana.interpretation, confidence: ana.confidence }
    });
  });

  // ECG review events
  seedEcgReviews.forEach(rev => {
    events.push({
      id: `EVT-${Math.random().toString(36).substr(2, 9)}`,
      at: rev.reviewedAt,
      actorId: rev.reviewerId,
      patientId: seedEcgStudies.find(e => e.id === rev.ecgStudyId)?.patientId,
      type: t.EventType.ECG_REVIEWED,
      subjectType: 'ecg_review',
      subjectId: rev.id,
      summary: `ECG reviewed: ${rev.action}`,
      payload: { reviewId: rev.id, action: rev.action, urgency: rev.urgency }
    });
  });

  return events;
}

export function append(event) {
  events.push({
    ...event,
    id: `EVT-${Math.random().toString(36).substr(2, 9)}`,
    at: new Date()
  });
  return event;
}

export function listForPatient(patientId) {
  return events
    .filter(e => e.patientId === patientId)
    .sort((a, b) => b.at - a.at);
}

export function listRecent(limit = 20) {
  return events
    .sort((a, b) => b.at - a.at)
    .slice(0, limit);
}

export function listByType(type, limit = 50) {
  return events
    .filter(e => e.type === type)
    .sort((a, b) => b.at - a.at)
    .slice(0, limit);
}

export function getAll() {
  return events;
}
