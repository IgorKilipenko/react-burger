import React from 'react';
import styles from './FlowControl.module.css';

export const FLOW_OPTIONS = [1, 2, 3];

export const FlowControl = ({ flow, selectedFlow, onClick }) => (
  <span
    className={`${styles.fanButton} ${flow === selectedFlow ? styles.isActive : ''}`}
    onClick={() => onClick(flow)}
  >
    {flow}
  </span>
);