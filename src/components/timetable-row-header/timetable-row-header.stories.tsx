/** @jsx h */
import type { Meta, StoryObj, Args } from '@storybook/web-components';
import { h, type JSX } from 'jsx-dom';

import readme from './readme.md?raw';
import sampleData from './timetable-row-header.sample-data';
import './timetable-row-header';

const Template = (args): JSX.Element => (
  <sbb-timetable-row-header config={JSON.stringify(args.config)}></sbb-timetable-row-header>
);

const config: Args = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  config,
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const SbbTimetableRowHeader: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[0],
  },
};

const meta: Meta = {
  decorators: [(Story) => <Story></Story>],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-row-header',
};

export default meta;