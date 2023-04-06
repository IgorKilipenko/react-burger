import React from 'react';
import CoursePredictor from '../course-predictor/course-predictor'

import appStyles from './app.module.css';

function App() {
  return (
    <main className={appStyles.app}>
      <CoursePredictor />
    </main>
  );
}

export default App;