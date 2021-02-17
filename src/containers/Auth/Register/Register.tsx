import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';

import { RegisterDto } from './Register.dto';
import Button from '../../../components/Button';
import { TextInputField } from '../../../components/Form/FormFields';
import { composeValidators, notEmpty } from '../../../components/Form/Field.helpers';

import styles from '../Auth.module.scss';
import { ReactComponent as RegisterIcon } from '../../../assets/images/svg/register.svg';

const Register: FunctionComponent = () => {
  const onSubmit = async (values: RegisterDto) => {
    alert(JSON.stringify(values, null, '\t'));
  };

  return (
    <div className={styles.tile}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <RegisterIcon className={styles.image} />
        </div>
        <div className={styles.formWrapper}>
          <h1 className="text-center color-accent">Register</h1>
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
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
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
                {/* TODO GDPR */}
                {/*<CheckboxesField title="Employed" name="employed" />*/}
                <div className="text-center">
                  <Button text="Sign up" type="submit" disabled={submitting || pristine} />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
