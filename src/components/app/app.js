import React from 'react';

import appStyles from './app.module.css';
import { Calculator } from '../calculator/calculator';

function App() {
  return (
    <main className={appStyles.app}>
      <Calculator />
    </main>
  );
}

export default App;