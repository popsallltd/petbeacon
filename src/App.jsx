import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import RegisterPet from './pages/RegisterPet';
import HelperMap from './pages/HelperMap';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen">
          <Navigation />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register/*" element={<RegisterPet />} />
              <Route path="/helpers" element={<HelperMap />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
