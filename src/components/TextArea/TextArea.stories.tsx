import React from 'react';
import { Meta, Story } from '@storybook/react';

import TextArea from './TextArea';
import { TextAreaProps } from './TextArea.constants';

const TextAreaStory: Story<TextAreaProps> = (args) => <TextArea {...args} />;

export default {
  title: 'Text area',
  component: TextArea,
  argTypes: {
    title: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    fullWidth: { control: 'boolean' },
    name: { table: { disable: true } },
    onChange: { action: 'changed', table: { disable: true } },
    placeholder: { control: 'text' },
    cols: { control: { type: 'number', min: 1 } },
    rows: { control: { type: 'number', min: 1 } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    value: { table: { disable: true } },
  },
  args: {
    cols: 0,
    name: 'input-control',
    placeholder: 'Enter text...',
    rows: 4,
    size: 'medium',
  },
} as Meta;

export const Basic = TextAreaStory.bind({});

export const Disabled = TextAreaStory.bind({});

Disabled.args = {
  disabled: true,
};

export const FullWidth = TextAreaStory.bind({});

FullWidth.args = {
  fullWidth: true,
};

export const Sizes = TextAreaStory.bind({});

Sizes.args = {
  size: 'small',
};

export const Title = TextAreaStory.bind({});

Title.args = {
  title: 'Name:',
};

export const ColsAndRows = TextAreaStory.bind({});

ColsAndRows.storyName = 'Rows & Cols';

ColsAndRows.args = {
  cols: 100,
  rows: 5,
};

export const Error = TextAreaStory.bind({});

Error.args = {
  error: 'Something went wrong!',
};
