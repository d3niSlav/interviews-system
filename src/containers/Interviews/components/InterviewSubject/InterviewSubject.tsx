import React, { FunctionComponent } from 'react';

import styles from './InterviewSubject.module.scss';

type InterviewSubjectProps = {
  subject: string;
};

const InterviewSubject: FunctionComponent<InterviewSubjectProps> = ({ subject }) => {
  return (
    <div className={styles.box}>
      <div className={styles.heading}>
        <span>{subject}</span>
        <div className={styles.actionsBox}>
          <button className={[styles.statusButton, styles.reject].join(' ')} />
          <button className={[styles.statusButton, styles.middle].join(' ')} />
          <button className={[styles.statusButton, styles.success].join(' ')} />
        </div>
      </div>
      <hr className={styles.separator} />
      <ul className={styles.topics}>
        <li className={[styles.topicRow, styles.reject].join(' ')}>
          <button className={[styles.statusButton, styles.question].join(' ')} />
          <span className={styles.topicTitle}>Functions</span>
          <div className={styles.actionsBox}>
            <button className={[styles.statusButton, styles.reject].join(' ')} />
            <button className={[styles.statusButton, styles.middle, styles.active].join(' ')} />
            <button className={[styles.statusButton, styles.success].join(' ')} />
          </div>
        </li>
        <li className={[styles.topicRow, styles.middle].join(' ')}>
          <button className={[styles.statusButton, styles.question].join(' ')} />
          <span className={styles.topicTitle}>Functions</span>
          <div className={styles.actionsBox}>
            <button className={[styles.statusButton, styles.reject].join(' ')} />
            <button className={[styles.statusButton, styles.middle].join(' ')} />
            <button className={[styles.statusButton, styles.success].join(' ')} />
          </div>
        </li>
        <li className={[styles.topicRow, styles.success].join(' ')}>
          <button className={[styles.statusButton, styles.question].join(' ')} />
          <span className={styles.topicTitle}>Functions</span>
          <div className={styles.actionsBox}>
            <button className={[styles.statusButton, styles.reject].join(' ')} />
            <button className={[styles.statusButton, styles.middle].join(' ')} />
            <button className={[styles.statusButton, styles.success].join(' ')} />
          </div>
        </li>
        <li className={styles.topicRow}>
          <button className={[styles.statusButton, styles.question].join(' ')} />
          <span className={styles.topicTitle}>Functions</span>
          <div className={styles.actionsBox}>
            <button className={[styles.statusButton, styles.reject].join(' ')} />
            <button className={[styles.statusButton, styles.middle].join(' ')} />
            <button className={[styles.statusButton, styles.success].join(' ')} />
          </div>
        </li>
        <li className={styles.topicRow}>
          <button className={[styles.statusButton, styles.question].join(' ')} />
          <span className={styles.topicTitle}>Functions</span>
          <div className={styles.actionsBox}>
            <button className={[styles.statusButton, styles.reject].join(' ')} />
            <button className={[styles.statusButton, styles.middle].join(' ')} />
            <button className={[styles.statusButton, styles.success].join(' ')} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default InterviewSubject;
