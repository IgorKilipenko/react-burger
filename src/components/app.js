import React from 'react';
import withFetch from './hocs/with-fetch';
import styles from '../styles.module.css'

const WithFetchFilm = withFetch();

class App extends React.Component {

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className={styles.app}>
        <WithFetchFilm />
      </div>
    )
  }
}

export default App;