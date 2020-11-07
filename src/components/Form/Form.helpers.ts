import { ReactNode } from 'react';

import {
  FormConfig,
  FormConfigProps,
  FormControlElementProps,
  FormControlValidations,
  FormDataValues,
  FormErrors,
  FormValue,
} from './Form.constants';
import {
  renderCheckboxField,
  renderRadioButtonsField,
  renderSelectField,
  renderTextAreaField,
  renderTextInputField,
} from './FormFields';

export const getErrorMessage = (value?: FormValue, validations?: FormControlValidations): string => {
  let errorMessage = '';

  if (validations) {
    if (typeof value === 'string') {
      if (validations.required && !value) {
        errorMessage = validations.required.errorText;
      }

      if (value && validations.regex && !validations.regex.rule.test(value)) {
        errorMessage = validations.regex.errorText;
      }
    } else if (Array.isArray(value)) {
      if (validations.required && value.length === 0) {
        errorMessage = validations.required.errorText;
      }
    }
  }

  return errorMessage;
};

export const initializeFormFields = (
  config: FormConfig,
  initialValues: FormDataValues = {},
  errors: FormErrors,
): FormConfigProps => {
  const controlsData: FormConfigProps = {};

  Object.entries(config).forEach(([controlKey, controlConfig]) => {
    let errorMessage = '';
    let isTouched = false;
    let value: FormValue = controlConfig.value || '';

    if (initialValues.hasOwnProperty(controlKey)) {
      value = initialValues[controlKey];
    }

    if (errors.hasOwnProperty(controlKey) && errors[controlKey].length > 0) {
      errorMessage = errors[controlKey][0];
      isTouched = !!errorMessage;
    } else {
      errorMessage = controlConfig.validations ? getErrorMessage(value, controlConfig.validations) : '';
    }

    controlsData[controlKey] = {
      ...controlConfig,
      error: errorMessage,
      touched: isTouched,
      valid: !errorMessage,
      value,
    };
  });

  return controlsData;
};

export const generateFormFields = (
  config: FormConfigProps,
  inputChangedHandler: (name: string, value: FormValue) => void,
): ReactNode => {
  if (!config) {
    return null;
  }

  const formElementsArray: FormControlElementProps[] = [];
  Object.entries(config).forEach(([controlKey, controlConfig]) => {
    formElementsArray.push({
      ...controlConfig,
      id: controlKey,
      name: controlKey,
    });
  });

  return formElementsArray.map((control) => {
    switch (control.fieldType) {
      case 'checkbox':
        return renderCheckboxField({ control, inputChangedHandler });
      case 'radio':
        return renderRadioButtonsField({ control, inputChangedHandler });
      case 'select':
        return renderSelectField({ control, inputChangedHandler });
      case 'text':
        return renderTextInputField({ control, inputChangedHandler });
      case 'textarea':
        return renderTextAreaField({ control, inputChangedHandler });
      default:
        return null;
    }
  });
};
