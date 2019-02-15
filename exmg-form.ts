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
        :host {
            font-family: 'Roboto', 'Noto', sans-serif;
        }
        .actions {
          margin: 24px 0;
          text-align: right;
        }
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
        .error {
          display: none;
          font-size: 14px;
          line-height: 20px;
          color: rgba(0,0,0,0.54);
          -webkit-box-flex: 0 0 auto;
          -webkit-flex: 0 0 auto;
          flex: 0 0 auto;
          padding: 0;
        }
        .error > span {
          background-color: #fbe9e7;
          color: #ff5252;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          padding: 0 0 0 24px;
          margin: 0 0 12px;
          min-height: 48px;
        }
        .error > span > span {
          padding-left: 36px;
          margin-right: 24px;
          position: relative;
          padding: 12px 0;
          line-height: 20px;
          font-size: 14px;
          white-space: normal;
          font-weight: 500;
          display: inline-block;
          vertical-align: middle;
        }
        .error iron-icon {
          margin-right: 12px;
          color: #ff5252;
        }
        .error.show {
          display: block;
        }
      </style>
      <div class="error show">
        <span class="body">
          <span>
            <iron-icon icon="exmg-icons:warning"></iron-icon>
            <span class="msg">Error message</span>
          </span>
        </span>
      </div>
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
