import { useEffect, useState } from 'react';
import * as repositories from '../data/repositories';

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await repositories.listFollowUps();
      setFollowUps(data);
    }
    load();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      overdue: 'bg-red-100 text-red-700',
      due: 'bg-orange-100 text-orange-700',
      scheduled: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      missed: 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Follow-ups</h1>
      <p className="text-gray-600 mb-6">Scheduled follow-up appointments and visits</p>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Follow-up ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patient ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Reason</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Due Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Channel</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {followUps.map((fu) => (
              <tr key={fu.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{fu.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{fu.patientId}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{fu.reason}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{fu.dueDate.toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{fu.channel.replace('_', ' ')}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(fu.status)}`}>
                    {fu.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {followUps.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600">No follow-ups scheduled</p>
        </div>
      )}
    </div>
  );
}
