import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/components/Analytics.astro', import.meta.url), 'utf8');
const scripts = [...source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
const measurementId = 'G-TEST';
const disableKey = `ga-disable-${measurementId}`;

function visit(initial = null, storageBlocked = false) {
  let consent = initial;
  let reloads = 0;
  const requests = [];
  const removedCookies = [];
  const documentEvents = {};
  const windowEvents = {};
  const elements = new Map();
  let active;
  function element(selector) {
    if (!elements.has(selector)) elements.set(selector, {
      hidden: true, textContent: '', handlers: {},
      addEventListener(type, fn) { this.handlers[type] = fn; },
      focus() { active = this; },
    });
    return elements.get(selector);
  }
  const contact = { href: 'mailto:contato@example.org', handlers: {}, addEventListener(type, fn) { this.handlers[type] = fn; } };
  const document = {
    referrer: 'https://example.org/origem?nao-enviar=1',
    querySelector: element,
    querySelectorAll: (selector) => selector.startsWith('a[href*=') ? [contact] : [],
    createElement: () => ({}),
    head: { appendChild: (script) => requests.push(script.src) },
    addEventListener: (type, fn) => { documentEvents[type] = fn; },
    get cookie() { return '_ga=old; _ga_TEST=session; unrelated=keep'; },
    set cookie(value) { removedCookies.push(value); },
  };
  const window = {
    location: { origin: 'https://brunafaria.com.br', pathname: '/contato/', hostname: 'brunafaria.com.br', reload() { reloads++; } },
    localStorage: {
      getItem() { if (storageBlocked) throw Error('blocked'); return consent; },
      setItem(key, value) { if (storageBlocked) throw Error('blocked'); consent = value; },
    },
    addEventListener: (type, fn) => { windowEvents[type] = fn; },
  };
  const context = vm.createContext({ document, window, URL, Date, analyticsMeasurementId: measurementId });
  scripts.forEach((script) => vm.runInContext(script, context));
  documentEvents.DOMContentLoaded();
  return { window, element, requests, removedCookies, contact,
    click: (selector) => element(selector).handlers.click(),
    open: (trigger) => documentEvents.click({ target: { closest: () => trigger }, preventDefault() {} }),
    storage: (event) => windowEvents.storage(event),
    consent: () => consent, reloads: () => reloads, active: () => active,
  };
}

let page = visit();
assert.equal(page.element('[data-analytics-consent]').hidden, false);
assert.equal(page.requests.length, 0);
assert.equal(page.window[disableKey], true);
page.click('[data-analytics-reject]');
assert.equal(page.consent(), 'rejected');
assert.equal(page.reloads(), 1);
assert.equal(page.requests.length, 0);

page = visit('rejected');
assert.equal(page.element('[data-analytics-consent]').hidden, true);
assert.equal(page.requests.length, 0);
page.click('[data-analytics-accept]');
assert.equal(page.consent(), 'accepted');
assert.equal(page.reloads(), 1);

page = visit('accepted');
assert.equal(page.requests.length, 1);
assert.equal(page.window[disableKey], false);
assert.equal(page.window.dataLayer[1][2].page_location, 'https://brunafaria.com.br/contato/');
assert.equal(page.window.dataLayer[1][2].page_referrer, 'https://example.org');
const beforeContact = page.window.dataLayer.length;
page.contact.handlers.click();
assert.equal(page.window.dataLayer.length, beforeContact + 1);
const contactParameters = page.window.dataLayer.at(-1)[2];
assert.deepEqual(Object.keys(contactParameters).sort(), ['method', 'page_path']);
assert.equal(contactParameters.method, 'email');
assert.equal(contactParameters.page_path, '/contato/');
const trigger = { focused: false, focus() { this.focused = true; } };
page.open(trigger);
assert.equal(page.element('[data-analytics-consent]').hidden, false);
assert.equal(page.active(), page.element('[data-analytics-accept]'));
assert.match(page.element('[data-analytics-status]').textContent, /medição permitida/);
page.click('[data-analytics-close]');
assert.equal(trigger.focused, true);
assert.equal(page.element('[data-analytics-consent]').hidden, true);
page.open(trigger);
page.click('[data-analytics-reject]');
assert.equal(page.window[disableKey], true);
assert.equal(page.consent(), 'rejected');
assert.equal(page.reloads(), 1);
assert(page.removedCookies.some((cookie) => cookie.startsWith('_ga=')));
assert(page.removedCookies.some((cookie) => cookie.startsWith('_ga_TEST=')));
assert(page.removedCookies.every((cookie) => !cookie.startsWith('unrelated=')));
const afterRevocation = page.window.dataLayer.length;
page.contact.handlers.click();
assert.equal(page.window.dataLayer.length, afterRevocation);
assert.equal(visit(page.consent()).requests.length, 0);

page = visit('accepted');
page.storage({ key: 'unrelated', newValue: 'x' });
assert.equal(page.reloads(), 0);
page.storage({ key: 'bruna-analytics-consent', newValue: 'rejected' });
assert.equal(page.window[disableKey], true);
assert.equal(page.reloads(), 1);
assert(page.removedCookies.length > 0);

page = visit(null, true);
assert.equal(page.requests.length, 0);
page.click('[data-analytics-accept]');
assert.equal(page.window[disableKey], true);
assert.equal(page.reloads(), 0);
assert.equal(page.element('[data-analytics-status]').hidden, false);
assert.match(page.element('[data-analytics-status]').textContent, /permanece desativada/);

console.log('PASS: opt-in, recusa, revogação, cookies, foco, outras abas e armazenamento bloqueado; sem requisições reais ao Google.');
