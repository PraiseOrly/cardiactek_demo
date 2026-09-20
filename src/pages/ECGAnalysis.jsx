import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import { mockPatients } from '../data/mockData';

export default function ECGAnalysis() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const patient = mockPatients.find((p) => p.id === patientId);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [clinicianReview, setClinicianReview] = useState('');
  const [interpretation, setInterpretation] = useState('agree');

  const mockAnalysisResult = {
    interpretation: 'Potential abnormal pattern detected',
    confidence: 91,
    findings: ['Sinus rhythm', 'Possible rhythm abnormality', 'Further clinical review recommended'],
  };

  if (!patient) {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <p className="text-gray-600">Patient not found</p>
      </div>
    );
  }

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      // Simulate ECG analysis
      setTimeout(() => {
        setShowAnalysis(true);
      }, 500);
    }
  };

  const handleDragDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setTimeout(() => {
        setShowAnalysis(true);
      }, 500);
    }
  };

  const handleSave = () => {
    alert('ECG analysis saved successfully!');
    navigate(`/patients/${patientId}`);
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
        <h1 className="text-3xl font-bold text-gray-900">ECG Analysis</h1>
        <p className="text-gray-600 mt-1">
          {patient.name} • {patient.id}
        </p>
      </div>

      {/* Upload Section */}
      {!showAnalysis && (
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 hover:bg-primary-50 transition-colors cursor-pointer"
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-700 font-medium mb-2">Drag and drop your ECG file here</p>
            <p className="text-gray-500 text-sm mb-4">or</p>
            <label className="inline-block">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.png,.dcm"
                className="hidden"
              />
              <span className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg cursor-pointer transition-colors">
                Select File
              </span>
            </label>
            <p className="text-gray-500 text-xs mt-3">Supported formats: PDF, JPG, PNG, DICOM</p>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {showAnalysis && (
        <div className="space-y-6">
          {/* ECG Preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">ECG Preview</h2>
            <div className="bg-gray-100 rounded p-6 mb-4">
              <svg viewBox="0 0 600 150" className="w-full h-32">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="600" height="150" fill="url(#grid)" />
                <polyline
                  points="0,75 30,72 60,68 90,65 120,62 150,60 180,62 210,68 240,75 270,82 300,85 330,82 360,75 390,68 420,62 450,60 480,62 510,68 540,75 570,82 600,75"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                />
                <text x="10" y="20" fontSize="12" fill="#6b7280">
                  Simulated ECG waveform - Demo data
                </text>
              </svg>
            </div>
            <p className="text-xs text-gray-500 italic">
              This is a simulated ECG waveform for demonstration purposes. It does not represent a real patient's ECG.
            </p>
          </div>

          {/* AI Analysis */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">AI-assisted Analysis</h2>

            <div className="space-y-4 mb-4">
              <div>
                <p className="text-sm text-gray-700 mb-1">Overall interpretation:</p>
                <p className="text-lg font-bold text-gray-900">{mockAnalysisResult.interpretation}</p>
              </div>

              <div>
                <p className="text-sm text-gray-700 mb-1">Confidence:</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${mockAnalysisResult.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    {mockAnalysisResult.confidence}%
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Potential findings:</p>
                <ul className="space-y-1">
                  {mockAnalysisResult.findings.map((finding, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-primary-600 mt-0.5">•</span>
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-sm text-yellow-800">
                <strong>AI-assisted result.</strong> This output is intended to support clinician review and does not replace clinical judgment.
              </p>
            </div>
          </div>

          {/* Clinician Review */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Clinician Review</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Do you agree with the AI interpretation?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="agree"
                    checked={interpretation === 'agree'}
                    onChange={(e) => setInterpretation(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Agree with AI finding</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="modify"
                    checked={interpretation === 'modify'}
                    onChange={(e) => setInterpretation(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Modify interpretation</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="reject"
                    checked={interpretation === 'reject'}
                    onChange={(e) => setInterpretation(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Reject AI finding</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your clinical interpretation:
              </label>
              <textarea
                value={clinicianReview}
                onChange={(e) => setClinicianReview(e.target.value)}
                placeholder="Enter your clinical assessment and interpretation..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 h-32"
              />
            </div>
          </div>

          {/* Save Button */}
          <div>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              <Save className="w-5 h-5" />
              Save Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
