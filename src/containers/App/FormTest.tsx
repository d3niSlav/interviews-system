import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';

import Button from '../../components/Button';
import {
  CheckboxesField,
  RadioInputField,
  SelectField,
  TextAreaField,
  TextInputField,
} from '../../components/Form/FormFields';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values: unknown) => {
  await sleep(300);
  alert(JSON.stringify(values, null, '\t'));
};

const FormTest: FunctionComponent = () => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ sauces: 'pineapple', employed: true }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', padding: '0 100px' }}>
          <div style={{ width: '50%' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <TextInputField title="First name" name="first-name" placeholder="Enter first name..." required />
              </div>
              <div style={{ width: '50%' }}>
                <TextInputField title="Last name" name="last-name" placeholder="Enter last name..." />
              </div>
            </div>
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
  );
};

export default FormTest;
