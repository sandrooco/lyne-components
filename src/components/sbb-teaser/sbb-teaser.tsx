import { Component, h, Prop, Watch } from '@stencil/core';
import { InterfaceTeaserAttributes } from './sbb-teaser.custom';

/**
 * @slot image - Slot used to render the image
 * @slot title - Slot used to render the title
 * @slot description - Slot used to render the description
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-teaser.scss',
  tag: 'sbb-teaser',
})

/**
 * Generalized Teaser - for displaying an image, title and paragraph
 */
export class SbbTeaser {
  /**
   * The text which gets exposed to screen reader users. The text should
   * reflect all the information
   *
   * Example text: Connection from X to Y, via Z, on date X.
   * Ticket price starts at X.
   */
  @Prop() public accessibilityLabel!: string;

  /** This will be forwarded as aria-describedby to the relevant nested element. */
  @Prop() public accessibilityDescribedby?: string;

  /** This will be forwarded as aria-labelledby to the relevant nested element. */
  @Prop() public accessibilityLabelledby?: string;

  /**
   * Check if accessibilityLabel is provided since it is a required prop,
   * otherwise throw an error.
   */
  @Watch('accessibilityLabel')
  private _validateAccessibilityLabel(newValue: string): void {
    const isBlank = typeof newValue !== 'string' || newValue === '';
    if (isBlank) {
      throw new Error('accessibilityLabel: required');
    }
  }

  /**
   * component attributes
   * ----------------------------------------------------------------
   */

  /** The href value you want to link to */
  @Prop() public href!: string;

  /**
   * Teaser variant -
   * when this is true the text-content will be under the image
   * otherwise it will be displayed next to the image.
   */
  @Prop() public isStacked: boolean;

  /**
   * Heading level of the sbb-title element (e.g. h1-h6)
   */
  @Prop() public titleLevel: InterfaceTeaserAttributes['titleLevel'] = '5';

  public componentWillLoad(): void {
    // Validate props
    this._validateAccessibilityLabel(this.accessibilityLabel);
  }

  public render(): JSX.Element {
    return (
      <a
        aria-label={this.accessibilityLabel}
        aria-describedby={this.accessibilityDescribedby}
        aria-labelledby={this.accessibilityLabelledby}
        class={`teaser ${this.isStacked === true ? 'teaser--is-stacked' : ''}`}
        href={this.href}
      >
        <span class="teaser__content">
          <span class="teaser__inner">
            <span class="teaser__image-wrapper">
              <slot name="image" />
            </span>
            <span class="teaser__text">
              <sbb-title level={this.titleLevel} visualLevel="5" class="teaser__lead">
                <slot name="title" />
              </sbb-title>
              <span class="teaser__description">
                <slot name="description" />
              </span>
            </span>
          </span>
        </span>
      </a>
    );
  }
}
