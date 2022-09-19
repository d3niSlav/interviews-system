import React from 'react';
import { Meta, Story } from '@storybook/react';

import Button from './Button';
import { ButtonProps } from './Button.constants';

const ButtonStory: Story<ButtonProps> = (args) => <Button {...args} />;

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    outlined: { control: 'boolean' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    text: { control: 'text' },
    type: { control: { type: 'select', options: ['button', 'submit', 'reset'] } },
    onClick: { action: 'clicked', table: { disable: true } },
  },
  args: {
    size: 'medium',
    text: 'Click me',
  },
} as Meta;

export const Basic = ButtonStory.bind({});

export const Disabled = ButtonStory.bind({});

Disabled.args = {
  disabled: true,
};

export const Outlined = ButtonStory.bind({});

Outlined.args = {
  outlined: true,
};

export const Stretched = ButtonStory.bind({});

Stretched.args = {
  fullWidth: true,
};

export const Sizes = ButtonStory.bind({});

Sizes.args = {
  size: 'small',
};
