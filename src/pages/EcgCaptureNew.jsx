import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import * as repositories from '../data/repositories';

export default function EcgCaptureNew() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState('method'); // method | capture | quality | calibration | analysis
  const [method, setMethod] = useState('paper'); // paper | digital
  const [uploadedFile, setUploadedFile] = useState(null);
  const [quality, setQuality] = useState(null);
  const [calibration, setCalibration] = useState({ speed: 25, gain: 10 });

  const qualityIssues = {
    allLeadsVisible: { passed: true, label: 'All 12 leads visible' },
    calibrationReadable: { passed: true, label: 'Calibration marker readable' },
    glare: { passed: false, label: 'Glare detected', suggestion: 'Position away from direct light' },
    blur: { passed: true, label: 'No significant blur' },
    skew: { passed: true, label: 'Strip is straight' }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setStep('quality');
      // Simulate quality assessment
      setQuality(qualityIssues);
    }
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setStep('quality');
      setQuality(qualityIssues);
    }
  };

  const handleQualityPass = () => {
    setStep('calibration');
  };

  const handleQualityFail = () => {
    setUploadedFile(null);
    setQuality(null);
    setStep('capture');
  };

  const handleCalibrationConfirm = async () => {
    // Create ECG study
    const study = await repositories.createEcgStudy({
      patientId,
      capturedBy: 'cli-001',
      facilityId: 'fac-001',
      source: method === 'paper' ? 'paper_photo' : 'digital_file',
      quality: {
        usable: Object.values(quality).every(q => q.passed),
        issues: Object.entries(quality).filter(([_, q]) => !q.passed).map(([k, _]) => k),
        leadsDetected: ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6']
      },
      calibration
    });

    alert('ECG captured successfully!');
    navigate(`/patients/${patientId}`);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Back */}
      <Link to={`/patients/${patientId}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-6 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to patient
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Capture ECG</h1>
      <p className="text-gray-600 mb-8">Patient: {patientId}</p>

      {/* Step 1: Choose method */}
      {step === 'method' && (
        <div className="space-y-4">
          <button
            onClick={() => setMethod('paper') || setStep('capture')}
            className="w-full p-6 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-lg text-left transition-all"
          >
            <h3 className="font-bold text-gray-900 mb-2">📷 Photograph Paper ECG</h3>
            <p className="text-sm text-gray-600">Capture a photo of a paper ECG strip (recommended for district facilities)</p>
          </button>

          <button
            onClick={() => setMethod('digital') || setStep('capture')}
            className="w-full p-6 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-lg text-left transition-all"
          >
            <h3 className="font-bold text-gray-900 mb-2">📁 Upload Digital File</h3>
            <p className="text-sm text-gray-600">Upload an ECG file (PDF, image, or DICOM format)</p>
          </button>
        </div>
      )}

      {/* Step 2: Capture/Upload */}
      {step === 'capture' && !uploadedFile && (
        <div className="space-y-6">
          {method === 'paper' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">📸 Framing Guide</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Ensure all 12 leads are visible in the frame</li>
                <li>✓ Include the calibration pulse (usually 1mV marking)</li>
                <li>✓ Avoid glare and reflections</li>
                <li>✓ Lay the strip flat without skew</li>
                <li>✓ Ensure clear baseline and signal</li>
              </ul>
            </div>
          )}

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-700 font-medium mb-2">Drag and drop or click to select</p>
            <p className="text-sm text-gray-600 mb-4">ECG image or file</p>
            <label className="inline-block">
              <input
                type="file"
                onChange={handleFileUpload}
                accept="image/*,.pdf"
                className="hidden"
              />
              <span className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer">
                Select File
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Step 3: Quality Check */}
      {step === 'quality' && uploadedFile && (
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700">File: {uploadedFile}</p>
          </div>

          <div className="space-y-3">
            {Object.entries(quality).map(([key, check]) => (
              <div
                key={key}
                className={`p-4 rounded-lg border-l-4 ${
                  check.passed
                    ? 'bg-green-50 border-l-green-600'
                    : 'bg-red-50 border-l-red-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  {check.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`font-medium ${check.passed ? 'text-green-700' : 'text-red-700'}`}>
                      {check.label}
                    </p>
                    {check.suggestion && (
                      <p className="text-sm text-red-600 mt-1">{check.suggestion}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleQualityPass}
              disabled={Object.values(quality).some(q => !q.passed)}
              className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
            >
              Quality OK, Proceed
            </button>
            <button
              onClick={handleQualityFail}
              className="px-4 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg"
            >
              Retake
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Calibration */}
      {step === 'calibration' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-3">⚙️ Confirm Calibration</h3>
            <p className="text-sm text-gray-700 mb-4">Check the ECG paper or device settings</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Paper speed (mm/s)</label>
                <select
                  value={calibration.speed}
                  onChange={(e) => setCalibration({ ...calibration, speed: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={25}>25 mm/s (standard)</option>
                  <option value={50}>50 mm/s</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gain (mm/mV)</label>
                <select
                  value={calibration.gain}
                  onChange={(e) => setCalibration({ ...calibration, gain: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5 mm/mV</option>
                  <option value={10}>10 mm/mV (standard)</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleCalibrationConfirm}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            Confirm & Create ECG Study
          </button>
        </div>
      )}
    </div>
  );
}
