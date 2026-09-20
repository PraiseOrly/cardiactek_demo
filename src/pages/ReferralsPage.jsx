export default function ReferralsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Referrals</h1>
      <p className="text-gray-600 mb-6">Incoming and outgoing referrals</p>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <p className="text-gray-600">No referrals yet</p>
        <p className="text-sm text-gray-500 mt-2">Referrals will appear here when you create them from a patient profile</p>
      </div>
    </div>
  );
}
