import React from 'react';
import { Meta, Story } from '@storybook/react';

import TextInput from './TextInput';
import { TextInputProps } from './TextInput.constants';

const TextInputStory: Story<TextInputProps> = (args) => <TextInput {...args} />;

export default {
  title: 'Text input',
  component: TextInput,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    title: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    fullWidth: { control: 'boolean' },
    name: { table: { disable: true } },
    onChange: { action: 'changed', table: { disable: true } },
    placeholder: { control: 'text' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    value: { table: { disable: true } },
  },
  args: {
    name: 'input-control',
    placeholder: 'Enter text...',
    size: 'medium',
  },
} as Meta;

export const Basic = TextInputStory.bind({});

export const Disabled = TextInputStory.bind({});

Disabled.args = {
  disabled: true,
};

export const FullWidth = TextInputStory.bind({});

FullWidth.args = {
  fullWidth: true,
};

export const Sizes = TextInputStory.bind({});

Sizes.args = {
  size: 'small',
};

export const Title = TextInputStory.bind({});

Title.args = {
  title: 'Name:',
};

export const Error = TextInputStory.bind({});

Error.args = {
  error: 'Something went wrong!',
};
