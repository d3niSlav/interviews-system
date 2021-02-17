import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';

import { LoginDto } from './Login.dto';
import Button from '../../../components/Button';
import { TextInputField } from '../../../components/Form/FormFields';
import { composeValidators, notEmpty } from '../../../components/Form/Field.helpers';

import styles from '../Auth.module.scss';
import { ReactComponent as LoginIcon } from '../../../assets/images/svg/login.svg';

const Login: FunctionComponent = () => {
  const onSubmit = async (values: LoginDto) => {
    alert(JSON.stringify(values, null, '\t'));
  };

  return (
    <div className={styles.tile}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <LoginIcon className={styles.image} />
        </div>
        <div className={styles.formWrapper}>
          <h1 className="text-center color-accent">Login</h1>
          <br />
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <TextInputField
                  title="Email"
                  name="email"
                  placeholder="Enter email..."
                  required
                  fieldProps={{
                    validate: composeValidators(notEmpty('Please, enter your email!')),
                  }}
                />
                <TextInputField
                  title="Password"
                  name="password"
                  placeholder="Enter password..."
                  required
                  fieldProps={{
                    validate: composeValidators(notEmpty('Please, enter password!')),
                  }}
                />
                <div className="text-center">
                  <Button text="Sign in" type="submit" disabled={submitting || pristine} />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
