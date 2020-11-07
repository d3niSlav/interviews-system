import React, { FunctionComponent, useEffect, useState } from 'react';

import { FormConfigProps, FormControlProps, FormDataValues, FormProps, FormValue } from './Form.constants';
import { generateFormFields, getErrorMessage, initializeFormFields } from './Form.helpers';
import Button from '../Button';

import styles from './Form.module.scss';

const Form: FunctionComponent<FormProps> = ({
  actions,
  config,
  errors = {},
  id,
  initialValues = {},
  isLoading = false,
  onSubmit,
  submitButtonText = 'Submit',
}) => {
  const [controls, setControls] = useState({} as FormConfigProps);
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  useEffect(() => {
    if (Object.keys(config).length) {
      const controlsData = initializeFormFields(config, initialValues, errors);
      const hasError = Object.values(controlsData).some((control) => control && !control.valid);
      setControls(controlsData);
      setIsFormInvalid(hasError);
    }
  }, [config, initialValues, errors]);

  const inputChangedHandler = (name: string, value: FormValue): void => {
    const oldControls = controls ? { ...controls } : {};
    const error = getErrorMessage(value, controls[name].validations);

    const currentControl = {
      [name]: {
        ...(oldControls[name] as FormControlProps),
        error,
        touched: true,
        valid: !error,
        value,
      },
    };

    const updatedControls: FormConfigProps = {
      ...oldControls,
      ...currentControl,
    };

    const hasError = Object.values(updatedControls).some((control) => control && !control.valid);
    setIsFormInvalid(hasError);
    setControls(updatedControls);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    const formData: FormDataValues = {};
    event.preventDefault();

    Object.entries(controls as FormConfigProps).forEach(([fieldKey, { value = '' }]) => {
      formData[fieldKey] = value;
    });

    onSubmit(formData);
  };

  return (
    <form id={id} onSubmit={handleFormSubmit}>
      {generateFormFields(controls, inputChangedHandler)}
      <div className={styles.formActions}>
        <Button text={submitButtonText} type="submit" disabled={isLoading || isFormInvalid} />
        {actions &&
          actions.map(({ label, onClick }, index: number) => (
            <Button outlined key={`${id}-action-${index}`} text={label} onClick={onClick} />
          ))}
      </div>
    </form>
  );
};

export default Form;
