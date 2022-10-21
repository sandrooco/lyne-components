import { Component, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import {
  ButtonType,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  PopupType,
  resolveRenderVariables,
} from '../../global/interfaces/link-button-properties';

let nextId = 0;

/**
 * @slot unnamed - Use this slot to provide the menu action label.
 * @slot icon - Use this slot to provide an icon. If `icon` is set, an sbb-icon will be used.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-menu-action.scss',
  tag: 'sbb-menu-action',
})
export class SbbMenuAction implements LinkButtonProperties {
  /** This id will be forwarded to the relevant inner element. */
  @Prop() public menuActionId = `sbb-menu-action-${++nextId}`;

  /**
   * The name of the icon, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   */
  @Prop() public iconName?: string | undefined;

  /** Value shown as badge at component end. */
  @Prop() public amount?: string | undefined;

  /** The href value you want to link to (if it is not present menu action becomes a button). */
  @Prop() public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @Prop() public download?: boolean;

  /** The type attribute to use for the button. */
  @Prop() public type: ButtonType | undefined;

  /** Whether the button is disabled. */
  @Prop({ reflect: true }) public disabled = false;

  /** The name attribute to use for the button. */
  @Prop() public name: string | undefined;

  /** The value attribute to use for the button. */
  @Prop() public value?: string;

  /** The <form> element to associate the button with. */
  @Prop() public form?: string;

  /**
   * When an interaction of this button has an impact on another element(s) in the document, the id
   * of that element(s) needs to be set. The value will be forwarded to the 'aria-controls' attribute
   * to the relevant nested element.
   */
  @Prop() public accessibilityControls: string | undefined;

  /**
   * If you use the button to trigger another widget which itself is covering
   * the page, you must provide an according attribute for aria-haspopup.
   */
  @Prop() public accessibilityHaspopup: PopupType | undefined;

  /** Emits the event on button click. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-menu-action_click',
  })
  public click: EventEmitter;

  /** This will be forwarded as aria-label to the relevant nested element. */
  @Prop() public accessibilityLabel: string | undefined;

  /** This will be forwarded as aria-describedby to the relevant nested element. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** This will be forwarded as aria-labelledby to the relevant nested element. */
  @Prop() public accessibilityLabelledby: string | undefined;

  /**
   * Method triggered on button click to emit the click event (can be caught from parent component).
   */
  public emitButtonClick(): void {
    if (!this.disabled) {
      this.click.emit();
    }
  }

  public render(): JSX.Element {
    const { tagName: TAG_NAME, attributes }: LinkButtonRenderVariables = resolveRenderVariables(
      this,
      false
    );

    // See https://github.com/ionic-team/stencil/issues/2703#issuecomment-1050943715 on why form attribute is set with `setAttribute`
    return (
      <TAG_NAME
        id={this.menuActionId}
        class="sbb-menu-action"
        {...attributes}
        ref={(btn) => this.form && btn?.setAttribute('form', this.form)}
      >
        <span class="sbb-menu-action__content">
          <span class="sbb-menu-action__icon">
            <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
          </span>
          <span class="sbb-menu-action__label">
            <slot />
          </span>
          {this.amount && !this.disabled && (
            <span class="sbb-menu-action__amount">{this.amount}</span>
          )}
        </span>
      </TAG_NAME>
    );
  }
}