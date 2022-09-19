import { Meta, Story } from '@storybook/react';
import React from 'react';

import { DatePickerProps } from './DatePicker.constants';
import DatePicker from './DatePicker';

const DatePickerStory: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export default {
  title: 'Date picker',
  component: DatePicker,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    title: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    fullWidth: { control: 'boolean' },
    name: { table: { disable: true } },
    onBlur: { action: 'focused', table: { disable: true } },
    onChange: { action: 'changed', table: { disable: true } },
    onClick: { action: 'clicked', table: { disable: true } },
    autofocus: { table: { disable: true } },
    placeholder: { control: 'text' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    value: { table: { disable: true } },
  },
  args: {
    name: 'date-picker-control',
    placeholder: 'Enter date DD/MM/YYYY...',
    size: 'medium',
  },
} as Meta;

export const Basic = DatePickerStory.bind({});

export const Disabled = DatePickerStory.bind({});

Disabled.args = {
  disabled: true,
};

export const FullWidth = DatePickerStory.bind({});

FullWidth.args = {
  fullWidth: true,
};

export const Sizes = DatePickerStory.bind({});

Sizes.args = {
  size: 'small',
};

export const Title = DatePickerStory.bind({});

Title.args = {
  title: 'Name:',
};

export const Error = DatePickerStory.bind({});

Error.args = {
  error: 'Something went wrong!',
};
