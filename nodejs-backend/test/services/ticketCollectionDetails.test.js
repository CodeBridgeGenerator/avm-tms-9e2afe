const assert = require('assert');
const app = require('../../src/app');

describe('\'ticketCollectionDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('ticketCollectionDetails');

    assert.ok(service, 'Registered the service (ticketCollectionDetails)');
  });
});
