export default function ReportsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
      <p className="text-gray-600 mb-6">Generate cardiovascular reports</p>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <p className="text-gray-600">No reports generated yet</p>
        <p className="text-sm text-gray-500 mt-2">Generate reports from patient profiles</p>
      </div>
    </div>
  );
}
