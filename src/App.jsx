import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientProfile from './pages/PatientProfile';
import Assessment from './pages/Assessment';
import ECGAnalysis from './pages/ECGAnalysis';
import Investigations from './pages/Investigations';
import FollowUps from './pages/FollowUps';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:patientId" element={<PatientProfile />} />
          <Route path="patients/:patientId/assessment" element={<Assessment />} />
          <Route path="patients/:patientId/ecg" element={<ECGAnalysis />} />
          <Route path="investigations" element={<Investigations />} />
          <Route path="followups" element={<FollowUps />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
