import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';

import { RecoverPasswordDto } from './Recover.dto';
import Button from '../../../components/Button';
import { TextInputField } from '../../../components/Form/FormFields';
import { composeValidators, notEmpty } from '../../../components/Form/Field.helpers';

import styles from '../Auth.module.scss';
import { ReactComponent as RecoverPasswordIcon } from '../../../assets/images/svg/forgotten-password.svg';

const Recover: FunctionComponent = () => {
  const onSubmit = async (values: RecoverPasswordDto) => {
    alert(JSON.stringify(values, null, '\t'));
  };

  return (
    <div className={styles.tile}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <RecoverPasswordIcon className={styles.image} />
        </div>
        <div className={styles.formWrapper}>
          <h1 className="text-center color-accent">Recover password</h1>
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
                <div className="text-center">
                  <Button text="Send recovery link" type="submit" disabled={submitting || pristine} />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Recover;
