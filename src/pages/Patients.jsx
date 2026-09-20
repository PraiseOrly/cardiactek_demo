import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, ChevronRight } from 'lucide-react';
import { mockPatients } from '../data/mockData';

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');

  const filtered = useMemo(() => {
    return mockPatients.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRisk = riskFilter === 'All' || p.riskStatus === riskFilter;
      return matchesSearch && matchesRisk;
    });
  }, [searchQuery, riskFilter]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-600 mt-1">Manage and review patient records</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Add Patient
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or patient ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option>All</option>
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
            <option>Very High</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Age</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Sex</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  Primary Concern
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  Risk Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  Last Assessment
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  Next Follow-up
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.age}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.sex}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {patient.primaryConcern}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          patient.riskStatus === 'Very High'
                            ? 'bg-red-100 text-red-700'
                            : patient.riskStatus === 'High'
                            ? 'bg-orange-100 text-orange-700'
                            : patient.riskStatus === 'Moderate'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {patient.riskStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.lastAssessment}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.nextFollowUp}</td>
                    <td className="px-6 py-4 text-sm">
                      <Link
                        to={`/patients/${patient.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                      >
                        View
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-8 text-center">
                    <p className="text-gray-600">No patients found matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
