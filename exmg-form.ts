import {css, unsafeCSS, customElement, html, LitElement, property, PropertyValues, query} from 'lit-element';
import '@polymer/paper-button';
import '@polymer/iron-form';
import '@polymer/paper-spinner/paper-spinner-lite';
import '@polymer/iron-icon';
import {sharedButtonStyles} from '@exmg/exmg-cms-styles/exmg-cms-button-styles.js';
import {exmgFormStyles} from './exmg-form-styles';
import {IronFormElement} from '@polymer/iron-form/iron-form';

@customElement('exmg-form')
export class ExmgForm extends LitElement {
  @property({type: String, attribute: 'show-cancel-button'})
  public showCancelButton: boolean = true;

  @property({type: String, attribute: 'submit-button-copy'})
  public submitButtonCopy: string = 'Submit';

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
    css`
      ${unsafeCSS(sharedButtonStyles.innerHTML.replace('<style>', '').replace('</style>', ''))}
    `,
    exmgFormStyles,
  ];

  protected render() {
    return html`
      <div class="error ${ !!this.errorMessage ? 'show' : '' }">
        <span class="body">
          <span>
            <iron-icon icon="exmg-icons:warning"></iron-icon>
            <span class="msg">${this.errorMessage}</span>
          </span>
        </span>
      </div>
      <iron-form id="ironForm">
        <form id="form">
          <slot></slot>
          <div class="actions ${this.inline ? 'inline' : ''}">
            ${
              this.showCancelButton ?
                html`<paper-button class="cancel" @click="${this.onCancelBtnClick}">Cancel</paper-button>` :
                ''
            }
            <paper-button
              @click="${this.onSubmitBtnClick}"
              ?disabled="${this.submitting}"
              class="primary"
            >
                ${this.submitButtonCopy}${this.submitting ? html`<paper-spinner-lite active></paper-spinner-lite>` : ''}
            </paper-button>
          </div>
        </form>
      </iron-form>
    `;
  }
}
