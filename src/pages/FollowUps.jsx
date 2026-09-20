import { useMemo, useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { mockFollowUps } from '../data/mockData';

export default function FollowUps() {
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = useMemo(() => {
    if (statusFilter === 'All') return mockFollowUps;
    return mockFollowUps.filter((f) => f.status === statusFilter);
  }, [statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Due':
        return 'bg-red-100 text-red-700';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Overdue':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Follow-ups</h1>
            <p className="text-gray-600 mt-1">Manage and track patient follow-up appointments</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Schedule Follow-up
          </button>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option>All</option>
            <option>Due</option>
            <option>Upcoming</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>
        </div>
      </div>

      {/* Follow-ups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((followUp) => (
            <div key={followUp.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{followUp.patientName}</h3>
                  <p className="text-xs text-gray-500">{followUp.patientId}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(followUp.status)}`}>
                  {followUp.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600">Reason:</p>
                  <p className="font-medium text-gray-900">{followUp.reason}</p>
                </div>

                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <div>
                    <p className="text-gray-600 text-xs">Last Visit</p>
                    <p className="font-medium text-gray-900">{followUp.lastVisit}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs">Due Date</p>
                    <p className="font-medium text-gray-900">{followUp.dueDate}</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 px-3 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 text-sm font-medium rounded-lg transition-colors">
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">No follow-ups found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
