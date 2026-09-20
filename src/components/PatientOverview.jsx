import { Heart } from 'lucide-react';
import * as vocab from '../domain/vocabulary';

export default function PatientOverview({ patient }) {
  const conditions = patient.conditions.map(c => vocab.conditionLabels[c]).join(', ') || 'None';

  return (
    <div className="space-y-6">
      {/* Vitals */}
      <section>
        <h3 className="font-bold text-gray-900 mb-3">Vital Signs</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">BP</p>
            <p className="font-semibold text-gray-900">Not recorded</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Heart rate</p>
            <p className="font-semibold text-gray-900">Not recorded</p>
          </div>
        </div>
      </section>

      {/* Medical history */}
      <section>
        <h3 className="font-bold text-gray-900 mb-3">Medical History</h3>
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-gray-600">Conditions</p>
            <p className="font-medium text-gray-900">{conditions}</p>
          </div>
          <div>
            <p className="text-gray-600">Smoking</p>
            <p className="font-medium text-gray-900">{vocab.smokingLabels[patient.smoking]}</p>
          </div>
          <div>
            <p className="text-gray-600">Family history of CVD</p>
            <p className="font-medium text-gray-900">{patient.familyHistoryCvd ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </section>

      {/* Medications */}
      <section>
        <h3 className="font-bold text-gray-900 mb-3">Current Medications</h3>
        {patient.medications.length > 0 ? (
          <div className="space-y-2">
            {patient.medications.map((med, i) => (
              <div key={i} className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                <p className="font-medium text-gray-900">{med.name}</p>
                <p className="text-xs text-gray-600">{med.dose} {med.frequency}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm">No medications recorded</p>
        )}
      </section>
    </div>
  );
}
