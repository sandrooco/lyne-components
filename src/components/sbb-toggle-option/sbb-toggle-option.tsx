import {
  Component,
  ComponentInterface,
  Event,
  Element,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
} from '@stencil/core';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';
import { hostContext } from '../../global/helpers/host-context';
import { AccessibilityProperties } from '../../global/interfaces/accessibility-properties';

/**
 * @slot unnamed - Slot used to render the label of the toggle option.
 * @slot icon - Slot used to render the `<sbb-icon>`.
 */

const toggleOptionObserverConfig: MutationObserverInit = {
  attributeFilter: ['checked'],
};

@Component({
  shadow: true,
  styleUrl: 'sbb-toggle-option.scss',
  tag: 'sbb-toggle-option',
})
export class SbbToggleOption implements ComponentInterface, AccessibilityProperties {
  /**
   * Whether the toggle-option is checked.
   */
  @Prop({ mutable: true, reflect: true }) public checked = false;

  /**
   * Whether the toggle option is disabled.
   */
  @Prop({ reflect: true }) public disabled = false;

  /**
   * Name of the icon for `<sbb-icon>`.
   */
  @Prop() public iconName?: string;

  /**
   * Value of toggle-option.
   */
  @Prop() public value?: string;

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @Prop() public accessibilityLabel: string | undefined;

  /**
   * Whether the toggle option has a label.
   */
  @State() private _hasLabel = false;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('icon');

  @Element() private _element!: HTMLElement;

  private _toggleOptionAttributeObserver = new MutationObserver(() => this._onToggleOptionChange());

  /**
   * Emits whenever the toggle-option value changes.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-select',
  })
  public didSelect: EventEmitter<any>;

  @Listen('click')
  public handleClick(event: Event): void {
    this.select();
    event.preventDefault();
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  public connectedCallback(): void {
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
    this._toggleOptionAttributeObserver.observe(this._element, toggleOptionObserverConfig);
  }

  public disconnectedCallback(): void {
    this._toggleOptionAttributeObserver.disconnect();
  }

  // Check whether a `checked` attribute has been added to the DOM for an option
  // and call the select() method accordingly.
  private _onToggleOptionChange(): void {
    if (isValidAttribute(this._element, 'checked') && this._isUnselected()) {
      this.select();
    }
  }

  private _isUnselected(): boolean {
    const toggle = hostContext('sbb-toggle', this._element) as HTMLSbbToggleElement;
    return !!toggle && toggle?.value !== this.value;
  }

  @Method()
  public async select(): Promise<void> {
    if (this.disabled) {
      return;
    }

    if (!this.checked) {
      this.checked = true;
    }

    this.didSelect.emit(this.value);
  }

  public render(): JSX.Element {
    return (
      <Host
        // The `aria-checked` attribute needs a string value to be correctly read by screen-readers
        aria-checked={this.checked.toString()}
        aria-disabled={this.disabled}
        role="radio"
      >
        <input
          type="radio"
          aria-hidden="true"
          tabindex="-1"
          id="sbb-toggle-option-id"
          disabled={this.disabled}
          checked={this.checked}
          value={this.value}
        />
        <label
          class={{
            'sbb-toggle-option': true,
            'sbb-toggle-option--icon-only':
              !this._hasLabel && !!(this.iconName || this._namedSlots.icon),
          }}
          htmlFor="sbb-toggle-option-id"
          aria-label={this.accessibilityLabel}
        >
          {(this.iconName || this._namedSlots.icon) && (
            <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
          )}
          <span class="sbb-toggle-option__label">
            <slot
              onSlotchange={(event) =>
                (this._hasLabel = (event.target as HTMLSlotElement).assignedNodes().length > 0)
              }
            />
          </span>
        </label>
      </Host>
    );
  }
}