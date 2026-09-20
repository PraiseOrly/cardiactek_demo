import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Worklist from './pages/Worklist';
import PatientsList from './pages/PatientsList';
import PatientProfile from './pages/PatientProfile';
import EcgsPage from './pages/EcgsPage';
import ReferralsPage from './pages/ReferralsPage';
import FollowUpsPage from './pages/FollowUpsPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Worklist />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="patients/:patientId" element={<PatientProfile />} />
          <Route path="ecgs" element={<EcgsPage />} />
          <Route path="referrals" element={<ReferralsPage />} />
          <Route path="followups" element={<FollowUpsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
