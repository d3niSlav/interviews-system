import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';
import { useHistory, useLocation } from 'react-router';

import { ResetPasswordDto } from './Reset.dto';
import Button from '../../../components/Button';
import { TextInputField, composeValidators, notEmpty } from '../../../components/FormFields';
import Grid from '../../../components/Grid';
import { post } from '../../../shared/api';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../../shared/constants';

import styles from '../Auth.module.scss';
import { ReactComponent as ResetPasswordIcon } from '../../../assets/images/svg/reset-password.svg';
import { Link } from 'react-router-dom';

const Reset: FunctionComponent = () => {
  const history = useHistory();
  const location = useLocation();

  const onSubmit = async (values: ResetPasswordDto) => {
    let errors = {};

    await post<void, ResetPasswordDto>(`/auth/reset${location.search}`, values)
      .then(() => {
        history.push(LOGIN_ROUTE);
      })
      .catch((error) => {
        const customErrors = error.response.data.message;
        errors = { password: Array.isArray(customErrors) ? customErrors[0] : customErrors };
      });

    return errors;
  };

  return (
    <div className={styles.tile}>
      <Grid container className={styles.content}>
        <Grid item className={styles.imageWrapper} md={6}>
          <div className="full-width">
            <ResetPasswordIcon className={styles.image} />
            <p className={styles.redirectLinkWrapper}>
              Don&apos;t have an account?&nbsp;
              <Link className="link" to={REGISTER_ROUTE}>
                Sign up now!
              </Link>
            </p>
          </div>
        </Grid>
        <Grid item className={styles.formWrapper} md={6}>
          <h1 className={`text-center color-accent ${styles.heading}`}>Set a new password</h1>
          <br />
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit} className={`full-width ${styles.form}`}>
                <TextInputField
                  title="New password"
                  name="password"
                  type="password"
                  placeholder="Enter password..."
                  required
                  fieldProps={{
                    validate: composeValidators(notEmpty('Please, enter password!')),
                  }}
                />
                <TextInputField
                  title="Confirm password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password..."
                  required
                  fieldProps={{
                    validate: composeValidators(notEmpty('Please, confirm your password!')),
                  }}
                />
                <Button
                  className={styles.submitAction}
                  disabled={submitting || pristine}
                  text="Set password"
                  type="submit"
                />
              </form>
            )}
          />
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

export default Reset;
