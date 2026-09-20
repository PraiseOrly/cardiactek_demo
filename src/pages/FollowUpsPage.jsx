export default function FollowUpsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Follow-ups</h1>
      <p className="text-gray-600 mb-6">Scheduled follow-up appointments</p>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <p className="text-gray-600">No follow-ups scheduled</p>
        <p className="text-sm text-gray-500 mt-2">Schedule follow-ups from patient profiles</p>
      </div>
    </div>
  );
}
