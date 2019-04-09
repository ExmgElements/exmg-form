import {customElement, html, LitElement, property, PropertyValues, query} from 'lit-element';
import '@polymer/paper-button';
import '@polymer/iron-form';
import '@polymer/paper-spinner/paper-spinner-lite';
import {exmgFormStyles} from './exmg-form-styles';
import {IronFormElement} from '@polymer/iron-form/iron-form';

const ENTER_KEY_CODE = 13;

const warningIcon = html`<svg height="24" viewBox="0 0 24 24" width="24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></svg>`;

@customElement('exmg-form')
export class ExmgForm extends LitElement {
  @property({type: String, attribute: 'show-submit-button'})
  public showSubmitButton: boolean = true;

  @property({type: String, attribute: 'show-cancel-button'})
  public showCancelButton: boolean = true;

  @property({type: String, attribute: 'submit-button-copy'})
  public submitButtonCopy: string = 'Submit';

  @property({type: String, attribute: 'cancel-button-copy'})
  public cancelButtonCopy: string = 'Cancel';

  @property({type: Boolean})
  public inline: boolean = false;

  @property({type: String, attribute: 'error-message'})
  private errorMessage: string = '';

  @property({type: Boolean, reflect: true})
  private submitting: boolean = false;

  @query('#ironForm')
  private ironFormElem?: IronFormElement;

  public done(): void {
    this.submitting = false;
  }

  public error(errorMessage: string): void {
    this.submitting = false;
    this.errorMessage = errorMessage;
  }

  public submit(): void {
    if (this.ironFormElem!.validate()) {
      this.submitting = true;
      this.errorMessage = '';
      this.dispatchEvent(
        new CustomEvent(
          'submit',
          {
            bubbles: false,
            composed: true,
            detail: this.ironFormElem!.serializeForm(),
          }
        )
      );
    }
  }

  public cancel(): void {
    this.submitting = false;
    this.errorMessage = '';
    this.dispatchEvent(
      new CustomEvent(
        'cancel',
        {
          bubbles: false,
          composed: true,
        }
      )
    );
  }

  public validate(): void {
    this.ironFormElem!.validate();
  }

  public reset(): void {
    this.ironFormElem!.reset();
  }

  public serializeForm(): {[key: string]: any} {
    return this.ironFormElem!.serializeForm();
  }

  private onSubmitBtnClick(): void {
    this.submit();
  }

  private onCancelBtnClick(): void {
    this.cancel();
  }

  private onEnterPressed(e: KeyboardEvent) {
    switch (e.code || e.keyCode) {
      case ENTER_KEY_CODE:
      case 'Enter':
      case 'NumpadEnter':
        e.stopPropagation();
        this.submit();
        break;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('keydown', this.onEnterPressed);
  }

  disconnectedCallback(): void {
    this.removeEventListener('keydown', this.onEnterPressed);

    super.disconnectedCallback();
  }

  protected updated(_: PropertyValues): void {
    if (this.inline) {
      Array.from(this.children).forEach((elem: Element) => {
        (<HTMLElement>elem).style.display = 'inline-block';
      });
    } else {
      Array.from(this.children).forEach((elem: Element) => {
        (<HTMLElement>elem).style.display = null;
      });
    }
  }

  static styles = [
    exmgFormStyles,
  ];

  private renderCancelButton() {
    this.showCancelButton ?
      html`<paper-button class="cancel" @click="${this.onCancelBtnClick}">${this.cancelButtonCopy}</paper-button>` :
      '';
  }

  private renderSubmitButton() {
    this.showSubmitButton ?
      html`
        <paper-button
          @click="${this.onSubmitBtnClick}"
          ?disabled="${this.submitting}"
          class="primary"
        >
            ${this.submitButtonCopy}${this.submitting ? html`<paper-spinner-lite active></paper-spinner-lite>` : ''}
        </paper-button>
      ` :
      '';
  }

  private renderActions() {
    if (!this.showSubmitButton && !this.showCancelButton) {
      return '';
    }

    return html`
      <div class="actions ${this.inline ? 'inline' : ''}">
        ${this.renderCancelButton()}
        ${this.renderSubmitButton()}
      </div>
    `;
  }

  protected render() {
    return html`
      <div class="error ${ !!this.errorMessage ? 'show' : '' }">
        <span class="body">
          <span class="body-content">
            ${warningIcon}
            <span class="msg">${this.errorMessage}</span>
          </span>
        </span>
      </div>
      <iron-form id="ironForm">
        <form id="form">
          <slot></slot>
          ${this.renderActions()}
        </form>
      </iron-form>
    `;
  }
}
