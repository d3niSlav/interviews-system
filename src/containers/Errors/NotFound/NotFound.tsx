import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';

import { ReactComponent as NotFoundIcon } from '../../../assets/images/svg/404.svg';
import Button from '../../../components/Button';

import styles from '../Errors.module.scss';

const NotFound: FunctionComponent = () => {
  const history = useHistory();

  const handleGoBackClick = (): void => {
    history.goBack();
  };

  return (
    <div className={styles.wrapper}>
      <NotFoundIcon className={styles.icon} />
      <div className={styles.message}>
        <p>Sorry, but the page you are looking for was not found.</p>
        <Button size="large" className={styles.action} text="Go back" type="button" onClick={handleGoBackClick} />
      </div>
    </div>
  );
};

export default NotFound;
