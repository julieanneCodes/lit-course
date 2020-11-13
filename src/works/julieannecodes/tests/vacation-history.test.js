import { expect, fixture, html } from '@open-wc/testing';
import '../components/vacationHistoryEmp/vacation-history';
const component = html`<vacation-history></vacation-history>`;
const interval = {
  detail: [0, 4],
};

describe('Default vacation history properties and render', async () => {
  let el;

  before(async () => {
    el = await fixture(component);
    await el.updateComplete;
  });

  it('Default properties', async () => {
    expect(el.from).equal(0);
    expect(el.nDates).equal(6);
    expect(el.to).equal(6);
  });

  it('Render component if empty array', async () => {
    el.vacationDates = [];
    expect(el.shadowRoot).not.to.be.null;
    expect(el.vacationDates.length).equal(0);
  });
});

describe('Vacation history stepper', async () => {
  let el;
  before(async () => {
    el = await fixture(component);
    await el.updateComplete;
  });

  it('Not rendered stepper when length < 4', async () => {
    el.vacationDates = [{}, {}, {}];
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('stepper-component')).to.be.null;
  });

  it('Render when length >=6', async () => {
    el.vacationDates = [{}, {}, {}, {}, {}, {}];
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('stepper-component')).not.to.be.null;
  });

  it('Get from and to values', async () => {
    el.getValues(interval);
    await el.updateComplete;

    expect(el.from).equal(0);
    expect(el.to).equal(4);
  });
});
