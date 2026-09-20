import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Clock } from 'lucide-react';
import * as repositories from '../data/repositories';
import { useAppStore } from '../store/useAppStore';
import * as vocab from '../domain/vocabulary';

export default function Worklist() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ waiting: 0, urgent: 0, dueFollowups: 0 });
  const { currentUser } = useAppStore();

  useEffect(() => {
    async function load() {
      const studies = await repositories.listEcgStudies();
      const assessments = await repositories.listAssessments();
      const patients = await repositories.listPatients();

      // Build worklist items
      const worklistItems = [];

      // Unsigned assessments
      assessments
        .filter(a => a.status === 'draft' && a.facilityId === currentUser.facilityId)
        .forEach(a => {
          const patient = patients.find(p => p.id === a.patientId);
          if (patient) {
            worklistItems.push({
              id: `ass-${a.id}`,
              type: 'assessment',
              patientId: patient.id,
              patientName: patient.name,
              age: new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear(),
              sex: patient.sex,
              facilityId: patient.facilityId,
              whatWaiting: 'Assessment unsigned',
              waitingTime: new Date() - a.updatedAt,
              urgency: 'routine',
              assignedTo: a.clinicianId,
              action: { label: 'Sign assessment', href: '#' }
            });
          }
        });

      // ECGs awaiting review
      studies
        .filter(s => s.status === 'awaiting_review')
        .forEach(s => {
          const patient = patients.find(p => p.id === s.patientId);
          if (patient) {
            worklistItems.push({
              id: `ecg-${s.id}`,
              type: 'ecg',
              patientId: patient.id,
              patientName: patient.name,
              age: new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear(),
              sex: patient.sex,
              facilityId: patient.facilityId,
              whatWaiting: 'ECG awaiting review',
              waitingTime: new Date() - s.capturedAt,
              urgency: 'urgent',
              assignedTo: currentUser.id,
              action: { label: 'Review ECG', href: '#' }
            });
          }
        });

      // Sort by urgency then wait time
      const urgencyOrder = { urgent: 0, soon: 1, routine: 2 };
      worklistItems.sort((a, b) => {
        if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
          return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
        }
        return b.waitingTime - a.waitingTime;
      });

      setItems(worklistItems);

      // Stats
      const urgentCount = worklistItems.filter(i => i.urgency === 'urgent').length;
      setStats({
        waiting: worklistItems.length,
        urgent: urgentCount,
        dueFollowups: 0 // TODO
      });
    }

    load();
  }, [currentUser]);

  const formatWaitTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    if (hours < 1) return '<1h';
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Worklist</h1>
        <p className="text-gray-600 mt-1">Items waiting for action</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Items waiting</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.waiting}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Urgent items</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.urgent}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Follow-ups due this week</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.dueFollowups}</p>
        </div>
      </div>

      {/* Queue */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600">No items in your worklist</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex-1">
                  {/* Urgency indicator */}
                  <div className="flex items-center gap-4 mb-2">
                    {item.urgency === 'urgent' && (
                      <div className="flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-semibold text-red-600">URGENT</span>
                      </div>
                    )}
                  </div>

                  {/* Patient info */}
                  <div className="grid grid-cols-6 gap-4 text-sm mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{item.patientName}</p>
                      <p className="text-xs text-gray-500">{item.patientId}</p>
                    </div>
                    <div className="text-gray-700">{item.age}y, {item.sex}</div>
                    <div className="text-gray-600">{item.whatWaiting}</div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {formatWaitTime(item.waitingTime)}
                    </div>
                    <div className="text-gray-600">{item.assignedTo}</div>
                  </div>
                </div>

                {/* Action button */}
                <Link
                  to={`/patients/${item.patientId}`}
                  className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  View patient
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
