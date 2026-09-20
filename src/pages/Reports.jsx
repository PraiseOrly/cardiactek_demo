import { useState } from 'react';
import { Download, Eye } from 'lucide-react';
import { mockPatients } from '../data/mockData';

export default function Reports() {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const patient = selectedPatient ? mockPatients.find((p) => p.id === selectedPatient) : null;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Generate and manage cardiovascular reports</p>
      </div>

      {/* Report Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Generate Report</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Patient:
              </label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Choose a patient...</option>
                {mockPatients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.id})
                  </option>
                ))}
              </select>
            </div>

            {selectedPatient && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range:
                  </label>
                  <div className="space-y-2">
                    <input
                      type="date"
                      defaultValue="2026-01-01"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="date"
                      defaultValue="2026-09-20"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Sections:
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm text-gray-700">Assessments</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm text-gray-700">ECGs</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm text-gray-700">Investigations</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm text-gray-700">Follow-ups</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Preview Report
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Preview */}
        {showPreview && patient && (
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-8 overflow-y-auto max-h-96">
            <div className="text-center mb-8 pb-8 border-b border-gray-200">
              <h1 className="text-3xl font-bold text-primary-600 mb-2">CardiacTEK</h1>
              <p className="text-gray-600">Cardiovascular Care Report</p>
            </div>

            <div className="space-y-6">
              {/* Patient Info */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-3">Patient Information</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Patient ID</p>
                    <p className="font-medium text-gray-900">{patient.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Age</p>
                    <p className="font-medium text-gray-900">{patient.age} years</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Sex</p>
                    <p className="font-medium text-gray-900">{patient.sex}</p>
                  </div>
                </div>
              </section>

              {/* Clinical History */}
              <section className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Clinical History</h2>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-600">Primary Concern</p>
                    <p className="font-medium text-gray-900">{patient.primaryConcern}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Blood Pressure</p>
                    <p className="font-medium text-gray-900">{patient.bloodPressure}</p>
                  </div>
                </div>
              </section>

              {/* Summary */}
              <section className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Summary</h2>
                <p className="text-sm text-gray-700">
                  This report summarizes the cardiovascular care provided to {patient.name} during the specified period. All findings are based on clinical assessments, investigations, and AI-assisted analyses performed during this timeframe.
                </p>
              </section>

              {/* Footer */}
              <div className="border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
                <p>Generated with CardiacTEK</p>
                <p className="mt-2 italic">
                  AI-assisted information is provided for clinician review and does not replace professional clinical judgment.
                </p>
                <p className="mt-2">Report generated: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
