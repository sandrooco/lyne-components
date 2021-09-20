import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-image {...args} />
);

const customFocalPoint = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'true',
    'false'
  ],
  table: {
    category: 'Focal Point'
  }
};

const focalPointDebug = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'true',
    'false'
  ],
  table: {
    category: 'Focal Point'
  }
};

const focalPointX = {
  control: {
    type: 'number'
  },
  table: {
    category: 'Focal Point'
  }
};

const focalPointY = {
  control: {
    type: 'number'
  },
  table: {
    category: 'Focal Point'
  }
};

const imageSrc = {
  control: {
    type: 'text'
  }
};

const imageSrcExamples = {
  control: {
    type: 'select'
  },
  options: [
    'https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg',
    'https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg',
    'https://cdn.img.sbb.ch/content/dam/internet/lyne/Kaufmann-frau.jpg',
    'https://cdn.img.sbb.ch/content/dam/internet/lyne/Corona-Schutzkonzept.jpg',
    'https://cdn.img.sbb.ch/content/dam/internet/lyne/online-kaufen.jpg',
    'https://cdn.img.sbb.ch/content/dam/internet/lyne/Digitale-Werbung-SBB.jpg',
    'https://cdn.img.sbb.ch/content/dam/internet/lyne/Bahnhof-Luzern.jpg',
    'https://cdn.img.sbb.ch/content/dam/internet/lyne/Einheitswagen-IV-EuroCity.jpg',
    'https://cdn.img.sbb.ch/content/dam/internet/lyne/Einsatzstrecken_EW4-Eurocity.jpg'
  ]
};

const hideFromScreenreader = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'true',
    'false'
  ]
};

const loading = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'eager',
    'lazy'
  ],
  table: {
    category: 'Performance'
  }
};

const lqip = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'true',
    'false'
  ],
  table: {
    category: 'Performance'
  }
};

const performanceMark = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Performance'
  }
};

export const lyneImage = Template.bind({});

lyneImage.argTypes = {
  'alt': '',
  'caption': '',
  'custom-focal-point': customFocalPoint,
  'focal-point-debug': focalPointDebug,
  'focal-point-x': focalPointX,
  'focal-point-y': focalPointY,
  'hide-from-screenreader': hideFromScreenreader,
  'image-src': imageSrc,
  'image-src-examples': imageSrcExamples,
  loading,
  lqip,
  'performance-mark': performanceMark
};

lyneImage.args = {
  'alt': '',
  'caption': 'Mit Ihrem Halbtax profitieren Sie zudem von attraktiven Zusatzleistungen und Rabatten. Wenn Sie unter 25 Jahre jung sind, können Sie zu Ihrem Halbtax das beliebte <a href="https://www.sbb.ch/abos-billette/abonnemente/gleis-7-freie-fahrt-ab-19-uhr.html#jahrg_nger_halbtax">Gleis 7</a> dazu kaufen.',
  'custom-focal-point': customFocalPoint.options[1],
  'focal-point-debug': focalPointDebug.options[1],
  'focal-point-x': '',
  'focal-point-y': '',
  'hide-from-screenreader': hideFromScreenreader.options[1],
  'image-src': '',
  'image-src-examples': imageSrcExamples.options[0],
  'loading': loading.options[0],
  'lqip': lqip.options[0],
  'performance-mark': ''
};

lyneImage.documentation = {
  title: 'Default image'
};

export default {
  decorators: [
    (Story) => (
      <div style='max-width: 1000px;'>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-image'
};
