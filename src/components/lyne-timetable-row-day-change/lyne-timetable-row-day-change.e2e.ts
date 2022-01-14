import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-row-day-change.sample-data';

const config = JSON.stringify(sampleData[1]);

describe('lyne-timetable-row-day-change', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<lyne-timetable-row-day-change config='${config}'></lyne-timetable-row-day-change>`);

    element = await page.find('lyne-timetable-row-day-change');
    expect(element)
      .toHaveClass('hydrated');
  });

});
