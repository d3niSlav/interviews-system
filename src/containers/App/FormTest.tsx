import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';

import Button from '../../components/Button';
import {
  CheckboxesField,
  DatePickerField,
  RadioInputField,
  SelectField,
  TextAreaField,
  TextInputField,
} from '../../components/Form/FormFields';
import {
  composeValidators,
  maxValue,
  minValue,
  mustBeNumber,
  notEmpty,
  required,
} from '../../components/Form/Field.helpers';
import Navigation from '../../components/Navigation';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values: unknown) => {
  await sleep(300);
  alert(JSON.stringify(values, null, '\t'));
};

const FormTest: FunctionComponent = () => {
  return (
    <>
      <Navigation />
      <header className="pp-header">
        <Form
          onSubmit={onSubmit}
          initialValues={{
            firstName: 'Deni',
            lastName: 'Enchev',
            sauces: 'pineapple',
            employed: true,
            date: Date.now(),
          }}
          validate={(values: any) => {
            const errors: any = {};

            if (!values.toppings || (Array.isArray(values.toppings) && values.toppings.length === 0)) {
              errors.toppings = 'Required';
            }

            return errors;
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', padding: '0 100px' }}>
              <div style={{ width: '50%' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '50%' }}>
                    <TextInputField
                      title="First name"
                      name="firstName"
                      placeholder="Enter first name..."
                      required
                      fieldProps={{
                        validate: composeValidators(required('Nema go'), notEmpty()),
                      }}
                    />
                  </div>
                  <div style={{ width: '50%' }}>
                    <TextInputField title="Last name" name="lastName" placeholder="Enter last name..." />
                  </div>
                </div>
                <TextInputField
                  title="Age"
                  name="age"
                  placeholder="Enter age..."
                  fieldProps={{
                    validate: composeValidators(
                      required(),
                      mustBeNumber('Please, enter a valid age!'),
                      minValue(18, 'You must be at least 18 years old!'),
                      maxValue(50),
                    ),
                  }}
                />
                <DatePickerField title="Date" name="date" placeholder="Enter a date" />
                <SelectField
                  title="Favorite color"
                  name="favorite-color"
                  options={[
                    { label: '❤️ Red', value: '#ff0000' },
                    { label: '💚 Green', value: '#00ff00' },
                    { label: '💙 Blue', value: '#0000ff' },
                  ]}
                />
                <SelectField
                  title="Toppings"
                  name="toppings"
                  isMulti={true}
                  options={[
                    { label: '🐓 Chicken', value: 'chicken' },
                    { label: '🐷 Ham', value: 'ham' },
                    { label: '🍄 Mushrooms', value: 'mushrooms' },
                    { label: '🧀 Cheese', value: 'cheese' },
                    { label: '🐟 Tuna', value: 'tuna' },
                    { label: '🍍 Pineapple', value: 'pineapple' },
                  ]}
                />
                <RadioInputField
                  title="Sauces"
                  name="sauces"
                  inline
                  options={[
                    { label: '🐓 Chicken', value: 'chicken' },
                    { label: '🐷 Ham', value: 'ham' },
                    { label: '🍄 Mushrooms', value: 'mushrooms' },
                    { label: '🧀 Cheese', value: 'cheese' },
                    { label: '🐟 Tuna', value: 'tuna' },
                    { label: '🍍 Pineapple', value: 'pineapple' },
                  ]}
                />
                <CheckboxesField title="Employed" name="employed" />
                <CheckboxesField
                  title="Things"
                  name="things"
                  inline
                  data={[
                    { label: '🐓 Chicken', value: 'chicken' },
                    { label: '🐷 Ham', value: 'ham' },
                    { label: '🍄 Mushrooms', value: 'mushrooms' },
                    { label: '🧀 Cheese', value: 'cheese' },
                    { label: '🐟 Tuna', value: 'tuna' },
                    { label: '🍍 Pineapple', value: 'pineapple' },
                  ]}
                />
                <TextAreaField title="Notes" name="notes" placeholder="Enter notes..." rows={5} />
                <div className="buttons">
                  <Button text="Submit" type="submit" disabled={submitting || pristine} />
                  &nbsp;
                  <Button text="Reset" outlined onClick={form.reset} disabled={submitting || pristine} />
                </div>
              </div>
              <div style={{ width: '50%', marginLeft: '40px', fontSize: '18px', whiteSpace: 'pre-wrap' }}>
                <pre>{JSON.stringify(values, null, '\t')}</pre>
              </div>
            </form>
          )}
        />
      </header>
    </>
  );
};

export default FormTest;
