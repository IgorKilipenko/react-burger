import React from 'react';
import styles from './MainDashboard.module.css';
import { ProgressRing } from './ProgressRing';

export const MIN_TEMPERATURE = 16;
export const MAX_TEMPERATURE = 28;

export const MainDashboard = ({ temperature, onIncreaseClick, onDecreaseClick }) => {
  const progress = (100 * (temperature - MIN_TEMPERATURE)) / (MAX_TEMPERATURE - MIN_TEMPERATURE);

  return (
    <div className={styles.main}>
      <div className={styles.mainCircle}>
        <ProgressRing className={styles.progressBgd} progress={progress} />
        <div className={styles.temperatureControlsWrap}>
          <span className={styles.iconThermometer} />
          <p className={styles.temperature}>{temperature}°C</p>
          <span>Температура</span>
          <div className={styles.temperatureControls}>
            <button
              className={`${styles.buttonTemperature} ${styles.buttonTemperatureMinus}`}
              onClick={onDecreaseClick}
            />
            <button
              className={`${styles.buttonTemperature} ${styles.buttonTemperaturePlus}`}
              onClick={onIncreaseClick}
            />
          </div>
        </div>
        <span className={`${styles.decorator} ${styles.decorator1}`}>16°C</span>
        <span className={`${styles.decorator} ${styles.decorator2}`}>18°C</span>
        <span className={`${styles.decorator} ${styles.decorator3}`}>20°C</span>
        <span className={`${styles.decorator} ${styles.decorator4}`}>22°C</span>
        <span className={`${styles.decorator} ${styles.decorator5}`}>24°C</span>
        <span className={`${styles.decorator} ${styles.decorator6}`}>26°C</span>
        <span className={`${styles.decorator} ${styles.decorator7}`}>28°C</span>
      </div>
    </div>
  );
};