import React from 'react';
import appStyles from './app.module.css';

import Lootboxer from '../lootboxer/lootboxer';

class App extends React.Component {
  render() {
    return (
      <div className={appStyles.root}>
        <div className={appStyles.blur}/>
        <div className={appStyles.wrapper}>
          <Lootboxer />
        </div>
      </div>
    );
  }
}

export default App;