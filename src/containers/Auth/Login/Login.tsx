import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';

import { LoginDto, UserTokenDto } from './Login.dto';
import Button from '../../../components/Button';
import { TextInputField, composeValidators, notEmpty } from '../../../components/FormFields';
import Grid from '../../../components/Grid';
import { post } from '../../../shared/api';

import styles from '../Auth.module.scss';
import { ReactComponent as LoginIcon } from '../../../assets/images/svg/login.svg';

const Login: FunctionComponent = () => {
  const onSubmit = async (values: LoginDto) => {
    let errors = {};

    await post<UserTokenDto, LoginDto>('/auth/login', values)
      .then((data) => {
        // TODO set token to the store
        alert(JSON.stringify(data, null, '\t'));
      })
      .catch((error) => {
        errors = { email: error.response.data.message };
      });

    return errors;
  };

  return (
    <div className={styles.tile}>
      <Grid container className={styles.content}>
        <Grid item className={styles.imageWrapper} md={6}>
          <LoginIcon className={styles.image} />
        </Grid>
        <Grid item className={styles.formWrapper} md={6}>
          <h1 className={`text-center color-accent ${styles.heading}`}>Login</h1>
          <br />
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine }) => (
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
              </form>
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
