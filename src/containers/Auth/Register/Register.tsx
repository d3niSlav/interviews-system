import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { RegisterDto } from './Register.dto';
import Button from '../../../components/Button';
import { composeValidators, isEmail, notEmpty, TextInputField } from '../../../components/FormFields';
import Grid from '../../../components/Grid';
import { post } from '../../../shared/api';
import { LOGIN_ROUTE } from '../../../shared/constants';
import { mapRequestErrors } from '../../../shared/helpers';

import styles from '../Auth.module.scss';
import { ReactComponent as RegisterIcon } from '../../../assets/images/svg/register.svg';

const Register: FunctionComponent = () => {
  const history = useHistory();

  const onSubmit = async (values: RegisterDto) => {
    let errors = {};

    await post<void, RegisterDto>('/auth/register', values)
      .then(() => {
        history.push(LOGIN_ROUTE);
      })
      .catch((error) => {
        errors = { ...mapRequestErrors(error.response.data) };
      });

    return errors;
  };

  return (
    <>
      <Helmet>
        <title>Sign up | Expooze</title>
      </Helmet>
      <div className={styles.tile}>
        <Grid container className={styles.content}>
          <Grid item className={styles.imageWrapper} md={6}>
            <div className="full-width">
              <RegisterIcon className={styles.image} />
              <p className={styles.redirectLinkWrapper}>
                Already have an account?&nbsp;
                <Link className="link" to={LOGIN_ROUTE}>
                  Sign in here!
                </Link>
              </p>
            </div>
          </Grid>
          <Grid item className={styles.formWrapper} md={6}>
            <h1 className={`text-center color-accent ${styles.heading}`}>Register</h1>
            <br />
            <Form
              onSubmit={onSubmit}
              validate={(values: RegisterDto) => {
                const errors: RegisterDto = {} as RegisterDto;

                if (values.confirmPassword && values.password && values.confirmPassword !== values.password) {
                  errors.confirmPassword = 'Password does not match!';
                }

                return errors;
              }}
              render={({ handleSubmit, submitting, pristine }) => (
                <form onSubmit={handleSubmit} className={`full-width ${styles.form}`}>
                  <TextInputField
                    title="Name"
                    name="name"
                    placeholder="Enter your name..."
                    required
                    fieldProps={{
                      validate: composeValidators(notEmpty('Please, enter your name!')),
                    }}
                  />
                  <TextInputField
                    title="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email..."
                    required
                    fieldProps={{
                      validate: composeValidators(notEmpty('Please, enter your email!'), isEmail()),
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
                  {/* TODO GDPR */}
                  {/*<CheckboxesField title="Employed" name="employed" />*/}
                  <Button
                    className={styles.submitAction}
                    disabled={submitting || pristine}
                    text="Sign up"
                    type="submit"
                  />
                  <p className={styles.redirectLinkWrapperMobile}>
                    Already have an account?&nbsp;
                    <Link className="link" to={LOGIN_ROUTE}>
                      Sign in here!
                    </Link>
                  </p>
                </form>
              )}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Register;
