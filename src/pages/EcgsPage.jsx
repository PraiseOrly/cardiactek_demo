import { useEffect, useState } from 'react';
import * as repositories from '../data/repositories';

export default function EcgsPage() {
  const [ecgs, setEcgs] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await repositories.listEcgStudies();
      setEcgs(data);
    }
    load();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">ECG Studies</h1>
      <p className="text-gray-600 mb-6">All ECG recordings across facility</p>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {ecgs.length === 0 ? (
          <div className="p-12 text-center text-gray-600">No ECGs recorded yet</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ECG ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patient ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Quality</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ecgs.map((ecg) => (
                <tr key={ecg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{ecg.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ecg.patientId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ecg.capturedAt.toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ecg.source}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={ecg.quality.usable ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                      {ecg.quality.usable ? 'Usable' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{ecg.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
