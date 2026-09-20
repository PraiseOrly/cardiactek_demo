import { mockECGs } from '../data/mockData';
import { Activity, CheckCircle } from 'lucide-react';

export default function PatientECGs({ patientId }) {
  const ecgs = mockECGs[patientId] || [];

  if (ecgs.length === 0) {
    return (
      <div className="text-center py-8">
        <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-600">No ECG analyses yet.</p>
        <p className="text-sm text-gray-500 mt-1">Upload the patient's first ECG to begin analysis.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ecgs.map((ecg) => (
        <div key={ecg.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-gray-900">ECG {ecg.id}</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  {ecg.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">Date: {ecg.date}</p>
            </div>
          </div>

          {/* ECG Preview - Simulated waveform */}
          <div className="bg-gray-100 rounded p-4 mb-4">
            <svg viewBox="0 0 400 100" className="w-full h-20">
              <line x1="0" y1="50" x2="400" y2="50" stroke="#e5e7eb" strokeWidth="0.5" />
              <polyline
                points="0,50 20,48 40,45 60,42 80,40 100,38 120,40 140,45 160,50 180,55 200,58 220,55 240,50 260,45 280,42 300,40 320,38 340,40 360,45 380,50 400,50"
                fill="none"
                stroke="#2563eb"
                strokeWidth="1.5"
              />
              <text x="10" y="15" fontSize="10" fill="#9ca3af">
                Simulated ECG waveform
              </text>
            </svg>
          </div>

          {/* AI Analysis */}
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">AI-assisted Analysis</h4>
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Overall interpretation:</span>
                <span className="font-medium text-gray-900">{ecg.aiInterpretation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Confidence:</span>
                <span className="font-medium text-gray-900">{ecg.confidence}%</span>
              </div>
            </div>

            <p className="text-sm font-medium text-gray-700 mb-2">Potential findings:</p>
            <ul className="space-y-1">
              {ecg.findings.map((finding, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  {finding}
                </li>
              ))}
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-3">
              <p className="text-xs text-yellow-800">
                <strong>AI-assisted result.</strong> This output is intended to support clinician review and does not replace clinical judgment.
              </p>
            </div>
          </div>

          {/* Clinician Review */}
          <div className="bg-gray-50 rounded p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Clinician Review</h4>
            <div className="bg-white border border-gray-200 rounded p-3 text-sm text-gray-700">
              {ecg.clinicianReview}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
