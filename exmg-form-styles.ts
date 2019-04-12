import {css} from 'lit-element';

export const exmgFormStyles = css`
    :host {
      font-family: 'Roboto', 'Noto', sans-serif;
    }
    :host(.blue) paper-button {
      color: white;
      background: #0071dc;
    }
    :host(.blue) paper-button:hover {
      background: #0060ca;
    }
    :host(.blue) paper-button[pressed] {
      background: #0041a9;
    }
    :host(.blue) paper-button[disabled] {
      opacity: 0.6;
      background: #0071dc;
    }
    .actions {
      margin: 24px 0;
      text-align: right;
    }
    .inline {
      display: inline-block;
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
    .error > .body {
      background-color: #fbe9e7;
      color: #ff5252;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0 0 0 24px;
      margin: 0 0 12px;
      min-height: 48px;
    }
    .error > .body > .body-content {
      margin-right: 24px;
      position: relative;
      line-height: 20px;
      font-size: 14px;
      white-space: normal;
      font-weight: 500;
      vertical-align: middle;
      fill: #ff5252;
      display: flex;
      flex: 1;
      align-items: center;
    }
    .error > .body > .body-content > svg {
        margin-right: 12px;
    }
    .error.show {
      display: block;
    }

    paper-spinner-lite {
      vertical-align: middle;
      width: 20px;
      height: 20px;
      margin-left: 10px;
    }
`;
