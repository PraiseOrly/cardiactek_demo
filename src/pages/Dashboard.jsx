import { Link } from 'react-router-dom';
import {
  Users,
  BarChart3,
  Activity,
  AlertCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import {
  mockPatients,
  mockFollowUps,
  recentActivity,
  mockAssessments,
  mockECGs,
} from '../data/mockData';
import ActivityChart from '../components/ActivityChart';

export default function Dashboard() {
  const totalPatients = mockPatients.length;
  const assessmentsThisMonth = Object.values(mockAssessments).flat().length;
  const ecgsAnalyzed = Object.values(mockECGs).flat().length;
  const followUpsDue = mockFollowUps.filter((f) => f.status === 'Due').length;

  const casesRequiringAttention = mockPatients
    .filter((p) => p.riskStatus !== 'Low')
    .slice(0, 6);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Good morning, Dr. Chen</h1>
        <p className="text-gray-600 mt-1">
          Here's an overview of your cardiovascular care activity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalPatients}</p>
            </div>
            <Users className="w-12 h-12 text-primary-100" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Assessments This Month</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{assessmentsThisMonth}</p>
            </div>
            <Activity className="w-12 h-12 text-blue-100" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">ECGs Analyzed</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{ecgsAnalyzed}</p>
            </div>
            <BarChart3 className="w-12 h-12 text-green-100" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Follow-ups Due</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{followUpsDue}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-amber-100" />
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Cardiovascular Activity</h2>
        <ActivityChart />
      </div>

      {/* Cases Requiring Attention and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cases Requiring Attention */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Cases Requiring Attention</h2>

            <div className="space-y-3">
              {casesRequiringAttention.map((patient) => (
                <Link
                  key={patient.id}
                  to={`/patients/${patient.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {patient.id}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>Age: {patient.age} years</div>
                        <div>Sex: {patient.sex}</div>
                        <div className="col-span-2">{patient.primaryConcern}</div>
                      </div>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {patient.previousConditions.map((cond) => (
                          <span
                            key={cond}
                            className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded"
                          >
                            {cond}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          patient.riskStatus === 'Very High'
                            ? 'bg-red-100 text-red-700'
                            : patient.riskStatus === 'High'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {patient.riskStatus} Risk
                      </span>
                      <p className="text-xs text-gray-500 mt-2">Follow-up: {patient.nextFollowUp}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              to="/patients"
              className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              View all patients <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{activity.action}</span> for {activity.patientId}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
