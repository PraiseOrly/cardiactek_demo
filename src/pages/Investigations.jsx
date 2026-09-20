import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { mockInvestigations } from '../data/mockData';

export default function Investigations() {
  const [searchQuery, setSearchQuery] = useState('');

  const allInvestigations = Object.values(mockInvestigations).flat();

  const filtered = allInvestigations.filter((inv) =>
    inv.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Investigations</h1>
            <p className="text-gray-600 mt-1">Manage cardiovascular investigations and lab results</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Add Investigation
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search investigations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Investigations Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  Investigation
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{inv.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{inv.date}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{inv.value}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{inv.unit}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{inv.reference}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
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
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <p className="text-gray-600">No investigations found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-500 italic mt-4">
        Investigations are recorded for clinician review and do not provide medical treatment recommendations.
      </p>
    </div>
  );
}
