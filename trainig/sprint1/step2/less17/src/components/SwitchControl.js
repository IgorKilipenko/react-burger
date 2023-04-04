import React from 'react';
import styles from './SwitchControl.module.css';

export const SwitchControl = ({ enabled, onClick }) => {
  const className = `${styles.button} ${enabled ? styles.isActive : ''}`;
  const text = enabled ? 'Вкл' : 'Выкл';

  return (
    <label className={styles.buttonLabel}>
      <button className={className} onClick={onClick} />
      {text}
    </label>
  );
};