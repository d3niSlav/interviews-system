import { Meta, Story } from '@storybook/react';
import React from 'react';

import RadioButtons from './RadioButtons';
import { RadioButtonOption, RadioButtonsProps } from './RadioButtons.constants';

const RadioButtonGroupStory: Story<RadioButtonsProps> = (args) => <RadioButtons {...args} />;

const optionsExample: RadioButtonOption[] = [
  {
    label: 'Option 1',
    value: 'option-1',
  },
  {
    label: 'Option 2',
    value: 'option-2',
  },
  {
    label: 'Option 3',
    value: 'option-3',
  },
  {
    label: 'Option 4',
    value: 'option-4',
  },
];

export default {
  title: 'Radio buttons',
  component: RadioButtons,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    title: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    fullWidth: { control: 'boolean' },
    inline: { control: 'boolean' },
    name: { table: { disable: true } },
    onBlur: { action: 'focused', table: { disable: true } },
    onChange: { action: 'changed', table: { disable: true } },
    options: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    hasFirstOptionAsDefault: { control: 'boolean' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    value: { table: { disable: true } },
  },
  args: {
    name: 'input-control',
    options: optionsExample,
    size: 'medium',
    onChange: null,
  },
} as Meta;

export const Basic = RadioButtonGroupStory.bind({});

export const Disabled = RadioButtonGroupStory.bind({});

Disabled.args = {
  disabled: true,
};

export const FullWidth = RadioButtonGroupStory.bind({});

FullWidth.args = {
  fullWidth: true,
};

export const Inline = RadioButtonGroupStory.bind({});

Inline.args = {
  inline: true,
};

export const NoDefault = RadioButtonGroupStory.bind({});

NoDefault.args = {
  hasFirstOptionAsDefault: false,
};

export const Sizes = RadioButtonGroupStory.bind({});

Sizes.args = {
  size: 'small',
};

export const Title = RadioButtonGroupStory.bind({});

Title.args = {
  title: 'Name:',
};

export const Error = RadioButtonGroupStory.bind({});

Error.args = {
  error: 'Something went wrong!',
};
