import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as repositories from '../data/repositories';
import * as vocab from '../domain/vocabulary';
import PatientOverview from '../components/PatientOverview';
import PatientAssessments from '../components/PatientAssessments';
import PatientEcgs from '../components/PatientEcgs';

const tabs = ['Overview', 'Assessments', 'ECGs'];

export default function PatientProfile() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const p = await repositories.getPatient(patientId);
      setPatient(p);
      setLoading(false);
    }
    load();
  }, [patientId]);

  if (loading || !patient) {
    return <div className="p-8">Loading...</div>;
  }

  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Back */}
      <Link to="/patients" className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-6 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to patients
      </Link>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
            <div className="flex gap-4 text-sm text-gray-600 mt-2">
              <span>{patient.id}</span>
              <span>{age}y</span>
              <span>{patient.sex}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg">
            New Assessment
          </button>
          <Link
            to={`/patients/${patientId}/ecg`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg inline-block"
          >
            📷 Capture ECG
          </Link>
          <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg">
            📤 Refer for review
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200 flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'Overview' && <PatientOverview patient={patient} />}
          {activeTab === 'Assessments' && <PatientAssessments patientId={patientId} />}
          {activeTab === 'ECGs' && <PatientEcgs patientId={patientId} />}
        </div>
      </div>
    </div>
  );
}
