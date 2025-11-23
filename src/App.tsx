import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import DiscoverView from './features/discover/DiscoverView';
import AnalyticsView from './features/analytics/AnalyticsView';
import KnowledgeGraphView from './features/knowledge-graph/KnowledgeGraphView';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-primary/30 selection:text-white pb-20">

        {/* Decorative Background Elements */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none z-0" />

        <Header />

        <main className="relative z-10 pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/discover" replace />} />
            <Route path="/discover" element={<DiscoverView />} />
            <Route path="/analytics" element={<AnalyticsView />} />
            <Route path="/knowledge-graph" element={<KnowledgeGraphView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
