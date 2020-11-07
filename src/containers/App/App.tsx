import React, { FunctionComponent } from 'react';

import Button from '../../components/Button';
import { CheckboxGroup } from '../../components/Checkbox';
import RadioButtons from '../../components/RadioButtons';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import TextInput from '../../components/TextInput';

import './App.scss';

const App: FunctionComponent = () => (
  <div className="App">
    <header className="App-header">
      <div style={{ width: '300px' }}>
        <TextInput placeholder="Seven 11" title="Text input" />
        <TextArea placeholder="Seven 11" title="Text area" rows={5} />
        <Select placeholder="Seven 11" title="Select" options={[{ value: '55612', label: '55612' }]} />
        <CheckboxGroup
          inline
          title="Checkbox group"
          name="checkboxes"
          options={[
            { label: 'Choice 1', name: 'choice-1' },
            { label: 'Choice 2', name: 'choice-2', value: true },
            { label: 'Choice 3', name: 'choice-3' },
          ]}
        />
        <RadioButtons
          title="Radio buttons group"
          name="radio-buttons"
          inline
          options={[
            { label: 'Option 1', value: 'option-1' },
            { label: 'Option 2', value: 'option-2' },
            { label: 'Option 3', value: 'option-3' },
          ]}
          size="medium"
        />
        <Button text="Cancel" outlined />
      </div>
    </header>
  </div>
);

export default App;
