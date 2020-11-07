import { Meta, Story } from '@storybook/react';
import React from 'react';

import CheckboxGroup from './CheckboxGroup';
import { CheckboxGroupProps } from './CheckboxGroup.constants';
import { CheckboxInputOption } from '../Checkbox.constants';

const CheckboxGroupStory: Story<CheckboxGroupProps> = (args) => <CheckboxGroup {...args} />;

const optionsExample: CheckboxInputOption[] = [
  {
    label: 'Option 1',
    name: 'option-1',
  },
  {
    label: 'Option 2',
    name: 'option-2',
  },
  {
    label: 'Option 3',
    name: 'option-3',
  },
  {
    label: 'Option 4',
    name: 'option-4',
  },
];

export default {
  title: 'Checkbox group',
  component: CheckboxGroup,
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
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    value: { table: { disable: true } },
  },
  args: {
    name: 'input-control',
    options: optionsExample,
    size: 'medium',
  },
} as Meta;

export const Basic = CheckboxGroupStory.bind({});

export const Disabled = CheckboxGroupStory.bind({});

Disabled.args = {
  disabled: true,
};

export const FullWidth = CheckboxGroupStory.bind({});

FullWidth.args = {
  fullWidth: true,
};

export const Inline = CheckboxGroupStory.bind({});

Inline.args = {
  inline: true,
};

export const Sizes = CheckboxGroupStory.bind({});

Sizes.args = {
  size: 'small',
};

export const Title = CheckboxGroupStory.bind({});

Title.args = {
  title: 'Name:',
};

export const Error = CheckboxGroupStory.bind({});

Error.args = {
  error: 'Something went wrong!',
};
