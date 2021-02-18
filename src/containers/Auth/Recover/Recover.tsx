import React, { FunctionComponent, useState } from 'react';
import { Form } from 'react-final-form';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { RecoverPasswordDto } from './Recover.dto';
import Button from '../../../components/Button';
import { composeValidators, notEmpty, TextInputField } from '../../../components/FormFields';
import Grid from '../../../components/Grid';
import { post } from '../../../shared/api';
import { REGISTER_ROUTE } from '../../../shared/constants';

import styles from '../Auth.module.scss';
import { ReactComponent as CheckEmailIcon } from '../../../assets/images/svg/check-email.svg';
import { ReactComponent as RecoverPasswordIcon } from '../../../assets/images/svg/forgotten-password.svg';

const Recover: FunctionComponent = () => {
  const history = useHistory();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const onSubmit = async (values: RecoverPasswordDto) => {
    let errors = {};

    await post<void, RecoverPasswordDto>('/auth/forgotten-password', values)
      .then(() => {
        setIsEmailSent(true);
      })
      .catch((error) => {
        const customErrors = error.response.data.message;
        errors = { email: Array.isArray(customErrors) ? customErrors[0] : customErrors };
      });

    return errors;
  };

  const handleGoBackClick = (): void => {
    history.goBack();
  };

  return (
    <div className={styles.tile}>
      <Grid container className={styles.content}>
        <Grid item className={styles.imageWrapper} md={6}>
          <div className="full-width">
            {isEmailSent ? (
              <CheckEmailIcon className={styles.image} />
            ) : (
              <RecoverPasswordIcon className={styles.image} />
            )}
            <p className={styles.redirectLinkWrapper}>
              Don&apos;t have an account?&nbsp;
              <Link className="link" to={REGISTER_ROUTE}>
                Sign up now!
              </Link>
            </p>
          </div>
        </Grid>
        <Grid item className={styles.formWrapper} md={6}>
          {isEmailSent ? (
            <div className="text-center">
              <h1 className={`text-center color-accent ${styles.heading}`}>Recover password email sent</h1>
              <div className="text-center">
                <p className="color-text">Check you email address in order to proceed with your password recovery.</p>
                <br />
                <Button className={styles.submitAction} text="Go back" type="button" onClick={handleGoBackClick} />
              </div>
            </div>
          ) : (
            <>
              <h1 className={`text-center color-accent ${styles.heading}`}>Recover password</h1>
              <br />
              <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine }) => (
                  <form onSubmit={handleSubmit} className={`full-width ${styles.form}`}>
                    <TextInputField
                      title="Email"
                      name="email"
                      placeholder="Enter email..."
                      required
                      fieldProps={{
                        validate: composeValidators(notEmpty('Please, enter your email!')),
                      }}
                    />
                    <Button
                      className={styles.submitAction}
                      disabled={submitting || pristine}
                      text="Send recovery link"
                      type="submit"
                    />
                  </form>
                )}
              />
            </>
          )}
          <p className={styles.redirectLinkWrapperMobile}>
            Don&apos;t have an account?&nbsp;
            <Link className="link" to={REGISTER_ROUTE}>
              Sign up now!
            </Link>
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Recover;
