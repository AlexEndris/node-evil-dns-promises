var dns = require('dns');
var expect = require('chai').expect;
var evilDNS = require('../evil-dns-promises');

describe('The method hijacking dns.lookup', function () {
  it('returns the family when doing DNS queries', function (done) {
    evilDNS.add('*.foo.com', '1.2.3.4');
    dns.lookup('a.foo.com', {family: undefined, hints: dns.ADDRCONFIG | dns.V4MAPPED}, function (err, addr, family) {
      expect(addr).to.equal('1.2.3.4');
      expect(family).to.equal(4);
      done();
    });
  });

  it('handles family-agnostic queries', function (done) {
    var error = null;
    try {
      dns.lookup('nodejs.org', {family: undefined, hints: dns.ADDRCONFIG | dns.V4MAPPED}, function (err) {
        expect(err).to.not.exist;
        done();
      });
    } catch (err) {
      expect(err).to.not.exist;
      done();
    }
  });

  afterEach(function () {
    evilDNS.clear();
  });
});

describe('The method hijacking dns.promises.lookup', function () {
  it('returns the family when doing DNS queries', async function () {
    evilDNS.add('*.foo.com', '1.2.3.4');
    return dns.promises.lookup('a.foo.com', {family: undefined, hints: dns.ADDRCONFIG | dns.V4MAPPED})
        .then(result => {
          expect(result.address).to.equal('1.2.3.4');
          expect(result.family).to.equal(4);
        });
  });

  afterEach(function () {
    evilDNS.clear();
  });
});
