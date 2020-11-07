import React from 'react';
import { Meta, Story } from '@storybook/react';

import Select from './Select';
import { SelectProps } from './Select.constants';

const defaultOptions = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
  { value: 'd', label: 'Option D' },
];

const SelectStory: Story<SelectProps> = (args) => <Select {...args} />;

export default {
  title: 'Select',
  component: Select,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    title: { control: 'text' },
    errorMessage: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isMulti: { control: 'boolean' },
    isSearchable: { control: 'boolean' },
    name: { control: 'text' },
    onChange: { action: 'changed', table: { disable: true } },
    options: { table: { disable: true } },
    placeholder: { control: 'text' },
    noOptionsMessage: { table: { disable: true } },
    noOptionsText: { control: 'text' },
    autoFocus: { control: 'boolean' },
    className: { control: 'text' },
    classNamePrefix: { control: 'text' },
    value: { table: { disable: true } },
  },
  args: {
    name: 'select-control',
    options: [...defaultOptions],
    placeholder: 'Choose an option...',
  },
} as Meta;

export const Basic = SelectStory.bind({});

export const Disabled = SelectStory.bind({});

Disabled.args = {
  isDisabled: true,
};

export const Multiple = SelectStory.bind({});

Multiple.args = {
  isMulti: true,
};

export const Searchable = SelectStory.bind({});

Searchable.args = {
  isSearchable: true,
};

export const Title = SelectStory.bind({});

Title.args = {
  title: 'Choose an option',
};

export const Error = SelectStory.bind({});

Error.args = {
  errorMessage: 'Please, select an option!',
};
