import React, { FunctionComponent } from 'react';

import styles from './DashboardBox.module.scss';

const DashboardBox: FunctionComponent<any> = ({ label, value, icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.indicator}>{icon}</div>
      <div className={styles.textWrapper}>
        <p className={styles.label}>{label}</p>
        <h4 className={styles.value}>{value}</h4>
      </div>
    </div>
  );
};

export default DashboardBox;
