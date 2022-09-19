import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';

import Button from '../../../../../../components/Button';

import { ReactComponent as DeleteIcon } from '../../../../../../assets/images/svg/delete-icon.svg';
import { ReactComponent as DownloadFileIcon } from '../../../../../../assets/images/svg/download-file-icon.svg';
import { ReactComponent as EditIcon } from '../../../../../../assets/images/svg/edit-icon.svg';

import styles from './RowActions.module.scss';

const RowActions: FunctionComponent<any> = ({ id, onDelete }) => {
  const history = useHistory();

  const openProfile = () => {
    history.push(`/candidates/profile/${id}`);
  };

  return (
    <div className={styles.rowActions}>
      <span className={styles.section}>
        <EditIcon
          style={{
            width: '20px',
            height: '20px',
          }}
        />
        <DeleteIcon
          style={{
            width: '20px',
            height: '20px',
          }}
          onClick={onDelete}
        />
      </span>
      <span className={[styles.section, styles.mainAction].join(' ')}>
        <Button text="View" size="small" onClick={openProfile} />
      </span>
      <span className={styles.section}>
        <DownloadFileIcon
          style={{
            width: '20px',
            height: '20px',
          }}
        />
      </span>
    </div>
  );
};

export default RowActions;
