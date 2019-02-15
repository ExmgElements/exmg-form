import {customElement, html, LitElement, property, query} from 'lit-element';
import '@polymer/paper-button';
import '@polymer/iron-form';
import '@polymer/paper-icon-button';
// import {exmgDialogStyles} from './exmg-cms-dialog-styles';

@customElement('exmg-form')
export class ExmgForm extends LitElement {
  @query('#iron-form')
  private ironFormElem?: HTMLElement|any;

  constructor() {
    super();
  }

  private onIronFormSubmit(event: CustomEvent) {
    this.dispatchEvent(new CustomEvent('submit', {bubbles: false, composed: true, detail: event.detail}));
  }

  private onSubmitBtnClick() {
    console.log('onSubmitBtnClick');
    this.ironFormElem!.submit();
  }

  protected render() {
    return html`
      <!--suppress CssUnresolvedCustomProperty -->
      <style>
        paper-button.primary {
          background: var(--primary-color);
          color: white;
        }
        paper-button {
          border-radius: 6px;
          text-transform: initial;
          padding-left: 16px;
          padding-right: 16px;
          -webkit-border-radius: 8px;
          border-radius: 8px;
          text-transform: none;
          letter-spacing: .25px;
          min-width: 60px;
        }
        paper-button[disabled] {
          opacity: 0.5;
        }
        paper-button.error,
        paper-button.alert {
          color: white;
          background: var(--error-color);
        }
      </style>
      <iron-form id="iron-form" @iron-form-submit="${this.onIronFormSubmit}">
        <form>
          <slot></slot>
          <div class="actions">
            <paper-button dialog-dismiss>Cancel</paper-button>
            <paper-button @click="${this.onSubmitBtnClick}" class="primary">Submit</paper-button>
          </div>
        </form>
      </iron-form>
    `;
  }
}
