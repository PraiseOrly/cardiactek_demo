import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { mockPatients } from '../data/mockData';

const symptoms = [
  'Chest discomfort',
  'Shortness of breath',
  'Palpitations',
  'Dizziness',
  'Fatigue',
  'Swelling',
  'Other',
];

const riskFactorsOptions = [
  'Hypertension',
  'Diabetes',
  'Previous heart disease',
  'Previous stroke',
  'High cholesterol',
  'Family history',
  'Smoking',
];

export default function Assessment() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const patient = mockPatients.find((p) => p.id === patientId);
  const [formData, setFormData] = useState({
    symptoms: [],
    symptomDuration: '',
    vitals: {
      bp: '',
      hr: '',
      rr: '',
      o2: '',
      temp: '',
    },
    riskFactors: [],
    medications: [],
    newMedication: '',
    notes: '',
  });

  if (!patient) {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <p className="text-gray-600">Patient not found</p>
      </div>
    );
  }

  const handleSymptomToggle = (symptom) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleRiskFactorToggle = (factor) => {
    setFormData((prev) => ({
      ...prev,
      riskFactors: prev.riskFactors.includes(factor)
        ? prev.riskFactors.filter((f) => f !== factor)
        : [...prev.riskFactors, factor],
    }));
  };

  const handleAddMedication = () => {
    if (formData.newMedication.trim()) {
      setFormData((prev) => ({
        ...prev,
        medications: [...prev.medications, formData.newMedication],
        newMedication: '',
      }));
    }
  };

  const handleRemoveMedication = (index) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }));
  };

  const handleVitalChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      vitals: { ...prev.vitals, [key]: value },
    }));
  };

  const handleSave = () => {
    alert('Assessment saved successfully!');
    navigate(`/patients/${patientId}`);
  };

  const handleSaveAndAnalyze = () => {
    alert('Assessment saved. Proceeding to ECG analysis...');
    navigate(`/patients/${patientId}/ecg`);
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        to={`/patients/${patientId}`}
        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Patient
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Cardiovascular Assessment</h1>
        <p className="text-gray-600 mt-1">
          {patient.name} • {patient.id}
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Patient Symptoms */}
        <section className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Patient Symptoms</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select symptoms:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {symptoms.map((symptom) => (
                <label key={symptom} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.symptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600"
                  />
                  <span className="text-sm text-gray-700">{symptom}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Symptom duration:
            </label>
            <input
              type="text"
              value={formData.symptomDuration}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, symptomDuration: e.target.value }))
              }
              placeholder="e.g. 3 days, 1 week"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </section>

        {/* Vital Signs */}
        <section className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Vital Signs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Pressure (mmHg):
              </label>
              <input
                type="text"
                value={formData.vitals.bp}
                onChange={(e) => handleVitalChange('bp', e.target.value)}
                placeholder="e.g. 120/80"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heart Rate (bpm):
              </label>
              <input
                type="text"
                value={formData.vitals.hr}
                onChange={(e) => handleVitalChange('hr', e.target.value)}
                placeholder="e.g. 72"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Respiratory Rate (/min):
              </label>
              <input
                type="text"
                value={formData.vitals.rr}
                onChange={(e) => handleVitalChange('rr', e.target.value)}
                placeholder="e.g. 16"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oxygen Saturation (%):
              </label>
              <input
                type="text"
                value={formData.vitals.o2}
                onChange={(e) => handleVitalChange('o2', e.target.value)}
                placeholder="e.g. 98"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature (°C):
              </label>
              <input
                type="text"
                value={formData.vitals.temp}
                onChange={(e) => handleVitalChange('temp', e.target.value)}
                placeholder="e.g. 36.8"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </section>

        {/* Cardiovascular History */}
        <section className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Cardiovascular History</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {riskFactorsOptions.map((factor) => (
              <label key={factor} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.riskFactors.includes(factor)}
                  onChange={() => handleRiskFactorToggle(factor)}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600"
                />
                <span className="text-sm text-gray-700">{factor}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Medications */}
        <section className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Medications</h2>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.newMedication}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, newMedication: e.target.value }))
                }
                onKeyDown={(e) => e.key === 'Enter' && handleAddMedication()}
                placeholder="e.g. Lisinopril 10mg"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={handleAddMedication}
                className="px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 font-medium rounded-lg transition-colors"
              >
                Add
              </button>
            </div>

            {formData.medications.length > 0 && (
              <div className="space-y-2">
                {formData.medications.map((med, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-900">{med}</span>
                    <button
                      onClick={() => handleRemoveMedication(idx)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Clinical Notes */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Clinical Notes</h2>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
            placeholder="Enter clinical observations and notes..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 h-32"
          />
        </section>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Assessment
          </button>
          <button
            onClick={handleSaveAndAnalyze}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Save & Analyze ECG
          </button>
        </div>
      </div>
    </div>
  );
}
