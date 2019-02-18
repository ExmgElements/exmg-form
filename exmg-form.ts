import {customElement, html, LitElement, property, query} from 'lit-element';
import '@polymer/paper-button';
import '@polymer/iron-form';
import '@polymer/paper-icon-button';
import {exmgFormStyles} from './exmg-form-styles';

@customElement('exmg-form')
export class ExmgForm extends LitElement {
  @property({type: String, attribute: 'show-cancel-button'})
  public showCancelButton: boolean = true;

  @property({type: String, attribute: 'submit-button-copy'})
  public submitButtonCopy: string = 'Submit';

  @property({type: String, attribute: 'error-message'})
  private errorMessage?: string;

  @property({type: Boolean, reflect: true})
  private submitting: boolean = false;

  @query('#ironForm')
  private ironFormElem?: HTMLElement|any;

  constructor() {
    super();
  }

  private onIronFormError(event: CustomEvent): void {
    this.submitting = false;
    console.log('onIronFormError', event);
  }

  private onIronFormInvalid(event: CustomEvent): void {
    this.submitting = false;
    console.log('onIronFormInvalid', event);
  }

  private onIronFormPresubmit(event: CustomEvent): void {
    console.log('onIronFormPresubmit', event);
  }

  private onIronFormReset(event: CustomEvent): void {
    this.submitting = false;
    console.log('onIronFormReset', event);
  }

  private onIronFormResponse(event: CustomEvent): void {
    this.submitting = false;
    console.log('onIronFormResponse', event);
  }

  private onIronFormSubmit(event: CustomEvent): void {
    console.log('onIronFormSubmit');
    this.dispatchEvent(
      new CustomEvent(
        'submit',
        {
          bubbles: false,
          composed: true,
          detail: event.detail
        }
        )
    );
    this.submitting = false;
  }

  private onSubmitBtnClick(): void {
    console.log('onSubmitBtnClick');
    this.submitting = true;
    this.errorMessage = undefined;
    this.ironFormElem!.submit();
  }

  public done(): void {
    this.submitting = false;
  }

  public error(errorMessage: string): void {
    this.submitting = false;
    this.errorMessage = errorMessage;
  }

  protected render() {
    return html`
      ${exmgFormStyles}
      <div class="error ${ !!this.errorMessage ? 'show' : '' }">
        <span class="body">
          <span>
            <iron-icon icon="exmg-icons:warning"></iron-icon>
            <span class="msg">${this.errorMessage}</span>
          </span>
        </span>
      </div>
      <iron-form id="ironForm"
        @iron-form-error="${this.onIronFormError}"
        @iron-form-invalid="${this.onIronFormInvalid}"
        @iron-form-presubmit="${this.onIronFormPresubmit}"
        @iron-form-reset="${this.onIronFormReset}"
        @iron-form-response="${this.onIronFormResponse}"
        @iron-form-submit="${this.onIronFormSubmit}"
      >
        <form>
          <slot></slot>
          <div class="actions">
            ${this.showCancelButton ? html`<paper-button>Cancel</paper-button>` : ''}
            <paper-button
              @click="${this.onSubmitBtnClick}"
              ?disabled="${this.submitting}"
              class="primary"
            >${this.submitButtonCopy}</paper-button>
          </div>
        </form>
      </iron-form>
    `;
  }
}
