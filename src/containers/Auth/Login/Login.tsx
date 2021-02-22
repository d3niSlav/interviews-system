import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { LoginDto, UserTokenDto } from './Login.dto';
import { setUserFromTokenAction } from '../Auth.actions';
import Button from '../../../components/Button';
import { composeValidators, notEmpty, TextInputField } from '../../../components/FormFields';
import Grid from '../../../components/Grid';
import { post } from '../../../shared/api';
import { HOME_ROUTE, RECOVER_PASSWORD_ROUTE, REGISTER_ROUTE } from '../../../shared/constants';
import { JWT_TOKEN_COOKIE_NAME, setCookie } from '../../../shared/web-storage';
import { mapRequestErrors } from '../../../shared/helpers';

import styles from '../Auth.module.scss';
import { ReactComponent as LoginIcon } from '../../../assets/images/svg/login.svg';

const Login: FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: LoginDto) => {
    let errors = {};

    await post<UserTokenDto, LoginDto>('/auth/login', values)
      .then(({ access_token }) => {
        setCookie(JWT_TOKEN_COOKIE_NAME, access_token);
        dispatch(setUserFromTokenAction(access_token));
        history.push(HOME_ROUTE);
      })
      .catch((error) => {
        errors = { ...mapRequestErrors(error.response.data, 'email') };
      });

    return errors;
  };

  return (
    <div className={styles.tile}>
      <Grid container className={styles.content}>
        <Grid item className={styles.imageWrapper} md={6}>
          <div className="full-width">
            <LoginIcon className={styles.image} />
            <p className={styles.redirectLinkWrapper}>
              Don&apos;t have an account?&nbsp;
              <Link className="link" to={REGISTER_ROUTE}>
                Sign up now!
              </Link>
            </p>
          </div>
        </Grid>
        <Grid item className={styles.formWrapper} md={6}>
          <h1 className={`text-center color-accent ${styles.heading}`}>Login</h1>
          <br />
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, pristine }) => (
              <form onSubmit={handleSubmit} className={`full-width ${styles.form}`}>
                <TextInputField
                  title="Email"
                  name="email"
                  type="email"
                  placeholder="Enter email..."
                  required
                  fieldProps={{
                    validate: composeValidators(notEmpty('Please, enter your email!')),
                  }}
                />
                <TextInputField
                  title="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password..."
                  required
                  fieldProps={{
                    validate: composeValidators(notEmpty('Please, enter your password!')),
                  }}
                />
                <Button
                  className={styles.submitAction}
                  disabled={submitting || pristine}
                  text="Sign in"
                  type="submit"
                />
                <Link className={`link ${styles.recoverLink}`} to={RECOVER_PASSWORD_ROUTE}>
                  Recover password?
                </Link>
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

export default Login;
