import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'May', assessments: 4, ecgs: 3, followups: 5 },
  { month: 'Jun', assessments: 7, ecgs: 5, followups: 8 },
  { month: 'Jul', assessments: 6, ecgs: 4, followups: 6 },
  { month: 'Aug', assessments: 9, ecgs: 8, followups: 10 },
  { month: 'Sep', assessments: 8, ecgs: 6, followups: 7 },
];

export default function ActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="assessments"
          stroke="#2563eb"
          strokeWidth={2}
          dot={{ fill: '#2563eb' }}
          name="Assessments"
        />
        <Line
          type="monotone"
          dataKey="ecgs"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ fill: '#10b981' }}
          name="ECGs Analyzed"
        />
        <Line
          type="monotone"
          dataKey="followups"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={{ fill: '#f59e0b' }}
          name="Follow-ups"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
