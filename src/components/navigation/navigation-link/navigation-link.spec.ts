import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './navigation-link';

describe('sbb-navigation-link', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-navigation-link href="#" target="_blank"></sbb-navigation-link>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-navigation-link href='#' target='_blank' size="l" role="link" tabindex="0" dir="ltr">
      </sbb-navigation-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <a
        class="sbb-navigation-link"
        href="#"
        target='_blank'
        rel="external noopener nofollow"
        role="presentation"
        tabindex="-1"
      >
        <slot></slot>
        <sbb-screenreader-only>
          . Link target opens in a new window.
        </sbb-screenreader-only>
      </a>
    `);
  });
});