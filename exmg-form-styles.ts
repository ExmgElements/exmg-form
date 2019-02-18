import {html} from 'lit-element';
import {sharedButtonStyles} from '@exmg/exmg-cms-styles/exmg-cms-button-styles.js';

export const exmgFormStyles = html`
  <style>
    ${sharedButtonStyles.innerHTML.replace('<style>', '').replace('</style>', '')}

    :host {
      font-family: 'Roboto', 'Noto', sans-serif;
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
      margin-right: 24px;
      position: relative;
      padding: 12px 0 12px 36px;
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
    
    paper-spinner-lite {
      vertical-align: middle;
      width: 20px;
      height: 20px;
      margin-left: 10px;
    }
  </style>
`;
