import React from 'react';
import { Meta, Story } from '@storybook/react';

import Label from './Label';
import { LabelProps } from './Label.constants';

const LabelStory: Story<LabelProps> = (args) => <Label {...args} />;

export default {
  title: 'Label',
  component: Label,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    fullWidth: { control: 'boolean' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    title: { control: 'text' },
    error: { control: 'text' },
    children: { table: { disable: true } },
  },
  args: {
    children: 'John Doe',
    size: 'medium',
    title: 'Name:',
  },
} as Meta;

export const Basic = LabelStory.bind({});

export const FullWidth = LabelStory.bind({});

FullWidth.args = {
  fullWidth: true,
};

export const Sizes = LabelStory.bind({});

Sizes.args = {
  size: 'large',
};

export const ErrorMessage = LabelStory.bind({});

ErrorMessage.args = {
  error: 'There is an error!',
};
