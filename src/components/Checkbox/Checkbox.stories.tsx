import { Meta, Story } from '@storybook/react';
import React from 'react';

import Checkbox from './Checkbox';
import { CheckboxProps } from './Checkbox.constants';

const CheckboxStory: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export default {
  title: 'Checkbox',
  component: Checkbox,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    title: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    fullWidth: { control: 'boolean' },
    name: { table: { disable: true } },
    onBlur: { action: 'focused', table: { disable: true } },
    onChange: { action: 'changed', table: { disable: true } },
    placeholder: { table: { disable: true } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    value: { table: { disable: true } },
  },
  args: {
    name: 'input-control',
    size: 'medium',
  },
} as Meta;

export const Basic = CheckboxStory.bind({});

export const Label = CheckboxStory.bind({});

Label.args = {
  label: 'Option',
};

export const Disabled = CheckboxStory.bind({});

Disabled.args = {
  disabled: true,
};

export const FullWidth = CheckboxStory.bind({});

FullWidth.args = {
  fullWidth: true,
};

export const Sizes = CheckboxStory.bind({});

Sizes.args = {
  size: 'small',
};

export const Title = CheckboxStory.bind({});

Title.args = {
  title: 'Name:',
};

export const Error = CheckboxStory.bind({});

Error.args = {
  error: 'Something went wrong!',
};
