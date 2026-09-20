import { useEffect, useState } from 'react';
import * as repositories from '../data/repositories';

export default function PatientAssessments({ patientId }) {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await repositories.listAssessments(patientId);
      setAssessments(data);
    }
    load();
  }, [patientId]);

  if (assessments.length === 0) {
    return <p className="text-gray-600">No assessments recorded yet.</p>;
  }

  return (
    <div className="space-y-4">
      {assessments.map((assessment) => (
        <div key={assessment.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between mb-3">
            <p className="font-semibold text-gray-900">{assessment.createdAt.toLocaleDateString()}</p>
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              assessment.status === 'signed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {assessment.status}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{assessment.notes}</p>
          {assessment.signedAt && (
            <p className="text-xs text-gray-500">Signed by {assessment.signedBy} at {assessment.signedAt.toLocaleString()}</p>
          )}
        </div>
      ))}
    </div>
  );
}
