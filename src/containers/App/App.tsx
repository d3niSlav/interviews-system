import React, { FunctionComponent } from 'react';

import Form from '../../components/Form';
import Navigation from '../../components/Navigation';

import './App.scss';

const App: FunctionComponent = () => (
  <>
    <Navigation />
    <header className="App-header">
      <div style={{ width: '300px' }}>
        <Form
          id="example-form"
          errors={{}}
          initialValues={{}}
          config={{
            textInput: {
              label: 'Text input field',
              placeholder: 'Enter some text...',
              fieldType: 'text',
              validations: {
                required: {
                  errorText: `This field is required!`,
                },
              },
            },
            textArea: {
              label: 'Text area field',
              placeholder: 'Enter some long text...',
              fieldType: 'textarea',
              rows: 5,
            },
            select: {
              label: 'Select field',
              placeholder: 'Choose an option...',
              fieldType: 'select',
              options: [{ value: '55612', label: '55612' }],
            },
            radio: {
              label: 'Radio buttons field',
              placeholder: 'Choose an option...',
              fieldType: 'radio',
              inline: true,
              value: 'option-1',
              options: [
                { value: 'option-1', label: 'Option 1' },
                { value: 'option-2', label: 'Option 2' },
                { value: 'option-3', label: 'Option 3' },
              ],
            },
            checkboxes: {
              label: 'Checkboxes field',
              fieldType: 'checkbox',
              inline: true,
              options: [
                { value: 'option-1', label: 'Option 1' },
                { value: 'option-2', label: 'Option 2' },
                { value: 'option-3', label: 'Option 3' },
              ],
            },
            checkbox: {
              title: 'Checkbox field',
              label: 'Option text',
              fieldType: 'checkbox',
            },
          }}
          onSubmit={(data): void => alert(JSON.stringify(data, null, '\t'))}
        />
      </div>
    </header>
  </>
);

export default App;
