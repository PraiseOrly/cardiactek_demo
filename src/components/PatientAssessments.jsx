import { mockAssessments } from '../data/mockData';
import { FileText } from 'lucide-react';

export default function PatientAssessments({ patientId }) {
  const assessments = mockAssessments[patientId] || [];

  if (assessments.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-600">No assessments yet.</p>
        <p className="text-sm text-gray-500 mt-1">Create a new assessment to begin.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {assessments.map((assessment) => (
        <div key={assessment.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-gray-900">Assessment {assessment.id}</p>
              <p className="text-sm text-gray-600">Date: {assessment.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Symptoms</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {assessment.symptoms.map((symptom) => (
                  <span key={symptom} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Vital Signs</p>
              <div className="text-sm text-gray-600 mt-1 space-y-1">
                <p>BP: {assessment.vitals.bp} mmHg</p>
                <p>HR: {assessment.vitals.hr} bpm</p>
                <p>RR: {assessment.vitals.rr} /min</p>
                <p>O₂: {assessment.vitals.o2}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded p-3 mb-3">
            <p className="text-sm font-medium text-gray-700">Clinical Notes</p>
            <p className="text-sm text-gray-600 mt-1">{assessment.clinicalNotes}</p>
          </div>

          <div className="border-t border-gray-200 pt-3">
            <p className="text-sm font-medium text-gray-700">Risk Factors Identified</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {assessment.riskFactors.map((factor) => (
                <span key={factor} className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded">
                  {factor}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
