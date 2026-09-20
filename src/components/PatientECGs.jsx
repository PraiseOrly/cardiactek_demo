import { useEffect, useState } from 'react';
import * as repositories from '../data/repositories';
import * as vocab from '../domain/vocabulary';

export default function PatientEcgs({ patientId }) {
  const [ecgs, setEcgs] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await repositories.listEcgStudies(patientId);
      setEcgs(data);
    }
    load();
  }, [patientId]);

  if (ecgs.length === 0) {
    return <p className="text-gray-600">No ECGs captured yet. Capture an ECG to begin.</p>;
  }

  return (
    <div className="space-y-4">
      {ecgs.map((ecg) => (
        <div key={ecg.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between mb-3">
            <p className="font-semibold text-gray-900">{ecg.capturedAt.toLocaleDateString()}</p>
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded font-medium">
              {ecg.status}
            </span>
          </div>
          <div className="text-sm text-gray-700 space-y-1">
            <p>Captured by: {ecg.capturedBy}</p>
            <p>Source: {ecg.source === 'paper_photo' ? 'Paper photograph' : 'Digital file'}</p>
            <p>Quality: {ecg.quality.usable ? 'Usable' : 'Failed'}</p>
            {!ecg.quality.usable && ecg.quality.issues.length > 0 && (
              <p className="text-red-600">Issues: {ecg.quality.issues.join(', ')}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
