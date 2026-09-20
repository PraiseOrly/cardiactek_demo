import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { mockPatients, mockAssessments, mockECGs, mockInvestigations } from '../data/mockData';
import PatientOverview from '../components/PatientOverview';
import PatientAssessments from '../components/PatientAssessments';
import PatientECGs from '../components/PatientECGs';
import PatientInvestigations from '../components/PatientInvestigations';

const tabs = ['Overview', 'Assessments', 'ECGs', 'Investigations', 'Follow-ups', 'Notes'];

export default function PatientProfile() {
  const { patientId } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');

  const patient = mockPatients.find((p) => p.id === patientId);

  if (!patient) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-gray-600">Patient not found</p>
          <Link to="/patients" className="text-primary-600 hover:text-primary-700 font-medium mt-4 inline-block">
            Back to Patients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Back button */}
      <Link
        to="/patients"
        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Patients
      </Link>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span>{patient.id}</span>
              <span>{patient.age} years</span>
              <span>{patient.sex}</span>
            </div>
          </div>
          <span
            className={`text-sm font-semibold px-4 py-2 rounded-full ${
              patient.riskStatus === 'Very High'
                ? 'bg-red-100 text-red-700'
                : patient.riskStatus === 'High'
                ? 'bg-orange-100 text-orange-700'
                : patient.riskStatus === 'Moderate'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {patient.riskStatus} Risk
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            to={`/patients/${patientId}/assessment`}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Assessment
          </Link>
          <Link
            to={`/patients/${patientId}/ecg`}
            className="flex items-center gap-2 bg-primary-100 hover:bg-primary-200 text-primary-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Upload ECG
          </Link>
          <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            Add Investigation
          </button>
          <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            Schedule Follow-up
          </button>
          <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'Overview' && <PatientOverview patient={patient} />}
          {activeTab === 'Assessments' && <PatientAssessments patientId={patientId} />}
          {activeTab === 'ECGs' && <PatientECGs patientId={patientId} />}
          {activeTab === 'Investigations' && <PatientInvestigations patientId={patientId} />}
          {activeTab === 'Follow-ups' && (
            <div className="text-center py-8">
              <p className="text-gray-600">Follow-ups content coming soon</p>
            </div>
          )}
          {activeTab === 'Notes' && (
            <div className="text-center py-8">
              <p className="text-gray-600">Clinical notes coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
