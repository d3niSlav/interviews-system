import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';

import { ReactComponent as ServiceUnavailableIcon } from '../../../assets/images/svg/service-unavailable.svg';
import Button from '../../../components/Button';
import { HOME_ROUTE } from '../../../shared/constants';

import styles from '../Errors.module.scss';

const ServiceUnavailable: FunctionComponent = () => {
  const history = useHistory();

  const handleBackToHomeClick = (): void => {
    history.push(HOME_ROUTE);
  };

  return (
    <div className={styles.wrapper}>
      <ServiceUnavailableIcon className={styles.icon} />
      <div className={styles.message}>
        <p>Sorry, we are currently experiencing some issues.</p>
        <Button
          size="large"
          className={styles.action}
          text="Back to home"
          type="button"
          onClick={handleBackToHomeClick}
        />
      </div>
    </div>
  );
};

export default ServiceUnavailable;
