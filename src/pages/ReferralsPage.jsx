import { useEffect, useState } from 'react';
import * as repositories from '../data/repositories';

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await repositories.listReferrals();
      setReferrals(data);
    }
    load();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      requested: 'bg-amber-100 text-amber-700',
      accepted: 'bg-blue-100 text-blue-700',
      reviewed: 'bg-green-100 text-green-700',
      closed: 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      urgent: 'text-red-600 font-semibold',
      soon: 'text-orange-600 font-semibold',
      routine: 'text-gray-600'
    };
    return colors[urgency] || 'text-gray-600';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Referrals</h1>
      <p className="text-gray-600 mb-6">Incoming and outgoing cardiology referrals</p>

      <div className="grid gap-6">
        {referrals.map((referral) => (
          <div key={referral.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{referral.id}</h3>
                <p className="text-sm text-gray-600">Patient: {referral.patientId}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(referral.status)}`}>
                {referral.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-600">From facility</p>
                <p className="font-medium text-gray-900">{referral.fromFacilityId}</p>
              </div>
              <div>
                <p className="text-gray-600">To facility</p>
                <p className="font-medium text-gray-900">{referral.toFacilityId}</p>
              </div>
              <div>
                <p className="text-gray-600">Urgency</p>
                <p className={getUrgencyColor(referral.urgency)}>{referral.urgency}</p>
              </div>
              <div>
                <p className="text-gray-600">Date</p>
                <p className="font-medium text-gray-900">{referral.createdAt.toLocaleDateString()}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded p-3 mb-3">
              <p className="text-sm font-medium text-gray-700">Reason</p>
              <p className="text-sm text-gray-600 mt-1">{referral.reason}</p>
            </div>

            {referral.response && (
              <div className="bg-green-50 rounded p-3">
                <p className="text-sm font-medium text-green-700">Response</p>
                <p className="text-sm text-gray-600 mt-1">{referral.response}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {referrals.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600">No referrals yet</p>
        </div>
      )}
    </div>
  );
}
