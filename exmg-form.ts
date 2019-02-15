import {customElement, html, LitElement, property, query} from 'lit-element';
import '@polymer/paper-button';
import '@polymer/iron-form';
import '@polymer/paper-icon-button';
// import {exmgDialogStyles} from './exmg-cms-dialog-styles';

@customElement('exmg-form')
export class ExmgForm extends LitElement {
  protected render() {
    return html`
      <iron-form>
        <form>
          <slot></slot>
        </form>
      </iron-form>
`;
  }
}
