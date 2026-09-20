import { Heart, Activity, Pill, AlertCircle } from 'lucide-react';

export default function PatientOverview({ patient }) {
  const riskFactors = [];
  if (patient.diabetes) riskFactors.push('Diabetes');
  if (patient.smoking !== 'Never') riskFactors.push('Smoking');
  if (patient.familyHistory) riskFactors.push('Family History');
  if (patient.previousConditions.length > 0) riskFactors.push(...patient.previousConditions);

  return (
    <div className="space-y-6">
      {/* Cardiovascular Summary */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary-600" />
          Cardiovascular Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Blood Pressure</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{patient.bloodPressure}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Heart Rate</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{patient.heartRate} bpm</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Diabetes</p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {patient.diabetes ? 'Present' : 'Negative'}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Smoking Status</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{patient.smoking}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Family History</p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {patient.familyHistory ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </section>

      {/* Risk Factors */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          Risk Factors
        </h3>

        {riskFactors.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {riskFactors.map((factor) => (
              <span key={factor} className="bg-amber-50 text-amber-700 text-sm px-3 py-1 rounded-full border border-amber-200">
                {factor}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No significant risk factors identified</p>
        )}

        <p className="text-xs text-gray-500 mt-3 italic">
          Risk factors are based on information recorded in the patient's profile and are intended to support clinician assessment.
        </p>
      </section>

      {/* Current Medications */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Pill className="w-5 h-5 text-blue-600" />
          Current Medications
        </h3>

        {patient.medications.length > 0 ? (
          <div className="space-y-2">
            {patient.medications.map((med) => (
              <div key={med} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-gray-900">{med}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No medications currently prescribed</p>
        )}
      </section>

      {/* Cardiovascular Timeline */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-600" />
          Cardiovascular Timeline
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">2026-09-20</span>
            <p className="text-sm text-gray-700">Assessment completed</p>
          </div>
          <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">2026-09-18</span>
            <p className="text-sm text-gray-700">ECG analyzed and reviewed</p>
          </div>
          <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{patient.lastAssessment}</span>
            <p className="text-sm text-gray-700">Clinical assessment</p>
          </div>
          <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">2026-08-15</span>
            <p className="text-sm text-gray-700">Previous ECG</p>
          </div>
        </div>
      </section>

      {/* Cardiovascular Risk Overview */}
      <section className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-amber-900 mb-3">Cardiovascular Risk Overview</h3>
        <p className="text-sm text-amber-800 mb-4">
          Risk overview is based on information recorded in the patient's profile and is intended to support clinician assessment.
        </p>
        <div className="bg-white rounded p-3 border border-amber-100">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Risk factors requiring clinical attention:</span> {riskFactors.length}
          </p>
        </div>
      </section>
    </div>
  );
}
