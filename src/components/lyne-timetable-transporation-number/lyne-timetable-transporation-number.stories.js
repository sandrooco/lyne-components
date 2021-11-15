import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-transportation-number.sample-data';

const Template = (args) => (
  <lyne-timetable-transporation-number
    config={JSON.stringify(args.config)}
    role='gridcell'
  >
  </lyne-timetable-transporation-number>
);

const config = {
  table: {
    disable: true
  }
};

const defaultArgTypes = {
  config
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const Bus = Template.bind({});

Bus.argTypes = defaultArgTypes;
Bus.args = {
  config: sampleData.bus
};

Bus.documentation = {
  title: 'Bus'
};

export const CableCar = Template.bind({});

CableCar.argTypes = defaultArgTypes;
CableCar.args = {
  config: sampleData.cableCar
};

CableCar.documentation = {
  title: 'Cable Car'
};

export const Train = Template.bind({});

Train.argTypes = defaultArgTypes;
Train.args = {
  config: sampleData.train
};

Train.documentation = {
  title: 'Train'
};

export const Tram = Template.bind({});

Tram.argTypes = defaultArgTypes;
Tram.args = {
  config: sampleData.tram
};

Tram.documentation = {
  title: 'Tram'
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 1rem'}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-transporation-number'
};
