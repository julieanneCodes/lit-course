import { LitElement, html } from 'lit-element';
import { getDateList } from '../utils/api/api-request';
import '../components/vacationHistoryEmp/vacation-history';

class HistoryView extends LitElement {
  static get properties() {
    return {
      historyList: { type: Array },
    };
  }

  constructor() {
    super();
    this.historyList = [];
  }

  async firstUpdated() {
    await this.getDates();
  }

  async getDates() {
    const request = await getDateList();
    if (!request.error) {
      this.historyList = [...request.data];
    } else if (request.errorCode === 500) {
      // eslint-disable-next-line no-alert
      alert(request.error);
    }
  }

  render() {
    return html` <vacation-history .vacationDates="${this.historyList}"></vacation-history> `;
  }
}

window.customElements.define('history-view', HistoryView);
