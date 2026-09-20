import { mockInvestigations } from '../data/mockData';
import { Beaker } from 'lucide-react';

export default function PatientInvestigations({ patientId }) {
  const investigations = mockInvestigations[patientId] || [];

  if (investigations.length === 0) {
    return (
      <div className="text-center py-8">
        <Beaker className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-600">No investigations recorded yet.</p>
        <p className="text-sm text-gray-500 mt-1">Add the patient's investigation results to track trends.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Investigation</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Value</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Unit</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Reference</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {investigations.map((inv) => (
              <tr key={inv.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">{inv.date}</td>
                <td className="px-4 py-3 text-gray-900">{inv.type}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">{inv.value}</td>
                <td className="px-4 py-3 text-gray-600">{inv.unit}</td>
                <td className="px-4 py-3 text-gray-600">{inv.reference}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      inv.status === 'High'
                        ? 'bg-red-100 text-red-700'
                        : inv.status === 'Low'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 italic">
        Investigations are recorded for clinician review and do not provide medical treatment recommendations.
      </p>
    </div>
  );
}
