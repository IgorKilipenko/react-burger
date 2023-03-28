import React from 'react';
import styles from './styles.module.css';
import { SwitchControl } from './components/SwitchControl';
import { FlowControl, FLOW_OPTIONS } from './components/FlowControl';
import { MainDashboard, MIN_TEMPERATURE, MAX_TEMPERATURE } from './components/MainDashboard';

export default class App extends React.Component {
  state = {
    enabled: false,
    temperature: 21,
    flow: 1
  };

  /* Здесь ваш код */

  render() {
    const { enabled } = this.state;

    return (
      <div className={styles.root}>
        <div className={styles.wrap}>
          <h1 className={styles.title}>Гостиная</h1>
          <div className={styles.card}>
            <div className={styles.column}>
              <SwitchControl enabled={enabled} onClick={/* Здесь ваш код */} />
              <div>
                <span className={styles.iconFan} />
                <label>
                  Скорость обдува
                  <div className={styles.fanRow}>
                    {FLOW_OPTIONS.map(elem => (
                      <FlowControl
                        key={`flow_elem${elem}`}
                        flow={elem}
                        selectedFlow={this.state.flow}
                        onClick={/* Здесь ваш код */}
                      />
                    ))}
                  </div>
                </label>
              </div>
            </div>
            <MainDashboard
              temperature={this.state.temperature}
              onIncreaseClick={/* Здесь ваш код */}
              onDecreaseClick={/* Здесь ваш код */}
            />
            <div className={styles.column}>
              <span className={styles.iconDrop} />
              <label className={styles.dropLabel}>
                Влажность
                <p>52%</p>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}