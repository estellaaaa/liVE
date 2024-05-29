import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import PlantTracker from './Modules/PlantTracker/PlantTracker';
import CleaningSchedule from './Modules/CleaningSchedule/CleaningSchedule';
import RunningTracker from './Modules/RunningTracker/RunningTracker';

const App = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    // Fetch your modules here and update the state
    setModules([
      { id: 'planttracker', name: 'Plant Tracker', component: PlantTracker },
      { id: 'cleaningschedule', name: 'Cleaning Schedule', component: CleaningSchedule },
      { id: 'runningtracker', name: 'Running Tracker', component: RunningTracker },
    ]);
  }, []);

  return (
    <Router>
      <Navigation modules={modules} />
      <Routes>
        {modules.map(module => (
          <Route key={module.id} path={`/${module.id}`} element={<module.component />} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;