import React, { FunctionComponent } from 'react';

import styles from './CandidateBox.module.scss';

const CandidateBox: FunctionComponent<any> = (data: any) => {
  const { firstName, email, lastName, position, interviewDate } = data;
  const boxStyles = [styles.candidateBox];
  const active = false;

  if (active) {
    boxStyles.push(styles.active);
  }

  return (
    <div className={boxStyles.join(' ')}>
      <p className={styles.name}>
        {firstName} {lastName}
      </p>
      <p className={styles.position}>{position?.title}</p>
      <p>
        <a className={styles.jobType} href={`mailto:${email}`}>
          {email}
        </a>
      </p>
      <p className={styles.time}>{interviewDate}</p>
    </div>
  );
};

export default CandidateBox;
