/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import {
  defaultTrip,
  progressTrip,
  cancelledTrip,
  partiallyCancelled,
  pastTrip,
  disturbanceTrip,
  TrainTrip,
  BusTrip,
  quayChangeTrip,
  ShipTrip,
  walkTimeTrip,
  extendedEnterTimeTrip,
  NoticesTrip,
  skippedDepartureStopTrip,
  skippedArrivalStopTrip,
  skippedFirstDepartureStopTrip,
  skippedLastArrivalStopTrip,
} from './sbb-timetable-row.sample-data';
import isChromatic from 'chromatic/isChromatic';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const loadingTrip: InputType = {
  control: {
    type: 'boolean',
  },
};

const loadingPrice: InputType = {
  control: {
    type: 'boolean',
  },
};

const active: InputType = {
  control: {
    type: 'boolean',
  },
};

const now: InputType = {
  control: {
    type: 'date',
  },
};

const boarding: InputType = {
  control: {
    type: 'object',
  },
};

const defaultArgTypes: ArgTypes = {
  'disable-animation': disableAnimation,
  'loading-trip': loadingTrip,
  'loading-price': loadingPrice,
  active,
  'data-now': now,
  boarding,
};

const defaultArgs: Args = {
  'disable-animation': isChromatic(),
  'loading-trip': false,
  'loading-price': false,
  active: false,
  'data-now': new Date('2022-12-01T12:11:00').valueOf(),
  trip: defaultTrip,
};

// TEMPLATES
const Template = (args): JSX.Element => <sbb-timetable-row {...args}></sbb-timetable-row>;

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const Basic: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const Active: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    active: true,
  },
};

export const Price: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    price: { price: '39.90', text: 'ab CHF', isDiscount: false },
  },
};

export const Discount: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    price: { isDiscount: true },
  },
};

export const discountPrice: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    price: { price: '39.90', text: 'ab CHF', isDiscount: true },
  },
};

export const LoadingPrice: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'loading-price': true,
    price: { price: '39.90', text: 'ab CHF', isDiscount: true },
  },
};

export const LoadingTrip: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'loading-trip': true,
  },
};

export const LoadingTripPrice: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'loading-trip': true,
    'loading-price': true,
    price: { price: '39.90', text: 'ab CHF', isDiscount: true },
  },
};

export const Position: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: progressTrip,
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const PositionDisabledAnimation: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'disable-animation': true,
    trip: progressTrip,
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const Cancelled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: cancelledTrip,
  },
};

export const PartiallyCancelled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: partiallyCancelled,
  },
};

export const Past: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: pastTrip,
    'data-now': new Date('2023-12-01T12:11:00').valueOf(),
  },
};

export const Disturbance: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: disturbanceTrip,
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const SkippedDepartureStop: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: skippedDepartureStopTrip,
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const SkippedArrivalStop: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: skippedArrivalStopTrip,
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const SkippedLastArrivalStop: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: skippedLastArrivalStopTrip,
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const SkippedFirstDepartureStop: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: skippedFirstDepartureStopTrip,
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const QuayChanged: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: quayChangeTrip,
    'data-now': new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const Train: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: TrainTrip,
  },
};

export const Bus: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: BusTrip,
  },
};

export const Ship: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: ShipTrip,
  },
};

export const WalkTime: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: walkTimeTrip,
  },
};

export const ExtendedEnterTime: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: extendedEnterTimeTrip,
  },
};

export const Notices: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: NoticesTrip,
    boarding: { name: 'sa-rs', text: 'boarding' },
  },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ background: '#f6f6f6', padding: '2rem' }}>
        <Story />
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-timetable-row',
};

export default meta;