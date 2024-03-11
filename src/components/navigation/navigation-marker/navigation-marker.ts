import { type CSSResultGroup, LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SbbNamedSlotListElementMixin, type WithListChildren } from '../../core/common-behaviors';
import { AgnosticResizeObserver } from '../../core/observers';
import type { SbbNavigationButtonElement, SbbNavigationLinkElement } from '../index';

import style from './navigation-marker.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-navigation-button`/`sbb-navigation-link` within a `sbb-navigation`.
 *
 * @slot - Use the unnamed slot to add `sbb-navigation-button`/`sbb-navigation-link` elements into the `sbb-navigation-marker`.
 */
@customElement('sbb-navigation-marker')
export class SbbNavigationMarkerElement extends SbbNamedSlotListElementMixin<
  SbbNavigationButtonElement | SbbNavigationLinkElement,
  typeof LitElement
>(LitElement) {
  public static override styles: CSSResultGroup = style;
  protected override readonly listChildTagNames = ['SBB-NAVIGATION-BUTTON', 'SBB-NAVIGATION-LINK'];

  /**
   * Marker size variant.
   */
  @property({ reflect: true }) public size?: 'l' | 's' = 'l';

  @state() private _currentActiveAction?: SbbNavigationButtonElement | SbbNavigationLinkElement;

  private _navigationMarkerResizeObserver = new AgnosticResizeObserver(() =>
    this._setMarkerPosition(),
  );

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('size') || changedProperties.has('listChildren')) {
      this._updateMarkerActions();
    }
    this.toggleAttribute('data-has-active-action', !!this._currentActiveAction);
  }

  private _updateMarkerActions(): void {
    for (const action of this.listChildren) {
      action.size = this.size;
    }

    this._currentActiveAction = this.listChildren.find((action) =>
      action.hasAttribute('data-action-active'),
    );
    this._setMarkerPosition();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._navigationMarkerResizeObserver.observe(this);
    this._checkActiveAction();
  }

  private _checkActiveAction(): void {
    const activeAction = this.querySelector(
      ':is(sbb-navigation-button, sbb-navigation-link).sbb-active',
    ) as SbbNavigationButtonElement | SbbNavigationLinkElement;
    if (activeAction) {
      this.select(activeAction);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._navigationMarkerResizeObserver.disconnect();
  }

  public select(action: SbbNavigationButtonElement | SbbNavigationLinkElement): void {
    if (!action) {
      return;
    }
    this.reset();
    action.toggleAttribute('data-action-active', true);
    this._currentActiveAction = action;
    setTimeout(() => this._setMarkerPosition());
  }

  protected override firstUpdated(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.firstUpdated(changedProperties);
    setTimeout(() => this._setMarkerPosition());
  }

  public reset(): void {
    if (this._currentActiveAction) {
      this._currentActiveAction.toggleAttribute('data-action-active', false);
      this._currentActiveAction.connectedSection?.close();
      this._currentActiveAction = undefined;
    }
  }

  private _setMarkerPosition(): void {
    if (!this._currentActiveAction) {
      return;
    }

    const index = this.listChildren.indexOf(this._currentActiveAction)!;
    const value = this.shadowRoot!.querySelector<HTMLLIElement>(
      `li:nth-child(${index + 1})`,
    )?.offsetTop;
    if (value != null) {
      this.style?.setProperty('--sbb-navigation-marker-position-y', `${value}px`);
    }
  }

  protected override render(): TemplateResult {
    return this.renderList();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-navigation-marker': SbbNavigationMarkerElement;
  }
}
