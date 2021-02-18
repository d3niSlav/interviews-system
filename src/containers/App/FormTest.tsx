import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';

import Button from '../../components/Button';
import {
  CheckboxesField,
  composeValidators,
  DatePickerField,
  maxValue,
  minValue,
  mustBeNumber,
  notEmpty,
  RadioInputField,
  required,
  SelectField,
  TextAreaField,
  TextInputField,
} from '../../components/FormFields';
import Navigation from '../../components/Navigation';
import Grid from '../../components/Grid';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values: unknown) => {
  await sleep(300);
  alert(JSON.stringify(values, null, '\t'));
};

const FormTest: FunctionComponent = () => {
  return (
    <>
      <Navigation />
      <div style={{ paddingLeft: '60px', paddingTop: '15px' }}>
        <Grid container>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              date: Date.now(),
            }}
            validate={(values: any) => {
              const errors: any = {};

              if (!values.toppings || (Array.isArray(values.toppings) && values.toppings.length === 0)) {
                errors.toppings = 'Required';
              }

              return errors;
            }}
            render={({ handleSubmit, form, submitting, valid, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item md={8}>
                    <Grid container>
                      <Grid item md={6}>
                        <TextInputField
                          title="First name"
                          name="firstName"
                          placeholder="Enter first name..."
                          required
                          fieldProps={{
                            validate: composeValidators(required('Nema go'), notEmpty()),
                          }}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextInputField title="Last name" name="lastName" placeholder="Enter last name..." />
                      </Grid>
                    </Grid>
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
                      <Button text="Submit" type="submit" disabled={pristine || submitting || !valid} />
                      &nbsp;
                      <Button text="Reset" outlined onClick={form.reset} disabled={submitting || pristine} />
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ fontSize: '18px', whiteSpace: 'pre-wrap' }}>
                      <pre>{JSON.stringify(values, null, '\t')}</pre>
                    </div>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </Grid>
      </div>
    </>
  );
};

export default FormTest;
